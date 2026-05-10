export const trustMetrics = [
  {
    value: "2 500+",
    label: "patients accompagnés avec une prise en charge personnalisée"
  },
  {
    value: "15 ans",
    label: "d'expertise cumulée sur les protocoles esthétiques et implantaires"
  },
  {
    value: "98 %",
    label: "de satisfaction sur l'accueil, le confort et la clarté du parcours"
  }
];

export const services = [
  {
    title: "Implantologie",
    description:
      "Remplacement des dents manquantes avec planification numérique, chirurgie guidée et restauration esthétique durable.",
    points: [
      "Bilan implantaire 3D et stratégie personnalisée",
      "Pose précise et mini-invasive",
      "Intégration naturelle du sourire"
    ]
  },
  {
    title: "Orthodontie",
    description:
      "Correction de l'alignement avec des approches discrètes et contemporaines, adaptées à l'adulte comme à l'adolescent.",
    points: [
      "Aligneurs transparents et solutions ciblées",
      "Suivi régulier et plan de progression lisible",
      "Objectif esthétique et fonctionnel"
    ]
  },
  {
    title: "Facettes Dentaires",
    description:
      "Sublimation du sourire grâce à des facettes sur mesure, pensées pour préserver l'harmonie et la lumière naturelle des dents.",
    points: [
      "Conception esthétique sur mesure",
      "Matériaux céramiques premium",
      "Finition élégante et naturelle"
    ]
  },
  {
    title: "Blanchiment",
    description:
      "Protocoles de blanchiment professionnels pour raviver l'éclat du sourire tout en respectant la sensibilité dentaire.",
    points: [
      "Analyse préalable de la teinte",
      "Traitements au fauteuil ou combinés",
      "Résultat lumineux et homogène"
    ]
  }
];

export const beforeAfterCases = [
  {
    category: "Esthétique",
    title: "Réhabilitation d'un sourire visible et harmonieux",
    description:
      "Un exemple de carte orientée conversion pour mettre en avant une transformation esthétique nette, crédible et rassurante.",
    technique: "Facettes céramiques et rééquilibrage du sourire",
    resultat: "Ligne du sourire adoucie et teinte homogénéisée",
    beforeImage: "/images/transformations/smile_before_est.png",
    afterImage: "/images/transformations/smile_after_est.png"
  },
  {
    category: "Orthodontie",
    title: "Alignement discret et restauration de la symétrie",
    description:
      "Une mise en page pensée pour montrer l'évolution d'un cas orthodontique avec un rendu premium et très lisible.",
    technique: "Aligneurs transparents et contrôle occlusal",
    resultat: "Arcades recentrées et meilleure lecture du visage",
    beforeImage: "/images/transformations/smile_before_ortho.png",
    afterImage: "/images/transformations/smile_after_ortho.png"
  },
  {
    category: "Implantologie",
    title: "Remplacement précis d'une dent antérieure",
    description:
      "Cette variation illustre la capacité à rassurer sur la naturalité du résultat final dans les zones les plus visibles.",
    technique: "Implant unitaire et couronne esthétique sur mesure",
    resultat: "Intégration naturelle dans le sourire",
    beforeImage: "/images/transformations/smile_before_impl.png",
    afterImage: "/images/transformations/smile_after_impl.png"
  }
];

export const teamMembers = [
  {
    name: "Dr Salma Bennis",
    initials: "SB",
    role: "Chirurgienne-dentiste | Implantologie et réhabilitation orale",
    bio: "Le Dr Salma Bennis accompagne les cas complexes avec une approche alliant précision chirurgicale, confort patient et esthétique durable.",
    highlight: "Référente en planification implantaire et chirurgie guidée",
    tags: ["Implantologie", "Chirurgie guidée", "Esthétique"],
    image: "/images/team/dentist_sb.png"
  },
  {
    name: "Dr Youssef El Idrissi",
    initials: "YE",
    role: "Chirurgien-dentiste | Orthodontie et occlusion",
    bio: "Le Dr Youssef El Idrissi conçoit des protocoles d'alignement élégants, discrets et pédagogiques, adaptés aux attentes des patients exigeants.",
    highlight: "Spécialiste des plans de traitement à forte visibilité esthétique",
    tags: ["Orthodontie", "Aligneurs", "Fonction"],
    image: "/images/team/dentist_ye.png"
  },
  {
    name: "Dr Claire Martin",
    initials: "CM",
    role: "Chirurgienne-dentiste | Dentisterie esthétique",
    bio: "Le Dr Claire Martin travaille les facettes, la teinte et l'harmonie globale du sourire avec une recherche constante de naturel et d'équilibre.",
    highlight: "Experte en facettes dentaires et finitions premium",
    tags: ["Facettes", "Blanchiment", "Design du sourire"],
    image: "/images/team/dentist_cm.png"
  }
];

export const consultationMotifs = [
  "Douleur",
  "Esthétique",
  "Contrôle",
  "Autre"
] as const;

export const reservationBenefits = [
  "Confirmation transmise au secrétariat avec rappel rapide.",
  "Préqualification du besoin avant la première consultation.",
  "Parcours fluide et discret, pensé pour une clientèle exigeante."
];

export const contactInfo = {
  addressLabel: "Adresse",
  addressText: "Avenue med 5 Casablanca",
  addressHref: "https://maps.google.com/?q=Avenue+med+5+Casablanca",
  phoneLabel: "Téléphone",
  phoneText: "05 22 23 24 25",
  phoneHref: "tel:+212522232425",
  whatsappLabel: "WhatsApp",
  whatsappText: "07 00 63 47 63",
  whatsappHref: "https://wa.me/212700634763",
  instagramLabel: "Instagram",
  instagramText: "@simo_toulib",
  instagramHref:
    "https://www.instagram.com/simo_toulib?igsh=MWJsY2lxY2gyZm5jbg=="
} as const;
