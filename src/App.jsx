import React, { useState, useEffect, useCallback, useRef } from 'react';
import { skills, workExperiences, scrollWords, portfolioItems, socials } from './utils/constants';
import { Analytics } from '@vercel/analytics/react';

// Composant Typewriter pour effet machine à écrire
const TypewriterText = ({ texts = ["Developer.", "Designer."], typingSpeed = 100, deletingSpeed = 50, pauseDuration = 1500 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const currentText = texts[currentTextIndex];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(prev => currentText.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && displayText === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    }
    else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex, texts, typingSpeed, deletingSpeed, pauseDuration, isVisible]);

  return (
    <span ref={elementRef} className="inline-block">
      {displayText}
      <span className="inline-block w-[2px] h-[0.8em] bg-white ml-1 animate-blink"></span>
    </span>
  );
};

// Composant Scroll Indicator
const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      onClick={handleClick}
    >
      <span className="text-sm text-white/70 dark:text-black/70 font-medium tracking-wider">
        Discovery
      </span>
      <div className="flex flex-col items-center gap-1">
        <div className="w-6 h-10 border-2 border-white/50 dark:border-black/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-white/70 dark:bg-black/70 rounded-full animate-scroll-mouse"></div>
        </div>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-white/50 dark:bg-black/50 rounded-full animate-scroll-dot-1"></div>
          <div className="w-1.5 h-1.5 bg-white/50 dark:bg-black/50 rounded-full animate-scroll-dot-2"></div>
          <div className="w-1.5 h-1.5 bg-white/50 dark:bg-black/50 rounded-full animate-scroll-dot-3"></div>
        </div>
      </div>
    </div>
  );
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

        {/* Header Section avec animation Typewriter et Scroll Indicator */}
        <div ref={headerRef} className="section-fade-up min-h-screen relative">
          <header className="min-h-screen flex flex-col justify-center items-start px-8 md:px-20">
            <h1 className="text-6xl md:text-8xl lg:text-9xl leading-[0.8] mb-8 text-white dark:text-black font-bold">
              I'm Fred<br />
              <div className="flex flex-wrap items-center gap-2">
                <TypewriterText texts={["Developer.", "Designer."]} typingSpeed={120} deletingSpeed={60} pauseDuration={1500} />
              </div>
            </h1>
          </header>

          {/* Scroll Indicator */}
          <ScrollIndicator />
        </div>

        <main>
          {/* Portfolio Showcase Section avec animation */}
          <div ref={portfolioRef} className="section-fade-up">
            <section className="min-h-screen py-16 px-4 md:py-20 md:px-16">
              <h2 className="text-4xl md:text-6xl font-bold text-white dark:text-black mb-12 text-center">
                Projects.
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
                      <div className="relative w-full h-full rounded-2xl overflow-hidden group border border-white/10 p-6">
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

          {/* Work Experience Section avec animation */}
          <div ref={workRef} className="section-fade-up">
            <section className="min-h-screen py-20 px-4 md:px-16">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold text-white dark:text-black mb-12 text-center">
                  Work Experience.
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

          {/* About Section avec animation */}
          <div ref={aboutRef} className="section-fade-up">
            <section className="min-h-screen py-20 px-8 md:px-20 flex items-center">
              <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
                <div>
                  <h2 className="text-5xl md:text-7xl mb-6 text-white dark:text-black font-bold">
                    About me.
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
                      { number: '5+', label: 'Certifications' },
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
                  {Object.entries(skills).map(([category, items], index) => (
                    <div
                      className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:transform hover:-translate-y-2 card-hover"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      key={category}
                    >
                      <h4 className="text-lg font-medium mb-4 capitalize text-white dark:text-white">{category}</h4>
                      <ul className="space-y-2">
                        {items.map(skill => (
                          <li key={skill} className="text-sm opacity-70 py-1 border-b border-gray-400 dark:border-gray-600 text-white dark:text-white">
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
                  let's create.
                </h2>
                <div className="space-y-4">
                  <a href="mailto:hello@fredahoussi.dev" className="text-xl md:text-2xl hover:opacity-60 transition-opacity block text-white dark:text-black">
                    hello@fredahoussi.dev
                  </a>
                  <div className="flex gap-6 justify-center pt-8">
                    {socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:opacity-60 transition-opacity text-white dark:text-black"
                      >
                        {social.name}
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

      <Analytics />
    </div>
  );
};

export default App;