import React from "react";

import {
  ArrowUpRight,
} from "lucide-react";

const KPICard = ({
  title,
  value,
  description,
  icon: Icon,
  accentClass = "bg-blue-50 text-blue-700",
  indicator,
}) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${accentClass}`}
        >
          <Icon size={21} />
        </div>

        {indicator && (
          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <ArrowUpRight size={13} />
            {indicator}
          </span>
        )}
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </p>

        <p className="mt-2 text-xs leading-5 text-slate-400">
          {description}
        </p>
      </div>
    </article>
  );
};

export default KPICard;