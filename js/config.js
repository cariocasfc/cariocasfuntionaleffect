/*
 * ===============================================================
 *  CONFIGURACIÓN DEL SITIO — Cariocas F.C.
 *  Edita SOLO este archivo para cambiar teléfono, redes y horarios.
 * ===============================================================
 */
window.CARIOCAS = {
  // Número de WhatsApp con código de país, sin espacios ni signos.
  // México: 52 + 10 dígitos. Ejemplo: "524421234567"
  whatsapp: "524423647898",

  // Mensaje que aparece escrito al abrir WhatsApp.
  mensaje: "¡Hola! Vi la página de Cariocas F.C. y quiero agendar mi primera clase de $100 ⚽",

  // Precio de la primera clase (solo el número).
  precioPrimeraClase: 100,

  // Enlaces (deja "" para ocultar el botón correspondiente).
  googleReseñas: "https://maps.app.goo.gl/wC4tnLz3YD7CKUm38",   // enlace a la ficha de Google con reseñas
  googleMaps: "https://maps.app.goo.gl/wC4tnLz3YD7CKUm38",      // enlace a la ubicación en Google Maps
  instagram: "https://www.instagram.com/cariocas_funeffect",
  facebook: "https://www.facebook.com/share/1KBtk2eDMY/",
  tiktok: "https://www.tiktok.com/@cariocas_fe",

  // Lugar de entrenamiento (texto visible).
  ubicacion: "Rivera del Río, Col. Camino al Cerrito 37, El Pueblito, 76900, Querétaro, Qro.",

  // Horarios. Si la lista está vacía, se muestra "consulta horarios por WhatsApp".
  // Ejemplo de cada renglón:
  // { dias: "Lunes y miércoles", hora: "7:00 – 8:30 pm", grupo: "Fútbol + funcional" },
  horarios: [
    { dias: "Lunes, miércoles y viernes", hora: "6:30 – 8:00 am", grupo: "Turno matutino" },
    { dias: "Martes y jueves", hora: "8:30 – 9:45 pm", grupo: "Turno nocturno" }
  ]
};
