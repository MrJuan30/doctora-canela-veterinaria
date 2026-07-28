import type {
  BookingServiceOption,
  CMSProvider,
  Product,
  Service,
  SiteConfig,
} from './types';

/**
 * Proveedor local de contenido.
 *
 * Toda la información del sitio vive aquí, en formato estructurado e idéntico
 * al que entregará DICAM CMS. Para conectar el CMS real basta con crear un
 * `DicamProvider` que cumpla la misma interfaz `CMSProvider` y cambiar la
 * instancia exportada en cms/index.ts — ningún componente necesita cambios.
 */

const siteConfig: SiteConfig = {
  name: 'Doctora Canela',
  legalName: 'Clínica Veterinaria Doctora Canela',
  slogan: 'Tu me cuidas. Yo te cuido.',
  phoneDisplay: '318 947 1374',
  phoneIntl: '573189471374',
  address: 'Cra. 72k #40-05, Kennedy, Bogotá',
  addressLines: ['Cra. 72k #40-05', 'Kennedy', 'Bogotá, Colombia'],
  city: 'Bogotá',
  instagram: 'https://www.instagram.com/doctora_canela/',
  googleRating: 5.0,
  googleReviews: 9,
  hours: [
    { days: 'Lunes a domingo', time: 'Desde las 8:00 a.m.' },
    { days: 'Urgencias', time: 'Atención prioritaria todos los días' },
  ],
  mapsQuery: 'Clínica veterinaria Doctora Canela, Cra. 72k #40-05, Kennedy, Bogotá',
};

const services: Service[] = [
  {
    slug: 'urgencias',
    name: 'Urgencias Veterinarias',
    shortName: 'Urgencias',
    tagline: 'Cuando cada segundo cuenta, estamos listos.',
    description: [
      'Las urgencias no avisan. Por eso nuestro equipo está preparado para atender a tu mascota de inmediato, con protocolos de triaje que priorizan los casos críticos desde el momento en que cruzas la puerta.',
      'Contamos con el equipamiento y la experiencia para estabilizar pacientes, manejar intoxicaciones, traumatismos, dificultades respiratorias y cualquier situación que ponga en riesgo la vida de tu compañero.',
    ],
    features: [
      'Atención inmediata con sistema de triaje',
      'Estabilización de pacientes críticos',
      'Manejo de intoxicaciones y traumatismos',
      'Monitoreo constante del paciente',
      'Comunicación clara con la familia en todo momento',
    ],
    image: '/images/servicio-urgencias.jpg',
    icon: 'urgencias',
    faqs: [
      {
        question: '¿Qué hago si mi mascota tiene una urgencia?',
        answer:
          'Ven de inmediato a la clínica o llámanos al 318 947 1374 mientras vienes en camino. Nuestro equipo te indicará los primeros pasos y estará listo para recibirte.',
      },
      {
        question: '¿Atienden urgencias de cualquier especie?',
        answer:
          'Nos especializamos en perros y gatos. Si tu mascota es de otra especie, llámanos y te orientamos sobre la mejor opción de atención.',
      },
      {
        question: '¿Cómo sé si es una urgencia real?',
        answer:
          'Dificultad para respirar, sangrado que no para, convulsiones, vómito o diarrea con sangre, imposibilidad para orinar, accidentes o atropellos y decaimiento extremo siempre ameritan atención inmediata. Ante la duda, llámanos.',
      },
      {
        question: '¿Debo llevar algo a la consulta de urgencia?',
        answer:
          'Si es posible, trae el carné de vacunas, medicamentos que esté tomando y, en caso de intoxicación, el empaque o nombre de la sustancia que ingirió.',
      },
    ],
  },
  {
    slug: 'cirugias',
    name: 'Cirugías',
    shortName: 'Cirugías',
    tagline: 'Manos expertas, corazones tranquilos.',
    description: [
      'Sabemos que una cirugía genera muchas preguntas. Por eso acompañamos a cada familia antes, durante y después del procedimiento, con valoración prequirúrgica completa y un protocolo anestésico diseñado para cada paciente.',
      'Realizamos cirugías de tejidos blandos, esterilizaciones y procedimientos programados con monitoreo continuo y un plan de recuperación claro para que tu mascota vuelva pronto a casa.',
    ],
    features: [
      'Valoración y exámenes prequirúrgicos',
      'Protocolo anestésico individualizado',
      'Monitoreo durante todo el procedimiento',
      'Esterilizaciones y cirugías de tejidos blandos',
      'Plan de cuidados postoperatorios guiado',
    ],
    image: '/images/servicio-cirugias.jpg',
    icon: 'cirugias',
    faqs: [
      {
        question: '¿Mi mascota necesita ayuno antes de la cirugía?',
        answer:
          'Sí. Generalmente recomendamos 8 horas de ayuno de alimento sólido. Te daremos instrucciones precisas según la edad, el peso y la condición de tu mascota al agendar.',
      },
      {
        question: '¿Qué exámenes se hacen antes de operar?',
        answer:
          'Realizamos una valoración clínica completa y, según el paciente, exámenes de sangre prequirúrgicos para asegurar que el procedimiento sea lo más seguro posible.',
      },
      {
        question: '¿Cuánto tarda la recuperación?',
        answer:
          'Depende del procedimiento. Una esterilización suele requerir de 7 a 10 días de cuidados en casa. Te entregamos un plan escrito con medicamentos, curaciones y signos de alarma.',
      },
      {
        question: '¿Puedo acompañar a mi mascota?',
        answer:
          'Podrás estar con ella en la valoración previa y en la entrega después del procedimiento. Durante la cirugía te mantenemos informado en todo momento.',
      },
    ],
  },
  {
    slug: 'spa',
    name: 'Spa y Peluquería',
    shortName: 'Spa y Peluquería',
    tagline: 'Un baño que se siente como un abrazo.',
    description: [
      'El spa de Doctora Canela es mucho más que estética: es salud para la piel y el pelaje de tu mascota. Trabajamos con productos dermatológicos, agua templada y muchísima paciencia, sin jaulas de secado ni procesos bruscos.',
      'Cada sesión se adapta a la raza, el tipo de pelaje y el carácter de tu compañero. Salen felices, limpios y oliendo delicioso — y eso también se nota en casa.',
    ],
    features: [
      'Baño con productos dermatológicos',
      'Corte y arreglo según raza',
      'Limpieza de oídos y corte de uñas',
      'Deslanado y cepillado profundo',
      'Ambiente tranquilo, sin jaulas de secado',
    ],
    image: '/images/servicio-spa.jpg',
    icon: 'spa',
    faqs: [
      {
        question: '¿Cada cuánto debo bañar a mi perro?',
        answer:
          'Depende de la raza y el estilo de vida, pero en general recomendamos cada 3 a 4 semanas. En la primera visita te sugerimos un plan de cuidado ideal para su pelaje.',
      },
      {
        question: '¿Atienden gatos en el spa?',
        answer:
          'Sí, con un manejo especial y en horarios tranquilos para reducir su estrés. Agenda con anticipación para reservar el espacio ideal para tu gato.',
      },
      {
        question: '¿Usan productos para piel sensible?',
        answer:
          'Sí. Trabajamos con líneas dermatológicas e hipoalergénicas. Si tu mascota tiene alguna condición de piel, cuéntanos al agendar y preparamos la fórmula adecuada.',
      },
      {
        question: '¿Cuánto demora una sesión de spa?',
        answer:
          'Entre 1.5 y 3 horas según el tamaño, el pelaje y el servicio. Te avisamos por WhatsApp en cuanto tu mascota esté lista para volver a casa.',
      },
    ],
  },
];

const products: Product[] = [
  {
    slug: 'cama-nube-perro',
    name: 'Cama Nube para Perro',
    category: 'Camas y descanso',
    price: 189000,
    stock: 8,
    shortDescription: 'Cama acolchada ultra suave para siestas eternas.',
    description:
      'Una nube con forma de cama. Su relleno de fibra premium abraza el cuerpo de tu perro y su funda lavable hace que mantenerla impecable sea facilísimo.',
    features: [
      'Relleno de fibra premium antialérgica',
      'Funda removible y lavable a máquina',
      'Base antideslizante',
      'Disponible en tallas M y G',
    ],
    images: ['/images/producto-cama-perro.jpg'],
  },
  {
    slug: 'cueva-gato',
    name: 'Cueva Acogedora para Gato',
    category: 'Camas y descanso',
    price: 156000,
    stock: 6,
    shortDescription: 'El escondite perfecto para gatos que aman su refugio.',
    description:
      'Los gatos aman los espacios cerrados donde sentirse seguros. Esta cueva de felpa conserva el calor y les regala ese rincón privado que tanto buscan.',
    features: [
      'Felpa térmica de alta densidad',
      'Cojín interior removible',
      'Estructura semirrígida que conserva la forma',
      'Ideal para gatos de todas las edades',
    ],
    images: ['/images/producto-cama-gato.jpg'],
  },
  {
    slug: 'fuente-agua-fresh',
    name: 'Fuente de Agua Fresh',
    category: 'Higiene y hogar',
    price: 134000,
    stock: 12,
    shortDescription: 'Agua en movimiento que invita a hidratarse más.',
    description:
      'El agua en movimiento estimula a perros y gatos a beber más durante el día. Su filtro de carbón activado mantiene el agua fresca y libre de impurezas.',
    features: [
      'Filtro de carbón activado reemplazable',
      'Bomba ultra silenciosa',
      'Capacidad de 2 litros',
      'Fácil de desarmar y limpiar',
    ],
    images: ['/images/producto-fuente-agua.jpg'],
  },
  {
    slug: 'arenero-smart',
    name: 'Arenero Cerrado Smart',
    category: 'Higiene y hogar',
    price: 178000,
    stock: 5,
    shortDescription: 'Arenero cerrado con control de olores y fácil limpieza.',
    description:
      'Diseñado para gatos exigentes y hogares impecables. Su diseño cerrado controla los olores y su bandeja extraíble hace la limpieza rápida y sin derrames.',
    features: [
      'Diseño cerrado con filtro de olores',
      'Bandeja extraíble de fácil limpieza',
      'Puerta abatible transparente',
      'Material antibacterial',
    ],
    images: ['/images/producto-arenero.jpg'],
  },
  {
    slug: 'kit-juguetes-aventura',
    name: 'Kit de Juguetes Aventura',
    category: 'Juguetes',
    price: 68000,
    stock: 15,
    shortDescription: 'Tres juguetes resistentes para horas de diversión.',
    description:
      'Un kit pensado para gastar energía y fortalecer el vínculo: cuerda trenzada para jalar, pelota rebote alto y peluche con sonido. Diversión garantizada.',
    features: [
      'Cuerda trenzada de algodón resistente',
      'Pelota de caucho natural rebote alto',
      'Peluche con sonido incluido',
      'Materiales no tóxicos certificados',
    ],
    images: ['/images/producto-juguetes.jpg'],
  },
  {
    slug: 'collar-artesanal-azul',
    name: 'Collar Artesanal Azul',
    category: 'Paseo y viaje',
    price: 52000,
    stock: 20,
    shortDescription: 'Collar de cuero genuino con hebilla metálica.',
    description:
      'Hecho a mano con cuero genuino en el azul de nuestra casa. Resistente, cómodo y con una placa lista para grabar el nombre de tu mejor amigo.',
    features: [
      'Cuero genuino curtido vegetal',
      'Hebilla y argolla metálicas reforzadas',
      'Ajuste de 5 posiciones',
      'Incluye placa para identificación',
    ],
    images: ['/images/producto-collar.jpg'],
  },
  {
    slug: 'transportadora-viajera',
    name: 'Transportadora Viajera',
    category: 'Paseo y viaje',
    price: 215000,
    stock: 4,
    shortDescription: 'Viajes seguros y cómodos para gatos y perros pequeños.',
    description:
      'Ventilación en cuatro lados, cojín interior lavable y estructura reforzada. Aprobada para cabina en la mayoría de aerolíneas nacionales.',
    features: [
      'Ventilación panorámica en 4 lados',
      'Cojín interior removible y lavable',
      'Correa de hombro acolchada',
      'Apta para cabina de avión',
    ],
    images: ['/images/producto-transportadora.jpg'],
  },
  {
    slug: 'comedero-elevado-duo',
    name: 'Comedero Elevado Dúo',
    category: 'Alimentación',
    price: 98000,
    stock: 10,
    shortDescription: 'Bowls de cerámica en base elevada ergonómica.',
    description:
      'La altura justa para comer sin forzar el cuello. Dos bowls de cerámica sobre una base estable que cuida la postura de tu mascota en cada comida.',
    features: [
      'Dos bowls de cerámica aptos para lavavajillas',
      'Base elevada ergonómica antideslizante',
      'Mejora la postura al comer',
      'Diseño fácil de limpiar',
    ],
    images: ['/images/producto-comedero.jpg'],
  },
];

const bookingOptions: BookingServiceOption[] = [
  {
    id: 'vacunacion',
    label: 'Vacunación',
    description: 'Esquemas completos y refuerzos para perros y gatos.',
  },
  {
    id: 'cirugia',
    label: 'Cirugía',
    description: 'Esterilizaciones y procedimientos programados.',
  },
  {
    id: 'spa',
    label: 'Spa y Peluquería',
    description: 'Baño, corte, uñas y cuidado del pelaje.',
  },
];

export const localProvider: CMSProvider = {
  getSiteConfig: () => siteConfig,
  getServices: () => services,
  getService: (slug) => services.find((s) => s.slug === slug),
  getProducts: () => products,
  getProduct: (slug) => products.find((p) => p.slug === slug),
  getRelatedProducts: (slug, count) => {
    const current = products.find((p) => p.slug === slug);
    if (!current) return products.slice(0, count);
    const sameCategory = products.filter(
      (p) => p.slug !== slug && p.category === current.category,
    );
    const rest = products.filter(
      (p) => p.slug !== slug && p.category !== current.category,
    );
    return [...sameCategory, ...rest].slice(0, count);
  },
  getBookingOptions: () => bookingOptions,
};
