import React, {useEffect, useMemo, useState} from "react"
import {jsPDF} from "jspdf";
import {
  APP_SCRIPT_URL,
  WHATSAPP_PRUEBA,
  STORAGE_KEY,
  PLANES,
  MEDIOS_PAGO,
  TECNICOS,
  INITIAL_FORM_DATA,
  INPUT_CLASS_NAME,
  TEXTAREA_CLASS_NAME,
} from "./Constantes";
//import { Links, Redes } from "./LinksData.js";
import Logo from "../../assets/Image/logo-para-fondo.png";
import Boostup from "../../assets/Image/boostup-negro.png";

const normalizarEspacios = (valor = "") =>
  valor.trim().replace(/\s+/g, " ");

const obtenerFechaLocalISO = () => {
  const hoy = new Date();
  const year = hoy.getFullYear();
  const month = String(hoy.getMonth() + 1).padStart(2, "0");
  const day = String(hoy.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatearFechaArgentina = (fechaISO) => {
  if (!fechaISO) return "";

  const [year, month, day] = fechaISO.split("-");

  if (!year || !month || !day) return fechaISO;

  return `${day}/${month}/${year}`;
};

const formatearFechaArchivo = () => {
  const fecha = new Date();

  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, "0");
  const day = String(fecha.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const limpiarNombreArchivo = (texto = "") =>
  normalizarEspacios(texto)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, "_");

const FieldLabel = ({ htmlFor, children, required = false }) => (
  <label
    htmlFor={htmlFor}
    className="mb-2 block text-sm font-semibold text-blue-900"
  >
    {children}

    {required && (
      <span className="ml-1 text-orange-500" aria-hidden="true">
        *
      </span>
    )}
  </label>
);

const SectionTitle = ({ children }) => (
  <h2 className="mb-5 border-b border-gray-200 pb-2 text-lg font-bold text-blue-900">
    {children}
  </h2>
);

const AtosVentas = () => {

const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const [wasSent, setWasSent] = useState(false);
  const [wasDownloaded, setWasDownloaded] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const [showClearWarning, setShowClearWarning] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successData, setSuccessData] = useState(null);

  const fechaMinima = useMemo(() => obtenerFechaLocalISO(), []);

  /*
   * Recuperar borrador pendiente.
   */
  useEffect(() => {
    try {
      const savedForm = localStorage.getItem(STORAGE_KEY);

      if (!savedForm) return;

      const parsedForm = JSON.parse(savedForm);

      setFormData({
        ...INITIAL_FORM_DATA,
        ...parsedForm,
      });

      setIsDirty(true);
    } catch (error) {
      console.error("No se pudo recuperar el formulario:", error);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  /*
   * Guardar borrador mientras se completa el formulario.
   */
  useEffect(() => {
    if (!isDirty) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error("No se pudo guardar el formulario:", error);
    }
  }, [formData, isDirty]);

  const tecnicoFinal = useMemo(() => {
    if (formData.tecnicoAsignado === "Otro") {
      return normalizarEspacios(formData.otroTecnico);
    }

    return normalizarEspacios(formData.tecnicoAsignado);
  }, [formData.tecnicoAsignado, formData.otroTecnico]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    let sanitizedValue = value;

    if (name === "dni") {
      sanitizedValue = value.replace(/\D/g, "").slice(0, 8);
    }

    if (name === "telefono") {
      sanitizedValue = value
        .replace(/[^0-9+\-() ]/g, "")
        .slice(0, 14);
    }

    if (name === "numero") {
      sanitizedValue = value.slice(0, 10);
    }

    setFormData((currentData) => {
      const nextData = {
        ...currentData,
        [name]: sanitizedValue,
      };

      if (
        name === "tecnicoAsignado" &&
        sanitizedValue !== "Otro"
      ) {
        nextData.otroTecnico = "";
      }

      return nextData;
    });

    /*
     * Si se modifica el formulario después de descargarlo,
     * la versión actual deja de considerarse respaldada.
     */
    setIsDirty(true);
    setWasSent(false);
    setWasDownloaded(false);
    setErrorMessage("");
    setSuccessData(null);
  };

  const validarFormulario = () => {
    const dniValido = /^[0-9]{7,8}$/.test(formData.dni);

    if (!dniValido) {
      return "El DNI debe contener únicamente 7 u 8 números.";
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formData.email.trim()
    );

    if (!emailValido) {
      return "Ingresá una dirección de email válida.";
    }

    const telefonoValido = /^[0-9+\-() ]{7,14}$/.test(
      formData.telefono.trim()
    );

    if (!telefonoValido) {
      return (
        "El teléfono debe tener entre 7 y 14 caracteres y solo puede " +
        "contener números, espacios, paréntesis, guiones y el signo +."
      );
    }

    if (!formData.fechaVisita) {
      return "Seleccioná una fecha tentativa de visita.";
    }

    if (formData.fechaVisita < fechaMinima) {
      return "La fecha tentativa de visita no puede ser anterior a hoy.";
    }

    if (!formData.tecnicoAsignado) {
      return "Seleccioná un técnico asignado.";
    }

    if (
      formData.tecnicoAsignado === "Otro" &&
      !normalizarEspacios(formData.otroTecnico)
    ) {
      return "Ingresá el nombre del técnico.";
    }

    if (!normalizarEspacios(formData.vendedor)) {
      return "Ingresá el nombre del vendedor.";
    }

    return "";
  };

  const prepararPayload = () => ({
    nombreApellido: normalizarEspacios(formData.nombreApellido),
    dni: formData.dni.trim(),
    email: formData.email.trim().toLowerCase(),
    telefono: formData.telefono.trim(),

    calle: normalizarEspacios(formData.calle),
    numero: normalizarEspacios(formData.numero),
    barrio: normalizarEspacios(formData.barrio),
    observacionesDomicilio: normalizarEspacios(
      formData.observacionesDomicilio
    ),

    empresaActual: normalizarEspacios(formData.empresaActual),
    planSolicitado: formData.planSolicitado,
    medioPago: formData.medioPago,
    promocion: normalizarEspacios(formData.promocion),
    observacionesPlan: normalizarEspacios(
      formData.observacionesPlan
    ),

    fechaVisita: formData.fechaVisita,
    tecnico: tecnicoFinal,
    vendedor: normalizarEspacios(formData.vendedor),

    origen: "Formulario React ATOS",
  });

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);

    setWasSent(false);
    setWasDownloaded(false);
    setIsDirty(false);

    setErrorMessage("");
    setShowClearWarning(false);

    localStorage.removeItem(STORAGE_KEY);
  };

  const handleEnviar = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccessData(null);

    const validationError = validarFormulario();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (!navigator.onLine) {
      setErrorMessage(
        "No hay conexión a internet. Podés descargar el PDF para " +
          "conservar una copia de la solicitud."
      );
      return;
    }

    if (
      !APP_SCRIPT_URL ||
      APP_SCRIPT_URL === "PEGAR_AQUI_URL_DEL_WEB_APP"
    ) {
      setErrorMessage(
        "Todavía no se configuró la URL del Web App de Apps Script."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = prepararPayload();

      /*
       * text/plain evita una solicitud OPTIONS previa en muchos casos
       * al comunicarse con Apps Script.
       */
      const response = await fetch(APP_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
        redirect: "follow",
      });

      const responseText = await response.text();

      let result;

      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error(
          "Apps Script devolvió una respuesta que no pudo interpretarse."
        );
      }

      if (!response.ok || result.success !== true) {
        throw new Error(
          result.message ||
            result.error ||
            "No se pudo guardar la solicitud."
        );
      }

      const whatsappUrl =
        result.whatsappUrl ||
        crearWhatsAppUrl(
          payload.nombreApellido,
          result.pdfUrl || ""
        );

      setWasSent(true);
      setIsDirty(false);

      setSuccessData({
        solicitudId: result.solicitudId || result.id || "",
        pdfUrl: result.pdfUrl || "",
        whatsappUrl,
        message:
          result.message ||
          "La solicitud fue registrada correctamente.",
      });

      /*
       * Se limpia el borrador y el formulario después de que Apps Script
       * confirma que el proceso finalizó.
       */
      setFormData(INITIAL_FORM_DATA);
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error al enviar solicitud:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Ocurrió un error inesperado al enviar la solicitud."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const crearWhatsAppUrl = (nombreApellido, pdfUrl) => {
    const mensaje = [
      `Nueva alta a verificar ${nombreApellido}.`,
      pdfUrl ? `Ver PDF: ${pdfUrl}` : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      `https://wa.me/${WHATSAPP_PRUEBA}` +
      `?text=${encodeURIComponent(mensaje)}`
    );
  };

  const agregarTextoConSalto = ({
    pdf,
    texto,
    x,
    y,
    ancho,
    lineHeight = 5,
    fontSize = 10,
    fontStyle = "normal",
  }) => {
    pdf.setFont("helvetica", fontStyle);
    pdf.setFontSize(fontSize);

    const lineas = pdf.splitTextToSize(
      texto || "-",
      ancho
    );

    pdf.text(lineas, x, y);

    return y + lineas.length * lineHeight;
  };

  const agregarCampoPdf = ({
    pdf,
    titulo,
    valor,
    y,
    multiline = false,
  }) => {
    const marginX = 18;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const contentWidth = pageWidth - marginX * 2;

    if (y > 270) {
      pdf.addPage();
      y = 20;
    }

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text(`${titulo}:`, marginX, y);

    if (multiline) {
      return agregarTextoConSalto({
        pdf,
        texto: valor || "-",
        x: marginX,
        y: y + 6,
        ancho: contentWidth,
        lineHeight: 5,
        fontSize: 10,
      }) + 3;
    }

    const titleWidth = pdf.getTextWidth(`${titulo}: `);

    return agregarTextoConSalto({
      pdf,
      texto: valor || "-",
      x: marginX + titleWidth,
      y,
      ancho: contentWidth - titleWidth,
      lineHeight: 5,
      fontSize: 10,
    }) + 3;
  };

  const agregarTituloSeccionPdf = (pdf, titulo, y) => {
    if (y > 265) {
      pdf.addPage();
      y = 20;
    }

    const pageWidth = pdf.internal.pageSize.getWidth();

    pdf.setFillColor(235, 239, 246);
    pdf.rect(15, y - 5, pageWidth - 30, 9, "F");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.text(titulo, 18, y + 1);

    return y + 11;
  };

  const generarPdfLocal = () => {
    const validationError = validarFormulario();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setErrorMessage("");
    setIsGeneratingPdf(true);

    try {
      const data = prepararPayload();

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();

      /*
       * Encabezado.
       * Luego se puede incorporar el logo mediante pdf.addImage().
       */
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(17);
      pdf.text(
        "SOLICITUD DE SERVICIO",
        pageWidth / 2,
        20,
        { align: "center" }
      );

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.text(
        `Fecha de creación: ${new Date().toLocaleString("es-AR")}`,
        pageWidth / 2,
        27,
        { align: "center" }
      );

      pdf.setDrawColor(30, 58, 138);
      pdf.setLineWidth(0.6);
      pdf.line(15, 31, pageWidth - 15, 31);

      let y = 42;

      y = agregarTituloSeccionPdf(
        pdf,
        "DATOS DEL CLIENTE",
        y
      );

      y = agregarCampoPdf({
        pdf,
        titulo: "Nombre y Apellido",
        valor: data.nombreApellido,
        y,
      });

      y = agregarCampoPdf({
        pdf,
        titulo: "DNI",
        valor: data.dni,
        y,
      });

      y += 4;

      y = agregarTituloSeccionPdf(
        pdf,
        "DATOS DE CONTACTO",
        y
      );

      y = agregarCampoPdf({
        pdf,
        titulo: "E-mail",
        valor: data.email,
        y,
      });

      y = agregarCampoPdf({
        pdf,
        titulo: "Teléfono",
        valor: data.telefono,
        y,
      });

      y += 4;

      y = agregarTituloSeccionPdf(pdf, "DOMICILIO", y);

      y = agregarCampoPdf({
        pdf,
        titulo: "Calle",
        valor: data.calle,
        y,
      });

      y = agregarCampoPdf({
        pdf,
        titulo: "Nro.",
        valor: data.numero,
        y,
      });

      y = agregarCampoPdf({
        pdf,
        titulo: "Barrio",
        valor: data.barrio,
        y,
      });

      y = agregarCampoPdf({
        pdf,
        titulo: "Observaciones",
        valor: data.observacionesDomicilio,
        y,
        multiline: true,
      });

      y += 4;

      y = agregarTituloSeccionPdf(
        pdf,
        "SERVICIO DE INTERNET",
        y
      );

      y = agregarCampoPdf({
        pdf,
        titulo: "Empresa actual",
        valor: data.empresaActual,
        y,
      });

      y = agregarCampoPdf({
        pdf,
        titulo: "Plan solicitado",
        valor: data.planSolicitado,
        y,
      });

      y = agregarCampoPdf({
        pdf,
        titulo: "Medio de pago",
        valor: data.medioPago,
        y,
      });

      y = agregarCampoPdf({
        pdf,
        titulo: "Promoción o descuento",
        valor: data.promocion,
        y,
      });

      y = agregarCampoPdf({
        pdf,
        titulo: "Observaciones",
        valor: data.observacionesPlan,
        y,
        multiline: true,
      });

      y += 4;

      y = agregarTituloSeccionPdf(
        pdf,
        "VISITA Y ASIGNACIONES",
        y
      );

      y = agregarCampoPdf({
        pdf,
        titulo: "Fecha tentativa de visita",
        valor: formatearFechaArgentina(data.fechaVisita),
        y,
      });

      y = agregarCampoPdf({
        pdf,
        titulo: "Técnico asignado",
        valor: data.tecnico,
        y,
      });

      agregarCampoPdf({
        pdf,
        titulo: "Vendedor",
        valor: data.vendedor,
        y,
      });

      const nombreArchivo =
        `SOLICITUD_${limpiarNombreArchivo(
          data.nombreApellido
        )}_${data.dni}_${formatearFechaArchivo()}.pdf`;

      pdf.save(nombreArchivo);

      setWasDownloaded(true);
      setIsDirty(true);
    } catch (error) {
      console.error("Error al generar PDF:", error);

      setErrorMessage(
        "No se pudo generar el PDF en el dispositivo."
      );
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleLimpiar = () => {
    if (!isDirty) {
      resetForm();
      return;
    }

    if (wasSent || wasDownloaded) {
      resetForm();
      return;
    }

    setShowClearWarning(true);
  };

  const handleConfirmarLimpieza = () => {
    resetForm();
  };

  return (
    <React.Fragment>
      <div className="min-h-screen w-full overflow-x-hidden bg-gray-50">
        <main className="flex min-h-screen w-full flex-col items-center px-3 py-6">
          <div className="flex w-full max-w-36 items-center justify-center p-3">
            <img
              src={Logo}
              alt="ATOS Internet"
              className="h-auto w-full object-contain"
            />
          </div>

          <h1 className="mb-6 mt-3 text-center text-2xl font-bold text-black">
            ALTA NUEVO CLIENTE
          </h1>

          {successData && (
            <div
              role="status"
              className="mb-5 w-full max-w-md rounded-xl border border-green-300 bg-green-50 p-4 text-left"
            >
              <h2 className="mb-2 font-bold text-green-800">
                Solicitud registrada
              </h2>

              <p className="text-sm text-green-900">
                {successData.message}
              </p>

              {successData.solicitudId && (
                <p className="mt-2 text-sm font-semibold text-green-900">
                  ID: {successData.solicitudId}
                </p>
              )}

              <div className="mt-4 space-y-3">
                {successData.whatsappUrl && (
                  <a
                    href={successData.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-12 w-full items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-center font-bold text-white transition active:scale-[0.99]"
                  >
                    Abrir WhatsApp
                  </a>
                )}

                {successData.pdfUrl && (
                  <a
                    href={successData.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-12 w-full items-center justify-center rounded-lg border-2 border-blue-900 bg-white px-5 py-3 text-center font-bold text-blue-900"
                  >
                    Ver PDF en Drive
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => setSuccessData(null)}
                  className="min-h-11 w-full text-sm font-semibold text-blue-900 underline"
                >
                  Cerrar mensaje
                </button>
              </div>
            </div>
          )}

          <form
            className="w-full max-w-md rounded-2xl border border-gray-200 bg-white px-4 py-6 text-left shadow-sm"
            onSubmit={handleEnviar}
            noValidate
          >
            {errorMessage && (
              <div
                role="alert"
                className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm font-medium text-red-800"
              >
                {errorMessage}
              </div>
            )}

            <p className="mb-7 text-sm text-gray-600">
              Los campos marcados con{" "}
              <span className="font-bold text-orange-500">*</span>{" "}
              son obligatorios.
            </p>

            <section className="mb-8">
              <SectionTitle>Datos del cliente</SectionTitle>

              <div className="space-y-5">
                <div>
                  <FieldLabel
                    htmlFor="nombreApellido"
                    required
                  >
                    Nombre y Apellido
                  </FieldLabel>

                  <input
                    type="text"
                    id="nombreApellido"
                    name="nombreApellido"
                    value={formData.nombreApellido}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                    maxLength={100}
                    disabled={isSubmitting}
                    placeholder="Ingrese nombre y apellido"
                    className={INPUT_CLASS_NAME}
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="dni" required>
                    DNI
                  </FieldLabel>

                  <input
                    type="text"
                    inputMode="numeric"
                    id="dni"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    pattern="[0-9]{7,8}"
                    minLength={7}
                    maxLength={8}
                    required
                    disabled={isSubmitting}
                    placeholder="Ingrese 7 u 8 dígitos"
                    className={INPUT_CLASS_NAME}
                  />
                </div>
              </div>
            </section>

            <section className="mb-8">
              <SectionTitle>Datos de contacto</SectionTitle>

              <div className="space-y-5">
                <div>
                  <FieldLabel htmlFor="email" required>
                    Email
                  </FieldLabel>

                  <input
                    type="email"
                    inputMode="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    maxLength={120}
                    required
                    disabled={isSubmitting}
                    placeholder="correo@ejemplo.com"
                    className={INPUT_CLASS_NAME}
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="telefono" required>
                    Teléfono
                  </FieldLabel>

                  <input
                    type="tel"
                    inputMode="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    autoComplete="tel"
                    minLength={7}
                    maxLength={14}
                    pattern="[0-9+\-() ]{7,14}"
                    required
                    disabled={isSubmitting}
                    placeholder="+54-3511234567"
                    className={INPUT_CLASS_NAME}
                  />
                </div>
              </div>
            </section>

            <section className="mb-8">
              <SectionTitle>Domicilio</SectionTitle>

              <div className="space-y-5">
                <div>
                  <FieldLabel htmlFor="calle" required>
                    Calle
                  </FieldLabel>

                  <input
                    type="text"
                    id="calle"
                    name="calle"
                    value={formData.calle}
                    onChange={handleChange}
                    maxLength={100}
                    required
                    disabled={isSubmitting}
                    placeholder="Nombre de la calle"
                    className={INPUT_CLASS_NAME}
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="numero" required>
                    Nro.
                  </FieldLabel>

                  <input
                    type="text"
                    id="numero"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    maxLength={10}
                    required
                    disabled={isSubmitting}
                    placeholder="Número del domicilio"
                    className={INPUT_CLASS_NAME}
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="barrio" required>
                    Barrio
                  </FieldLabel>

                  <input
                    type="text"
                    id="barrio"
                    name="barrio"
                    value={formData.barrio}
                    onChange={handleChange}
                    maxLength={100}
                    required
                    disabled={isSubmitting}
                    placeholder="Ingrese el barrio"
                    className={INPUT_CLASS_NAME}
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="observacionesDomicilio">
                    Observaciones
                  </FieldLabel>

                  <textarea
                    id="observacionesDomicilio"
                    name="observacionesDomicilio"
                    value={formData.observacionesDomicilio}
                    onChange={handleChange}
                    rows={4}
                    maxLength={500}
                    disabled={isSubmitting}
                    placeholder="Entre calles, referencias, piso, departamento, etc."
                    className={TEXTAREA_CLASS_NAME}
                  />
                </div>
              </div>
            </section>

            <section className="mb-8">
              <SectionTitle>Servicio de Internet</SectionTitle>

              <div className="space-y-5">
                <div>
                  <FieldLabel htmlFor="empresaActual">
                    Empresa actual
                  </FieldLabel>

                  <input
                    type="text"
                    id="empresaActual"
                    name="empresaActual"
                    value={formData.empresaActual}
                    onChange={handleChange}
                    maxLength={100}
                    disabled={isSubmitting}
                    placeholder="Empresa actual, si corresponde"
                    className={INPUT_CLASS_NAME}
                  />
                </div>

                <div>
                  <FieldLabel
                    htmlFor="planSolicitado"
                    required
                  >
                    Plan solicitado
                  </FieldLabel>

                  <select
                    id="planSolicitado"
                    name="planSolicitado"
                    value={formData.planSolicitado}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className={INPUT_CLASS_NAME}
                  >
                    <option value="">
                      Seleccione un plan
                    </option>

                    {PLANES.map((plan) => (
                      <option key={plan} value={plan}>
                        {plan}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <FieldLabel htmlFor="medioPago" required>
                    Medio de pago
                  </FieldLabel>

                  <select
                    id="medioPago"
                    name="medioPago"
                    value={formData.medioPago}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className={INPUT_CLASS_NAME}
                  >
                    <option value="">
                      Seleccione un medio de pago
                    </option>

                    {MEDIOS_PAGO.map((medio) => (
                      <option key={medio} value={medio}>
                        {medio}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <FieldLabel htmlFor="promocion">
                    Promoción o descuento
                  </FieldLabel>

                  <input
                    type="text"
                    id="promocion"
                    name="promocion"
                    value={formData.promocion}
                    onChange={handleChange}
                    maxLength={150}
                    disabled={isSubmitting}
                    placeholder="Promoción aplicada, si corresponde"
                    className={INPUT_CLASS_NAME}
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="observacionesPlan">
                    Observaciones
                  </FieldLabel>

                  <textarea
                    id="observacionesPlan"
                    name="observacionesPlan"
                    value={formData.observacionesPlan}
                    onChange={handleChange}
                    rows={4}
                    maxLength={500}
                    disabled={isSubmitting}
                    placeholder="Detalles adicionales sobre el servicio"
                    className={TEXTAREA_CLASS_NAME}
                  />
                </div>
              </div>
            </section>

            <section className="mb-8">
              <SectionTitle>
                Visita y asignaciones
              </SectionTitle>

              <div className="space-y-5">
                <div>
                  <FieldLabel htmlFor="fechaVisita" required>
                    Fecha tentativa de visita
                  </FieldLabel>

                  <input
                    type="date"
                    id="fechaVisita"
                    name="fechaVisita"
                    value={formData.fechaVisita}
                    onChange={handleChange}
                    min={fechaMinima}
                    required
                    disabled={isSubmitting}
                    className={INPUT_CLASS_NAME}
                  />
                </div>

                <div>
                  <FieldLabel
                    htmlFor="tecnicoAsignado"
                    required
                  >
                    Técnico asignado
                  </FieldLabel>

                  <select
                    id="tecnicoAsignado"
                    name="tecnicoAsignado"
                    value={formData.tecnicoAsignado}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className={INPUT_CLASS_NAME}
                  >
                    <option value="">
                      Seleccione un técnico
                    </option>

                    {TECNICOS.map((tecnico) => (
                      <option key={tecnico} value={tecnico}>
                        {tecnico}
                      </option>
                    ))}

                    <option value="Otro">Otro</option>
                  </select>
                </div>

                {formData.tecnicoAsignado === "Otro" && (
                  <div>
                    <FieldLabel
                      htmlFor="otroTecnico"
                      required
                    >
                      Nombre del técnico
                    </FieldLabel>

                    <input
                      type="text"
                      id="otroTecnico"
                      name="otroTecnico"
                      value={formData.otroTecnico}
                      onChange={handleChange}
                      maxLength={100}
                      required
                      disabled={isSubmitting}
                      placeholder="Ingrese el nombre del técnico"
                      className={INPUT_CLASS_NAME}
                    />
                  </div>
                )}

                <div>
                  <FieldLabel htmlFor="vendedor" required>
                    Vendedor
                  </FieldLabel>

                  <input
                    type="text"
                    id="vendedor"
                    name="vendedor"
                    value={formData.vendedor}
                    onChange={handleChange}
                    maxLength={100}
                    required
                    disabled={isSubmitting}
                    placeholder="Nombre del vendedor"
                    className={INPUT_CLASS_NAME}
                  />
                </div>
              </div>
            </section>

            <div className="space-y-3 border-t border-gray-200 pt-6">
              <button
                type="submit"
                disabled={isSubmitting || isGeneratingPdf}
                className="min-h-12 w-full rounded-lg bg-orange-500 px-6 py-3 text-base font-bold text-white transition active:scale-[0.99] active:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
              >
                {isSubmitting ? "ENVIANDO..." : "ENVIAR"}
              </button>

              <button
                type="button"
                onClick={generarPdfLocal}
                disabled={isSubmitting || isGeneratingPdf}
                className="min-h-12 w-full rounded-lg border-2 border-blue-900 bg-white px-6 py-3 text-base font-bold text-blue-900 transition active:scale-[0.99] active:bg-blue-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
              >
                {isGeneratingPdf
                  ? "GENERANDO PDF..."
                  : "DESCARGAR PDF"}
              </button>

              <button
                type="button"
                onClick={handleLimpiar}
                disabled={isSubmitting || isGeneratingPdf}
                className="min-h-12 w-full rounded-lg border border-gray-400 bg-white px-6 py-3 text-base font-bold text-gray-700 transition active:scale-[0.99] active:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
              >
                LIMPIAR
              </button>
            </div>
          </form>

          <footer className="mt-6 flex flex-col items-center justify-center p-3">
            <h4 className="mb-0 text-sm text-black">
              Diseño y desarrollo:
            </h4>

            <a
              href="https://www.boostup-marketingdigital.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Visitar sitio web de BoostUp"
            >
              <img
                src={Boostup}
                alt="BoostUp Logo"
                className="h-auto w-20 object-contain"
              />
            </a>
          </footer>
        </main>
      </div>

      {showClearWarning && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="clear-warning-title"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2
              id="clear-warning-title"
              className="mb-3 text-lg font-bold text-blue-900"
            >
              Datos no guardados
            </h2>

            <p className="text-sm leading-6 text-gray-700">
              Los datos de esta solicitud todavía no fueron
              enviados ni descargados.
            </p>

            <p className="mt-3 text-sm font-semibold leading-6 text-gray-800">
              Si limpiás el formulario, la información se
              perderá. ¿Deseás continuar?
            </p>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => setShowClearWarning(false)}
                className="min-h-12 w-full rounded-lg bg-blue-900 px-5 py-3 font-bold text-white"
              >
                CANCELAR
              </button>

              <button
                type="button"
                onClick={handleConfirmarLimpieza}
                className="min-h-12 w-full rounded-lg border-2 border-red-600 bg-white px-5 py-3 font-bold text-red-600"
              >
                LIMPIAR DE TODOS MODOS
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AtosVentas;
