"use client";

import React, { useState } from "react";
import { Upload, FileText, Plus, Loader } from "lucide-react";

interface FlashcardGeneratorProps {
  onGenerate?: (flashcards: any[]) => void;
}

export default function FlashcardGenerator({
  onGenerate,
}: FlashcardGeneratorProps) {
  const [content, setContent] = useState("");
  const [deckName, setDeckName] = useState("");
  const [model, setModel] = useState<"claude" | "openai">("claude");
  const [flashcardCount, setFlashcardCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleGenerateFlashcards = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/generate-flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          deckName,
          model,
          count: flashcardCount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate flashcards");
      }

      setSuccess(
        `✓ Generated ${data.flashcardCount} flashcards for "${data.deckName}"`
      );
      onGenerate?.(data.flashcards);
      setContent("");
      setDeckName("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        🎓 Create Flashcards
      </h1>
      <p className="text-gray-600 mb-6">
        Turn your notes into AI-powered flashcards instantly
      </p>

      <form onSubmit={handleGenerateFlashcards} className="space-y-6">
        {/* Deck Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deck Name
          </label>
          <input
            type="text"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            placeholder="e.g., Biology Chapter 3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Content Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Study Material
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your notes, study material, or text here..."
            rows={8}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
          />
        </div>

        {/* AI Model Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              AI Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value as "claude" | "openai")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="claude">Claude (Anthropic)</option>
              <option value="openai">GPT-4 (OpenAI)</option>
            </select>
          </div>

          {/* Flashcard Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Flashcards
            </label>
            <input
              type="number"
              value={flashcardCount}
              onChange={(e) => setFlashcardCount(Math.max(1, parseInt(e.target.value) || 10))}
              min="1"
              max="50"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">⚠ {error}</p>
          </div>
        )}

        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">{success}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Generate Flashcards
            </>
          )}
        </button>
      </form>
    </div>
  );
}
