
export const APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyHS7pcJQid9q82iAOrcAtpbweZSWMnFPBu1hrx4rIfPiHbNmnKMUtYBA3IwgI9j6LG/exec";
export const STORAGE_KEY = "solenar_solicitud_pendiente";
export const REQUEST_ID_KEY = "solenar_solicitud_request_id";

export const SERVICIOS = [
  "Fotovoltaico",
  "Fotovoltaico portátil",
  "Bombeo Solar",
  "Termotanque solar",
  "Climatización piscinas",
  "Iluminación solar",
];
export const MONEDA = ["ARS", "USD"];


export const INITIAL_FORM_DATA = {
  fechaVisita: "",
  nombreApellido: "",
  email: "",
  telefono: "",
  calle: "",
  numero: "",
  barrio: "",
  observacionesDomicilio: "",
  urlUbicacion: "",
  servicio: "",
  presupuesto: "",
  moneda: "",
  fechaPresupuesto: "",
  observacionesServicio: "",
  vendedor: "",
};

export const INPUT_CLASS_NAME =
  "min-h-12 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-3 " +
  "text-base text-black outline-none transition placeholder:text-gray-400 " +
  "focus:border-lime-600 focus:ring-2 focus:ring-lime-100 " +
  "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500";

export const TEXTAREA_CLASS_NAME =
  "w-full min-w-0 resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 " +
  "text-base text-black outline-none transition placeholder:text-gray-400 " +
  "focus:border-lime-600 focus:ring-2 focus:ring-lime-100 " +
  "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500";
