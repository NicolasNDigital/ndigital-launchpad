// Types pour le lexique
export interface LexiqueTerm {
  term: string;
  definition: string;
  category: LexiqueCategory;
  schemaType: "DefinedTerm";
  keyPoints?: string[];
  example?: string;
  tip?: string;
}

export type LexiqueCategory =
  | "Bases"
  | "Acteurs"
  | "Signaux d'autorité"
  | "Technique"
  | "Contenu"
  | "Pièges"
  | "Outils"
  | "Tendances"
  | "Glossaire";

export const categoryOrder: LexiqueCategory[] = [
  "Bases",
  "Acteurs",
  "Signaux d'autorité",
  "Technique",
  "Contenu",
  "Pièges",
  "Outils",
  "Tendances",
  "Glossaire",
];

export const categoryDescriptions: Record<LexiqueCategory, string> = {
  "Bases": "Les fondamentaux du référencement IA",
  "Acteurs": "Les acteurs du jeu",
  "Signaux d'autorité": "Les signaux d'autorité",
  "Technique": "La technique qui compte",
  "Contenu": "Le contenu qui marche",
  "Pièges": "Les pièges à éviter",
  "Outils": "Les outils pour suivre tout ça",
  "Tendances": "Les tendances à surveiller",
  "Glossaire": "Petit glossaire express",
};

export const lexiqueTerms: LexiqueTerm[] = [
  // === BASES ===
  {
    term: "GEO (Generative Engine Optimization)",
    definition:
      "Le petit frère moderne du SEO. Alors que le SEO vise à être bien classé sur Google, le GEO c'est pour apparaître dans les réponses de ChatGPT, Perplexity ou Gemini.",
    category: "Bases",
    schemaType: "DefinedTerm",
    example:
      "Quand quelqu'un demande à ChatGPT \"Quel CRM choisir pour ma startup ?\", tu veux que ton site soit cité dans la réponse. C'est ça le GEO.",
    tip: "Les gens cherchent de moins en moins sur Google et posent de plus en plus leurs questions directement aux IA. Si t'es pas visible là-dedans, tu rates le train.",
  },
  {
    term: "AEO (Answer Engine Optimization)",
    definition:
      "Même combat que le GEO, juste un autre nom. Certains préfèrent AEO parce que ça inclut aussi Perplexity qui se présente comme un \"answer engine\" plutôt qu'une IA générative pure.",
    category: "Bases",
    schemaType: "DefinedTerm",
    tip: "GEO et AEO c'est globalement la même chose. On utilise GEO parce que c'est plus court à taper.",
  },

  // === ACTEURS ===
  {
    term: "ChatGPT",
    definition:
      "L'IA d'OpenAI, celle que tout le monde connaît. Elle peut chercher sur le web en temps réel (via Bing) quand elle a besoin d'infos récentes. Si ton contenu est bien structuré et fait autorité, ChatGPT peut le citer.",
    category: "Acteurs",
    schemaType: "DefinedTerm",
    tip: "ChatGPT adore les contenus clairs, factuels, avec des sources. Elle déteste le flou artistique et les pavés sans structure.",
  },
  {
    term: "Perplexity",
    definition:
      "Le moteur de recherche nouvelle génération. Contrairement à ChatGPT qui cherche parfois, Perplexity cherche systématiquement sur le web avant de répondre.",
    category: "Acteurs",
    schemaType: "DefinedTerm",
    tip: "Perplexity cite ses sources de manière ultra transparente. C'est le meilleur endroit pour tracker si ton site est recommandé par les IA. Bonus : les gens qui l'utilisent sont souvent en phase d'achat ou de recherche sérieuse.",
  },
  {
    term: "Gemini",
    definition:
      "L'IA de Google. Elle a un accès privilégié à l'index de Google, donc logiquement si t'es bien référencé en SEO classique, t'as déjà un pied dedans.",
    category: "Acteurs",
    schemaType: "DefinedTerm",
    tip: "Gemini favorise naturellement les sites qui respectent les critères E-E-A-T de Google.",
  },

  // === SIGNAUX D'AUTORITÉ ===
  {
    term: "E-E-A-T",
    definition:
      "Ça veut dire : Experience, Expertise, Authoritativeness, Trustworthiness. En français : Est-ce que t'as l'expérience, l'expertise, l'autorité et la confiance nécessaires pour parler de ce sujet ?",
    category: "Signaux d'autorité",
    schemaType: "DefinedTerm",
    keyPoints: [
      "Experience : T'as vraiment testé le produit ? T'as géré des projets similaires ?",
      "Expertise : T'es diplômé / certifié / reconnu dans le domaine ?",
      "Authoritativeness : D'autres sites font des liens vers toi ? T'es cité dans la presse ?",
      "Trustworthiness : Ton site est sécurisé (HTTPS) ? T'as une vraie entreprise derrière ?",
    ],
    example:
      "Si tu vends des formations en nutrition, l'E-E-A-T ce serait d'avoir une bio qui mentionne ton diplôme de nutritionniste, des témoignages clients, et des articles publiés dans des magazines santé.",
  },
  {
    term: "Backlinks",
    definition:
      "Les liens d'autres sites vers le tien. C'est comme des votes de confiance sur internet. 1 backlink du Monde ou de TechCrunch > 100 backlinks de blogs pourris.",
    category: "Signaux d'autorité",
    schemaType: "DefinedTerm",
    tip: "Les IA utilisent les backlinks pour jauger si t'es une source fiable. Plus t'as de backlinks de qualité, plus t'as de chances d'être cité.",
  },
  {
    term: "Citations",
    definition:
      "Quand une IA te mentionne dans sa réponse. C'est le Saint Graal du GEO.",
    category: "Signaux d'autorité",
    schemaType: "DefinedTerm",
    tip: "Une citation c'est pas juste une mention de ton nom, c'est une vraie recommandation avec le lien vers ton site. Genre : \"Selon [TonSite], les startups devraient privilégier...\"",
  },

  // === TECHNIQUE ===
  {
    term: "Schema.org",
    definition:
      "Des petits bouts de code que tu ajoutes à ton site pour expliquer aux machines ce qu'il contient. C'est comme mettre des étiquettes sur tes contenus.",
    category: "Technique",
    schemaType: "DefinedTerm",
    keyPoints: [
      "FAQPage : Pour tes sections Questions/Réponses",
      "Article : Pour tes articles de blog (avec auteur, date, etc.)",
      "HowTo : Pour tes tutoriels étape par étape",
      "Organization : Pour présenter ton entreprise",
      "Product : Si tu vends des produits",
    ],
    tip: "Les IA adorent les données structurées. Ça leur facilite le boulot pour comprendre et extraire l'info pertinente.",
  },
  {
    term: "Crawlabilité",
    definition:
      "La capacité des robots (Google, mais aussi les IA) à explorer ton site.",
    category: "Technique",
    schemaType: "DefinedTerm",
    keyPoints: [
      "Paywall : Si ton contenu est derrière un abonnement",
      "JavaScript lourd : Si tout ton contenu charge en JS, certains crawlers galèrent",
      "Robots.txt mal configuré : Tu peux littéralement bloquer les IA sans le savoir",
    ],
    tip: "Vérifie ton robots.txt, cherche la ligne sur \"GPTBot\" ou \"CCBot\" (le crawler de ChatGPT et Common Crawl). Si c'est bloqué, débloque-le.",
  },
  {
    term: "Sitemap.xml",
    definition:
      "Le plan de ton site. C'est un fichier qui liste toutes tes pages pour que les robots sachent quoi explorer.",
    category: "Technique",
    schemaType: "DefinedTerm",
    example: "Où le trouver : tonsite.com/sitemap.xml",
    tip: "Si t'as pas de sitemap, les IA risquent de louper des pages importantes de ton site.",
  },

  // === CONTENU ===
  {
    term: "RAG (Retrieval-Augmented Generation)",
    definition:
      "Le processus qu'utilisent les IA pour répondre : Elles cherchent des docs pertinents (Retrieval), elles extraient les passages clés, elles génèrent une réponse en se basant dessus (Generation).",
    category: "Contenu",
    schemaType: "DefinedTerm",
    tip: "Ton contenu doit être \"extractable\". Une phrase ou un paragraphe de ton site doit pouvoir se suffire à lui-même pour répondre à une question.",
  },
  {
    term: "Question-Réponse (Q&R)",
    definition:
      "Structurer ton contenu comme si tu répondais à des questions précises.",
    category: "Contenu",
    schemaType: "DefinedTerm",
    example:
      "❌ Mauvais : Un pavé de 500 mots qui parle vaguement de \"nos services\"\n✅ Bon : Un H2 \"Comment choisir son CRM ?\" suivi d'une réponse claire en 3 paragraphes",
    tip: "Utilise AnswerThePublic ou simplement l'autocomplétion de Google pour trouver les vraies questions que les gens posent.",
  },
  {
    term: "FAQ (Foire Aux Questions)",
    definition:
      "Une section dédiée aux questions fréquentes. Mais pas juste 3 questions molles du type \"Vous livrez où ?\".",
    category: "Contenu",
    schemaType: "DefinedTerm",
    keyPoints: [
      "Au moins 5-10 questions",
      "Questions formulées comme les gens les poseraient à une IA",
      "Réponses détaillées (pas juste une phrase)",
      "Balisage Schema.org FAQPage",
    ],
    example:
      "Bonne question : \"Quelle est la différence entre un CRM et un ERP ?\" plutôt que \"C'est quoi votre logiciel ?\".",
  },
  {
    term: "Contenu factuel",
    definition: "Des infos vérifiables, pas du blabla marketing.",
    category: "Contenu",
    schemaType: "DefinedTerm",
    keyPoints: [
      "Les chiffres : \"67% des startups échouent à cause de...\"",
      "Les dates : \"Mise à jour : janvier 2026\"",
      "Les sources : \"Selon une étude de Gartner...\"",
      "Les exemples concrets : \"Netflix utilise ce type d'architecture pour...\"",
    ],
    tip: "Les IA détestent : le vague (\"Beaucoup de gens pensent que...\"), les superlatifs non prouvés (\"Le meilleur logiciel du marché !\"), les généralités (\"Dans le monde numérique d'aujourd'hui...\").",
  },

  // === PIÈGES ===
  {
    term: "Contenu généré par IA non édité",
    definition:
      "Oui, l'ironie. Si tu génères ton contenu avec ChatGPT et que tu le balances tel quel sur ton site, les IA vont le détecter et ne pas le citer.",
    category: "Pièges",
    schemaType: "DefinedTerm",
    tip: "Les IA reconnaissent leur propre style générique. Et surtout, ce contenu n'apporte rien d'unique. Utilise l'IA comme assistant, mais ajoute ton expérience perso, tes données, ton angle unique.",
  },
  {
    term: "Paywall",
    definition: "Mettre ton meilleur contenu derrière un mur de paiement.",
    category: "Pièges",
    schemaType: "DefinedTerm",
    tip: "Les IA ne peuvent pas crawler le contenu payant, donc elles ne le citent jamais. Garde au moins tes pages \"pilier\" (guides, lexiques, FAQ) en accès libre.",
  },
  {
    term: "Duplication de contenu",
    definition:
      "Copier-coller du contenu d'autres sites ou même répéter le même contenu sur plusieurs de tes pages.",
    category: "Pièges",
    schemaType: "DefinedTerm",
    tip: "Les IA privilégient les sources originales. Si tu copies, elles vont citer l'original, pas toi.",
  },

  // === OUTILS ===
  {
    term: "Core Web Vitals",
    definition:
      "Les métriques de Google pour mesurer la vitesse et l'expérience utilisateur de ton site. Ça inclut le temps de chargement, la stabilité visuelle, etc.",
    category: "Outils",
    schemaType: "DefinedTerm",
    tip: "Un site lent = les crawlers des IA galèrent à le lire = moins de chances d'être cité. Teste sur PageSpeed Insights de Google (gratuit).",
  },
  {
    term: "Position zero",
    definition:
      "Dans le SEO classique, c'est la featured snippet de Google (l'encadré qui apparaît tout en haut).",
    category: "Outils",
    schemaType: "DefinedTerm",
    tip: "Les IA cherchent le contenu qui répond le mieux à la question de manière directe et factuelle. Si t'as déjà la position zero sur Google, t'as de bonnes chances d'être cité par les IA.",
  },

  // === TENDANCES ===
  {
    term: "SGE (Search Generative Experience)",
    definition:
      "Le nouveau système de Google qui intègre l'IA directement dans les résultats de recherche. Quand tu cherches sur Google, tu peux avoir une réponse générée par IA avant les résultats classiques.",
    category: "Tendances",
    schemaType: "DefinedTerm",
    tip: "Ça brouille encore plus la frontière entre SEO et GEO. Il va falloir optimiser pour les deux.",
  },
  {
    term: "Conversational Search",
    definition:
      "Les gens ne tapent plus \"restaurant italien Paris 15\", ils demandent \"Trouve-moi un bon resto italien pas cher dans le 15ème où je peux amener mon chien\".",
    category: "Tendances",
    schemaType: "DefinedTerm",
    tip: "Ton contenu doit répondre à des questions complexes et contextualisées, pas juste matcher des mots-clés.",
  },

  // === GLOSSAIRE EXPRESS ===
  {
    term: "Indexation",
    definition:
      "Le fait qu'un moteur de recherche (ou une IA) ait enregistré ton site dans sa base de données.",
    category: "Glossaire",
    schemaType: "DefinedTerm",
  },
  {
    term: "HTTPS",
    definition:
      "Le petit cadenas dans la barre d'adresse. Ça veut dire que ton site est sécurisé. Obligatoire en 2026.",
    category: "Glossaire",
    schemaType: "DefinedTerm",
  },
  {
    term: "Alt text",
    definition:
      "Le texte alternatif sur tes images. Utile pour l'accessibilité mais aussi pour que les IA comprennent ce qu'il y a sur l'image.",
    category: "Glossaire",
    schemaType: "DefinedTerm",
  },
  {
    term: "Breadcrumbs",
    definition:
      "Le petit fil d'Ariane en haut de page (Accueil > Blog > Article). Aide à la navigation et à la compréhension de la structure.",
    category: "Glossaire",
    schemaType: "DefinedTerm",
  },
  {
    term: "H1, H2, H3...",
    definition:
      "Les niveaux de titres dans ton HTML. H1 = titre principal, H2 = sous-titre, etc. Respecte la hiérarchie, les IA adorent ça.",
    category: "Glossaire",
    schemaType: "DefinedTerm",
  },
];

// Helper pour grouper les termes par catégorie
export const getTermsByCategory = (): Record<LexiqueCategory, LexiqueTerm[]> => {
  const grouped: Record<LexiqueCategory, LexiqueTerm[]> = {
    Bases: [],
    Acteurs: [],
    "Signaux d'autorité": [],
    Technique: [],
    Contenu: [],
    Pièges: [],
    Outils: [],
    Tendances: [],
    Glossaire: [],
  };

  lexiqueTerms.forEach((term) => {
    grouped[term.category].push(term);
  });

  return grouped;
};
