// Import des images locales
import projet1 from '../assets/img/work/unikdress.png';
import projet2 from '../assets/img/work/oriplat.png';
import projet3 from '../assets/img/work/agricopay.png';
import projet4 from '../assets/img/work/uligpro.png';

// Ou import groupé
export const images = {
    projet1: require('../assets/img/work/unikdress.png'),
    projet2: require('../assets/img/work/oriplat.png'),
    projet3: require('../assets/img/work/agricopay.png'),
    projet4: require('../assets/img/work/uligpro.png'),
};

// Portfolio content
export const portfolioItems = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        category: 'E-commerce / Web App',
        image: projet1,
        description: 'E-commerce platform for DonHugo, Fashion Designer in Ivory Coast, built with Vue.Js and Firebase.',
        tags: ['Vue.js', 'Node.js', 'Stripe'],
        url: "",
        technologies: ["Vue.js", "Tailwind", "Firebase", "Stripe"]
    },
    {
        id: 2,
        title: 'Oriplat Mobile App',
        category: 'Food / Mobile App',
        image: projet2,
        description: 'Food delivery app for Oriplat, a restaurant in Ivory Coast, built with React Native and Firebase.',
        tags: ['React Native', 'Firebase'],
        url: "",
        technologies: ["React Native", "Laravel", "Firebase", 'MySQL']
    },
    {
        id: 3,
        title: 'Agricopay Mobile App',
        // title: 'Mobile Application Suite',
        category: 'POS / Mobile App',
        image: projet3,
        description: 'Agricopay enables farmers to purchase agricultural products(pesticides, fertilizers, seeds, etc.) from points of sale(POS) with flexible payment options: cash, mobile money.',
        tags: ['Fluter', 'Laravel'],
        url: "",
        technologies: ["Flutter", "Laravel", "SQLite"]
    },
    {
        id: 4,
        title: 'Uligpro Web App',
        // title: 'Mobile Application Suite',
        category: 'Soccer / Web App',
        image: projet4,
        description: 'Develop a solution for     selling tickets to     sporting events     and purchasing jerseys.',
        tags: ['Vue.js', 'Laravel'],
        url: "",
        technologies: ["Vue.js", "Laravel", "MySQL"]
    },
];

// Scroll words with associated illustrations
export const scrollWords = [
    { text: 'design.', illustration: '🎨' },
    { text: 'solve.', illustration: '🧩' },
    { text: 'build.', illustration: '🏗️' },
    { text: 'develop.', illustration: '💻' },
    { text: 'debug.', illustration: '🐛' },
    { text: 'learn.', illustration: '📚' },
    { text: 'create.', illustration: '✨' },
    { text: 'innovate.', illustration: '💡' },
    { text: 'optimize.', illustration: '⚡' },
    { text: 'inspire.', illustration: '🌟' },
    { text: 'coding.', illustration: '⌨️' }
];

// Work experience data
export const workExperiences = [
    {
        id: 1,
        company: 'I-MONEY AFRICA.',
        position: 'Full Stack Developer',
        grade: 'Intern',
        period: 'Juin 2025 – Décembre 2025',
        description: 'Fintech Group',
        achievements: [
            'Conception et maintenance de plateformes web',
            'Elaboration de plans et cas de tests pour des API de paiement',
            'Réalisation de tests manuels avec Postman (authentification, transactions, gestion des erreurs)',
            'Analyse et reporting des anomalies détectées',
            'Collaboration avec les équipes techniques pour la validation des fonctionnalités'
        ],
        stacks: [
            'React.js',
            'Vue.js',
            'Postman',
            'Git (GitHub)',
        ],
        logo: '>_'
    },
    {
        id: 2,
        company: 'OXYGENE CI.',
        position: 'Developer',
        grade: 'Remote',
        period: 'Juin 2025 – Juin 2025',
        description: 'Digital Group',
        achievements: [
            'Conception et maintenance d’applications web',
        ],
        stacks: [
            'React.js',
            'PHP',
            'MySQL',
            'Git (GitHub)',
        ],
        logo: '>_'
    },
    {
        id: 3,
        company: 'PROGI-TECK.',
        position: 'Developer – Designer – Community manager',
        grade: 'CDD',
        period: 'Juin 2024 – Octobre 2024',
        description: 'Digital Group',
        achievements: [
            'Conception et maintenance d’applications web',
            'Mise sur pied d’une identité visuelle',
            'Mise en production des applications'
        ],
        stacks: [
            'Laravel',
            'MySQL',
            'Bootstrap',
            'Javascript',
        ],
        logo: '>_'
    },
    {
        id: 4,
        company: 'ACTIV.',
        position: 'Developer',
        grade: 'Intern',
        period: 'Juin 2023 – Octobre 2023',
        description: 'Digital Group',
        achievements: [
            'Conception et maintenance d`\’applications web et mobile',
        ],
        stacks: [
            'C#',
            'SQL Server',
            'Flutter',
            'Bootstrap',
            'Javascript',
        ],
        logo: '>_'
    },
    {
        id: 5,
        company: 'OREO GROUP.',
        position: 'Web Developer – Designer',
        grade: 'CDD',
        period: 'Juin 2022 – Mars 2022',
        description: 'Startup',
        achievements: [
            'Conception et maintenance d’applications web et mobile',
            'Mise sur pied d’une identité visuelle',
            'Mise en production des applications'
        ],
        stacks: [
            'Wordpress',
            'PHP',
            'Javascript',
            'Photoshop',
            'Canva',
        ],
        logo: '>_'
    }
];

export const skills = {
    FRONTEND: ['Javascript', 'React.js', 'Vue.js', 'Angular', 'TypeScript', 'Jquery', 'Flask', 'Tailwind CSS', 'Bootstrap'],
    BACKEND: ['Node.js', 'Laravel', 'Spring Boot', 'Firebase'],
    DATABASE: ['MySQL', 'SQLite', 'NoSQL'],
    MOBILE: ['React Native', 'Flutter'],
    CMS: ['Wordpress'],
    // 'VERSIONING & CI/CD': ['Git (GitHub)', 'Docker', 'GitHub Actions'],
    DESIGN: ['Figma', 'Canva', 'Photoshop', 'Adobe Illustrator', 'Premiere Pro'],
    // 'APIs / TESTING TOOLS': ['Postman'],
    // 'MANAGEMENT METHODS': ['Agile', 'Scrum', 'UML']
};

export const socials = [
    { name: 'GitHub', url: 'https://github.com/httpfred' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/fredahoussi/' },
];