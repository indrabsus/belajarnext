import { Lightbulb, AlertTriangle, Info, CheckCircle2 } from "lucide-react";

interface CalloutProps {
  type?: "tip" | "warning" | "info" | "success";
  title?: string;
  children: React.ReactNode;
}

export default function Callout({ type = "info", title, children }: CalloutProps) {
  const styles = {
    tip: {
      bg: "bg-amber-50 border-amber-200 text-amber-950",
      icon: <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
      defaultTitle: "Tips Penting",
      titleColor: "text-amber-900"
    },
    warning: {
      bg: "bg-rose-50 border-rose-200 text-rose-950",
      icon: <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />,
      defaultTitle: "Jebakan Umum Pemula",
      titleColor: "text-rose-900"
    },
    info: {
      bg: "bg-blue-50 border-blue-200 text-blue-950",
      icon: <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />,
      defaultTitle: "Catatan Pembelajaran",
      titleColor: "text-blue-900"
    },
    success: {
      bg: "bg-emerald-50 border-emerald-200 text-emerald-950",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
      defaultTitle: "Aha! Moment",
      titleColor: "text-emerald-900"
    }
  };

  const current = styles[type];

  return (
    <div className={`my-4 p-4 rounded-xl border ${current.bg} flex gap-3 text-sm leading-relaxed shadow-xs`}>
      {current.icon}
      <div className="flex-1">
        <h5 className={`font-semibold ${current.titleColor} mb-1`}>
          {title || current.defaultTitle}
        </h5>
        <div className="space-y-1">{children}</div>
      </div>
    </div>
  );
}
