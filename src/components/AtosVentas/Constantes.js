export const APP_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyoBYIa9UpjGQxQwN_4v0vcx_O-w1gOEFwP0eY5HQXY8Dqo4gEtvzVKGO5cpl8DpjdV/exec";

export const WHATSAPP_PRUEBA = "5493518001978";

export const STORAGE_KEY = "atos_solicitud_pendiente";

export const PLANES = [
  "15 Megas",
  "20 Megas",
  "Cba 20 megas",
  "FO - Calamuchita - 100 Megas",
  "FO - Calamuchita - 300 Megas",
  "FO - Calamuchita - 300 Megas al precio de 100 M",
  "FO - 100 Megas - CBA - AG",
  "FO - 300 Megas - CBA - AG",
  "FO - 300 Megas al precio de 100 Megas CBA - AG",
  "Plan 20 al precio de 15 mgs",
  "Plan Canje 20",
  "Plan Canje 50 mgs",
  "Plan mantenimiento de servicio",
  "Salida Auxiliar para otros BMU",
];

export const MEDIOS_PAGO = [
  "Débito automático Tarjeta",
  "Débito por Homebanking",
  "Pago Fácil / Rapipago",
  "Botón de pago SIRO",
  "Mercado Pago",
];


export const TECNICOS_INFO = [
  {
    nombre: "Adrian Maidana",
    servicios: ["Inalámbrico", "Fibra óptica"],
    zonas: [
      "Potrero de Garay",
      "Villa Ciudad América",
      "Río Los Espinillos",
      "Anisacate",
      "La Bolsa",
      "Villa General Belgrano",
      "Los Reartes",
      "Capilla Vieja",
    ],
  },
  {
    nombre: "Federico",
    servicios: ["Fibra óptica"],
    zonas: [
      "Río Los Espinillos",
      "Potrero de Garay",
    ],
  },
  {
    nombre: "Maximiliano López",
    servicios: ["Inalámbrico"],
    zonas: [
      "Córdoba",
      "Zonas rurales de Calamuchita: Atos Pampa, Villa Berna, La Cumbrecita, etc.",
    ],
  },
  {
    nombre: "Pablo Ramirez",
    servicios: ["Fibra óptica"],
    zonas: [
      "Villa Amancay",
      "Amboy",
      "San Ignacio",
    ],
  },
  {
    nombre: "Alberto Garcia",
    servicios: ["Inalámbrico"],
    zonas: [
      "Santa Rosa",
      "Villa Amancay",
      "Amboy",
      "San Ignacio",
    ],
  },
  {
    nombre: "Nahuel",
    servicios: ["Inalámbrico", "Fibra óptica"],
    zonas: [
      "Yacanto",
      "El Durazno",
    ],
  },
  {
    nombre: "Ivan Martinez",
    servicios: ["Fibra óptica"],
    zonas: [
      "Córdoba Sur: Angelleli, Rivadavia, Nuestro Hogar 3, Solares del Sur, etc.",
    ],
  },
];

export const TECNICOS = TECNICOS_INFO.map(
  (tecnico) => tecnico.nombre,
);

export const INITIAL_FORM_DATA = {
  nombreApellido: "",
  dni: "",
  email: "",
  telefono: "",

  calle: "",
  numero: "",
  barrio: "",
  observacionesDomicilio: "",

  empresaActual: "",
  planSolicitado: "",
  medioPago: "",
  promocion: "",
  observacionesPlan: "",

  fechaVisita: "",
  tecnicoAsignado: "",
  otroTecnico: "",
  vendedor: "",
};


export const INPUT_CLASS_NAME =
  "min-h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 " +
  "text-base text-black outline-none transition placeholder:text-gray-400 " +
  "focus:border-blue-900 focus:ring-2 focus:ring-blue-100 " +
  "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500";

export const TEXTAREA_CLASS_NAME =
  "w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 " +
  "text-base text-black outline-none transition placeholder:text-gray-400 " +
  "focus:border-blue-900 focus:ring-2 focus:ring-blue-100 " +
  "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500";

