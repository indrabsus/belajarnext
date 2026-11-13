"use client";

import { useState, useEffect } from "react";
import { CURRICULUM_DATA } from "@/data/curriculum";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ModuleSection from "@/components/ModuleSection";
import CheatsheetModal from "@/components/CheatsheetModal";
import { 
  CheckCircle2, 
  Layers,
  FileText
} from "lucide-react";

export default function Home() {
  const [activeModuleId, setActiveModuleId] = useState<string>("modul-0");
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCheatsheetOpen, setIsCheatsheetOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"focus" | "all">("focus");

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("frontend_mastery_progress");
      if (saved) {
        setCompletedModules(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleToggleComplete = (moduleId: string) => {
    let updated: string[];
    if (completedModules.includes(moduleId)) {
      updated = completedModules.filter((id) => id !== moduleId);
    } else {
      updated = [...completedModules, moduleId];
    }
    setCompletedModules(updated);
    try {
      localStorage.setItem("frontend_mastery_progress", JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const currentModuleIndex = CURRICULUM_DATA.findIndex((m) => m.id === activeModuleId);
  const currentModule = CURRICULUM_DATA[currentModuleIndex] || CURRICULUM_DATA[0];

  const handleNextModule = () => {
    if (currentModuleIndex < CURRICULUM_DATA.length - 1) {
      const nextId = CURRICULUM_DATA[currentModuleIndex + 1].id;
      setActiveModuleId(nextId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Sidebar */}
      <Sidebar
        modules={CURRICULUM_DATA}
        activeModuleId={activeModuleId}
        onSelectModule={(id) => {
          setActiveModuleId(id);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        completedModuleIds={completedModules}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-80 flex flex-col min-h-screen">
        <Header
          onToggleSidebar={() => setIsSidebarOpen(true)}
          onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
          completedCount={completedModules.length}
          totalModules={CURRICULUM_DATA.length}
        />

        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-8">
          {/* Quick Jump Level Selector & View Mode Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-400 mr-2 shrink-0">Level:</span>
              {CURRICULUM_DATA.map((m) => {
                const isActive = activeModuleId === m.id;
                const isDone = completedModules.includes(m.id);
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setActiveModuleId(m.id);
                      if (viewMode === "all") {
                        const el = document.getElementById(m.slug);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>Lv {m.level}</span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
              <button
                onClick={() => setViewMode("focus")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  viewMode === "focus"
                    ? "bg-white text-blue-700 shadow-xs"
                    : "hover:text-slate-900"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Mode Fokus</span>
              </button>
              <button
                onClick={() => setViewMode("all")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                  viewMode === "all"
                    ? "bg-white text-blue-700 shadow-xs"
                    : "hover:text-slate-900"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Semua Sekaligus</span>
              </button>
            </div>
          </div>

          {/* Render Sections */}
          {viewMode === "focus" ? (
            <ModuleSection
              key={currentModule.id}
              module={currentModule}
              isCompleted={completedModules.includes(currentModule.id)}
              onToggleComplete={handleToggleComplete}
              onNextModule={
                currentModuleIndex < CURRICULUM_DATA.length - 1
                  ? handleNextModule
                  : undefined
              }
            />
          ) : (
            <div className="space-y-16">
              {CURRICULUM_DATA.map((module, idx) => (
                <ModuleSection
                  key={module.id}
                  module={module}
                  isCompleted={completedModules.includes(module.id)}
                  onToggleComplete={handleToggleComplete}
                  onNextModule={
                    idx < CURRICULUM_DATA.length - 1
                      ? () => {
                          const next = document.getElementById(CURRICULUM_DATA[idx + 1].slug);
                          if (next) next.scrollIntoView({ behavior: "smooth" });
                        }
                      : undefined
                  }
                />
              ))}
            </div>
          )}
        </main>

        {/* Global Footer */}
        <footer className="mt-12 py-8 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
          <p className="font-semibold text-slate-700">
            Handbook Frontend Modern: Dari 0 Hingga Next.js & Tailwind CSS
          </p>
          <p className="mt-1">
            Dibuat untuk memudahkan Guru & Siswa belajar web development secara sistematis dan menyenangkan.
          </p>
        </footer>
      </div>

      {/* Cheatsheet Modal */}
      <CheatsheetModal
        isOpen={isCheatsheetOpen}
        onClose={() => setIsCheatsheetOpen(false)}
      />
    </div>
  );
}
