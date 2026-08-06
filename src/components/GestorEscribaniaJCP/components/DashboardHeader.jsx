import React from "react";

import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

const DashboardHeader = ({
  setSidebarOpen,
}) => {
  const currentUser = {
    nombre: "Juan Carlos Petrocchi",
    rol: "Dirección",
    iniciales: "JP",
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-20 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50 lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu size={21} />
        </button>

        <div className="relative hidden max-w-xl flex-1 md:block">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            placeholder="Buscar expediente, cliente o trámite..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#b88a23] focus:bg-white focus:ring-4 focus:ring-[#b88a23]/10"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50"
            aria-label="Notificaciones"
          >
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white" />
          </button>

          <div className="hidden h-9 w-px bg-slate-200 sm:block" />

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#071b4d] text-sm font-bold text-white">
              {currentUser.iniciales}
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {currentUser.nombre}
              </p>

              <p className="text-xs text-slate-500">
                {currentUser.rol}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;