import { THEMES } from "./site";

// Portuguese (Brazil) and Spanish landing pages.
//
// Why these two, with evidence (26 Nov 2026):
// - Google autocomplete in Brazil and Mexico shows people searching in their own language for this
//   exact product: "aplicativo de teleprompter para iphone", "teleprompter para iphone",
//   "como gravar vídeo e ler roteiro no iphone", "aplicacion teleprompter iphone",
//   "teleprompter gratis sin marca de agua".
// - The app is already fully translated into both, with pt-BR App Store copy and Brazil ads.
// - Google's multilingual guidance: one URL per language, hreflang both ways, no auto-redirect.
//
// Every feature name below is the app's own translation, read from the app's pt-BR.lproj and
// es.lproj Localizable.strings (Corrigir tudo / Arreglar todo, Seguir minha voz / Seguir mi voz,
// Script Studio com IA / Estudio de guion IA, Escreva para o fundador / Escribe al fundador).
// Prices are not written in dollars here: Apple shows each country its own price.

/** hreflang for the home page and its translations. Each version lists itself and the others. */
export const LANG_ALTERNATES = { en: "/", "pt-BR": "/pt-br", es: "/es", "x-default": "/" };

export type LocalHome = {
  lang: "pt-BR" | "es";
  path: string;
  title: string;
  description: string;
  kicker: string;
  h1: string;
  lede: string;
  cta: string;
  note: string;
  read: { h: string; p: string; points: { b: string; t: string }[] };
  fix: { h: string; p: string; groups: { h: string; items: string[] }[] };
  write: { h: string; p: string };
  plans: { h: string; p: string; steps: { b: string; t: string }[] };
  faq: { q: string; a: string }[];
  alt: { script: string; modes: string; report: string; studio: string };
  englishShots: string;
  contact: string;
};

export const PT: LocalHome = {
  lang: "pt-BR",
  path: "/pt-br",
  title: "Zen Teleprompter: aplicativo de teleprompter e editor de vídeo para iPhone",
  description: "Teleprompter para iPhone e iPad que segue a sua voz. Depois, um toque corta repetições, silêncios e vícios de linguagem e coloca legendas. 3 dias grátis.",
  kicker: "Aplicativo de teleprompter e editor de vídeo para iPhone",
  h1: "Grave uma vez. Um toque finaliza.",
  lede: "Leia o roteiro logo abaixo da câmera. Depois, Corrigir tudo corta as gaguejadas e o tempo morto e finaliza o vídeo: legendas, música, um título e o texto do seu post.",
  cta: "Comece 3 dias grátis",
  note: "3 dias grátis, depois plano mensal ou anual. A App Store mostra o preço na sua moeda. iPhone e iPad.",
  read: {
    h: "Leia sem desviar o olhar.",
    p: "A linha que você está lendo fica logo abaixo da câmera, então seus olhos continuam na lente.",
    points: [
      { b: "Seguir minha voz", t: "O roteiro anda quando você fala e espera quando você para. O reconhecimento acontece no seu iPhone." },
      { b: "Dois modos", t: "Teleprompter, espelhado para o vidro de teleprompter, ou Prompter estilo selfie, com a câmera frontal e o roteiro por cima." },
      { b: "Velocidade", t: "De 0,5x a 2x." },
      { b: "Controles", t: "Apple Watch e controles Bluetooth de teleprompter." },
    ],
  },
  fix: {
    h: "Um toque. Corrigir tudo.",
    p: "Cada mudança é um ajuste com a sua própria chave. O que você já ajustou continua do seu jeito.",
    groups: [
      { h: "Corta", items: ["Repetições: a sua última tentativa fica", "Silêncios no começo, no fim e nas pausas longas", "Vícios de linguagem, como hã e é..."] },
      { h: "Som", items: ["Volume da voz equilibrado", "Música escolhida para o clima, por baixo da voz"] },
      { h: "Acabamento", items: ["Legendas karaokê: cada palavra acende quando você fala", "Uma capa", `Título de abertura em ${THEMES.length} temas`, "Zooms nas falas que importam", "Momentos de história", "Cartão final"] },
      { h: "Escreve", items: ["O texto do post para Reels, TikTok e YouTube"] },
    ],
  },
  write: {
    h: "Comece de uma página ou de uma frase.",
    p: "Importe texto, RTF, PDF ou Markdown, ou o artigo de uma página da web. Ou peça ao Script Studio com IA um roteiro no seu tamanho, tom e ritmo de leitura. A IA fica desligada até você concordar.",
  },
  plans: {
    h: "3 dias grátis.",
    p: "Tudo liberado nos dois planos, mensal ou anual. Sem marca d'água nas exportações.",
    steps: [
      { b: "Hoje", t: "Tudo liberado" },
      { b: "Dia 2", t: "Avisamos você" },
      { b: "Dia 3", t: "Seu plano começa. Cancele antes e não paga nada." },
    ],
  },
  faq: [
    { q: "As pessoas percebem que estou lendo?", a: "O roteiro fica numa linha de leitura logo abaixo da câmera, então seus olhos ficam perto da lente enquanto você lê." },
    { q: "O app está em português?", a: "Sim. O app, o app do Apple Watch e os pedidos de permissão estão em português do Brasil, e Seguir minha voz ouve no idioma do seu roteiro." },
    { q: "Preciso de um suporte de teleprompter?", a: "Não. Use a câmera frontal com o roteiro por cima, ou o modo Teleprompter, espelhado para vidro de teleprompter." },
    { q: "Como funciona o teste grátis?", a: "São 3 dias com tudo liberado. Avisamos no dia 2. Cancele na sua conta Apple antes do fim do teste e você não paga nada." },
    { q: "Em quais aparelhos funciona?", a: "iPhone e iPad com iOS 17 ou mais recente, e Apple Watch como controle remoto." },
  ],
  alt: {
    script: "Um roteiro aberto e pronto para ler no app",
    modes: "A escolha do modo: Teleprompter para o vidro ou estilo selfie com a câmera frontal",
    report: "O relatório do take com os cortes e pausas marcados, de 1:27 para 1:23",
    studio: "O Script Studio com IA com um briefing, um tamanho e um tom",
  },
  englishShots: "As telas abaixo são do app em inglês. No seu iPhone, o app aparece em português.",
  contact: "Dúvidas? Escreva para o fundador: hello@zenproducts.ai. Respondemos em até 24 horas.",
};

export const ES: LocalHome = {
  lang: "es",
  path: "/es",
  title: "Zen Teleprompter: app de teleprompter y editor de video para iPhone",
  description: "App de teleprompter para iPhone y iPad que sigue tu voz. Luego, un toque corta repeticiones, silencios y muletillas, y añade subtítulos y música. 3 días gratis.",
  kicker: "App de teleprompter y editor de video para iPhone",
  h1: "Graba una vez. Un toque lo termina.",
  lede: "Lee tu guion justo debajo de la cámara. Luego, Arreglar todo corta los tropiezos y los silencios, y termina el video: subtítulos, música, un título y el texto de tu publicación.",
  cta: "Empieza 3 días gratis",
  note: "3 días gratis, luego plan mensual o anual. La App Store te muestra el precio en tu moneda. iPhone y iPad.",
  read: {
    h: "Lee sin apartar la mirada.",
    p: "La línea que estás leyendo queda justo debajo de la cámara, así tus ojos siguen en el lente.",
    points: [
      { b: "Seguir mi voz", t: "El guion avanza cuando hablas y espera cuando te detienes. El reconocimiento ocurre en tu iPhone." },
      { b: "Dos modos", t: "Teleprompter, en espejo para el cristal de teleprompter, o Estilo selfie, con la cámara frontal y el guion encima." },
      { b: "Velocidad", t: "De 0.5x a 2x." },
      { b: "Controles", t: "Apple Watch y controles Bluetooth de teleprompter." },
    ],
  },
  fix: {
    h: "Un toque. Arreglar todo.",
    p: "Cada cambio es un ajuste con su propio interruptor. Lo que ya ajustaste se queda como lo dejaste.",
    groups: [
      { h: "Corta", items: ["Repeticiones: tu último intento se queda", "Silencios al inicio, al final y en las pausas largas", "Muletillas, como eh y este..."] },
      { h: "Sonido", items: ["Volumen de la voz parejo", "Música elegida para el ambiente, debajo de tu voz"] },
      { h: "Acabado", items: ["Subtítulos karaoke: cada palabra se ilumina al decirla", "Una portada", `Título inicial en ${THEMES.length} temas`, "Zooms en las frases que importan", "Momentos de historia", "Tarjeta final"] },
      { h: "Escribe", items: ["El texto de tu publicación para Reels, TikTok y YouTube"] },
    ],
  },
  write: {
    h: "Empieza desde una página o una frase.",
    p: "Importa texto, RTF, PDF o Markdown, o el artículo de una página web. O pídele al Estudio de guion IA un guion a tu medida, con tu tono y tu ritmo de lectura. La IA está apagada hasta que aceptes.",
  },
  plans: {
    h: "3 días gratis.",
    p: "Todo incluido en los dos planes, mensual o anual. Sin marca de agua al exportar.",
    steps: [
      { b: "Hoy", t: "Todo desbloqueado" },
      { b: "Día 2", t: "Te avisamos" },
      { b: "Día 3", t: "Empieza tu plan. Cancela antes y no pagas nada." },
    ],
  },
  faq: [
    { q: "¿Se nota que estoy leyendo?", a: "El guion está en una línea de lectura justo debajo de la cámara, así tus ojos quedan cerca del lente mientras lees." },
    { q: "¿La app está en español?", a: "Sí. La app, la app del Apple Watch y los avisos de permisos están en español, y Seguir mi voz escucha en el idioma de tu guion." },
    { q: "¿Necesito un soporte de teleprompter?", a: "No. Usa la cámara frontal con el guion encima, o el modo Teleprompter, en espejo para el cristal de teleprompter." },
    { q: "¿Cómo funciona la prueba gratis?", a: "Tienes 3 días con todo desbloqueado. Te avisamos el día 2. Cancela en tu cuenta de Apple antes de que termine la prueba y no pagas nada." },
    { q: "¿En qué dispositivos funciona?", a: "iPhone y iPad con iOS 17 o posterior, y Apple Watch como control remoto." },
  ],
  alt: {
    script: "Un guion abierto y listo para leer en la app",
    modes: "La elección del modo: Teleprompter para el cristal o estilo selfie con la cámara frontal",
    report: "El reporte de la toma con los cortes y pausas marcados, de 1:27 a 1:23",
    studio: "El Estudio de guion IA con una idea, una duración y un tono",
  },
  englishShots: "Las pantallas de abajo son de la app en inglés. En tu iPhone, la app aparece en español.",
  contact: "¿Preguntas? Escribe al fundador: hello@zenproducts.ai. Respondemos en menos de 24 horas.",
};
