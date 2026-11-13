"use client";

import { X, BookOpen, Copy, Check } from "lucide-react";
import { useState } from "react";
import { CHEATSHEETS } from "@/data/curriculum";

interface CheatsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheatsheetModal({ isOpen, onClose }: CheatsheetModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Cheatsheet Ringkas Frontend</h3>
              <p className="text-xs text-slate-500">Contekan cepat sintaks HTML, CSS Flexbox, Tailwind, dan Next.js</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CHEATSHEETS.map((section, idx) => (
              <div key={idx} className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/80">
                <h4 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  {section.category}
                </h4>
                <div className="space-y-2">
                  {section.items.map((item, itemIdx) => {
                    const id = `${idx}-${itemIdx}`;
                    const isCopied = copiedIndex === id;
                    return (
                      <div
                        key={itemIdx}
                        onClick={() => handleCopy(item.code, id)}
                        className="group flex items-start justify-between p-2 rounded-lg bg-white border border-slate-200 hover:border-blue-400 transition cursor-pointer text-xs"
                      >
                        <div className="flex-1 pr-2">
                          <code className="font-mono font-semibold text-blue-600 break-all">{item.code}</code>
                          <p className="text-slate-600 mt-0.5">{item.desc}</p>
                        </div>
                        <span className="text-slate-400 group-hover:text-blue-600 p-1 shrink-0">
                          {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 opacity-50 group-hover:opacity-100" />}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>💡 Tip: Klik salah satu baris untuk langsung menyalin kode ke clipboard.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
