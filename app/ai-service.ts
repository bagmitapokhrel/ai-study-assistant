import OpenAI from "openai";

export type AIModel = "openai";

interface GenerateFlashcardsInput {
  content: string;
  deckName: string;
  model: AIModel;
  count?: number;
}

interface GeneratedFlashcard {
  question: string;
  answer: string;
  difficulty: "easy" | "medium" | "hard";
}

const GENERATION_PROMPT = (content: string, count: number = 10) => `
You are an expert educator creating high-quality flashcards from study material.

Study Material:
${content}

Generate exactly ${count} flashcards based on the above material. Each flashcard should:
- Have a clear, concise question
- Have a comprehensive but brief answer
- Be assigned a difficulty level (easy, medium, or hard)
- Focus on key concepts and learning objectives

Return ONLY valid JSON array with this exact structure (no markdown, no extra text):
[
  {
    "question": "What is...?",
    "answer": "...",
    "difficulty": "easy"
  }
]

Important: Return ONLY the JSON array, nothing else.
`;

async function generateWithOpenAI(
  content: string,
  count: number
): Promise<GeneratedFlashcard[]> {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: GENERATION_PROMPT(content, count),
      },
    ],
    temperature: 0.7,
  });

  const responseText = response.choices[0].message.content || "";
  return JSON.parse(responseText);
}

export async function generateFlashcards(
  input: GenerateFlashcardsInput
): Promise<GeneratedFlashcard[]> {
  const { content, count = 10 } = input;

  if (!content || content.trim().length === 0) {
    throw new Error("Content cannot be empty");
  }

  return generateWithOpenAI(content, count);
}
