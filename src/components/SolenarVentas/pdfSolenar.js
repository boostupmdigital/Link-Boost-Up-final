import { jsPDF } from "jspdf";

const nombreArchivoSeguro = (texto) =>
  String(texto || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "").trim().replace(/\s+/g, "_")
    .slice(0, 70);

const fechaArg = (iso) => iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : "-";

/** PDF local: NO es un comprobante de registro en Sheets. */
export function descargarPdfSolenar(datos) {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const izquierda = 18;
  const ancho = 174;
  const abajo = 275;
  let y = 15;

  function nuevaPagina() {
    pdf.addPage();
    y = 18;
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(8);
    pdf.setTextColor(110, 110, 110);
    pdf.text("SOLENAR · Registro local pendiente de envío", izquierda, 10);
  }
  function asegurar(alto) { if (y + alto > abajo) nuevaPagina(); }
  function encabezado() {
    pdf.setFillColor(168, 207, 69);
    pdf.rect(0, 0, 210, 28, "F");
    pdf.setTextColor(30, 62, 34);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(19);
    pdf.text("SOLENAR", izquierda, 12);
    pdf.setFontSize(11);
    pdf.text("NUEVA POSIBILIDAD DE VENTA", izquierda, 21);
    y = 35;
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(8.5);
    pdf.setTextColor(105, 105, 105);
    pdf.text("COPIA LOCAL SIN REGISTRAR EN GOOGLE SHEETS", izquierda, y);
    y += 10;
  }
  function seccion(titulo) {
    asegurar(16);
    pdf.setFillColor(237, 246, 214);
    pdf.rect(izquierda - 2, y - 4, ancho + 4, 9, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10.5);
    pdf.setTextColor(30, 62, 34);
    pdf.text(titulo, izquierda, y + 2);
    y += 13;
  }
  function campo(etiqueta, valor) {
    pdf.setFontSize(9.5);
    pdf.setTextColor(25, 25, 25);
    pdf.setFont("helvetica", "bold");
    const anchoEtiqueta = Math.min(pdf.getTextWidth(etiqueta + ": ") + 2, 63);
    const lineas = pdf.splitTextToSize(String(valor || "-"), ancho - anchoEtiqueta);
    const alto = Math.max(1, lineas.length) * 5 + 3;
    asegurar(alto);
    pdf.setFont("helvetica", "bold");
    pdf.text(etiqueta + ":", izquierda, y);
    pdf.setFont("helvetica", "normal");
    pdf.text(lineas, izquierda + anchoEtiqueta, y);
    y += alto;
  }
  function parrafo(etiqueta, valor) {
    const lineas = pdf.splitTextToSize(String(valor || "-"), ancho);
    asegurar(11);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9.5);
    pdf.setTextColor(30, 30, 30);
    pdf.text(etiqueta + ":", izquierda, y);
    y += 5;
    pdf.setFont("helvetica", "normal");
    for (const linea of lineas) {
      asegurar(6);
      pdf.text(linea, izquierda, y);
      y += 5;
    }
    y += 3;
  }

  encabezado();
  campo("Fecha de visita", fechaArg(datos.fechaVisita));
  seccion("LEAD");
  campo("Nombre y Apellido", datos.nombreApellido);
  seccion("DATOS DE CONTACTO");
  campo("E-mail", datos.email);
  campo("Teléfono", datos.telefono);
  seccion("DOMICILIO");
  campo("Calle", datos.calle);
  campo("Nro.", datos.numero);
  campo("Barrio o Localidad", datos.barrio);
  parrafo("Observaciones", datos.observacionesDomicilio);
  if (datos.urlUbicacion) parrafo("URL de ubicación", datos.urlUbicacion);
  seccion("SERVICIO DE INTERÉS");
  campo("Servicio", datos.servicio);
  campo("Importe presupuestado", datos.presupuesto === "" ? "Sin presupuestar" : Number(datos.presupuesto).toLocaleString("es-AR", {minimumFractionDigits:2, maximumFractionDigits:2}));
  campo("Moneda", datos.presupuesto === "" ? "-" : datos.moneda);
  campo("Fecha de presupuesto", fechaArg(datos.fechaPresupuesto));
  parrafo("Observaciones", datos.observacionesServicio);
  seccion("VENDEDOR");
  campo("Nombre", datos.vendedor);

  const fecha = new Date();
  const stamp = [fecha.getFullYear(), String(fecha.getMonth()+1).padStart(2,"0"), String(fecha.getDate()).padStart(2,"0")].join("-");
  const nombre = `LEAD_SOLENAR_${nombreArchivoSeguro(datos.nombreApellido)}_${stamp}.pdf`;
  pdf.save(nombre);
  return nombre;
}
