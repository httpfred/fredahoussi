// Import des images locales
import projet1 from '../assets/img/work/unikdress.png';
import projet2 from '../assets/img/work/oriplat.png';
import projet3 from '../assets/img/work/showilink.png';

// Ou import groupé
export const images = {
    projet1: require('../assets/img/work/unikdress.png'),
    projet2: require('../assets/img/work/oriplat.png'),
    projet3: require('../assets/img/work/showilink.png'),
};

// Portfolio content
export const portfolioItems = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        category: 'E-commerce / Web App',
        image: projet1,
        description: 'Full-stack e-commerce solution with seamless payment integration.',
        tags: ['React', 'Node.js', 'Stripe'],
    },
    {
        id: 2,
        title: 'Mobile Application Suite',
        category: 'Food / Mobile App',
        image: projet2,
        description: 'Cross-platform mobile apps for iOS and Android with React Native.',
        tags: ['React Native', 'Firebase'],
    },
    // {
    //     id: 3,
    //     title: 'Mobile Application Suite',
    //     category: 'Event / Mobile App',
    //     image: projet3,
    //     description: 'Cross-platform mobile apps for iOS and Android with React Native.',
    //     tags: ['React Native', 'Firebase'],
    // },
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
        period: '10 Juin 2025 – 10 Décembre 2025',
        description: 'Fintech Group',
        achievements: [
            'Conception et maintenance de plateformes web',
            'Elaboration de plans et cas de tests pour des API de paiement',
            'Tests manuels via Postman (authentification, transactions, erreurs)',
            'Reporting des résultats et anomalies dans Excel'
        ],
        logo: '..'
    },
    {
        id: 2,
        company: 'OXYGENE CI.',
        position: 'Developer Remote',
        period: '24 Mars 2025 – 06 juin 2025',
        description: 'Digital Group',
        achievements: [
            'Conception et maintenance d’applications web',
        ],
        logo: '..'
    },
    {
        id: 3,
        company: 'PROGI-TECK.',
        position: 'Developer – Designer – Intern Community manager',
        period: '19 Aout 2024 – 1 Octobre 2024',
        description: 'Digital Group',
        achievements: [
            'Conception et maintenance d’applications web',
            'Mise sur pied d’une identité visuelle',
            'Mise en production des applications'
        ],
        logo: '..'
    },
    {
        id: 4,
        company: 'ACTIV.',
        position: 'Intern Developer',
        period: '17 Avril 2023 – 02 Octobre 2023',
        description: 'Digital Group',
        achievements: [
            'Conception et maintenance d`\’applications web et mobile',
        ],
        logo: '..'
    },
    {
        id: 5,
        company: 'OREO GROUP.',
        position: 'Web Developer – Designer',
        period: '22 Août 2022 – 03 Mars 2022',
        description: 'Startup',
        achievements: [
            'Conception et maintenance d’applications web et mobile',
            'Mise sur pied d’une identité visuelle',
            'Mise en production des applications'
        ],
        logo: '..'
    }
];

export const skills = {
    frontend: ['Javascript', 'React.js', 'Vue.js', 'Angular', 'TypeScript', 'Jquery', 'Flask', 'Tailwind CSS', 'Bootstrap'],
    backend: ['Node.js', 'Laravel', 'Firebase'],
    SGBD: ['MySQL', 'SQLite'],
    mobile: ['React Native',],
    CMS: ['Wordpress'],
    Versioning: ['Git (Github)'],
    design: ['Figma', 'Canvas', 'Photoshop', 'Adobe Illustrator', 'Premiere Pro']
};