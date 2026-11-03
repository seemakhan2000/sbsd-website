"use client";

import { ArrowUpRight } from "lucide-react";

interface Props {
  onSelect: (question: string) => void;
}

const questions = [
  "What loan programs are available?",
  "How do I qualify for a business loan?",
  "How can I apply for financing?",
  "What business certifications are available?",
];

export default function SuggestedQuestions({
  onSelect,
}: Props) {
  return (
    <div className="grid gap-2">
      {questions.map((question) => (
        <button
          key={question}
          type="button"
          onClick={() => onSelect(question)}
          className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 text-left text-sm text-slate-700 transition hover:border-[#18365B] hover:bg-slate-50"
        >
          <span>{question}</span>

          <ArrowUpRight
            size={16}
            className="shrink-0 text-slate-400 transition group-hover:text-[#18365B]"
          />
        </button>
      ))}
    </div>
  );
}