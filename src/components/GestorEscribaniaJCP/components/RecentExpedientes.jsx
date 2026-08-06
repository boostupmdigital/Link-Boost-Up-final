import React from "react";

import {
  ArrowRight,
  MoreHorizontal,
} from "lucide-react";

const expedientes = [
  {
    numero: "EXP-2026-0048",
    cliente: "María Belén López",
    tramite: "Escritura de compraventa",
    area: "Estudio",
    responsable: "Martín",
    estado: "En redacción",
    fecha: "05/08/2026",
  },
  {
    numero: "EXP-2026-0047",
    cliente: "Carlos Fernández",
    tramite: "Certificación de firma",
    area: "Certificaciones",
    responsable: "Iván",
    estado: "Listo para firma",
    fecha: "05/08/2026",
  },
  {
    numero: "EXP-2026-0046",
    cliente: "Lucía Martínez",
    tramite: "Poder general",
    area: "Consultas",
    responsable: "Recepción",
    estado: "Falta documentación",
    fecha: "04/08/2026",
  },
  {
    numero: "EXP-2026-0045",
    cliente: "Ramiro Suárez",
    tramite: "Acta de constatación",
    area: "Escribano",
    responsable: "Juan Carlos",
    estado: "Pendiente de firma",
    fecha: "04/08/2026",
  },
  {
    numero: "EXP-2026-0044",
    cliente: "Florencia Gómez",
    tramite: "Sucesión",
    area: "Estudio",
    responsable: "Martín",
    estado: "En revisión",
    fecha: "03/08/2026",
  },
];

const statusStyles = {
  "En redacción":
    "bg-blue-50 text-blue-700 ring-blue-600/10",
  "Listo para firma":
    "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  "Falta documentación":
    "bg-amber-50 text-amber-700 ring-amber-600/10",
  "Pendiente de firma":
    "bg-violet-50 text-violet-700 ring-violet-600/10",
  "En revisión":
    "bg-slate-100 text-slate-700 ring-slate-600/10",
};

const RecentExpedientes = () => {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Expedientes recientes
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Últimos trámites ingresados o actualizados.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 text-sm font-semibold text-[#071b4d] transition hover:text-[#b88a23]"
        >
          Ver todos
          <ArrowRight size={17} />
        </button>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50/80">
            <tr>
              {[
                "Expediente",
                "Cliente",
                "Trámite",
                "Área",
                "Estado",
                "",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {expedientes.map((expediente) => (
              <tr
                key={expediente.numero}
                className="transition hover:bg-slate-50"
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <p className="text-sm font-semibold text-[#071b4d]">
                    {expediente.numero}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {expediente.fecha}
                  </p>
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">
                  {expediente.cliente}
                </td>

                <td className="min-w-56 px-6 py-4 text-sm text-slate-600">
                  {expediente.tramite}
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <p className="text-sm text-slate-700">
                    {expediente.area}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {expediente.responsable}
                  </p>
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={[
                      "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
                      statusStyles[expediente.estado] ||
                        "bg-slate-100 text-slate-700",
                    ].join(" ")}
                  >
                    {expediente.estado}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={`Opciones de ${expediente.numero}`}
                  >
                    <MoreHorizontal size={19} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentExpedientes;