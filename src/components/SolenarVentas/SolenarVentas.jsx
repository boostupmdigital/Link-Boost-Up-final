import React, { useEffect, useState } from "react";
import {
  APP_SCRIPT_URL, STORAGE_KEY, REQUEST_ID_KEY, SERVICIOS, MONEDA,
  INITIAL_FORM_DATA, INPUT_CLASS_NAME, TEXTAREA_CLASS_NAME,
} from "./Constantes";
import { descargarPdfSolenar } from "./pdfSolenar";
import Logo from "../../assets/Image/logo-solenar-circular.jpg";
import Boostup from "../../assets/Image/boostup-negro.png";

const hoyLocal = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
};
const crearFormularioVacio = () => ({ ...INITIAL_FORM_DATA, fechaVisita: hoyLocal() });
const texto = (s) => String(s ?? "").trim().replace(/\s+/g," ");
const formatoFechaValido = (s) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [a,m,d] = s.split("-").map(Number);
  const f = new Date(a,m-1,d);
  return f.getFullYear() === a && f.getMonth() === m-1 && f.getDate() === d;
};
const nuevoIdCliente = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2,11)}`;
};

function Campo({ label, name, value, onChange, required = false, disabled = false, textarea = false, options, ...props }) {
  return (
    <div className="w-full min-w-0">
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-blue-900">
        {label}{required && <span className="ml-1 text-orange-500" aria-label="Obligatorio">*</span>}
      </label>
      {textarea ? (
        <textarea id={name} name={name} value={value} onChange={onChange} disabled={disabled}
          className={TEXTAREA_CLASS_NAME} rows={3} {...props} />
      ) : options ? (
        <select id={name} name={name} value={value} onChange={onChange} disabled={disabled}
          required={required} className={INPUT_CLASS_NAME}>
          <option value="">Seleccionar...</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input id={name} name={name} value={value} onChange={onChange} disabled={disabled}
          required={required} className={INPUT_CLASS_NAME} {...props} />
      )}
    </div>
  );
}
const Seccion = ({ children }) => (
  <h2 className="mb-5 border-b border-gray-200 pb-2 text-lg font-bold text-blue-900">{children}</h2>
);

export default function SolenarVentas() {
  const [formData, setFormData] = useState(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      return guardado ? { ...crearFormularioVacio(), ...JSON.parse(guardado) } : crearFormularioVacio();
    } catch { return crearFormularioVacio(); }
  });
  const [isDirty, setIsDirty] = useState(() => {
    try { return Boolean(localStorage.getItem(STORAGE_KEY)); } catch { return false; }
  });
  const [wasDownloaded, setWasDownloaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successData, setSuccessData] = useState(null);
  const [showClearWarning, setShowClearWarning] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState("");

  useEffect(() => {
    if (!isDirty) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); }
    catch (err) { console.warn("No se pudo guardar el borrador local", err); }
  }, [formData, isDirty]);

  useEffect(() => {
    if (errorMessage || successData || downloadMessage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [errorMessage, successData, downloadMessage]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    let limpio = value;
    if (name === "telefono") limpio = value.replace(/[^0-9+()\- ]/g, "").slice(0,14);
    if (name === "numero") limpio = value.slice(0,15);
    if (name === "presupuesto") limpio = value.replace(/[^0-9.,]/g, "").slice(0,20);
    setFormData(anterior => {
      const nuevo = { ...anterior, [name]: limpio };
      if (name === "presupuesto" && limpio.trim() && !anterior.fechaPresupuesto) {
        nuevo.fechaPresupuesto = hoyLocal();
      }
      if (name === "presupuesto" && !limpio.trim()) {
        nuevo.moneda = "";
        nuevo.fechaPresupuesto = "";
      }
      return nuevo;
    });
    // Un contenido modificado ya no coincide con el PDF anterior ni con un intento pendiente.
    try { localStorage.removeItem(REQUEST_ID_KEY); } catch { /* almacenamiento no disponible */ }
    setWasDownloaded(false);
    setIsDirty(true);
    setErrorMessage("");
    setDownloadMessage("");
    setSuccessData(null);
  };

  const prepararPayload = () => {
    const importe = texto(formData.presupuesto).replace(",", ".");
    return {
      fechaVisita: formData.fechaVisita,
      nombreApellido: texto(formData.nombreApellido),
      email: texto(formData.email).toLowerCase(),
      telefono: texto(formData.telefono),
      calle: texto(formData.calle),
      numero: texto(formData.numero),
      barrio: texto(formData.barrio),
      observacionesDomicilio: formData.observacionesDomicilio.trim(),
      urlUbicacion: formData.urlUbicacion.trim(),
      servicio: formData.servicio,
      presupuesto: importe,
      moneda: formData.moneda,
      fechaPresupuesto: formData.fechaPresupuesto,
      observacionesServicio: formData.observacionesServicio.trim(),
      vendedor: texto(formData.vendedor),
      origen: "React Solenar - Leads externos",
    };
  };

  const validarFormulario = () => {
    const p = prepararPayload();
    const obligatorios = [
      [p.fechaVisita,"Fecha de visita"],[p.nombreApellido,"Nombre y Apellido"],
      [p.email,"Email"],[p.telefono,"Teléfono"],
      [p.calle,"Calle"],[p.numero,"Número"],[p.barrio,"Barrio o Localidad"],
      [p.servicio,"Servicio de interés"],[p.vendedor,"Vendedor"],
    ];
    const falta = obligatorios.find(([v]) => !v);
    if (falta) return `El campo «${falta[1]}» es obligatorio.`;
    if (!formatoFechaValido(p.fechaVisita)) return "Ingresá una fecha de visita válida.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) return "Ingresá una dirección de email válida.";
    if (!/^[0-9+()\- ]{7,14}$/.test(p.telefono)) return "El teléfono debe tener entre 7 y 14 caracteres permitidos.";
    if (p.urlUbicacion) {
      try { const u = new URL(p.urlUbicacion); if (!["http:","https:"].includes(u.protocol)) throw Error(); }
      catch { return "La ubicación debe ser un enlace web válido (https://...)."; }
    }
    if (p.presupuesto) {
      if (!/^\d+(?:\.\d{1,2})?$/.test(p.presupuesto) || !Number.isFinite(+p.presupuesto)) {
        return "El importe debe ser numérico, sin separadores de miles y con hasta 2 decimales.";
      }
      if (!p.moneda) return "Seleccioná la moneda del presupuesto.";
      if (!formatoFechaValido(p.fechaPresupuesto)) return "Seleccioná la fecha del presupuesto.";
    } else if (p.moneda || p.fechaPresupuesto) {
      return "Para informar moneda o fecha del presupuesto, ingresá el importe.";
    }
    return "";
  };

  const resetForm = () => {
    setFormData(crearFormularioVacio());
    setIsDirty(false);
    setWasDownloaded(false);
    setErrorMessage("");
    setDownloadMessage("");
    setSuccessData(null);
    setShowClearWarning(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(REQUEST_ID_KEY);
    } catch { /* almacenamiento deshabilitado */ }
  };

  const handleEnviar = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setDownloadMessage("");
    const error = validarFormulario();
    if (error) { setErrorMessage(error); return; }
    if (!navigator.onLine) {
      setErrorMessage("No hay conexión. Descargá el PDF para conservar una copia y enviarlo después.");
      return;
    }
    if (!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(APP_SCRIPT_URL.trim())) {
      setErrorMessage("Falta configurar APP_SCRIPT_URL con la URL /exec de Apps Script.");
      return;
    }
    setIsSubmitting(true);
    try {
      let requestId;
      try { requestId = localStorage.getItem(REQUEST_ID_KEY); } catch { /* sin localStorage */ }
      if (!requestId) {
        requestId = nuevoIdCliente();
        try { localStorage.setItem(REQUEST_ID_KEY, requestId); } catch { /* sin localStorage */ }
      }
      const payload = {...prepararPayload(), clientRequestId: requestId};
      const response = await fetch(APP_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });
      const bruto = await response.text();
      let resultado;
      try { resultado = JSON.parse(bruto); }
      catch { throw new Error("El servidor no devolvió una respuesta JSON válida. Revisá el despliegue."); }
      if (!response.ok || resultado.success !== true) {
        throw new Error(resultado.message || "No se pudo registrar el lead.");
      }
      setSuccessData(resultado);
      setFormData(crearFormularioVacio());
      setIsDirty(false);
      setWasDownloaded(false);
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(REQUEST_ID_KEY);
      } catch { /* sin localStorage */ }
    } catch (err) {
      console.error("Error Solenar:", err);
      setErrorMessage(err.message || "Falló la conexión. Conservamos el formulario para reintentar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDescargarPdf = () => {
    const error = validarFormulario();
    if (error) { setErrorMessage(error); return; }
    setErrorMessage("");
    setDownloadMessage("");
    setIsGeneratingPdf(true);
    try {
      const nombre = descargarPdfSolenar(prepararPayload());
      setWasDownloaded(true);
      setDownloadMessage(`Se preparó «${nombre}». El lead todavía NO fue registrado en Sheets.`);
    } catch (err) {
      console.error("Error al crear el PDF local", err);
      setErrorMessage("No se pudo generar el PDF en este dispositivo.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };
  const handleLimpiar = () => {
    if (isDirty && !wasDownloaded) setShowClearWarning(true);
    else resetForm();
  };

  const ocupado = isSubmitting || isGeneratingPdf;
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-50">
      <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col items-center px-3 py-6">
        <img src={Logo} alt="Logo Solenar" className="h-auto w-36 object-contain" />
        <h1 className="mb-5 mt-3 text-center text-2xl font-bold text-black">REGISTRO DE LEADS</h1>
        {successData && (
          <div role="status" className="mb-5 w-full rounded-xl border border-lime-300 bg-lime-50 p-4 text-left">
            <h2 className="text-lg font-bold text-lime-900">Lead registrado correctamente</h2>
            <p className="mt-1 text-sm text-gray-800">{successData.message}</p>
            <p className="mt-2 text-sm font-semibold text-lime-900">ID: {successData.solicitudId}</p>
            {successData.pdfUrl && <a href={successData.pdfUrl} target="_blank" rel="noreferrer"
              className="mt-3 flex min-h-12 items-center justify-center rounded-lg bg-white px-4 py-3 text-center font-semibold text-blue-900 ring-1 ring-blue-900">Ver PDF en Drive</a>}
            <button type="button" onClick={() => setSuccessData(null)} className="mt-3 text-sm font-semibold text-blue-900 underline">Cerrar aviso</button>
          </div>
        )}
        {downloadMessage && (
          <div role="status" className="mb-5 w-full rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
            {downloadMessage}
          </div>
        )}
        <form onSubmit={handleEnviar} noValidate className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-6 text-left shadow-sm">
          {errorMessage && <div role="alert" className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm font-medium text-red-800">{errorMessage}</div>}
          <p className="mb-7 text-sm text-gray-600">Los campos marcados con <span className="text-orange-500">*</span> son obligatorios.</p>

          <section className="mb-8 space-y-5">
            <Seccion>Visita y lead</Seccion>
            <Campo label="Fecha de visita" name="fechaVisita" type="date" value={formData.fechaVisita} onChange={handleChange} required disabled={ocupado} />
            <Campo label="Nombre y Apellido" name="nombreApellido" type="text" value={formData.nombreApellido} onChange={handleChange} required disabled={ocupado} maxLength={120} autoComplete="name" placeholder="Nombre completo" />
          </section>

          <section className="mb-8 space-y-5">
            <Seccion>Datos de contacto</Seccion>
            <Campo label="Email" name="email" type="email" inputMode="email" value={formData.email} onChange={handleChange} required disabled={ocupado} maxLength={120} autoComplete="email" placeholder="correo@ejemplo.com" />
            <Campo label="Teléfono" name="telefono" type="tel" inputMode="tel" value={formData.telefono} onChange={handleChange} required disabled={ocupado} maxLength={14} autoComplete="tel" placeholder="+54-3511234567" />
          </section>

          <section className="mb-8 space-y-5">
            <Seccion>Domicilio</Seccion>
            <Campo label="Calle" name="calle" type="text" value={formData.calle} onChange={handleChange} required disabled={ocupado} maxLength={120} placeholder="Nombre de la calle" />
            <Campo label="Nro." name="numero" type="text" value={formData.numero} onChange={handleChange} required disabled={ocupado} maxLength={15} placeholder="Número / S/N" />
            <Campo label="Barrio o Localidad" name="barrio" type="text" value={formData.barrio} onChange={handleChange} required disabled={ocupado} maxLength={120} placeholder="Barrio, comuna o localidad" />
            <Campo label="Observaciones de domicilio" name="observacionesDomicilio" value={formData.observacionesDomicilio} onChange={handleChange} textarea disabled={ocupado} maxLength={1500} placeholder="Referencias para encontrar el domicilio" />
            <Campo label="URL de ubicación (Google Maps)" name="urlUbicacion" type="url" inputMode="url" value={formData.urlUbicacion} onChange={handleChange} disabled={ocupado} maxLength={900} placeholder="https://maps.app.goo.gl/..." />
          </section>

          <section className="mb-8 space-y-5">
            <Seccion>Servicio de interés</Seccion>
            <Campo label="Servicio" name="servicio" value={formData.servicio} onChange={handleChange} options={SERVICIOS} required disabled={ocupado} />
            <Campo label="Importe presupuestado (si corresponde)" name="presupuesto" type="text" inputMode="decimal" value={formData.presupuesto} onChange={handleChange} disabled={ocupado} maxLength={20} placeholder="Ej.: 1500000,50 (sin puntos de miles)" />
            {formData.presupuesto.trim() !== "" && (
              <>
                <Campo label="Moneda" name="moneda" value={formData.moneda} onChange={handleChange} options={MONEDA} required disabled={ocupado} />
                <Campo label="Fecha de presupuesto" name="fechaPresupuesto" type="date" value={formData.fechaPresupuesto} onChange={handleChange} required disabled={ocupado} />
              </>
            )}
            <Campo label="Observaciones del servicio" name="observacionesServicio" value={formData.observacionesServicio} onChange={handleChange} textarea disabled={ocupado} maxLength={1500} placeholder="Necesidades, potencia, equipamiento, observaciones comerciales..." />
          </section>

          <section className="mb-8 space-y-5">
            <Seccion>Vendedor</Seccion>
            <Campo label="Nombre del vendedor" name="vendedor" type="text" value={formData.vendedor} onChange={handleChange} required disabled={ocupado} maxLength={120} placeholder="Nombre y apellido" />
          </section>

          <div className="space-y-3 border-t border-gray-200 pt-6">
            <button type="submit" disabled={ocupado} className="min-h-12 w-full rounded-lg bg-orange-500 px-6 py-3 text-base font-bold text-white transition active:bg-orange-600 disabled:opacity-50">
              {isSubmitting ? "ENVIANDO..." : "ENVIAR"}
            </button>
            <button type="button" disabled={ocupado} onClick={handleDescargarPdf} className="min-h-12 w-full rounded-lg border-2 border-blue-900 bg-white px-6 py-3 text-base font-bold text-blue-900 disabled:opacity-50">
              {isGeneratingPdf ? "GENERANDO PDF..." : "DESCARGAR PDF"}
            </button>
            <button type="button" disabled={ocupado} onClick={handleLimpiar} className="min-h-12 w-full rounded-lg border border-gray-400 bg-white px-6 py-3 text-base font-semibold text-gray-700 disabled:opacity-50">LIMPIAR</button>
          </div>
        </form>
        <footer className="mt-6 flex flex-col items-center gap-2 text-sm text-black">
          <span>Diseño y desarrollo:</span>
          <a href="https://www.boostup-marketingdigital.com/" target="_blank" rel="noreferrer"><img src={Boostup} alt="BoostUp" className="h-auto w-20 object-contain" /></a>
        </footer>
      </main>

      {showClearWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" role="dialog" aria-modal="true" aria-labelledby="avisoLimpiar">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 id="avisoLimpiar" className="text-lg font-bold text-blue-900">Los datos todavía no fueron guardados</h2>
            <p className="mt-3 text-sm leading-6 text-gray-700">No se enviaron a Sheets ni se descargó un PDF de la versión actual. Si limpiás, perderás la información.</p>
            <button type="button" onClick={() => setShowClearWarning(false)} className="mt-5 min-h-12 w-full rounded-lg bg-blue-900 font-semibold text-white">CANCELAR</button>
            <button type="button" onClick={resetForm} className="mt-3 min-h-12 w-full rounded-lg border border-red-600 bg-white font-semibold text-red-600">LIMPIAR DE TODOS MODOS</button>
          </div>
        </div>
      )}
    </div>
  );
}
