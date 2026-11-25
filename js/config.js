/*
 * ===============================================================
 *  CONFIGURACIÓN DEL SITIO — Cariocas F.C.
 *  Edita SOLO este archivo para cambiar teléfono, redes y horarios.
 * ===============================================================
 */
window.CARIOCAS = {
  // Número de WhatsApp con código de país, sin espacios ni signos.
  // México: 52 + 10 dígitos. Ejemplo: "524421234567"
  // ⚠️ PENDIENTE: reemplazar con el número real.
  whatsapp: "520000000000",

  // Mensaje que aparece escrito al abrir WhatsApp.
  mensaje: "¡Hola! Vi la página de Cariocas F.C. y quiero agendar mi primera clase de $100 ⚽",

  // Precio de la primera clase (solo el número).
  precioPrimeraClase: 100,

  // Enlaces (deja "" para ocultar el botón correspondiente).
  googleReseñas: "",   // enlace a la ficha de Google con reseñas
  googleMaps: "",      // enlace a la ubicación en Google Maps
  instagram: "",
  facebook: "",
  tiktok: "",

  // Lugar de entrenamiento (texto visible).
  ubicacion: "El Pueblito, Corregidora, Querétaro",

  // Horarios. Si la lista está vacía, se muestra "consulta horarios por WhatsApp".
  // Ejemplo de cada renglón:
  // { dias: "Lunes y miércoles", hora: "7:00 – 8:30 pm", grupo: "Fútbol + funcional" },
  horarios: []
};
