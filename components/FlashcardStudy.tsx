"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, Check, X } from "lucide-react";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  difficulty: "easy" | "medium" | "hard";
}

interface FlashcardStudyProps {
  flashcards: Flashcard[];
  deckName: string;
  onComplete?: (results: any) => void;
}

export default function FlashcardStudy({
  flashcards,
  deckName,
  onComplete,
}: FlashcardStudyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState<{ [key: string]: boolean }>({});
  const [finished, setFinished] = useState(false);

  const current = flashcards[currentIndex];
  const answeredCount = Object.keys(results).length;
  const correctCount = Object.values(results).filter((v) => v).length;
  const progress = (answeredCount / flashcards.length) * 100;

  const handleAnswer = (isCorrect: boolean) => {
    setResults({ ...results, [current.id]: isCorrect });

    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      setFinished(true);
      onComplete?.({ correctCount, total: flashcards.length, results });
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setResults({});
    setFinished(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (finished) {
    const percentage = Math.round((correctCount / flashcards.length) * 100);
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎉 Study Complete!
        </h1>
        <div className="mb-8">
          <div className="text-6xl font-bold text-blue-600 mb-2">
            {percentage}%
          </div>
          <p className="text-xl text-gray-600">
            You got {correctCount} out of {flashcards.length} correct
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-green-600 font-semibold">Correct</p>
            <p className="text-3xl font-bold text-green-700">{correctCount}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-red-600 font-semibold">Incorrect</p>
            <p className="text-3xl font-bold text-red-700">
              {flashcards.length - correctCount}
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Review Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{deckName}</h1>
        <p className="text-gray-600">
          Card {currentIndex + 1} of {flashcards.length}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {answeredCount} answered • {correctCount} correct
        </p>
      </div>

      {/* Flashcard */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative h-64 mb-8 cursor-pointer group"
      >
        <div
          className={`absolute inset-0 rounded-lg p-8 flex flex-col justify-center items-center text-center transition-all transform ${
            isFlipped
              ? "bg-gradient-to-br from-purple-500 to-pink-500"
              : "bg-gradient-to-br from-blue-500 to-cyan-500"
          } text-white shadow-lg hover:shadow-xl`}
        >
          <p className="text-sm font-semibold opacity-75 mb-4">
            {isFlipped ? "Answer" : "Question"}
          </p>
          <p className="text-2xl font-bold leading-relaxed">
            {isFlipped ? current.answer : current.question}
          </p>
          <p className="text-xs mt-4 opacity-75">Click to flip</p>
        </div>
      </div>

      {/* Difficulty Badge */}
      <div className="mb-6">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(current.difficulty)}`}>
          {current.difficulty.charAt(0).toUpperCase() + current.difficulty.slice(1)}
        </span>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex(currentIndex - 1);
              setIsFlipped(false);
            }
          }}
          disabled={currentIndex === 0}
          className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1" />
        <button
          onClick={() => {
            if (currentIndex < flashcards.length - 1) {
              setCurrentIndex(currentIndex + 1);
              setIsFlipped(false);
            }
          }}
          disabled={currentIndex === flashcards.length - 1}
          className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Answer Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleAnswer(false)}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <X className="w-5 h-5" />
          Incorrect
        </button>
        <button
          onClick={() => handleAnswer(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          Correct
        </button>
      </div>
    </div>
  );
}
