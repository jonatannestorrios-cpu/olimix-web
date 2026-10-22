/* =====================================================================
   OLIMIX · ARCHIVO PARA EDITAR
   ---------------------------------------------------------------------
   Este es el ÚNICO archivo que tenés que tocar para cambiar datos,
   precios, productos y promociones. No hace falta saber programar:
   cambiá lo que está entre comillas o los números, y guardá.

   Reglas rápidas:
   - Los precios van SIN puntos ni signo $:  12312  (no "$12.312").
   - Un texto vacío "" significa "no mostrar".
   - precio: null  →  la web muestra "Consultá el precio".
   - Cada producto termina con  },  (llave y coma). No las borres.
   ===================================================================== */

const OLIMIX = {
  // Número de WhatsApp en formato internacional, sin +, espacios ni guiones.
  whatsapp: "5491160031994",
  whatsappVisible: "11 6003-1994",
  instagram: "olimix.tandil",
  ciudad: "Tandil, Buenos Aires",

  // Fecha de la lista de precios cargada abajo.
  listaFecha: "19/10/2026",

  // Compra mínima que figura en tu lista. Poné 0 para no mostrarla.
  compraMinima: 35000,

  // ⚠️ COMPLETAR CUANDO LO DEFINAS. Mientras estén vacíos, la web
  // dice "consultanos por WhatsApp" y no promete nada.
  entregas: "",       // ej: "Entregamos en Tandil de lunes a sábado. Retiro a coordinar."
  mediosDePago: "",   // ej: "Efectivo, transferencia y Mercado Pago."
  horario: "",        // ej: "Respondemos de 9 a 20 h."
};

/* ---------------------------------------------------------------------
   CATEGORÍAS (el orden de acá es el orden de los filtros)
   --------------------------------------------------------------------- */
const CATEGORIAS = [
  { id: "mix",       nombre: "Mix de frutos secos" },
  { id: "secos",     nombre: "Frutos secos y desecados" },
  { id: "cereales",  nombre: "Cereales y granolas" },
  { id: "especias",  nombre: "Especias y condimentos" },
  { id: "sales",     nombre: "Sales saborizadas" },
];

/* ---------------------------------------------------------------------
   PRODUCTOS
   - presentaciones: lista de opciones con su precio.
     · kgMin: 5  → precio por kilo comprando 5 kg o más (el pedido
       cuenta kilos y arranca en 5).
   - foto: nombre del archivo de foto (ej "mix-eco.webp"). Si está
     vacío, la web muestra un ícono de la categoría, NO una foto falsa.
   - nuevo: true  → muestra la etiqueta "Nuevo".
   --------------------------------------------------------------------- */
const P500 = "500 g", P1K = "1 kg", P5K = "5 kg o más", PDOY = "Doypack 100 g";

const PRODUCTOS = [
  // ---------- MIX DE FRUTOS SECOS ----------
  { id: "mix-eco", categoria: "mix", nombre: "Mix Eco con pasas",
    detalle: "Almendra, nuez, maní sin sal y pasas morenas.", foto: "",
    presentaciones: [
      { nombre: P500, precio: 6480 }, { nombre: P1K, precio: 12312 },
      { nombre: P5K, precio: 11664, kgMin: 5 }, { nombre: PDOY, precio: 2216 } ] },

  { id: "mix-energetico", categoria: "mix", nombre: "Mix Energético",
    detalle: "Almendra, nuez, cajú, maní sin sal, pasas rubias, pasas morenas y chips de banana.", foto: "",
    presentaciones: [
      { nombre: P500, precio: 6900 }, { nombre: P1K, precio: 13116 },
      { nombre: P5K, precio: 12420, kgMin: 5 }, { nombre: PDOY, precio: 2361 } ] },

  { id: "mix-energetico-sp", categoria: "mix", nombre: "Mix Energético sin pasas",
    detalle: "Almendra, nuez, cajú, maní sin sal y chips de banana.", foto: "",
    presentaciones: [
      { nombre: P500, precio: 9420 }, { nombre: P1K, precio: 17904 },
      { nombre: P5K, precio: 16956, kgMin: 5 }, { nombre: PDOY, precio: 3223 } ] },

  { id: "mix-especial", categoria: "mix", nombre: "Mix Especial",
    detalle: "Almendra, nuez, cajú, maní sin sal, pasas rubias y pasas morenas.", foto: "",
    presentaciones: [
      { nombre: P500, precio: 7140 }, { nombre: P1K, precio: 13560 },
      { nombre: P5K, precio: 12852, kgMin: 5 }, { nombre: PDOY, precio: 2441 } ] },

  { id: "mix-especial-sp", categoria: "mix", nombre: "Mix Especial sin pasas",
    detalle: "Almendra, nuez, cajú y maní sin sal.", foto: "",
    presentaciones: [
      { nombre: P500, precio: 10200 }, { nombre: P1K, precio: 19380 },
      { nombre: P5K, precio: 18360, kgMin: 5 }, { nombre: PDOY, precio: 3488 } ] },

  { id: "mix-europeo", categoria: "mix", nombre: "Mix Europeo sin maní",
    detalle: "Almendra, nuez, cajú, pasas rubias y morenas.", foto: "",
    presentaciones: [
      { nombre: P500, precio: 9360 }, { nombre: P1K, precio: 17784 },
      { nombre: P5K, precio: 16848, kgMin: 5 }, { nombre: PDOY, precio: 3201 } ] },

  { id: "mix-premium", categoria: "mix", nombre: "Mix Premium",
    detalle: "Almendra, nuez y cajú.", foto: "",
    presentaciones: [
      { nombre: P500, precio: 15120 }, { nombre: P1K, precio: 28728 },
      { nombre: P5K, precio: 27216, kgMin: 5 }, { nombre: PDOY, precio: 5171 } ] },

  { id: "mix-loco-cervecero", categoria: "mix", nombre: "Mix Loco Cervecero", nuevo: true,
    detalle: "Mezcla de Mix Energético sin pasas y Mix Eco con pasas.", foto: "",
    presentaciones: [ { nombre: "Bolsita 100 g", precio: null } ] },

  // ---------- FRUTOS SECOS Y DESECADOS ----------
  { id: "almendra", categoria: "secos", nombre: "Almendra guara", detalle: "", foto: "",
    presentaciones: [
      { nombre: P500, precio: 18240 }, { nombre: P1K, precio: 34656 },
      { nombre: P5K, precio: 32832, kgMin: 5 }, { nombre: PDOY, precio: 6238 } ] },

  { id: "caju", categoria: "secos", nombre: "Castañas de cajú", detalle: "", foto: "",
    presentaciones: [
      { nombre: P500, precio: 14400 }, { nombre: P1K, precio: 27360 },
      { nombre: P5K, precio: 25920, kgMin: 5 }, { nombre: PDOY, precio: 4925 } ] },

  { id: "nuez", categoria: "secos", nombre: "Nuez mariposa extra light", detalle: "", foto: "",
    presentaciones: [
      { nombre: P500, precio: 13200 }, { nombre: P1K, precio: 25080 },
      { nombre: P5K, precio: 23760, kgMin: 5 }, { nombre: PDOY, precio: 4514 } ] },

  { id: "mani", categoria: "secos", nombre: "Maní tostado", detalle: "Sin sal o salado.", foto: "",
    presentaciones: [
      { nombre: P500, precio: 2580 }, { nombre: P1K, precio: 4896 },
      { nombre: P5K, precio: 4644, kgMin: 5 }, { nombre: PDOY, precio: 881 } ] },

  { id: "mani-cervecero", categoria: "secos", nombre: "Maní cervecero", detalle: "Sabores: queso, salame o pizza.", foto: "",
    presentaciones: [
      { nombre: P500, precio: 3900 }, { nombre: P1K, precio: 7416 },
      { nombre: P5K, precio: 7020, kgMin: 5 }, { nombre: PDOY, precio: 1335 } ] },

  { id: "pasas-morena", categoria: "secos", nombre: "Pasas de uva morena", detalle: "", foto: "",
    presentaciones: [
      { nombre: P500, precio: 4080 }, { nombre: P1K, precio: 7752 },
      { nombre: P5K, precio: 7344, kgMin: 5 }, { nombre: PDOY, precio: 1395 } ] },

  { id: "pasas-rubias", categoria: "secos", nombre: "Pasas de uva rubias", detalle: "", foto: "",
    presentaciones: [
      { nombre: P500, precio: 5700 }, { nombre: P1K, precio: 10824 },
      { nombre: P5K, precio: 10260, kgMin: 5 }, { nombre: PDOY, precio: 1948 } ] },

  { id: "banana", categoria: "secos", nombre: "Chips de banana", detalle: "", foto: "",
    presentaciones: [
      { nombre: P500, precio: 9840 }, { nombre: P1K, precio: 18696 },
      { nombre: P5K, precio: 17712, kgMin: 5 }, { nombre: PDOY, precio: 3365 } ] },

  { id: "ciruela", categoria: "secos", nombre: "Ciruela bombón sin carozo", detalle: "", foto: "",
    presentaciones: [
      { nombre: P500, precio: 7920 }, { nombre: P1K, precio: 15048 },
      { nombre: P5K, precio: 14256, kgMin: 5 }, { nombre: PDOY, precio: 2709 } ] },

  { id: "datiles", categoria: "secos", nombre: "Dátiles con carozo", detalle: "", foto: "",
    presentaciones: [
      { nombre: P500, precio: 5040 }, { nombre: P1K, precio: 9576 },
      { nombre: P5K, precio: 9072, kgMin: 5 }, { nombre: PDOY, precio: 1724 } ] },

  // ---------- CEREALES Y GRANOLAS ----------
  { id: "copos-sin", categoria: "cereales", nombre: "Copos de maíz sin azúcar", detalle: "", foto: "",
    presentaciones: [
      { nombre: P500, precio: 2100 }, { nombre: P1K, precio: 3996 },
      { nombre: "Bolsa cerrada 3 kg", precio: 11340 }, { nombre: PDOY, precio: 719 } ] },

  { id: "copos-con", categoria: "cereales", nombre: "Copos de maíz con azúcar", detalle: "", foto: "",
    presentaciones: [
      { nombre: P500, precio: 2340 }, { nombre: P1K, precio: 4440 },
      { nombre: "Bolsa cerrada 4 kg", precio: 16848 }, { nombre: PDOY, precio: 799 } ] },

  { id: "almohaditas", categoria: "cereales", nombre: "Almohaditas rellenas Lasfor", detalle: "Frutilla, limón o avellana.", foto: "",
    presentaciones: [
      { nombre: P500, precio: 6180 }, { nombre: P1K, precio: 11736 },
      { nombre: "Bolsa cerrada 2,5 kg", precio: 25032 }, { nombre: PDOY, precio: 2112 } ] },

  { id: "aritos", categoria: "cereales", nombre: "Aritos frutales Lasfor", detalle: "", foto: "",
    presentaciones: [
      { nombre: P500, precio: 4740 }, { nombre: P1K, precio: 9000 },
      { nombre: "Bolsa cerrada 2 kg", precio: 17064 }, { nombre: PDOY, precio: 1620 } ] },

  { id: "quinoa-pop", categoria: "cereales", nombre: "Quinoa pop", detalle: "", foto: "",
    presentaciones: [
      { nombre: P500, precio: 5160 }, { nombre: P1K, precio: 9804 },
      { nombre: "Bolsa cerrada 2,5 kg", precio: 23220 }, { nombre: PDOY, precio: 1765 } ] },

  { id: "granola", categoria: "cereales", nombre: "Granola mix energético Orann", detalle: "", foto: "",
    presentaciones: [
      { nombre: P500, precio: 7140 }, { nombre: P1K, precio: 13560 }, { nombre: PDOY, precio: 2441 } ] },

  { id: "barritas", categoria: "cereales", nombre: "Barritas energéticas de granola Orann", detalle: "", foto: "",
    presentaciones: [
      { nombre: P500, precio: 9600 }, { nombre: P1K, precio: 18240 }, { nombre: PDOY, precio: 3283 } ] },

  // ---------- ESPECIAS Y CONDIMENTOS ----------
  { id: "oregano", categoria: "especias", nombre: "Orégano", detalle: "", foto: "",
    presentaciones: [ { nombre: P500, precio: 4620 }, { nombre: P1K, precio: 8772 }, { nombre: P5K, precio: 8316, kgMin: 5 }, { nombre: PDOY, precio: 1579 } ] },
  { id: "adobo-pizza", categoria: "especias", nombre: "Adobo para pizza", detalle: "", foto: "",
    presentaciones: [ { nombre: P500, precio: 3780 }, { nombre: P1K, precio: 7176 }, { nombre: P5K, precio: 6804, kgMin: 5 }, { nombre: PDOY, precio: 1292 } ] },
  { id: "aji", categoria: "especias", nombre: "Ají molido", detalle: "", foto: "",
    presentaciones: [ { nombre: P500, precio: 5340 }, { nombre: P1K, precio: 10140 }, { nombre: P5K, precio: 9612, kgMin: 5 }, { nombre: PDOY, precio: 1825 } ] },
  { id: "ajo-polvo", categoria: "especias", nombre: "Ajo en polvo", detalle: "", foto: "",
    presentaciones: [ { nombre: P500, precio: 3540 }, { nombre: P1K, precio: 6720 }, { nombre: P5K, precio: 6372, kgMin: 5 }, { nombre: PDOY, precio: 1210 } ] },
  { id: "ajo-triturado", categoria: "especias", nombre: "Ajo triturado", detalle: "", foto: "",
    presentaciones: [ { nombre: P500, precio: 4500 }, { nombre: P1K, precio: 8556 }, { nombre: P5K, precio: 8100, kgMin: 5 }, { nombre: PDOY, precio: 1540 } ] },
  { id: "chimichurri", categoria: "especias", nombre: "Chimichurri", detalle: "", foto: "",
    presentaciones: [ { nombre: P500, precio: 3900 }, { nombre: P1K, precio: 7404 }, { nombre: P5K, precio: 7020, kgMin: 5 }, { nombre: PDOY, precio: 1333 } ] },
  { id: "curcuma", categoria: "especias", nombre: "Cúrcuma", detalle: "", foto: "",
    presentaciones: [ { nombre: P500, precio: 3720 }, { nombre: P1K, precio: 7068 }, { nombre: P5K, precio: 6696, kgMin: 5 }, { nombre: PDOY, precio: 1272 } ] },
  { id: "pimienta", categoria: "especias", nombre: "Pimienta blanca molida", detalle: "", foto: "",
    presentaciones: [ { nombre: P500, precio: 4200 }, { nombre: P1K, precio: 7980 }, { nombre: P5K, precio: 7560, kgMin: 5 }, { nombre: PDOY, precio: 1436 } ] },
  { id: "pimenton", categoria: "especias", nombre: "Pimentón dulce", detalle: "", foto: "",
    presentaciones: [ { nombre: P500, precio: 4380 }, { nombre: P1K, precio: 8316 }, { nombre: P5K, precio: 7884, kgMin: 5 }, { nombre: PDOY, precio: 1497 } ] },
  { id: "provenzal", categoria: "especias", nombre: "Provenzal", detalle: "", foto: "",
    presentaciones: [ { nombre: P500, precio: 4200 }, { nombre: P1K, precio: 7980 }, { nombre: P5K, precio: 7560, kgMin: 5 }, { nombre: PDOY, precio: 1436 } ] },

  // ---------- SALES SABORIZADAS ----------
  { id: "sal-chimichurri", categoria: "sales", nombre: "Sal saborizada con chimichurri", nuevo: true,
    detalle: "Con ají molido, ajo, perejil, orégano y coriandro.", foto: "",
    presentaciones: [ { nombre: PDOY, precio: null } ] },
];

/* ---------------------------------------------------------------------
   PROMOCIONES Y NOVEDADES
   - Para sacar una promo, borrala completa (desde { hasta },).
   - precio: null → "Consultá el precio".
   - foto: opcional ("doypack.webp" ya está en la web).
   --------------------------------------------------------------------- */
const PROMOS = [
  { titulo: "Kit emprendedor: Mix Energético sin pasas",
    texto: "Caja cerrada con 10 flow pack de 100 g. Almendra, nuez, cajú, maní sin sal y chips de banana. Ideal para revender.",
    precio: 22000, unidad: "la caja x 10", etiqueta: "Para revendedores", foto: "" },
  { titulo: "Kit emprendedor: Mix Energético",
    texto: "Caja cerrada con 10 flow pack de 100 g. Almendra, nuez, cajú, maní sin sal, pasas rubias, pasas morenas y chips de banana.",
    precio: 18000, unidad: "la caja x 10", etiqueta: "Para revendedores", foto: "" },
];

/* ---------------------------------------------------------------------
   PREGUNTAS FRECUENTES
   Editá las respuestas cuando tengas definidas tus políticas.
   --------------------------------------------------------------------- */
const PREGUNTAS = [
  { p: "¿Cómo hago un pedido?",
    r: "Sumá los productos a tu pedido desde el catálogo y tocá “Enviar pedido por WhatsApp”. Te llega un mensaje armado con todo el detalle y lo confirmamos con vos por chat." },
  { p: "¿Qué presentaciones tienen?",
    r: "La mayoría de los productos viene por 500 g, 1 kg, 5 kg o más (precio por kilo) y en doypack de 100 g, una bolsa con cierre zipper y ventana. Los cereales también vienen en bolsa cerrada. Cada producto muestra sus opciones." },
  { p: "¿El precio por kilo tiene descuento?",
    r: "Sí. El precio por 1 kg ya incluye un 5% de descuento respecto del precio por 500 g, y comprando 5 kg o más el kilo sale todavía menos." },
  { p: "¿Hacen envíos?", r: "__ENTREGAS__" },
  { p: "¿Cómo puedo pagar?", r: "__PAGOS__" },
  { p: "¿Venden para revender?",
    r: "Sí, con el Kit emprendedor: cajas cerradas de 10 unidades de 100 g. Lo ves en la sección Promociones." },
  { p: "¿Cómo conservo los frutos secos?",
    r: "Te recomendamos guardarlos bien cerrados, en un lugar fresco y seco, lejos del sol. El doypack tiene cierre zipper para volver a cerrarlo después de cada uso." },
];
