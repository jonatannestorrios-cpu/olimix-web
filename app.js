/* ==========================================================
   OLIMIX · funcionamiento de la web
   (Para cambiar productos y precios usá productos.js)
   ========================================================== */
(function () {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const plata = (n) => "$" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const sinTildes = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const waLink = (texto) => "https://wa.me/" + OLIMIX.whatsapp + "?text=" + encodeURIComponent(texto);
  // Abre WhatsApp en una pestaña nueva (funciona también desde Instagram)
  const abrirWa = (texto) => {
    const a = document.createElement("a");
    a.href = waLink(texto); a.target = "_blank"; a.rel = "noopener";
    document.body.appendChild(a); a.click(); a.remove();
  };
  const igLink = "https://www.instagram.com/" + OLIMIX.instagram + "/";
  const leer = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
  const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento: sigue funcionando */ } };

  /* ---------- Íconos de categoría (se usan cuando no hay foto) ---------- */
  const ICONOS = {
    mix: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M17 6c6 4 9 12 9 17 0 5-4 8-9 8s-9-3-9-8c0-5 3-13 9-17Z" fill="currentColor"/><path d="M33 16c5 3 8 9 8 13 0 5-4 8-8 8s-8-3-8-8c0-4 3-10 8-13Z" fill="currentColor" opacity=".55"/><ellipse cx="22" cy="38" rx="9" ry="6" fill="currentColor" opacity=".8"/></svg>',
    secos: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4c9 6 15 19 15 26 0 8-7 14-15 14S9 38 9 30C9 23 15 10 24 4Z" fill="currentColor"/><path d="M24 13c3 6 4 13 2 22" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".55"/></svg>',
    cereales: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 24h36c0 10-8 18-18 18S6 34 6 24Z" fill="currentColor"/><circle cx="15" cy="19" r="4" fill="currentColor" opacity=".6"/><circle cx="24" cy="16" r="4.5" fill="currentColor" opacity=".8"/><circle cx="33" cy="19" r="4" fill="currentColor" opacity=".6"/></svg>',
    especias: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 38C10 20 22 8 40 8c0 18-12 30-30 30Z" fill="currentColor"/><path d="M10 38 30 18" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".6"/></svg>',
    sales: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M16 16h16l3 26H13l3-26Z" fill="currentColor"/><path d="M17 16c0-6 3-10 7-10s7 4 7 10" fill="currentColor" opacity=".55"/><circle cx="21" cy="11" r="1.4" fill="#fff"/><circle cx="27" cy="11" r="1.4" fill="#fff"/><circle cx="24" cy="8" r="1.4" fill="#fff"/></svg>',
  };

  /* ---------- Datos fijos de contacto en la página ---------- */
  $$("[data-wa]").forEach((a) => { a.href = waLink(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-ig]").forEach((a) => { a.href = igLink; });
  $$("[data-tel]").forEach((e) => { e.textContent = OLIMIX.whatsappVisible; });
  $$("[data-ig-user]").forEach((e) => { e.textContent = "@" + OLIMIX.instagram; });
  $$("[data-ciudad]").forEach((e) => { e.textContent = OLIMIX.ciudad; });
  $$("[data-fecha-lista]").forEach((e) => { e.textContent = "Precios en pesos de la lista del " + OLIMIX.listaFecha + "."; });
  $$("[data-pie-precios]").forEach((e) => { e.textContent = "Precios en pesos según la lista del " + OLIMIX.listaFecha + ", sujetos a modificación sin previo aviso."; });
  $("#anio").textContent = new Date().getFullYear();

  const consultaGeneral = "Consultanos por WhatsApp y te contamos las opciones.";
  const extra = [];
  if (OLIMIX.entregas) extra.push("<p><strong>Entregas:</strong> " + esc(OLIMIX.entregas) + "</p>");
  if (OLIMIX.mediosDePago) extra.push("<p><strong>Medios de pago:</strong> " + esc(OLIMIX.mediosDePago) + "</p>");
  if (OLIMIX.horario) extra.push("<p><strong>Horario:</strong> " + esc(OLIMIX.horario) + "</p>");
  if (!OLIMIX.entregas || !OLIMIX.mediosDePago) extra.push("<p>¿Entregas o formas de pago? " + consultaGeneral + "</p>");
  $("#info-extra").innerHTML = extra.join("");

  /* ---------- Preguntas frecuentes ---------- */
  $("#faq").innerHTML = PREGUNTAS.map((q) => {
    let r = q.r;
    if (r === "__ENTREGAS__") r = OLIMIX.entregas || consultaGeneral;
    if (r === "__PAGOS__") r = OLIMIX.mediosDePago || consultaGeneral;
    return "<details><summary>" + esc(q.p) + "</summary><p>" + esc(r) + "</p></details>";
  }).join("");

  /* ---------- Promociones ---------- */
  $("#promos-lista").innerHTML = PROMOS.map((p) => {
    const precio = p.precio == null
      ? '<span class="promo__precio precio--consultar">Consultá el precio</span>'
      : '<span class="promo__precio">' + plata(p.precio) + (p.unidad ? "<small>" + esc(p.unidad) + "</small>" : "") + "</span>";
    const msg = "Hola Olimix! Me interesa: " + p.titulo + (p.precio != null ? " (" + plata(p.precio) + (p.unidad ? " " + p.unidad : "") + ")" : "") + ".";
    return '<article class="promo">' +
      (p.etiqueta ? '<span class="etq">' + esc(p.etiqueta) + "</span>" : "") +
      (p.foto ? '<img src="' + esc(p.foto) + '" alt="' + esc(p.titulo) + '" loading="lazy">' : "") +
      "<h3>" + esc(p.titulo) + "</h3><p>" + esc(p.texto) + "</p>" +
      '<div class="promo__base">' + precio +
      '<a class="btn btn--accion btn--chico" target="_blank" rel="noopener" href="' + esc(waLink(msg)) + '">Pedir</a></div></article>';
  }).join("");

  /* ---------- Catálogo ---------- */
  const PREF_DOY = "Doypack 100 g";
  const estado = { cat: "todos", texto: "", preferida: null };
  const sel = {}; // presentación elegida por producto

  const catsConProductos = CATEGORIAS.filter((c) => PRODUCTOS.some((p) => p.categoria === c.id));
  $("#chips").innerHTML = '<button type="button" class="chip" data-cat="todos" aria-pressed="true">Todos</button>' +
    catsConProductos.map((c) => '<button type="button" class="chip" data-cat="' + esc(c.id) + '" aria-pressed="false">' + esc(c.nombre) + "</button>").join("");

  function precioHTML(pr) {
    if (pr.precio == null) return '<p class="precio precio--consultar">Consultá el precio</p>';
    const nota = pr.kgMin ? "por kg · mínimo " + pr.kgMin + " kg" : pr.nombre;
    return '<p class="precio">' + plata(pr.precio) + "<small>" + esc(nota) + "</small></p>";
  }

  function indiceInicial(p) {
    if (sel[p.id] != null) return sel[p.id];
    if (estado.preferida) {
      const i = p.presentaciones.findIndex((x) => x.nombre === estado.preferida);
      if (i >= 0) return i;
    }
    return 0;
  }

  function tarjeta(p) {
    const iSel = indiceInicial(p);
    const pr = p.presentaciones[iSel];
    const img = p.foto
      ? '<img src="' + esc(p.foto) + '" alt="' + esc(p.nombre) + '" loading="lazy">'
      : ICONOS[p.categoria] || ICONOS.secos;
    const opciones = p.presentaciones.length > 1
      ? '<fieldset class="pres"><legend>Presentación de ' + esc(p.nombre) + "</legend>" +
        p.presentaciones.map((x, i) =>
          '<label><input type="radio" name="pres-' + esc(p.id) + '" value="' + i + '"' + (i === iSel ? " checked" : "") + "><span>" + esc(x.nombre) + "</span></label>"
        ).join("") + "</fieldset>"
      : '<p class="nota">' + esc(pr.nombre) + "</p>";
    return '<article class="prod" data-id="' + esc(p.id) + '">' +
      '<div class="prod__top"><div class="prod__img" data-cat="' + esc(p.categoria) + '"' + (p.foto ? "" : ' role="img" aria-label="Ícono de ' + esc(nombreCat(p.categoria)) + '"') + ">" + img + "</div>" +
      "<div><h3>" + esc(p.nombre) + (p.nuevo ? '<span class="etq">Nuevo</span>' : "") + "</h3>" +
      (p.detalle ? '<p class="prod__det">' + esc(p.detalle) + "</p>" : "") + "</div></div>" +
      opciones +
      '<div class="prod__base"><div data-precio>' + precioHTML(pr) + "</div>" +
      '<div class="prod__acc">' +
      '<a class="btn-consultar" data-consultar target="_blank" rel="noopener" href="' + esc(waLink(msgConsulta(p, pr))) + '" aria-label="Consultar ' + esc(p.nombre) + ' por WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-wa"/></svg></a>' +
      '<button type="button" class="btn btn--accion btn-agregar" data-agregar>Agregar</button>' +
      "</div></div></article>";
  }

  const nombreCat = (id) => (CATEGORIAS.find((c) => c.id === id) || {}).nombre || id;
  const msgConsulta = (p, pr) => "Hola Olimix! Quiero consultar por: " + p.nombre + " (" + pr.nombre + ").";

  function render() {
    const q = sinTildes(estado.texto.trim());
    const visibles = PRODUCTOS.filter((p) =>
      (estado.cat === "todos" || p.categoria === estado.cat) &&
      (!q || sinTildes(p.nombre + " " + (p.detalle || "") + " " + nombreCat(p.categoria)).includes(q))
    );
    let html = "";
    catsConProductos.forEach((c) => {
      const lista = visibles.filter((p) => p.categoria === c.id);
      if (!lista.length) return;
      html += '<section class="grupo" aria-label="' + esc(c.nombre) + '"><h3 class="grupo__titulo">' + esc(c.nombre) + '</h3><div class="grilla">' + lista.map(tarjeta).join("") + "</div></section>";
    });
    $("#listado").innerHTML = html;
    $("#vacio").hidden = visibles.length > 0;
  }

  $("#chips").addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    estado.cat = b.dataset.cat;
    $$(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === b)));
    render();
  });
  $("#buscar").addEventListener("input", (e) => { estado.texto = e.target.value; render(); });

  $("[data-filtrar-doypack]").addEventListener("click", () => {
    estado.preferida = PREF_DOY;
    Object.keys(sel).forEach((k) => delete sel[k]);
    render();
    aviso("Mostrando precios en doypack de 100 g");
  });

  $("#listado").addEventListener("change", (e) => {
    if (e.target.type !== "radio") return;
    const card = e.target.closest(".prod");
    const p = PRODUCTOS.find((x) => x.id === card.dataset.id);
    const i = Number(e.target.value);
    sel[p.id] = i;
    $("[data-precio]", card).innerHTML = precioHTML(p.presentaciones[i]);
    $("[data-consultar]", card).href = waLink(msgConsulta(p, p.presentaciones[i]));
  });

  $("#listado").addEventListener("click", (e) => {
    const b = e.target.closest("[data-agregar]");
    if (!b) return;
    const card = b.closest(".prod");
    const p = PRODUCTOS.find((x) => x.id === card.dataset.id);
    const i = sel[p.id] != null ? sel[p.id] : indiceInicial(p);
    agregar(p.id, p.presentaciones[i].nombre);
    b.textContent = "¡Sumado!";
    b.classList.add("ok");
    setTimeout(() => { b.textContent = "Agregar"; b.classList.remove("ok"); }, 1300);
  });

  /* ---------- Pedido ---------- */
  let pedido = leer("olimix-pedido", []).filter((it) => buscarPres(it.id, it.pres));

  function buscarPres(id, nombrePres) {
    const p = PRODUCTOS.find((x) => x.id === id);
    if (!p) return null;
    const pr = p.presentaciones.find((x) => x.nombre === nombrePres);
    return pr ? { p, pr } : null;
  }

  function agregar(id, pres) {
    const { pr } = buscarPres(id, pres);
    const paso = 1;
    const it = pedido.find((x) => x.id === id && x.pres === pres);
    if (it) it.cant += paso;
    else pedido.push({ id, pres, cant: pr.kgMin || 1 });
    actualizar();
    aviso("Sumado a tu pedido");
  }

  function totales() {
    let total = 0, aConfirmar = 0, unidades = 0;
    pedido.forEach((it) => {
      const { pr } = buscarPres(it.id, it.pres);
      unidades += 1;
      if (pr.precio == null) aConfirmar++;
      else total += pr.precio * it.cant;
    });
    return { total, aConfirmar, unidades };
  }

  function etiquetaCant(it, pr) { return pr.kgMin ? it.cant + " kg" : String(it.cant); }

  function actualizar() {
    guardar("olimix-pedido", pedido);
    const { total, aConfirmar, unidades } = totales();
    const hay = pedido.length > 0;
    document.body.classList.toggle("con-pedido", hay);
    $("#barra-pedido").hidden = !hay;
    $$("[data-contador]").forEach((c) => { c.hidden = !hay; c.textContent = unidades; });
    $$("[data-contador-texto]").forEach((c) => { c.textContent = unidades + (unidades === 1 ? " producto" : " productos"); });
    $$("[data-total]").forEach((t) => { t.textContent = plata(total); });

    $("#pedido-lista").innerHTML = pedido.map((it, n) => {
      const { p, pr } = buscarPres(it.id, it.pres);
      const sub = pr.precio == null ? "A confirmar" : plata(pr.precio * it.cant);
      const unit = pr.precio == null ? "" : " · " + plata(pr.precio) + (pr.kgMin ? " x kg" : " c/u");
      return '<li class="item"><div><p class="item__nom">' + esc(p.nombre) + '</p><p class="item__pres">' + esc(pr.nombre) + esc(unit) + "</p>" +
        '<div class="cant"><button type="button" data-menos="' + n + '" aria-label="Restar uno">−</button><output aria-live="polite">' + esc(etiquetaCant(it, pr)) +
        '</output><button type="button" data-mas="' + n + '" aria-label="Sumar uno">+</button></div></div>' +
        '<div style="display:grid"><span class="item__sub">' + sub + '</span><button type="button" class="item__quitar" data-quitar="' + n + '">Quitar</button></div></li>';
    }).join("");
    $("#pedido-vacio").hidden = hay;
    $("#pedido-pie").hidden = !hay;

    const min = Number(OLIMIX.compraMinima) || 0;
    const notas = [];
    if (aConfirmar) notas.push("Más " + aConfirmar + (aConfirmar === 1 ? " producto" : " productos") + " con precio a confirmar.");
    if (min && total < min) notas.push("Compra mínima: " + plata(min) + ". Te faltan " + plata(min - total) + ".");
    else if (min) notas.push("Compra mínima de " + plata(min) + " alcanzada.");
    $("#pedido-minimo").textContent = notas.join(" ");
  }

  $("#pedido-lista").addEventListener("click", (e) => {
    const t = e.target.closest("button");
    if (!t) return;
    if (t.dataset.mas != null) pedido[t.dataset.mas].cant++;
    if (t.dataset.menos != null) {
      const it = pedido[t.dataset.menos];
      const { pr } = buscarPres(it.id, it.pres);
      const piso = pr.kgMin || 1;
      if (it.cant > piso) it.cant--;
      else pedido.splice(t.dataset.menos, 1);
    }
    if (t.dataset.quitar != null) pedido.splice(t.dataset.quitar, 1);
    actualizar();
  });

  let tVaciar;
  $("#vaciar-pedido").addEventListener("click", (e) => {
    const b = e.currentTarget;
    if (!b.dataset.seguro) {
      b.dataset.seguro = "1"; b.textContent = "Tocá de nuevo para vaciar el pedido";
      clearTimeout(tVaciar);
      tVaciar = setTimeout(() => { delete b.dataset.seguro; b.textContent = "Vaciar pedido"; }, 3000);
      return;
    }
    delete b.dataset.seguro; b.textContent = "Vaciar pedido";
    pedido = [];
    actualizar();
  });

  $("#enviar-pedido").addEventListener("click", () => {
    if (!pedido.length) return;
    const { total, aConfirmar } = totales();
    const lineas = pedido.map((it) => {
      const { p, pr } = buscarPres(it.id, it.pres);
      if (pr.kgMin) return "• " + it.cant + " kg de " + p.nombre + " (" + plata(pr.precio) + " x kg) = " + plata(pr.precio * it.cant);
      const sub = pr.precio == null ? "precio a confirmar" : plata(pr.precio * it.cant);
      return "• " + it.cant + " x " + p.nombre + " (" + pr.nombre + ") = " + sub;
    });
    const nombre = $("#pedido-nombre").value.trim();
    const nota = $("#pedido-nota").value.trim();
    const texto = "¡Hola Olimix! Quiero hacer este pedido:\n\n" + lineas.join("\n") +
      "\n\nTotal estimado: " + plata(total) + (aConfirmar ? " + productos a confirmar" : "") +
      (nombre ? "\nNombre: " + nombre : "") + (nota ? "\nComentario: " + nota : "") +
      "\n\n(Pedido armado desde la web)";
    abrirWa(texto);
  });

  const panel = $("#panel-pedido");
  function abrirPanel() {
    actualizar();
    if (typeof panel.showModal === "function") panel.showModal(); else panel.setAttribute("open", "");
  }
  function cerrarPanel() { if (typeof panel.close === "function") panel.close(); else panel.removeAttribute("open"); }
  $$("[data-abrir-pedido]").forEach((b) => b.addEventListener("click", abrirPanel));
  panel.addEventListener("click", (e) => {
    if (e.target === panel || e.target.closest("[data-cerrar-pedido]")) cerrarPanel();
  });

  /* ---------- Formulario de contacto → WhatsApp ---------- */
  $("#form-contacto").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const nombre = f.nombre.value.trim();
    const mensaje = f.mensaje.value.trim();
    const err = $("#form-error");
    if (!nombre || !mensaje) {
      err.textContent = !nombre ? "Escribí tu nombre para poder enviarlo." : "Escribí tu mensaje para poder enviarlo.";
      err.hidden = false;
      (!nombre ? f.nombre : f.mensaje).focus();
      return;
    }
    err.hidden = true;
    abrirWa("¡Hola Olimix! Soy " + nombre + ".\n" + mensaje);
  });

  /* ---------- Compartir ---------- */
  $("#compartir").addEventListener("click", async () => {
    const url = location.href.split("#")[0].split("?")[0];
    const datos = { title: "Olimix · Secos de las sierras", text: "Frutos secos, mix y especias en Tandil. Mirá precios y pedí por WhatsApp:", url };
    if (navigator.share) { try { await navigator.share(datos); } catch (e) { /* cancelado */ } return; }
    try { await navigator.clipboard.writeText(url); aviso("Enlace copiado"); }
    catch (e) { window.open("https://wa.me/?text=" + encodeURIComponent(datos.text + " " + url), "_blank", "noopener"); }
  });

  /* ---------- Bienvenida para visitas de Instagram ---------- */
  (function () {
    const params = new URLSearchParams(location.search);
    const desdeIG = /instagram/i.test(params.get("desde") || "") || /instagram/i.test(params.get("utm_source") || "") || /instagram/i.test(document.referrer) || /Instagram/.test(navigator.userAgent);
    let cerrada = false;
    try { cerrada = sessionStorage.getItem("olimix-bienvenida") === "1"; } catch (e) { /* nada */ }
    if (!desdeIG || cerrada) return;
    const b = $("#bienvenida");
    b.hidden = false;
    $(".bienvenida__cerrar", b).addEventListener("click", () => {
      b.hidden = true;
      try { sessionStorage.setItem("olimix-bienvenida", "1"); } catch (e) { /* nada */ }
    });
  })();

  /* ---------- Aviso breve ---------- */
  let tAviso;
  function aviso(t) {
    const a = $("#aviso");
    a.textContent = t;
    a.classList.add("ver");
    clearTimeout(tAviso);
    tAviso = setTimeout(() => a.classList.remove("ver"), 1800);
  }

  render();
  actualizar();
})();
