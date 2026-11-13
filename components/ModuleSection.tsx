"use client";

import { Module } from "@/data/curriculum";
import TopicView from "./TopicView";
import { CheckCircle2, Clock, Target, Award, ArrowRight } from "lucide-react";

interface ModuleSectionProps {
  module: Module;
  isCompleted: boolean;
  onToggleComplete: (moduleId: string) => void;
  onNextModule?: () => void;
}

export default function ModuleSection({
  module,
  isCompleted,
  onToggleComplete,
  onNextModule
}: ModuleSectionProps) {
  return (
    <section id={module.slug} className="scroll-mt-20 space-y-8">
      {/* Module Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 sm:p-10 text-white shadow-xl">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Level {module.level}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Estimasi: {module.estimatedTime}</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {module.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            {module.tagline}
          </p>
          <p className="text-sm text-slate-400 leading-relaxed max-w-3xl border-t border-slate-700/50 pt-4">
            {module.description}
          </p>

          {/* Learning Outcomes */}
          <div className="pt-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Target Capaian Pembelajaran:</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-200">
              {module.learningOutcomes.map((outcome, i) => (
                <li key={i} className="flex items-start gap-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Daftar Materi Pokok ({module.topics.length} Topik)
          </h3>
          <span className="text-xs text-slate-500">Pelajari secara berurutan</span>
        </div>

        {module.topics.map((topic, index) => (
          <TopicView key={topic.id} topic={topic} index={index} />
        ))}
      </div>

      {/* Final Project Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-slate-50 border border-amber-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-500 text-white rounded-xl shadow-xs">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Tantangan Proyek Kelulusan Modul</span>
            <h4 className="text-xl font-bold text-slate-900">{module.finalProject.title}</h4>
          </div>
        </div>

        <p className="text-slate-700 text-sm leading-relaxed">
          {module.finalProject.description}
        </p>

        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold uppercase text-slate-600">Kriteria Penilaian Siswa:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
            {module.finalProject.requirements.map((req, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white border border-amber-200/50">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-amber-800 bg-amber-100/60 p-3 rounded-lg border border-amber-200">
          💡 <strong>Tips Guru:</strong> {module.finalProject.submissionTip}
        </p>

        {/* Completion Checkbox Button */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-amber-200/60">
          <button
            onClick={() => onToggleComplete(module.id)}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-sm cursor-pointer ${
              isCompleted
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-white hover:bg-slate-50 text-slate-800 border border-slate-300"
            }`}
          >
            <CheckCircle2 className={`w-5 h-5 ${isCompleted ? "text-white" : "text-slate-400"}`} />
            <span>{isCompleted ? "Modul Selesai Dilalui! (Tandai Ulang)" : "Tandai Modul Ini Selesai"}</span>
          </button>

          {onNextModule && (
            <button
              onClick={onNextModule}
              className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition"
            >
              <span>Lanjut ke Modul Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
