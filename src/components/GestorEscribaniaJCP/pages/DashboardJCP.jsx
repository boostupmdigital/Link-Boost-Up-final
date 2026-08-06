import React, { useState } from "react";

import {
  AlertTriangle,
  Archive,
  Bell,
  BookOpen,
  Briefcase,
  CheckCircle,
  ChevronRight,
  ClipboardList,
  DollarSign,
  FileSignature,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react";

const COLORS = {
  navy: "#071b4d",
  navyLight: "#102b68",
  gold: "#c49a3a",
  goldLight: "#e4c675",
  orange: "#f97316",
  background: "#f5f7fb",
  white: "#ffffff",
  text: "#172033",
  muted: "#64748b",
  border: "#e2e8f0",
};

const SIDEBAR_WIDTH = 286;

const navigationItems = [
  {
    label: "Panel general",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "Consultas",
    icon: ClipboardList,
  },
  {
    label: "Clientes",
    icon: Users,
  },
  {
    label: "Expedientes",
    icon: FileText,
  },
  {
    label: "Certificaciones",
    icon: CheckCircle,
  },
  {
    label: "Estudio",
    icon: BookOpen,
  },
  {
    label: "Gestiones administrativas",
    icon: Briefcase,
  },
  {
    label: "Dirección",
    icon: DollarSign,
  },
  {
    label: "Archivo",
    icon: Archive,
  },
];

const metrics = [
  {
    title: "Expedientes activos",
    value: "126",
    description: "Trámites actualmente en curso.",
    icon: FolderOpen,
    color: "#2563eb",
    background: "#eff6ff",
  },
  {
    title: "Pendientes de firma",
    value: "18",
    description: "Documentos preparados para el escribano.",
    icon: FileSignature,
    color: "#7c3aed",
    background: "#f5f3ff",
  },
  {
    title: "Consultas de hoy",
    value: "12",
    description: "Ingresos presenciales y digitales.",
    icon: ClipboardList,
    color: "#ca8a04",
    background: "#fefce8",
  },
  {
    title: "Certificaciones activas",
    value: "34",
    description: "En preparación, revisión o firma.",
    icon: CheckCircle,
    color: "#059669",
    background: "#ecfdf5",
  },
];

const expedientes = [
  {
    numero: "EXP-2026-0048",
    cliente: "María Belén López",
    tramite: "Escritura de compraventa",
    area: "Estudio",
    responsable: "Martín",
    estado: "En redacción",
    fecha: "05/08/2026",
    statusColor: "#2563eb",
    statusBackground: "#eff6ff",
  },
  {
    numero: "EXP-2026-0047",
    cliente: "Carlos Fernández",
    tramite: "Certificación de firma",
    area: "Certificaciones",
    responsable: "Iván",
    estado: "Listo para firma",
    fecha: "05/08/2026",
    statusColor: "#047857",
    statusBackground: "#ecfdf5",
  },
  {
    numero: "EXP-2026-0046",
    cliente: "Lucía Martínez",
    tramite: "Poder general",
    area: "Consultas",
    responsable: "Recepción",
    estado: "Falta documentación",
    fecha: "04/08/2026",
    statusColor: "#b45309",
    statusBackground: "#fffbeb",
  },
  {
    numero: "EXP-2026-0045",
    cliente: "Ramiro Suárez",
    tramite: "Acta de constatación",
    area: "Escribano",
    responsable: "Juan Carlos",
    estado: "Pendiente de firma",
    fecha: "04/08/2026",
    statusColor: "#6d28d9",
    statusBackground: "#f5f3ff",
  },
  {
    numero: "EXP-2026-0044",
    cliente: "Florencia Gómez",
    tramite: "Sucesión",
    area: "Estudio",
    responsable: "Martín",
    estado: "En revisión",
    fecha: "03/08/2026",
    statusColor: "#475569",
    statusBackground: "#f1f5f9",
  },
];

const alerts = [
  {
    title: "Expedientes sin movimiento",
    description:
      "3 expedientes no registran actividad desde hace más de cinco días.",
    color: "#e11d48",
    background: "#fff1f2",
    icon: FileText,
  },
  {
    title: "Firmas programadas",
    description:
      "Hay 6 expedientes preparados para la intervención del escribano.",
    color: "#7c3aed",
    background: "#f5f3ff",
    icon: FileSignature,
  },
  {
    title: "Pagos pendientes",
    description:
      "4 gestiones administrativas están pendientes de autorización.",
    color: "#d97706",
    background: "#fffbeb",
    icon: DollarSign,
  },
];

const workload = [
  {
    area: "Consultas",
    quantity: 42,
    percentage: 76,
  },
  {
    area: "Certificaciones",
    quantity: 34,
    percentage: 62,
  },
  {
    area: "Estudio",
    quantity: 28,
    percentage: 50,
  },
  {
    area: "Gestiones administrativas",
    quantity: 17,
    percentage: 31,
  },
];

const DashboardJCP = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        backgroundColor: COLORS.background,
        color: COLORS.text,
        position: "relative",
        overflowX: "hidden",
        fontFamily: '"Jost", sans-serif',
      }}
    >
      {/* Fondo móvil cuando se abre el menú */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            border: 0,
            backgroundColor: "rgba(15, 23, 42, 0.5)",
            zIndex: 90,
          }}
        />
      )}

      {/* SIDEBAR */}

      <aside
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          width: SIDEBAR_WIDTH,
          backgroundColor: COLORS.navy,
          color: COLORS.white,
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          boxShadow: "8px 0 30px rgba(15, 23, 42, 0.12)",
          transform:
            sidebarOpen || window.innerWidth >= 1024
              ? "translateX(0)"
              : `translateX(-${SIDEBAR_WIDTH}px)`,
          transition: "transform 0.25s ease",
        }}
      >
        <div
          style={{
            height: 96,
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 13,
                border: `1px solid ${COLORS.gold}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: COLORS.goldLight,
                fontFamily: "Georgia, serif",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              JCP
            </div>

            <div>
              <div
                style={{
                  color: COLORS.goldLight,
                  fontSize: 11,
                  letterSpacing: 4,
                }}
              >
                ESCRIBANÍA
              </div>

              <div
                style={{
                  marginTop: 5,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Sistema de Gestión
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Cerrar menú"
            style={{
              border: 0,
              background: "transparent",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              display: window.innerWidth >= 1024 ? "none" : "block",
            }}
          >
            <X size={21} />
          </button>
        </div>

        <nav
          style={{
            flex: 1,
            padding: "26px 16px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              padding: "0 12px",
              marginBottom: 12,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 3,
              color: "rgba(255,255,255,0.35)",
            }}
          >
            GESTIÓN
          </div>

          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                type="button"
                key={item.label}
                onClick={() => setSidebarOpen(false)}
                style={{
                  width: "100%",
                  minHeight: 48,
                  marginBottom: 5,
                  padding: "0 13px",
                  border: 0,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: item.active
                    ? COLORS.white
                    : "transparent",
                  color: item.active
                    ? COLORS.navy
                    : "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 14,
                    fontWeight: item.active ? 600 : 400,
                  }}
                >
                  <Icon
                    size={19}
                    color={
                      item.active
                        ? COLORS.gold
                        : "rgba(255,255,255,0.5)"
                    }
                  />

                  {item.label}
                </span>

                {item.active && (
                  <ChevronRight
                    size={17}
                    color={COLORS.gold}
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div
          style={{
            padding: 16,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <button
            type="button"
            style={{
              width: "100%",
              height: 46,
              padding: "0 13px",
              border: 0,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "rgba(255,255,255,0.65)",
              background: "transparent",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <Settings size={18} />
            Configuración
          </button>

          <div
            style={{
              marginTop: 10,
              padding: 14,
              borderRadius: 13,
              backgroundColor: "rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.38)",
              }}
            >
              Supervisión externa
            </div>

            <div
              style={{
                marginTop: 4,
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.goldLight,
              }}
            >
              BoostUp
            </div>
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}

      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          boxSizing: "border-box",
          paddingLeft:
            window.innerWidth >= 1024 ? SIDEBAR_WIDTH : 0,
        }}
      >
        {/* HEADER */}

        <header
          style={{
            height: 80,
            width: "100%",
            position: "sticky",
            top: 0,
            zIndex: 50,
            boxSizing: "border-box",
            padding: "0 32px",
            backgroundColor: "rgba(255,255,255,0.97)",
            borderBottom: `1px solid ${COLORS.border}`,
            display: "flex",
            alignItems: "center",
            gap: 22,
          }}
        >
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menú"
            style={{
              width: 42,
              height: 42,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 11,
              backgroundColor: COLORS.white,
              color: COLORS.muted,
              display:
                window.innerWidth >= 1024 ? "none" : "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <Menu size={21} />
          </button>

          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 570,
            }}
          >
            <Search
              size={18}
              color="#94a3b8"
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />

            <input
              type="search"
              placeholder="Buscar expediente, cliente o trámite..."
              style={{
                width: "100%",
                height: 44,
                padding: "0 18px 0 46px",
                boxSizing: "border-box",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12,
                outline: "none",
                backgroundColor: "#f8fafc",
                color: COLORS.text,
                fontFamily: "inherit",
                fontSize: 14,
              }}
            />
          </div>

          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <button
              type="button"
              aria-label="Notificaciones"
              style={{
                position: "relative",
                width: 42,
                height: 42,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 11,
                backgroundColor: COLORS.white,
                color: COLORS.muted,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Bell size={20} />

              <span
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: COLORS.orange,
                  border: "2px solid white",
                }}
              />
            </button>

            <div
              style={{
                height: 36,
                width: 1,
                backgroundColor: COLORS.border,
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  backgroundColor: COLORS.navy,
                  color: COLORS.white,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                JC
              </div>

              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: COLORS.text,
                    whiteSpace: "nowrap",
                  }}
                >
                  Juan Carlos Petrocchi
                </div>

                <div
                  style={{
                    marginTop: 2,
                    fontSize: 12,
                    color: COLORS.muted,
                  }}
                >
                  Dirección
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD */}

        <main
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "34px 32px 48px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 1600,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: COLORS.gold,
                    letterSpacing: 3,
                    fontWeight: 700,
                  }}
                >
                  SISTEMA INTEGRAL DE GESTIÓN
                </div>

                <h1
                  style={{
                    margin: "9px 0 0",
                    color: COLORS.text,
                    fontSize: 32,
                    lineHeight: 1.2,
                  }}
                >
                  Panel general
                </h1>

                <p
                  style={{
                    maxWidth: 780,
                    margin: "10px 0 0",
                    color: COLORS.muted,
                    fontSize: 14,
                    lineHeight: 1.65,
                  }}
                >
                  Visualización preliminar de expedientes activos,
                  tareas pendientes y situaciones que requieren
                  seguimiento.
                </p>
              </div>

              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  border: `1px solid ${COLORS.border}`,
                  backgroundColor: COLORS.white,
                  color: COLORS.muted,
                  fontSize: 13,
                }}
              >
                Última actualización: hoy, 21:30
              </div>
            </div>

            {/* KPI */}

            <section
              style={{
                marginTop: 28,
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 18,
              }}
            >
              {metrics.map((metric) => {
                const Icon = metric.icon;

                return (
                  <article
                    key={metric.title}
                    style={{
                      padding: 21,
                      borderRadius: 18,
                      border: `1px solid ${COLORS.border}`,
                      backgroundColor: COLORS.white,
                      boxShadow:
                        "0 8px 24px rgba(15,23,42,0.05)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: 13,
                          backgroundColor: metric.background,
                          color: metric.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon size={21} />
                      </div>

                      <span
                        style={{
                          color: COLORS.muted,
                          fontSize: 12,
                        }}
                      >
                        Agosto
                      </span>
                    </div>

                    <div
                      style={{
                        marginTop: 20,
                        fontSize: 34,
                        lineHeight: 1,
                        fontWeight: 700,
                        color: COLORS.text,
                      }}
                    >
                      {metric.value}
                    </div>

                    <div
                      style={{
                        marginTop: 10,
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#475569",
                      }}
                    >
                      {metric.title}
                    </div>

                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 12,
                        lineHeight: 1.5,
                        color: "#94a3b8",
                      }}
                    >
                      {metric.description}
                    </div>
                  </article>
                );
              })}
            </section>

            {/* TABLA + ALERTAS */}

            <section
              style={{
                marginTop: 22,
                display: "grid",
                gridTemplateColumns:
                  window.innerWidth >= 1250
                    ? "minmax(0, 1fr) 350px"
                    : "1fr",
                gap: 22,
                alignItems: "start",
              }}
            >
              <article
                style={{
                  overflow: "hidden",
                  borderRadius: 18,
                  border: `1px solid ${COLORS.border}`,
                  backgroundColor: COLORS.white,
                  boxShadow:
                    "0 8px 24px rgba(15,23,42,0.05)",
                }}
              >
                <div
                  style={{
                    padding: "20px 22px",
                    borderBottom: `1px solid ${COLORS.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 20,
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        color: COLORS.text,
                        fontSize: 16,
                      }}
                    >
                      Expedientes recientes
                    </h2>

                    <p
                      style={{
                        margin: "5px 0 0",
                        color: COLORS.muted,
                        fontSize: 13,
                      }}
                    >
                      Últimos trámites ingresados o actualizados.
                    </p>
                  </div>

                  <button
                    type="button"
                    style={{
                      border: 0,
                      background: "transparent",
                      color: COLORS.navy,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Ver todos
                    <ChevronRight size={17} />
                  </button>
                </div>

                <div
                  style={{
                    width: "100%",
                    overflowX: "auto",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      minWidth: 850,
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: "#f8fafc",
                        }}
                      >
                        {[
                          "Expediente",
                          "Cliente",
                          "Trámite",
                          "Área",
                          "Estado",
                        ].map((column) => (
                          <th
                            key={column}
                            style={{
                              padding: "13px 18px",
                              borderBottom: `1px solid ${COLORS.border}`,
                              color: COLORS.muted,
                              fontSize: 10,
                              letterSpacing: 1.3,
                              textAlign: "left",
                              textTransform: "uppercase",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {expedientes.map((expediente) => (
                        <tr key={expediente.numero}>
                          <td
                            style={{
                              padding: "16px 18px",
                              borderBottom: `1px solid ${COLORS.border}`,
                              whiteSpace: "nowrap",
                            }}
                          >
                            <div
                              style={{
                                color: COLORS.navy,
                                fontSize: 13,
                                fontWeight: 700,
                              }}
                            >
                              {expediente.numero}
                            </div>

                            <div
                              style={{
                                marginTop: 4,
                                color: "#94a3b8",
                                fontSize: 11,
                              }}
                            >
                              {expediente.fecha}
                            </div>
                          </td>

                          <td
                            style={{
                              padding: "16px 18px",
                              borderBottom: `1px solid ${COLORS.border}`,
                              color: "#334155",
                              fontSize: 13,
                              fontWeight: 500,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {expediente.cliente}
                          </td>

                          <td
                            style={{
                              padding: "16px 18px",
                              borderBottom: `1px solid ${COLORS.border}`,
                              color: COLORS.muted,
                              fontSize: 13,
                            }}
                          >
                            {expediente.tramite}
                          </td>

                          <td
                            style={{
                              padding: "16px 18px",
                              borderBottom: `1px solid ${COLORS.border}`,
                              whiteSpace: "nowrap",
                            }}
                          >
                            <div
                              style={{
                                color: "#334155",
                                fontSize: 13,
                              }}
                            >
                              {expediente.area}
                            </div>

                            <div
                              style={{
                                marginTop: 4,
                                color: "#94a3b8",
                                fontSize: 11,
                              }}
                            >
                              {expediente.responsable}
                            </div>
                          </td>

                          <td
                            style={{
                              padding: "16px 18px",
                              borderBottom: `1px solid ${COLORS.border}`,
                              whiteSpace: "nowrap",
                            }}
                          >
                            <span
                              style={{
                                display: "inline-flex",
                                padding: "6px 10px",
                                borderRadius: 999,
                                backgroundColor:
                                  expediente.statusBackground,
                                color: expediente.statusColor,
                                fontSize: 11,
                                fontWeight: 600,
                              }}
                            >
                              {expediente.estado}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              <article
                style={{
                  borderRadius: 18,
                  border: `1px solid ${COLORS.border}`,
                  backgroundColor: COLORS.white,
                  boxShadow:
                    "0 8px 24px rgba(15,23,42,0.05)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "20px 20px 17px",
                    borderBottom: `1px solid ${COLORS.border}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                    }}
                  >
                    <AlertTriangle
                      size={19}
                      color="#d97706"
                    />

                    <h2
                      style={{
                        margin: 0,
                        color: COLORS.text,
                        fontSize: 16,
                      }}
                    >
                      Alertas
                    </h2>
                  </div>

                  <p
                    style={{
                      margin: "6px 0 0",
                      color: COLORS.muted,
                      fontSize: 13,
                    }}
                  >
                    Situaciones que requieren atención.
                  </p>
                </div>

                {alerts.map((alert) => {
                  const Icon = alert.icon;

                  return (
                    <div
                      key={alert.title}
                      style={{
                        padding: "18px 20px",
                        borderBottom: `1px solid ${COLORS.border}`,
                        display: "flex",
                        gap: 13,
                      }}
                    >
                      <div
                        style={{
                          flexShrink: 0,
                          width: 40,
                          height: 40,
                          borderRadius: 11,
                          backgroundColor: alert.background,
                          color: alert.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon size={18} />
                      </div>

                      <div>
                        <div
                          style={{
                            color: "#334155",
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          {alert.title}
                        </div>

                        <div
                          style={{
                            marginTop: 5,
                            color: COLORS.muted,
                            fontSize: 12,
                            lineHeight: 1.55,
                          }}
                        >
                          {alert.description}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div
                  style={{
                    padding: 15,
                  }}
                >
                  <button
                    type="button"
                    style={{
                      width: "100%",
                      height: 40,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 11,
                      backgroundColor: COLORS.white,
                      color: COLORS.muted,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Ver todas las alertas
                  </button>
                </div>
              </article>
            </section>

            {/* CARGA DE TRABAJO + ACCESOS RÁPIDOS */}

            <section
              style={{
                marginTop: 22,
                display: "grid",
                gridTemplateColumns:
                  window.innerWidth >= 1000
                    ? "minmax(0, 1fr) 330px"
                    : "1fr",
                gap: 22,
              }}
            >
              <article
                style={{
                  padding: 23,
                  borderRadius: 18,
                  border: `1px solid ${COLORS.border}`,
                  backgroundColor: COLORS.white,
                  boxShadow:
                    "0 8px 24px rgba(15,23,42,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 20,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        color: COLORS.text,
                        fontSize: 16,
                      }}
                    >
                      Distribución de trabajo por área
                    </h2>

                    <p
                      style={{
                        margin: "5px 0 0",
                        color: COLORS.muted,
                        fontSize: 13,
                      }}
                    >
                      Vista preliminar de la carga operativa.
                    </p>
                  </div>

                  <select
                    defaultValue="week"
                    style={{
                      height: 39,
                      padding: "0 13px",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 10,
                      backgroundColor: COLORS.white,
                      color: COLORS.muted,
                      outline: "none",
                    }}
                  >
                    <option value="week">Esta semana</option>
                    <option value="month">Este mes</option>
                    <option value="quarter">
                      Últimos 90 días
                    </option>
                  </select>
                </div>

                <div
                  style={{
                    marginTop: 26,
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                  }}
                >
                  {workload.map((item) => (
                    <div key={item.area}>
                      <div
                        style={{
                          marginBottom: 8,
                          display: "flex",
                          justifyContent: "space-between",
                          color: "#475569",
                          fontSize: 13,
                        }}
                      >
                        <span>{item.area}</span>

                        <strong>{item.quantity}</strong>
                      </div>

                      <div
                        style={{
                          height: 9,
                          borderRadius: 999,
                          overflow: "hidden",
                          backgroundColor: "#edf2f7",
                        }}
                      >
                        <div
                          style={{
                            width: `${item.percentage}%`,
                            height: "100%",
                            borderRadius: 999,
                            backgroundColor: COLORS.navy,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article
                style={{
                  padding: 24,
                  borderRadius: 18,
                  backgroundColor: COLORS.navy,
                  color: COLORS.white,
                  boxShadow:
                    "0 12px 30px rgba(7,27,77,0.18)",
                }}
              >
                <div
                  style={{
                    color: COLORS.goldLight,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 2.8,
                  }}
                >
                  ACCESO RÁPIDO
                </div>

                <h2
                  style={{
                    margin: "13px 0 0",
                    fontSize: 21,
                    lineHeight: 1.3,
                  }}
                >
                  Crear un nuevo registro
                </h2>

                <p
                  style={{
                    margin: "10px 0 0",
                    color: "rgba(255,255,255,0.62)",
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  Registrá una consulta o iniciá un expediente
                  desde el punto de ingreso.
                </p>

                <button
                  type="button"
                  style={{
                    width: "100%",
                    height: 46,
                    marginTop: 25,
                    border: 0,
                    borderRadius: 12,
                    backgroundColor: COLORS.white,
                    color: COLORS.navy,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Nueva consulta
                </button>

                <button
                  type="button"
                  style={{
                    width: "100%",
                    height: 46,
                    marginTop: 11,
                    border: "1px solid rgba(255,255,255,0.22)",
                    borderRadius: 12,
                    backgroundColor: "transparent",
                    color: COLORS.white,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Nuevo expediente
                </button>

                <div
                  style={{
                    marginTop: 25,
                    paddingTop: 17,
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.42)",
                    fontSize: 11,
                    lineHeight: 1.55,
                  }}
                >
                  Demo visual con información ficticia. La versión
                  definitiva se integrará con Google Sheets y Google
                  Drive.
                </div>
              </article>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardJCP;