// =========================================================
//  Leandro Garro — Portfolio JS
//  Vanilla JavaScript.
//  Lo fui armando a medida que necesitaba cosas.
// =========================================================

import { projects, sectors, CENTER, typewriterPhrases } from './data.js';

// ---------------------------------------------------------
//  Cosas útiles que fui copiando de stackoverflow
// ---------------------------------------------------------

// Scroll suave a una sección — funciona con cualquier selector
function smoothScrollTo(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Configurar todos los links con data-scroll (los del header y footer)
function setupSmoothScroll() {
  // Links del header/footer con href="#..."
  document.querySelectorAll('[data-scroll]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        smoothScrollTo(href);
        // Cerrar menú móvil si está abierto — esto me lo pidió mi hermana jaja
        closeMobileMenu();
      }
    });
  });

  // Botones con data-scroll-to
  document.querySelectorAll('[data-scroll-to]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-scroll-to');
      smoothScrollTo(target);
    });
  });
}

// ---------------------------------------------------------
//  Header: sombra al hacer scroll + menú móvil
//  Esto lo hice con ayuda de un tutorial de YouTube
// ---------------------------------------------------------
function setupHeader() {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');

  function onScroll() {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function closeMobileMenu() {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Exponer para usar desde setupSmoothScroll — esto esta medio medio pero funciona
  window.__closeMobileMenu = closeMobileMenu;
}

function closeMobileMenu() {
  if (window.__closeMobileMenu) window.__closeMobileMenu();
}

// ---------------------------------------------------------
//  Typewriter: el efecto que escribe solito
//  Me encanta cómo queda, aunque tuve que ajustar los tiempos
// ---------------------------------------------------------
function setupTypewriter() {
  const el = document.getElementById('typed');
  if (!el) {
    console.warn('No encontré el elemento #typed — ojo con el HTML');
    return;
  }

  const phrases = typewriterPhrases;
  let phraseIndex = 0;
  let text = '';
  let isDeleting = false;

  // Estos valores los fui probando hasta que quedaron bien
  const TYPE_SPEED = 75;
  const DELETE_SPEED = 40;
  const PAUSE_END = 1800;
  const PAUSE_START = 500;

  function tick() {
    const current = phrases[phraseIndex] || '';

    if (!isDeleting && text === current) {
      // Terminó de escribir -> pausa -> borrar
      setTimeout(() => { isDeleting = true; tick(); }, PAUSE_END);
      return;
    }

    if (isDeleting && text === '') {
      // Terminó de borrar -> siguiente frase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(tick, PAUSE_START);
      return;
    }

    if (isDeleting) {
      text = current.slice(0, text.length - 1);
    } else {
      text = current.slice(0, text.length + 1);
    }
    el.textContent = text;
    setTimeout(tick, isDeleting ? DELETE_SPEED : TYPE_SPEED);
  }

  tick();
}

// ---------------------------------------------------------
//  Canvas: efecto "matrix" de fondo
//  Esto es puro copy-paste con ajustes, pero quedó fachero
// ---------------------------------------------------------
function setupMatrixCanvas() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) {
    console.warn('No encontré el canvas — seguro que el ID es matrix-canvas?');
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let w = (canvas.width = canvas.offsetWidth);
  let h = (canvas.height = canvas.offsetHeight);
  const fontSize = 13;
  let cols = Math.floor(w / fontSize);
  let drops = Array(cols).fill(1).map(() => Math.random() * -60);

  // Le puse mis propias letras, más personal
  const chars = '01<>{}[]/\\=+|&#$_01pythondjango'.split('');
  let raf;

  function draw() {
    ctx.fillStyle = 'rgba(13, 13, 13, 0.09)';
    ctx.fillRect(0, 0, w, h);
    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      const isHead = Math.random() > 0.975;
      ctx.fillStyle = isHead ? 'rgba(251,191,36,0.85)' : 'rgba(245,158,11,0.25)';
      ctx.fillText(char, x, y);
      if (y > h && Math.random() > 0.978) drops[i] = 0;
      drops[i]++;
    }
    raf = requestAnimationFrame(draw);
  }

  function onResize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    cols = Math.floor(w / fontSize);
    drops = Array(cols).fill(1).map(() => Math.random() * -60);
  }

  draw();
  window.addEventListener('resize', onResize);
}

// ---------------------------------------------------------
//  Scroll reveal (animación al entrar en viewport)
//  Esto lo saqué de un artículo de CSS-Tricks
// ---------------------------------------------------------
function setupScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

// ---------------------------------------------------------
//  Barras de habilidades (animar al entrar en viewport)
//  Otra vez uso IntersectionObserver — es mi nueva herramienta favorita
// ---------------------------------------------------------
function setupSkillBars() {
  const cards = document.querySelectorAll('.skill-card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const level = card.getAttribute('data-level');
          const fill = card.querySelector('.skill-fill');
          if (fill) {
            setTimeout(() => { fill.style.width = level + '%'; }, 120);
          }
          observer.unobserve(card);
        }
      });
    },
    { threshold: 0.3 }
  );

  cards.forEach((card) => observer.observe(card));
}

// ---------------------------------------------------------
//  Render dinámico de proyectos
//  Esto lo fui mejorando con el tiempo, ahora es más prolijo
// ---------------------------------------------------------
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) {
    console.warn('No encontré #projects-grid — revisá el HTML');
    return;
  }

  const html = projects.map((p, i) => {
    const delayClass = i % 2 === 1 ? 'reveal-delay-2' : 'reveal-delay-1';
    const highlights = p.highlights
      .map((h) => `<li><span class="hl-icon">✓</span>${h}</li>`)
      .join('');
    const tech = p.tech
      .map((t) => `<span class="tech-tag"><span style="color:var(--neutral-500);font-size:0.7rem">⌨</span>${t}</span>`)
      .join('');

    return `
      <div class="col-md-6 reveal ${delayClass}">
        <article class="project-card color-${p.color}">
          <div class="project-head">
            <div class="project-head-left">
              <span class="project-icon">🗂</span>
              <span class="project-badge">${p.category}</span>
            </div>
            <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Ver ${p.title} en GitHub">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
            </a>
          </div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <ul class="project-highlights">${highlights}</ul>
          <div class="project-tech">${tech}</div>
        </article>
      </div>
    `;
  }).join('');

  grid.innerHTML = html;
}

// ---------------------------------------------------------
//  ADN Logístico: el mapa interactivo de mi familia
//  Esta es mi sección favorita — me llevó horas hacerla
// ---------------------------------------------------------
function renderLogisticsNetwork() {
  const svg = document.getElementById('logistics-svg');
  const list = document.getElementById('sectors-list');
  const tooltip = document.getElementById('net-tooltip');
  if (!svg || !list) {
    console.warn('No encontré los elementos del ADN Logístico — revisá los IDs');
    return;
  }

  // --- Render lista izquierda ---
  list.innerHTML = sectors.map((s) => `
    <li class="sector-item" data-sector="${s.id}">
      <span class="sector-icon">${s.icon}</span>
      <p class="sector-desc">${s.description}</p>
    </li>
  `).join('');

  // --- Render SVG ---
  let svgContent = '';

  // Líneas de conexión desde cada sector al centro
  sectors.forEach((s) => {
    svgContent += `<line x1="${s.position.x}" y1="${s.position.y}" x2="${CENTER.x}" y2="${CENTER.y}" stroke="rgba(245,158,11,0.18)" stroke-width="0.5" stroke-dasharray="3 2" class="line-${s.id}" style="transition:all .3s" />`;
  });

  // Nodo central (donde está mi objetivo profesional)
  svgContent += `
    <g>
      <circle cx="${CENTER.x}" cy="${CENTER.y}" r="11" fill="rgba(245,158,11,0.06)">
        <animate attributeName="r" values="10;12;10" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="${CENTER.x}" cy="${CENTER.y}" r="9.5" fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.25)" stroke-width="0.5" />
      <circle cx="${CENTER.x}" cy="${CENTER.y}" r="7.5" fill="#1A1A1A" stroke="#F59E0B" stroke-width="1" />
      <text x="${CENTER.x}" y="${CENTER.y - 1.5}" text-anchor="middle" dominant-baseline="middle" font-size="4" fill="#F59E0B" style="font-family:monospace;font-weight:700">&lt;/&gt;</text>
      <text x="${CENTER.x}" y="${CENTER.y + 11.5}" text-anchor="middle" font-size="2.6" fill="#F59E0B" style="font-family:Inter,sans-serif;font-weight:600">Python / Django</text>
      <text x="${CENTER.x}" y="${CENTER.y + 15}" text-anchor="middle" font-size="2.4" fill="rgba(163,163,163,0.7)" style="font-family:Inter,sans-serif">Optimización</text>
    </g>
  `;

  // Nodos de cada sector
  sectors.forEach((s) => {
    const lines = s.label.split('\n');
    const labelHtml = lines.map((line, li) => 
      `<text x="${s.position.x}" y="${s.position.y + 9 + li * 4}" text-anchor="middle" font-size="2.8" fill="rgba(163,163,163,0.85)" class="label-${s.id}" style="font-family:Inter,sans-serif;font-weight:500;transition:all .3s">${line}</text>`
    ).join('');

    svgContent += `
      <g class="sector-node" data-sector="${s.id}" style="cursor:pointer">
        <circle cx="${s.position.x}" cy="${s.position.y}" r="6.5" fill="rgba(245,158,11,0.05)" class="glow-${s.id}" style="transition:all .3s" />
        <circle cx="${s.position.x}" cy="${s.position.y}" r="5.5" fill="#1A1A1A" stroke="rgba(245,158,11,0.4)" stroke-width="0.8" class="main-${s.id}" style="transition:all .3s" />
        <text x="${s.position.x}" y="${s.position.y + 0.5}" text-anchor="middle" dominant-baseline="middle" font-size="4.5" fill="#F59E0B" class="icon-${s.id}" style="font-family:monospace;font-weight:700;transition:all .3s">${s.icon}</text>
        ${labelHtml}
      </g>
    `;
  });

  svg.innerHTML = svgContent;

  // --- Interacción hover: esta parte la fui puliendo con prueba y error ---
  function setActive(id) {
    sectors.forEach((s) => {
      const isActive = s.id === id;
      const line = svg.querySelector(`.line-${s.id}`);
      const glow = svg.querySelector(`.glow-${s.id}`);
      const main = svg.querySelector(`.main-${s.id}`);
      const icon = svg.querySelector(`.icon-${s.id}`);
      const label = svg.querySelectorAll(`.label-${s.id}`);
      const item = list.querySelector(`[data-sector="${s.id}"]`);

      if (line) {
        line.setAttribute('stroke', isActive ? '#F59E0B' : 'rgba(245,158,11,0.18)');
        line.setAttribute('stroke-width', isActive ? '0.8' : '0.5');
        line.setAttribute('stroke-dasharray', isActive ? 'none' : '3 2');
      }
      if (glow) glow.setAttribute('r', isActive ? '8.5' : '6.5');
      if (main) {
        main.setAttribute('fill', isActive ? '#F59E0B' : '#1A1A1A');
        main.setAttribute('stroke', isActive ? '#FBBF24' : 'rgba(245,158,11,0.4)');
      }
      if (icon) icon.setAttribute('fill', isActive ? '#000' : '#F59E0B');
      label.forEach((l) => l.setAttribute('fill', isActive ? '#FBBF24' : 'rgba(163,163,163,0.85)'));
      if (item) item.classList.toggle('active', isActive);
    });

    // Tooltip con la descripción completa
    if (id) {
      const sector = sectors.find((s) => s.id === id);
      if (sector && tooltip) {
        tooltip.innerHTML = `<p>${sector.description}</p>`;
        tooltip.classList.add('show');
      }
      const existing = svg.querySelector('.travel-dot');
      if (existing) existing.remove();
      if (sector) {
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('r', '0.9');
        dot.setAttribute('fill', '#FBBF24');
        dot.classList.add('travel-dot');
        const motion = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
        motion.setAttribute('dur', '1.4s');
        motion.setAttribute('repeatCount', 'indefinite');
        motion.setAttribute('path', `M${sector.position.x},${sector.position.y} L${CENTER.x},${CENTER.y}`);
        dot.appendChild(motion);
        svg.appendChild(dot);
      }
    } else {
      if (tooltip) tooltip.classList.remove('show');
      const dot = svg.querySelector('.travel-dot');
      if (dot) dot.remove();
    }
  }

  // Hover en items de la lista
  list.querySelectorAll('.sector-item').forEach((item) => {
    item.addEventListener('mouseenter', () => setActive(item.dataset.sector));
    item.addEventListener('mouseleave', () => setActive(null));
  });

  // Hover en nodos del SVG
  svg.querySelectorAll('.sector-node').forEach((node) => {
    node.addEventListener('mouseenter', () => setActive(node.dataset.sector));
    node.addEventListener('mouseleave', () => setActive(null));
  });
}

// ---------------------------------------------------------
//  Formulario de contacto (con Supabase)
//  Todavía no lo conecté del todo — es el próximo paso
// ---------------------------------------------------------
// ---------------------------------------------------------
//  Formulario de contacto — ahora con mi propio backend
// ---------------------------------------------------------
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) {
    console.warn('No encontré #contact-form — el formulario no está en el HTML');
    return;
  }

  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const successDiv = document.getElementById('form-success');
  const errorDiv = document.getElementById('form-error');
  const errorMsg = document.getElementById('form-error-msg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Limpiar estados previos
    successDiv.classList.add('d-none');
    errorDiv.classList.add('d-none');

    if (!name || !email || !message) {
      errorDiv.classList.remove('d-none');
      errorMsg.textContent = 'Por favor completa todos los campos.';
      return;
    }

    // Estado: enviando
    submitBtn.disabled = true;
    submitText.innerHTML = '<span>⟳</span> Enviando...';

    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      const result = await response.json();

      if (response.ok) {
        successDiv.classList.remove('d-none');
        form.reset();
        setTimeout(() => successDiv.classList.add('d-none'), 5000);
      } else {
        throw new Error(result.error || 'Error al enviar');
      }
    } catch (err) {
      errorDiv.classList.remove('d-none');
      errorMsg.textContent = 'No se pudo enviar el mensaje. Intentá nuevamente.';
      console.error('Error al enviar:', err);
    } finally {
      submitBtn.disabled = false;
      submitText.innerHTML = '<span>➤</span> Enviar Mensaje';
    }
  });
}

// ---------------------------------------------------------
//  Footer: año dinámico + botón "volver arriba"
//  Esto es lo más simple que hay, pero funciona
// ---------------------------------------------------------
function setupFooter() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const backBtn = document.getElementById('back-top');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  } else {
    console.warn('No encontré #back-top — ojo con el footer');
  }
}

// ---------------------------------------------------------
//  Inicializar todo cuando el DOM esté listo
//  Esto es lo último que se ejecuta
// ---------------------------------------------------------
function safeExecute(fn, name) {
  try {
    fn();
  } catch (err) {
    console.warn(`⚠️ ${name} no funcionó:`, err);
  }
}

function init() {
  // Todas las funciones que tienen que ejecutarse
  const functions = [
    { fn: renderProjects, name: 'Render proyectos' },
    { fn: renderLogisticsNetwork, name: 'Render mapa' },
    { fn: setupHeader, name: 'Header' },
    { fn: setupSmoothScroll, name: 'Scroll suave' },
    { fn: setupTypewriter, name: 'Typewriter' },
    { fn: setupMatrixCanvas, name: 'Canvas Matrix' },
    { fn: setupScrollReveal, name: 'Scroll reveal' },
    { fn: setupSkillBars, name: 'Skill bars' },
    { fn: setupContactForm, name: 'Formulario de contacto' },
    { fn: setupFooter, name: 'Footer' },
  ];

  functions.forEach(({ fn, name }) => safeExecute(fn, name));

  // El setTimeout para el reveal dinámico
  safeExecute(
    () => setTimeout(setupScrollReveal, 300),
    'Scroll reveal (post-render)'
  );
}

document.addEventListener('DOMContentLoaded', init);

// ---------------------------------------------------------
//  NOTAS PARA MÍ MISMO:
//  - El canvas matrix a veces se traba en mobile, ver si puedo optimizarlo
//  - El formulario de contacto necesita las variables de entorno
//  - Probar el hover del mapa en diferentes navegadores
//  - El botón volver arriba funciona, pero podría ser más suave
// ---------------------------------------------------------