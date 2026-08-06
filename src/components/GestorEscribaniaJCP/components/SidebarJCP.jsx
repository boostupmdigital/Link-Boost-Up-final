import React from "react";
import { NavLink } from "react-router-dom";

import {
  Archive,
  BadgeCheck,
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
  X,
} from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    path: "/gestor-escribania-jcp/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Consultas",
    path: "/gestor-escribania-jcp/consultas",
    icon: ClipboardList,
  },
  {
    label: "Clientes",
    path: "/gestor-escribania-jcp/clientes",
    icon: Users,
  },
  {
    label: "Expedientes",
    path: "/gestor-escribania-jcp/expedientes",
    icon: FileText,
  },
  {
    label: "Certificaciones",
    path: "/gestor-escribania-jcp/certificaciones",
    icon: BadgeCheck,
  },
  {
    label: "Estudio",
    path: "/gestor-escribania-jcp/estudio",
    icon: BookOpenText,
  },
  {
    label: "Gestiones administrativas",
    path: "/gestor-escribania-jcp/gestiones",
    icon: BriefcaseBusiness,
  },
  {
    label: "Dirección",
    path: "/gestor-escribania-jcp/direccion",
    icon: CircleDollarSign,
  },
  {
    label: "Archivo",
    path: "/gestor-escribania-jcp/archivo",
    icon: Archive,
  },
];

const SidebarContent = ({ setSidebarOpen }) => {
  return (
    <div className="flex h-full flex-col bg-[#071b4d] text-white">
      <div className="flex h-24 items-center justify-between border-b border-white/10 px-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#c9a44c] bg-white/5 font-serif text-xl text-[#e2c16f]">
              JCP
            </div>

            <div>
              <p className="text-xs tracking-[0.3em] text-[#e2c16f]">
                ESCRIBANÍA
              </p>

              <p className="mt-1 text-sm font-semibold text-white">
                Sistema de Gestión
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white lg:hidden"
          aria-label="Cerrar menú"
        >
          <X size={21} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
          Gestión
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  [
                    "group flex items-center justify-between rounded-xl px-3 py-3 text-sm transition",
                    isActive
                      ? "bg-white text-[#071b4d] shadow-sm"
                      : "text-white/70 hover:bg-white/10 hover:text-white",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex items-center gap-3">
                      <Icon
                        size={19}
                        className={
                          isActive
                            ? "text-[#b88a23]"
                            : "text-white/50 group-hover:text-white"
                        }
                      />

                      {item.label}
                    </span>

                    {isActive && (
                      <ChevronRight
                        size={17}
                        className="text-[#b88a23]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-white/10 p-4">
        <NavLink
          to="/gestor-escribania-jcp/configuracion"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <Settings size={19} />
          Configuración
        </NavLink>

        <div className="mt-3 rounded-xl bg-white/5 p-4">
          <div className="flex items-center gap-3">
            <Building2
              size={20}
              className="text-[#e2c16f]"
            />

            <div>
              <p className="text-xs text-white/40">
                Supervisión externa
              </p>

              <p className="mt-0.5 text-sm font-medium">
                BoostUp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarJCP = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <>
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 lg:translate-x-0",
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full",
        ].join(" ")}
      >
        <SidebarContent
          setSidebarOpen={setSidebarOpen}
        />
      </aside>
    </>
  );
};

export default SidebarJCP;