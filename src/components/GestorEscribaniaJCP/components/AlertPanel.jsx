import React from "react";

import {
  AlertTriangle,
  CalendarClock,
  CircleDollarSign,
  FileWarning,
} from "lucide-react";

const alerts = [
  {
    id: 1,
    title: "Expedientes sin movimiento",
    description:
      "3 expedientes no registran actividad desde hace más de 5 días.",
    icon: FileWarning,
    iconClass: "bg-rose-50 text-rose-600",
  },
  {
    id: 2,
    title: "Firmas programadas",
    description:
      "Hay 6 expedientes listos para la firma del escribano.",
    icon: CalendarClock,
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    id: 3,
    title: "Pagos pendientes",
    description:
      "4 gestiones administrativas esperan autorización.",
    icon: CircleDollarSign,
    iconClass: "bg-amber-50 text-amber-600",
  },
];

const AlertPanel = () => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="border-b border-slate-100 px-5 py-5">
        <div className="flex items-center gap-2">
          <AlertTriangle
            size={19}
            className="text-amber-500"
          />

          <h2 className="text-base font-bold text-slate-900">
            Alertas
          </h2>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Situaciones que requieren atención.
        </p>
      </header>

      <div className="divide-y divide-slate-100">
        {alerts.map((alert) => {
          const Icon = alert.icon;

          return (
            <button
              type="button"
              key={alert.id}
              className="flex w-full gap-4 px-5 py-5 text-left transition hover:bg-slate-50"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${alert.iconClass}`}
              >
                <Icon size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {alert.title}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {alert.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="border-t border-slate-100 p-4">
        <button
          type="button"
          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-[#b88a23] hover:text-[#071b4d]"
        >
          Ver todas las alertas
        </button>
      </div>
    </section>
  );
};

export default AlertPanel;