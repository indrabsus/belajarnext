"use client";

import { Menu, BookOpen, Printer, Sparkles } from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenCheatsheet: () => void;
  completedCount: number;
  totalModules: number;
}

export default function Header({
  onToggleSidebar,
  onOpenCheatsheet,
  completedCount,
  totalModules
}: HeaderProps) {
  const percent = Math.round((completedCount / totalModules) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Mobile menu & title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl lg:hidden transition"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <h2 className="text-sm font-bold text-slate-800">
            Buku Panduan Frontend Lengkap
          </h2>
          <p className="text-[11px] text-slate-500">
            Kurikulum Terstruktur untuk Guru & Siswa Pemula
          </p>
        </div>
      </div>

      {/* Center/Right: Progress Bar */}
      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Progres: {completedCount}/{totalModules} Modul ({percent}%)</span>
          </div>
          <div className="w-28 sm:w-40 h-2 bg-slate-100 rounded-full overflow-hidden mt-1 border border-slate-200/50">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCheatsheet}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Cheatsheet</span>
          </button>

          <button
            onClick={handlePrint}
            title="Cetak materi / Simpan sebagai PDF"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 rounded-lg transition shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Cetak / PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
}
