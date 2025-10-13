/* ===== Datos simulados ===== */
const planes = [
  {
    name: "NX Hybrid",
    type: "SUV",
    price: "Desde $650,000",
    img: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1200&auto=format&fit=crop",
    tags: ["Híbrido", "AWD", "ADAS"],
  },
  {
    name: "Terra X",
    type: "Pick-up",
    price: "Desde $590,000",
    img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
    tags: ["4x4", "Carga 1T", "Bloqueo dif."],
  },
  {
    name: "e-Line",
    type: "Eléctrico",
    price: "Desde $720,000",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    tags: ["EV", "Carga rápida", "450 km"],
  },
  {
    name: "Sensa",
    type: "Sedán",
    price: "Desde $420,000",
    img: "https://images.unsplash.com/photo-1494386346843-e12284507169?q=80&w=1200&auto=format&fit=crop",
    tags: ["1.4T", "Apple CarPlay", "6 Airbags"],
  },
  {
    name: "Trail RS",
    type: "SUV",
    price: "Desde $530,000",
    img: "https://images.unsplash.com/photo-1530041686260-1c42085fd395?q=80&w=1200&auto=format&fit=crop",
    tags: ["Off-road", "Modo Terrain", "360°"],
  },
  {
    name: "Urban GT",
    type: "Hatchback",
    price: "Desde $380,000",
    img: "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop",
    tags: ["1.0T", "7" + "'" + " Cluster", "ABS"],
  },
  {
    name: "Tourer XL",
    type: "SUV",
    price: "Desde $560,000",
    img: "https://images.unsplash.com/photo-1511396275271-0a3f66f00ab1?q=80&w=1200&auto=format&fit=crop",
    tags: ["3 filas", "A/C tri-zona", "Isofix"],
  },
  {
    name: "WorkPro",
    type: "Pick-up",
    price: "Desde $450,000",
    img: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200&auto=format&fit=crop",
    tags: ["Trabajo", "Caja larga", "VDC"],
  },
];

/* ===== Carrusel ===== */
const slides = Array.from(document.querySelectorAll(".slide"));
const dotsWrap = document.querySelector(".dots");
let current = 0,
  timer;

function renderDots() {
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.className = "dot" + (i === current ? " active" : "");
    b.setAttribute("aria-label", "Ir al slide " + (i + 1));
    b.addEventListener("click", () => go(i, true));
    dotsWrap.appendChild(b);
  });
}
function go(idx, manual = false) {
  slides[current].classList.remove("active");
  current = (idx + slides.length) % slides.length;
  slides[current].classList.add("active");
  renderDots();
  if (manual) {
    resetTimer();
  }
}
function resetTimer() {
  clearInterval(timer);
  timer = setInterval(() => go(current + 1), 6000);
}
renderDots();
resetTimer();

/* ===== planes ===== */
const grid = document.getElementById("modelsGrid");
function card(model) {
  const el = document.createElement("article");
  el.className = "card";
  el.innerHTML = `
        <div class="card-media"><img src="${model.img}" alt="${model.name} ${
    model.type
  }"></div>
        <div class="card-body">
          <div class="card-meta"><span class="chip">${model.type}</span></div>
          <h3 class="card-title">${model.name}</h3>
          <div class="card-meta">${model.price}</div>
          <div class="card-actions">
            <a class="btn" href="#cotiza">Cotizar</a>
            <a class="btn outline" href="#">Ficha técnica</a>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">
            ${model.tags.map((t) => `<span class="badge">${t}</span>`).join("")}
          </div>
        </div>`;
  return el;
}
planes.forEach((m) => grid.appendChild(card(m)));

/* ===== Formulario prueba de manejo (demo) ===== */
const select = document.querySelector('select[name="model"]');
planes.forEach((m) => {
  const o = document.createElement("option");
  o.value = m.name;
  o.textContent = m.name + " – " + m.type;
  select.appendChild(o);
});
document.getElementById("testDrive").addEventListener("submit", () => {
  const msg = document.getElementById("formMsg");
  msg.textContent =
    "¡Gracias! Un asesor te contactará para confirmar tu prueba de manejo.";
  msg.style.color = "var(--ok)";
  setTimeout(() => {
    msg.textContent = "";
  }, 5000);
});

/* ===== Footer year ===== */
document.getElementById("year").textContent = new Date().getFullYear();

/* ===== Menú móvil simple ===== */
document.getElementById("openNav").addEventListener("click", () => {
  const menu = document.querySelector(".menu");
  const visible = getComputedStyle(menu).display !== "none";
  menu.style.display = visible ? "none" : "flex";
  menu.style.flexDirection = "column";
  menu.style.position = "absolute";
  menu.style.right = "4%";
  menu.style.top = "64px";
  menu.style.background = "color-mix(in oklab, #0b1220 92%, transparent)";
  menu.style.border = "1px solid var(--border)";
  menu.style.padding = "12px";
  menu.style.borderRadius = "12px";
});
