// =========================================================
//  Datos del portfolio — Leandro Garro
//  Toda la info del sitio vive acá. Cambiá estos valores
//  y listo, se actualiza solo.
//  NOTA: me llevó un rato organizar todo esto jaja
// =========================================================

// ---------------------------------------------------------
//  Info personal — la que me identifica
// ---------------------------------------------------------
export const profile = {
  name: 'Leandro Matías Garro',
  shortName: 'Leandro Garro',
  age: 19,
  birthday: '17/07', // cumplo en 9 días jaja
  location: 'Pilar, Buenos Aires, Argentina',
  education: [
    {
      title: 'Licenciatura en Sistemas',
      institution: 'Universidad Nacional de General Sarmiento (UNGS)',
    },
    {
      title: 'Tecnicatura Universitaria en Informática',
      institution: 'Universidad Nacional de General Sarmiento (UNGS)',
    },
  ],
  role: 'Programador Backend',
  tagline: 'Transformando la lógica en soluciones logísticas', // esto lo pensé un día random
  subtitle: 'Estudiante de Sistemas | Python & Django | Buscando mi primer desafío profesional',
  email: 'leandro.garro.dev@gmail.com',
  github: 'https://github.com/LeanGarro',
  linkedin: 'https://www.linkedin.com/in/leandro-matías-garro-723855294/',
  availability: 'Remoto · Part-time · Full-time', // soy flexible, no tengo drama
};

// ---------------------------------------------------------
//  Certificaciones — lo que fui juntando
//  La de Cambridge me costó, las de CoderHouse las hice para practicar
// ---------------------------------------------------------
export const certifications = [
  { name: 'Inglés B1-B2', institution: 'Cambridge English', year: 'Certificado oficial' },
  { name: 'Python', institution: 'CoderHouse', year: 'Curso completado' },
  { name: 'Frontend Developer', institution: 'CoderHouse', year: 'Curso completado' },
  // TODO: agregar más cuando termine la carrera
];

// ---------------------------------------------------------
//  Manifiesto: 4 principios que me definen
//  Esto lo escribí yo, sin IA (bueno, casi jaja)
// ---------------------------------------------------------
export const manifesto = [
  {
    number: '01',
    title: 'Aprendizaje rápido',
    text: 'Mi mayor virtud no es lo que ya sé, sino la velocidad con la que aprendo lo que me falta. Cada concepto nuevo es un reto, no un obstáculo.',
  },
  {
    number: '02',
    title: 'Flexibilidad total',
    text: 'Remoto, part-time o full-time. Me adapto a las necesidades del equipo y del proyecto, sin que el horario sea una barrera.',
  },
  {
    number: '03',
    title: 'Inglés B2 certificado',
    text: 'Acredito el nivel B2 de Cambridge. Leo documentación, sigo tutoriales y me comunico con fluidez en entornos técnicos en inglés.',
  },
  {
    number: '04',
    title: 'ADN logístico',
    text: 'Crecí en una familia donde la logística es el idioma de casa. Conozco el negocio desde adentro y quiero construir el software que lo optimice.',
  },
];

// ---------------------------------------------------------
//  Frases para el typewriter (efecto de máquina de escribir)
//  Las fui probando hasta que quedaron bien
// ---------------------------------------------------------
export const typewriterPhrases = [
  'python backend.py --logística',
  'sys.init(optimización)',
  'Leandro Garro — Dev en formación',
  'import transport_engine',
  'while learning: build()', // esta es mi favorita
];

// ---------------------------------------------------------
//  Habilidades — lo que sé, con honestidad
//  Los números son mi auto-percepción, siempre hay margen para mejorar
// ---------------------------------------------------------
export const skills = {
  backend: [
    { name: 'Python', level: 55, note: 'Avanzado' },
    { name: 'Django', level: 45, note: 'Framework principal' },
    { name: 'SQL', level: 30, note: 'Bases de datos relacionales' },
  ],
  frontend: [
    { name: 'HTML5', level: 85 }, // esto lo sé bien
    { name: 'CSS3', level:  60 },
    { name: 'Bootstrap', level: 70 },
    { name: 'JavaScript', level: 35, note: 'En aprendizaje' }, // voy mejorando
  ],
  tools: [
    { name: 'Git / GitHub', level: 60 },
    { name: 'Ofimática', level: 75, note: 'Excel · PowerPoint · Word (avanzado)' }, // esto me lo enseñó mi viejo
  ],
};

// ---------------------------------------------------------
//  Proyectos — los que fui haciendo mientras aprendía
//  Cada uno tiene su historia, algunos están en GitHub
// ---------------------------------------------------------
export const projects = [
  {
    title: 'Portafolio Proyecto Final',
    category: 'Frontend + Backend',
    description:
      'Sitio web profesional desarrollado como proyecto final integrador. Combina frontend responsivo con una arquitectura backend estructurada, aplicando patrones de diseño y buenas prácticas de código limpio.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    highlights: ['Diseño responsive mobile-first', 'Código modular y semántico', 'Optimización de rendimiento'],
    color: 'amber',
    link: 'https://github.com/LeanGarro', // link a mi perfil, después pongo el repo específico
  },
  {
    title: 'Sistema de Gestión (CoderHouse)',
    category: 'Python',
    description:
      'Proyecto del curso de Python en CoderHouse. Aplicación de consola con arquitectura orientada a objetos, manejo de archivos, validación de datos y persistencia. Resuelve la problemática de registrar y consultar información de forma eficiente.',
    tech: ['Python', 'OOP', 'Archivos', 'SQLite'],
    highlights: ['POO aplicada a casos reales', 'CRUD completo con persistencia', 'Validación y manejo de errores'],
    color: 'blue',
    link: 'https://github.com/LeanGarro', // TODO: poner el repo específico
  },
  {
    title: 'E-commerce Frontend (CoderHouse)',
    category: 'Frontend',
    description:
      'Tienda online desarrollada en el curso de Frontend de CoderHouse. Interfaz completa con catálogo de productos, carrito de compras dinámico y checkout simulado. Enfoque en UX, accesibilidad y diseño adaptativo.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
    highlights: ['Carrito funcional con JS vanilla', 'Catálogo filtrable y dinámico', 'Diseño accesible y responsive'],
    color: 'emerald',
    link: 'https://github.com/LeanGarro',
  },
  {
    title: 'Scripts de Automatización',
    category: 'Python',
    description:
      'Colección de utilidades y scripts en Python para automatizar tareas repetitivas: procesamiento de datos, generación de reportes y manipulación de archivos. Pensados para reducir trabajo manual y mejorar la eficiencia.',
    tech: ['Python', 'Automatización', 'CLI'],
    highlights: ['Automatización de tareas manuales', 'Procesamiento por lotes', 'Interfaz CLI intuitiva'],
    color: 'rose',
    link: 'https://github.com/LeanGarro',
  },
];

// ---------------------------------------------------------
//  ADN Logístico: mi mapa familiar
//  Esto es lo que me hace único, lo que me diferencia del resto
//  Los valores de posición los fui ajustando a ojo hasta que quedó bien
// ---------------------------------------------------------
export const sectors = [
  {
    id: 'alimentos',
    label: 'Distribución\nAlimentaria',
    icon: '🚚',
    position: { x: 18, y: 22 },
    description:
      'Distribución nacional de alimentos — conozco los desafíos de la cadena de frío y los plazos ajustados.',
  },
  {
    id: 'carnes',
    label: 'Carnes y\nPerecibles',
    icon: '🥩',
    position: { x: 78, y: 22 },
    description:
      'Logística de carnes y productos perecederos — sé lo crítico que es el tracking en tiempo real.',
  },
  {
    id: 'cargas',
    label: 'Cargas\nGenerales',
    icon: '📦',
    position: { x: 18, y: 72 },
    description:
      'Transporte de cargas generales y retail — he visto cómo la falta de integración entre sistemas genera pérdidas.',
  },
  {
    id: 'farmaceutica',
    label: 'Logística\nFarmacéutica',
    icon: '💊',
    position: { x: 78, y: 72 },
    description:
      'Logística farmacéutica — tengo presente que hay productos que requieren trazabilidad absoluta y condiciones especiales.',
  },
];

// Nodo central del mapa — donde están mi objetivo y mi stack
export const CENTER = { x: 48, y: 47 };

// ---------------------------------------------------------
//  NOTAS PARA MÍ MISMO:
//  - Actualizar los links de los proyectos cuando los suba a GitHub
//  - Agregar más proyectos cuando termine la carrera
//  - Revisar si el nivel de JavaScript ya llegó a 50% jaja
//  - El mapa de ADN Logístico podría tener más nodos en el futuro
// ---------------------------------------------------------