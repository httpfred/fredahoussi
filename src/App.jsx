import React, { useState, useEffect, useCallback, useRef } from 'react';

// Import des images locales
import projet1 from './assets/img/work/unikdress.png';
import projet2 from './assets/img/work/oriplat.png';
import projet3 from './assets/img/work/showilink.png';

// Ou import groupé
const images = {
  projet1: require('./assets/img/work/unikdress.png'),
  projet2: require('./assets/img/work/oriplat.png'),
  projet3: require('./assets/img/work/showilink.png'),
};

const App = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [animate, setAnimate] = useState(true);
  const [snap, setSnap] = useState(true);
  const [hueStart, setHueStart] = useState(0);
  const [hueEnd, setHueEnd] = useState(360);
  const [showArrow, setShowArrow] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Refs pour les animations d'apparition
  const headerRef = useRef(null);
  const workRef = useRef(null);
  const portfolioRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  // Portfolio content
  const portfolioItems = [
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
    {
      id: 3,
      title: 'Mobile Application Suite',
      category: 'Event / Mobile App',
      image: projet3,
      description: 'Cross-platform mobile apps for iOS and Android with React Native.',
      tags: ['React Native', 'Firebase'],
    },
  ];

  // Scroll words with associated illustrations
  const scrollWords = [
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
  const workExperiences = [
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
      logo: '🏢'
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
      logo: '🏢'
    },
    {
      id: 3,
      company: 'PROGI-TECK.',
      position: 'DEVELOPPEUR – DÉSIGNER – COMMUNITY MANAGER STAGIAIRE',
      period: '19 Aout 2024 – 1 Octobre 2024',
      description: 'Digital Group',
      achievements: [
        'Conception et maintenance d’applications web',
        'Mise sur pied d’une identité visuelle',
        'Mise en production des applications'
      ],
      logo: '🏢'
    },
    {
      id: 4,
      company: 'ACTIV.',
      position: 'DEVELOPPEUR STAGIAIRE',
      period: '17 Avril 2023 – 02 Octobre 2023',
      description: 'Digital Group',
      achievements: [
        'Conception et maintenance d`\’applications web et mobile',
      ],
      logo: '🏢'
    },
    {
      id: 5,
      company: 'OREO GROUP.',
      position: 'DEVELOPPEUR WEB – DÉSIGNER',
      period: '22 Août 2022 – 03 Mars 202',
      description: 'Startup',
      achievements: [
        'Conception et maintenance d’applications web et mobile',
        'Mise sur pied d’une identité visuelle',
        'Mise en production des applications'
      ],
      logo: '🏢'
    }
  ];

  const skills = {
    frontend: ['Javascript', 'React.js', 'Vue.js', 'Angular', 'TypeScript', 'Jquery', 'Flask', 'Tailwind CSS', 'Bootstrap'],
    backend: ['Node.js', 'Laravel', 'Firebase'],
    SGBD: ['MySQL', 'SQLite'],
    mobile: ['React Native',],
    CMS: ['Wordpress'],
    Versioning: ['Git (Github)'],
    design: ['Figma', 'Canvas', 'Photoshop', 'Adobe Illustrator', 'Premiere Pro']
  };

  // Intersection Observer pour les animations d'apparition
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = [headerRef.current, workRef.current, portfolioRef.current, aboutRef.current, contactRef.current];
    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Detect active word on scroll
  useEffect(() => {
    const handleWordScroll = () => {
      const words = document.querySelectorAll('.scroll-word');
      const windowHeight = window.innerHeight;

      words.forEach((word, index) => {
        const rect = word.getBoundingClientRect();
        const isVisible = rect.top >= windowHeight * 0.3 && rect.top <= windowHeight * 0.7;

        if (isVisible) {
          setActiveWordIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleWordScroll);
    return () => window.removeEventListener('scroll', handleWordScroll);
  }, []);

  // Handle theme with body class for grid
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      body.classList.remove('light');
      body.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      body.classList.remove('dark');
      body.classList.add('light');
    } else {
      root.classList.remove('dark', 'light');
      body.classList.remove('dark', 'light');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark');
      } else {
        body.classList.add('light');
      }
    }
  }, [theme]);

  // Update CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--hue-start', hueStart);
    document.documentElement.style.setProperty('--hue-end', hueEnd);
  }, [hueStart, hueEnd]);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(scrollY / maxScroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse move effect
  const handleMouseMove = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Remove arrow on interaction
  useEffect(() => {
    const handleInteraction = () => setShowArrow(false);
    ['click', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, handleInteraction);
    });
    return () => {
      ['click', 'scroll', 'touchstart'].forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Background Grid Pattern */}
      <div className="custom-grid"></div>

      {/* Content wrapper with higher z-index */}
      <div className="relative z-10">
        {/* Custom cursor */}
        <div
          className="fixed w-8 h-8 rounded-full pointer-events-none z-50 transition-all duration-150 ease-out hidden lg:block"
          style={{
            transform: `translate(${mousePosition.x - 16}px, ${mousePosition.y - 16}px)`,
            background: `radial-gradient(circle, oklch(65% 0.3 ${hueStart}) 0%, transparent 70%)`,
            opacity: 0.15
          }}
        />

        {/* Progress bar */}
        <div
          className="fixed top-0 left-0 h-1 z-50 transition-all duration-100"
          style={{
            width: `${scrollProgress * 100}%`,
            background: `oklch(65% 0.3 ${hueStart})`
          }}
        />

        {/* Header Section avec animation */}
        <div ref={headerRef} className="section-fade-up">
          <header className="min-h-screen flex flex-col justify-center items-start px-8 md:px-20 relative">
            <h1
              className="text-6xl md:text-8xl lg:text-9xl leading-[0.8] mb-8 text-white dark:text-black font-bold"
            >
              I'm Fred<br />Developer.
            </h1>
          </header>
        </div>

        <main>
          {/* Work Experience Section avec animation */}
          <div ref={workRef} className="section-fade-up">
            <section className="min-h-screen py-20 px-4 md:px-16">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold text-white dark:text-black mb-12 text-center">
                  Work Experience
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {workExperiences.map((exp, index) => (
                    <div
                      key={exp.id}
                      className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:transform hover:-translate-y-2 card-hover"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="text-5xl mb-4">{exp.logo}</div>
                      <h3 className="text-xl font-bold text-white mb-1">{exp.company}</h3>
                      <p className="text-sm text-white/60 mb-2">{exp.position}</p>
                      <p className="text-xs text-white/40 mb-4">{exp.period}</p>
                      <p className="text-sm text-white/80 mb-4">{exp.description}</p>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-xs text-white/60 flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Portfolio Showcase Section avec animation */}
          <div ref={portfolioRef} className="section-fade-up">
            <section className="min-h-screen py-16 px-4 md:py-20 md:px-16">
              <h2 className="text-4xl md:text-6xl font-bold text-white dark:text-black mb-12 text-center">
                Projects completed
              </h2>
              <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] container mx-auto">
                {/* Tabs */}
                <div className={`
                  absolute left-0 right-0 z-10 flex justify-center gap-2 flex-wrap
                  md:-bottom-16 -bottom-28 pb-4 md:pb-0
                `}>
                  {portfolioItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSlide(index)}
                      className={`
                        px-3 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium
                        transition-all duration-300 cursor-pointer
                        ${activeSlide === index
                          ? 'bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg scale-105'
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700'
                        }
                      `}
                    >
                      {item.category}
                    </button>
                  ))}
                </div>

                {/* Panels */}
                <div className="relative w-full h-full">
                  {portfolioItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`
                        absolute inset-0 transition-all duration-700 ease-out
                        ${activeSlide === index
                          ? 'opacity-100 visible z-10'
                          : 'opacity-0 invisible z-0'
                        }
                      `}
                      style={{ zIndex: activeSlide === index ? 10 : 0 }}
                    >
                      <div className="relative w-full h-full rounded-2xl overflow-hidden group border border-light bg-white p-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className={`
                            w-full h-full object-contain transition-transform duration-[10s] ease-out
                            ${activeSlide === index ? 'scale-105' : 'scale-100'}
                          `}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className={`
                          absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12 text-white
                          transition-all duration-700 delay-200
                          ${activeSlide === index
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-8 opacity-0'
                          }
                        `}>
                          <div className="max-w-2xl">
                            <div className="flex gap-3 md:gap-4">
                              <a href="/" className="px-4 md:px-6 py-2 md:py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90 hover:translate-x-1 transition-all">
                                View Project →
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* About Section avec animation */}
          <div ref={aboutRef} className="section-fade-up">
            <section className="min-h-screen py-20 px-8 md:px-20 flex items-center">
              <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
                <div>
                  <h2 className="text-5xl md:text-7xl mb-6 text-white dark:text-black font-bold">
                    About<br />me.
                  </h2>
                  <p className="text-lg leading-relaxed opacity-80 mb-8 text-white dark:text-black">
                    I'm a creative developer and designer who builds exceptional digital experiences.
                    With over 3 years of experience, I've helped brands from startups to enterprises
                    bring their visions to life through innovative design and robust development.
                  </p>
                  <div className="flex gap-8 md:gap-12">
                    {[
                      { number: '10+', label: 'Projects' },
                      { number: '10+', label: 'Clients' },
                    ].map((stat, i) => (
                      <div key={i} className="text-center md:text-left">
                        <div className="text-3xl md:text-4xl font-bold text-white dark:text-black">
                          {stat.number}
                        </div>
                        <div className="text-sm opacity-60 text-white dark:text-black">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                  {Object.entries(skills).map(([category, items]) => (
                    <div key={category}>
                      <h4 className="text-lg font-medium mb-4 capitalize text-white dark:text-black">{category}</h4>
                      <ul className="space-y-2">
                        {items.map(skill => (
                          <li key={skill} className="text-sm opacity-70 py-1 border-b border-gray-400 dark:border-gray-600 text-white dark:text-black">
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Contact Section avec animation */}
          <div ref={contactRef} className="section-fade-up">
            <section className="min-h-[70vh] flex items-center justify-center text-center py-16 px-8">
              <div>
                <h2 className="text-5xl md:text-7xl lg:text-8xl mb-8 text-white dark:text-black font-bold">
                  let's<br />create.
                </h2>
                <div className="space-y-4">
                  <a href="mailto:hello@fredahoussi.dev" className="text-xl md:text-2xl hover:opacity-60 transition-opacity block text-white dark:text-black">
                    hello@fredahoussi.dev
                  </a>
                  <div className="flex gap-6 justify-center pt-8">
                    {['GitHub', 'LinkedIn', 'Twitter'].map(social => (
                      <a key={social} href="/" className="text-sm hover:opacity-60 transition-opacity text-white dark:text-black">
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        <footer className="text-center py-8 opacity-50 text-sm text-white dark:text-black">
          <p>fredahoussi.dev &copy; 2026</p>
        </footer>
      </div>
    </div>
  );
};

export default App;