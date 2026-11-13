"use client";

import { useState } from "react";
import { Module } from "@/data/curriculum";
import { 
  CheckCircle2, 
  Circle, 
  Search, 
  BookOpen, 
  GraduationCap,
  X
} from "lucide-react";

interface SidebarProps {
  modules: Module[];
  activeModuleId: string;
  onSelectModule: (moduleId: string) => void;
  completedModuleIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onOpenCheatsheet: () => void;
}

export default function Sidebar({
  modules,
  activeModuleId,
  onSelectModule,
  completedModuleIds,
  isOpen,
  onClose,
  onOpenCheatsheet
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModules = modules.filter((m) => {
    const query = searchQuery.toLowerCase();
    const matchTitle = m.title.toLowerCase().includes(query);
    const matchTopics = m.topics.some(
      (t) => t.title.toLowerCase().includes(query) || t.summary.toLowerCase().includes(query)
    );
    return matchTitle || matchTopics;
  });

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-80 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-base leading-tight tracking-tight">
                Frontend Mastery
              </h1>
              <p className="text-xs text-blue-600 font-semibold">0 &rarr; Next.js + Tailwind</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg lg:hidden"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari topik atau materi..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Module Navigation List */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1.5">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Daftar Modul Belajar
          </div>

          {filteredModules.map((module) => {
            const isActive = activeModuleId === module.id;
            const isCompleted = completedModuleIds.includes(module.id);

            return (
              <div key={module.id} className="space-y-1">
                <button
                  onClick={() => {
                    onSelectModule(module.id);
                    onClose();
                  }}
                  className={`w-full text-left p-3 rounded-xl transition flex items-start gap-3 cursor-pointer group ${
                    isActive
                      ? "bg-blue-50/80 text-blue-900 font-bold border border-blue-200/80 shadow-xs"
                      : "hover:bg-slate-50 text-slate-700 font-medium"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Circle className={`w-4 h-4 ${isActive ? "text-blue-500" : "text-slate-300"}`} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-700">
                        Lv {module.level}
                      </span>
                      <span className="text-xs truncate">{module.title.split(":")[1] || module.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5 font-normal">
                      {module.topics.length} Topik &bull; {module.estimatedTime}
                    </p>
                  </div>
                </button>

                {/* Sub-topics list if active */}
                {isActive && (
                  <div className="pl-9 pr-2 py-1 space-y-1 border-l-2 border-blue-200 ml-5 my-1">
                    {module.topics.map((t) => (
                      <a
                        key={t.id}
                        href={`#${t.id}`}
                        onClick={onClose}
                        className="block text-xs py-1 px-2 text-slate-600 hover:text-blue-700 hover:bg-blue-50/50 rounded-md transition truncate"
                      >
                        {t.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Quick Tools Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2">
          <button
            onClick={() => {
              onOpenCheatsheet();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:border-blue-400 rounded-xl transition shadow-2xs"
          >
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span>Buka Cheatsheet Ringkas</span>
          </button>
        </div>
      </aside>
    </>
  );
}
