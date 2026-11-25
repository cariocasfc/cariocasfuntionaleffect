/* Cariocas F.C. — interacciones */
(function () {
  "use strict";
  var cfg = window.CARIOCAS || {};
  var doc = document.documentElement;
  doc.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- WhatsApp + enlaces configurables ---------- */
  var phone = String(cfg.whatsapp || "").replace(/\D/g, "");
  var waUrl = "https://wa.me/" + phone + "?text=" + encodeURIComponent(cfg.mensaje || "Hola, quiero agendar mi primera clase.");
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = waUrl;
    a.target = "_blank";
    a.rel = "noopener";
    a.addEventListener("click", function () {
      // Evento para analítica (si después se agrega Meta Pixel / GA)
      if (typeof window.fbq === "function") window.fbq("track", "Contact");
      if (typeof window.gtag === "function") window.gtag("event", "whatsapp_click");
    });
  });

  document.querySelectorAll("[data-link]").forEach(function (a) {
    var url = cfg[a.getAttribute("data-link")];
    if (url) a.href = url; else a.remove();
  });
  if (cfg.precioPrimeraClase) document.querySelectorAll("[data-price]").forEach(function (el) { el.textContent = cfg.precioPrimeraClase; });
  if (cfg.ubicacion) document.querySelectorAll("[data-ubicacion]").forEach(function (el) { el.textContent = cfg.ubicacion; });

  /* ---------- Horarios ---------- */
  var sched = document.getElementById("schedule");
  if (sched && Array.isArray(cfg.horarios) && cfg.horarios.length) {
    sched.innerHTML = "";
    cfg.horarios.forEach(function (h) {
      var row = document.createElement("div");
      row.className = "slot";
      [["slot__days", h.dias], ["slot__time", h.hora], ["slot__group", h.grupo]].forEach(function (p) {
        if (!p[1]) return;
        var s = document.createElement("span");
        s.className = p[0];
        s.textContent = p[1];
        row.appendChild(s);
      });
      sched.appendChild(row);
    });
  }

  /* ---------- Nav ---------- */
  var nav = document.getElementById("nav");
  var burger = document.getElementById("burger");
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }
  burger.addEventListener("click", function () { setMenu(!nav.classList.contains("is-open")); });
  document.querySelectorAll("#menu a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- Scroll: nav, botón flotante, línea de pasos ---------- */
  var floatWa = document.getElementById("floatWa");
  var heroCta = document.getElementById("heroCta");
  var horarios = document.getElementById("horarios");
  var steps = document.getElementById("steps");
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 24);

    var heroBottom = heroCta.getBoundingClientRect().bottom;
    var hr = horarios.getBoundingClientRect();
    var ticketVisible = hr.top < window.innerHeight * .6 && hr.bottom > window.innerHeight * .4;
    floatWa.classList.toggle("is-visible", heroBottom < 0 && !ticketVisible);

    if (steps) {
      var r = steps.getBoundingClientRect();
      var p = (window.innerHeight * .75 - r.top) / r.height;
      steps.style.setProperty("--progress", Math.max(0, Math.min(1, p)).toFixed(3));
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- Reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  // escalonar elementos hermanos
  reveals.forEach(function (el) {
    var sibs = Array.prototype.filter.call(el.parentElement.children, function (c) { return c.classList.contains("reveal"); });
    var i = sibs.indexOf(el);
    if (i > 0) el.style.setProperty("--d", Math.min(i * 0.08, 0.5) + "s");
  });
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Contadores ---------- */
  function animateCount(el) {
    var to = parseInt(el.getAttribute("data-to"), 10) || 0;
    if (reduceMotion) { el.textContent = to; return; }
    var start = null, dur = 1600;
    function step(ts) {
      if (!start) start = ts;
      var t = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(to * eased);
      if (t < 1) requestAnimationFrame(step);
    }
    el.textContent = "0";
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll(".count");
  if ("IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  }

  /* ---------- Videos: sonido + pausa fuera de pantalla ---------- */
  document.querySelectorAll("[data-sound]").forEach(function (btn) {
    var v = document.getElementById(btn.getAttribute("data-sound"));
    var label = btn.querySelector("span");
    btn.addEventListener("click", function () {
      var on = v.muted;
      // Silenciar los demás videos
      document.querySelectorAll("video").forEach(function (o) {
        if (o !== v) { o.muted = true; }
      });
      document.querySelectorAll("[data-sound]").forEach(function (b) {
        if (b !== btn) { b.setAttribute("aria-pressed", "false"); b.querySelector("span").textContent = "Activar sonido"; }
      });
      v.muted = !on;
      if (on) { v.play().catch(function () {}); }
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.setAttribute("aria-label", on ? "Silenciar video" : "Activar sonido del video");
      label.textContent = on ? "Silenciar" : "Activar sonido";
    });
  });

  var videos = document.querySelectorAll("video");
  if ("IntersectionObserver" in window) {
    var vo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) {
          if (v.getAttribute("preload") === "none") v.setAttribute("preload", "auto");
          if (!reduceMotion || !v.muted) v.play().catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.25 });
    videos.forEach(function (v) { vo.observe(v); });
  }
  if (reduceMotion) { var hv = document.getElementById("heroVideo"); hv.removeAttribute("autoplay"); hv.pause(); }

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = lb.querySelector("img");
  var items = Array.prototype.slice.call(document.querySelectorAll("#gallery a"));
  var idx = 0, lastFocus = null;
  function show(i) {
    idx = (i + items.length) % items.length;
    lbImg.src = items[idx].href;
    lbImg.alt = items[idx].querySelector("img").alt;
  }
  function openLb(i) { lastFocus = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = "hidden"; lb.querySelector(".lightbox__close").focus(); }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
  items.forEach(function (a, i) { a.addEventListener("click", function (e) { e.preventDefault(); openLb(i); }); });
  lb.querySelector(".lightbox__close").addEventListener("click", closeLb);
  lb.querySelector(".lightbox__prev").addEventListener("click", function () { show(idx - 1); });
  lb.querySelector(".lightbox__next").addEventListener("click", function () { show(idx + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
  var tx = null;
  lb.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    tx = null;
  });

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
