"use client";

import React from "react";
import { Trash2, Play } from "lucide-react";

interface DeckCardProps {
  id: string;
  name: string;
  description?: string;
  flashcardCount: number;
  createdAt: string;
  onStudy: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function DeckCard({
  id,
  name,
  description,
  flashcardCount,
  createdAt,
  onStudy,
  onDelete,
}: DeckCardProps) {
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <p>
            <span className="font-semibold text-gray-900">
              {flashcardCount}
            </span>{" "}
            cards
          </p>
          <p className="text-xs text-gray-500 mt-1">Created {formattedDate}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onStudy(id)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
          >
            <Play className="w-4 h-4" />
            Study
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
