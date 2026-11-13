"use client";

import { useState } from "react";
import { Topic } from "@/data/curriculum";
import CodeBlock from "./CodeBlock";
import Callout from "./Callout";
import { Sparkles, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface TopicViewProps {
  topic: Topic;
  index: number;
}

export default function TopicView({ topic, index }: TopicViewProps) {
  const [showHint, setShowHint] = useState(false);

  return (
    <article
      id={topic.id}
      className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 transition duration-200"
    >
      {/* Topic Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold">
            {index + 1}
          </span>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            {topic.title}
          </h3>
        </div>
        {topic.badge && (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            {topic.badge}
          </span>
        )}
      </div>

      {/* Summary */}
      <p className="mt-4 text-sm font-medium text-blue-700 bg-blue-50/60 px-3.5 py-2 rounded-lg inline-block">
        💡 Intisari: {topic.summary}
      </p>

      {/* Topic Content Body */}
      <div className="mt-4 text-slate-700 text-[15px] leading-relaxed whitespace-pre-line space-y-3">
        {topic.content}
      </div>

      {/* Code Snippet */}
      {topic.codeSnippet && (
        <div className="mt-5">
          <CodeBlock
            code={topic.codeSnippet.code}
            language={topic.codeSnippet.language}
            filename={topic.codeSnippet.filename}
          />
        </div>
      )}

      {/* Tips */}
      {topic.tips && topic.tips.map((tip, i) => (
        <Callout key={i} type="tip">
          {tip}
        </Callout>
      ))}

      {/* Pitfalls */}
      {topic.pitfalls && topic.pitfalls.map((pitfall, i) => (
        <Callout key={i} type="warning">
          {pitfall}
        </Callout>
      ))}

      {/* Exercise Box */}
      {topic.exercise && (
        <div className="mt-6 p-4 sm:p-5 rounded-xl bg-gradient-to-br from-indigo-50/70 to-blue-50/40 border border-indigo-100">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Latihan Praktik Mandiri: {topic.exercise.title}</span>
          </div>
          <p className="mt-2 text-sm text-indigo-950/80 leading-relaxed">
            {topic.exercise.instruction}
          </p>

          <div className="mt-3">
            <button
              onClick={() => setShowHint(!showHint)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 transition"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHint ? "Sembunyikan Petunjuk" : "Lihat Petunjuk / Clue"}</span>
              {showHint ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {showHint && (
              <p className="mt-2 p-3 bg-white/80 rounded-lg text-xs font-mono text-indigo-900 border border-indigo-200/60">
                👉 {topic.exercise.hint}
              </p>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
