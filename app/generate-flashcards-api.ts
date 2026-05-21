import { NextRequest, NextResponse } from "next/server";
import { generateFlashcards } from "@/app/ai-service";
import { supabase } from "@/app/supabase-config";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { content, deckName, model, count = 10 } = body;

    if (!content || !deckName || !model) {
      return NextResponse.json(
        { error: "Missing required fields: content, deckName, model" },
        { status: 400 }
      );
    }

    if (!["claude", "openai"].includes(model)) {
      return NextResponse.json(
        { error: "Invalid model. Use 'claude' or 'openai'" },
        { status: 400 }
      );
    }

    // Create deck
    const { data: deck, error: deckError } = await supabase
      .from("decks")
      .insert([
        {
          user_id: userId,
          name: deckName,
          description: `Generated with ${model} on ${new Date().toLocaleDateString()}`,
        },
      ])
      .select()
      .single();

    if (deckError) {
      return NextResponse.json(
        { error: "Failed to create deck: " + deckError.message },
        { status: 500 }
      );
    }

    // Generate flashcards using AI
    const flashcards = await generateFlashcards({
      content,
      deckName,
      model,
      count,
    });

    // Insert flashcards into database
    const flashcardsToInsert = flashcards.map((fc) => ({
      deck_id: deck.id,
      question: fc.question,
      answer: fc.answer,
      difficulty: fc.difficulty,
    }));

    const { error: insertError } = await supabase
      .from("flashcards")
      .insert(flashcardsToInsert);

    if (insertError) {
      return NextResponse.json(
        { error: "Failed to save flashcards: " + insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      deckId: deck.id,
      deckName: deck.name,
      flashcardCount: flashcards.length,
      flashcards,
    });
  } catch (error: any) {
    console.error("Error generating flashcards:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to generate flashcards",
      },
      { status: 500 }
    );
  }
}
