import React, { useState, useEffect, useCallback, useRef } from 'react';
import { skills, workExperiences, scrollWords, portfolioItems, socials } from './utils/constants';
import { Analytics } from '@vercel/analytics/react';
import { techIcons } from './utils/techIcons';

import {
  FaGithub,
  FaEnvelope,
  FaArrowUp,
  FaWhatsapp,
  FaExpandArrowsAlt,
  FaArrowRight,
  FaWindowClose,
} from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";

import me from './assets/img/me/fred.png';
import { FaCheckSquare, FaPlay } from 'react-icons/fa';
import notFoundImage from './assets/img/icon/not-found.gif';
import { FaArrowUpRightFromSquare, FaCheck } from 'react-icons/fa6';
// import me from './assets/img/me/fred-full.png';


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
        <div className="w-6 h-10 border-2 border-white/50 rounded-full dark:border-black/50 flex justify-center pt-2">
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

const FloatingNav = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navItems = [
    {
      icon: <FaGithub />,
      label: "GitHub",
      href: "https://github.com/httpfred",
    },
    {
      icon: <FaEnvelope />,
      label: "Email",
      href: "mailto:ahoussifred@gmail.com",
    },
    {
      icon: <FaWhatsapp />,
      label: "WhatsApp",
      href: "https://wa.me/+2250748571722",
    },
  ];

  return (
    <div className="
      fixed
      bottom-6
      right-6
      z-50
      shadow-3xl
    ">
      <div
        className="
          flex flex-col items-center gap-3
          p-3
          border border-white/10
          bg-black/30 dark:bg-black/30
          backdrop-blur-xl
          shadow-2xl
        "
      >
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              relative
              w-12 h-12
              flex items-center justify-center
              text-white
              text-lg
              bg-white/5
              border border-white/10
              hover:bg-white
              hover:text-black
              hover:scale-110
              transition-all duration-300
            "
          >
            {item.icon}

            <span
              className="
                absolute right-16
                whitespace-nowrap
                px-3 py-1
                rounded-lg
                bg-black text-white
                text-xs
                opacity-0
                translate-x-2
                group-hover:opacity-100
                group-hover:translate-x-0
                transition-all duration-300
                pointer-events-none
              "
            >
              {item.label}
            </span>
          </a>
        ))}

        <div className="w-8 h-px bg-white/10" />

        <button
          onClick={scrollToTop}
          className="
            group
            w-12 h-12
            flex items-center justify-center
            text-white
            text-lg
            bg-white/5
            border border-white/10
            hover:bg-white
            hover:text-black
            hover:-translate-y-1
            transition-all duration-300
          "
        >
          <FaArrowUp />
        </button>
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

  const [openStackId, setOpenStackId] = useState(null);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRunAs = (item) => {
    if (item.url && item.url.trim() !== '') {
      window.open(item.url, '_blank');
    } else {
      setSelectedProject(item);
      setIsModalOpen(true);
    }
  };


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
          className="fixed w-8 h-8 pointer-events-none z-50 transition-all duration-150 ease-out hidden lg:block"
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
          {/* 
          <header className="min-h-screen flex flex-col justify-center items-start px-8 md:px-20">
            <h1 className="text-6xl md:text-8xl lg:text-9xl leading-[0.8] mb-8 text-white dark:text-black font-bold">
              I'm Fred<br />
              <div className="flex flex-wrap items-center gap-2">
                <TypewriterText texts={["Developer.", "Designer."]} typingSpeed={120} deletingSpeed={60} pauseDuration={1500} />
              </div>
            </h1>
          </header>
          */}
          <header className="min-h-screen flex flex-col justify-center items-center px-8 md:px-20">
            <div className="flex items-center gap-6">
              <img
                src={me}
                alt="Fred Ahoussi"
                className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-full border-2 border-white dark:border-black bg-white/5 backdrop-blur-sm"
              />

              <h1 className="text-3xl md:text-5xl leading-[0.8] text-white dark:text-black font-bold">
                {/* <h1 className="text-6xl md:text-8xl lg:text-9xl leading-[0.8] text-white dark:text-black font-bold"> */}
                I'm Fred A.
                {/* <div className="flex items-center gap-2 text-3xl md:text-5xl mt-2"> */}
                <div className="flex items-center gap-2 text-3xl md:text-5xl mt-2">
                  <TypewriterText
                    texts={["Developer.", "Designer."]}
                    typingSpeed={120}
                    deletingSpeed={60}
                    pauseDuration={1500}
                  />
                </div>
              </h1>
            </div>
          </header>

          {/* Scroll Indicator */}
          <ScrollIndicator />
        </div>

        <main>
          {/* Portfolio Showcase Section avec animation */}
          <div ref={portfolioRef} className="section-fade-up">
            <section className="min-h-screen py-16 px-4 md:py-20 md:px-16">
              <h2 className="max-w-7xl mx-auto text-4xl md:text-6xl font-bold text-white dark:text-black mb-12 text-center md:text-left">
                01. Projects
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
                        px-3 md:px-6 py-1.5 md:py-2  text-xs md:text-sm font-medium
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
                      <div className="relative w-full h-full overflow-hidden group p-6  border border-white/10 backdrop-blur-sm">
                        {/* <div
                        className=" relative w-full h-full overflow-hidden group p-6 bg-white/[0.03] backdrop-blur-sm
                          border border-dashed border-white/15
                          hover:border-cyan-400/40
                          transition-all duration-500
                          before:absolute before:inset-0 before:border before:border-dashed before:border-white/5 before:pointer-events-none
                          "
                      > */}

                        {/* <div
                          className=" absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-white/70 group-hover:border-cyan-400 transition-all duration-300 "
                        />
                        <div
                          className=" absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-white/70 group-hover:border-cyan-400 transition-all duration-300 "
                        />
                        <div
                          className=" absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-white/70 group-hover:border-cyan-400 transition-all duration-300 "
                        />
                        <div
                          className=" absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-white/70 group-hover:border-cyan-400 transition-all duration-300 "
                        /> */}
                        <img
                          src={item.image}
                          alt={item.title}
                          // className={` w-full h-full object-contain transition-all duration-[10s] ease-out
                          //   group-hover:scale-110 group-hover:rotate-[1deg]
                          //   ${activeSlide === index ? 'scale-105' : 'scale-100'}
                          // `}
                          className={` w-full h-full object-contain
                            ${activeSlide === index ? 'scale-105' : 'scale-100'}
                          `}
                        // className={`
                        //   w-full h-full object-contain transition-transform duration-[10s] ease-out
                        //   ${activeSlide === index ? 'scale-105' : 'scale-100'}
                        // `}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t  via-black/20 to-transparent" />
                        {/* <div
                          className="
                            absolute inset-0
                            bg-gradient-to-t
                            from-black/70
                            via-black/10
                            to-transparent
                          "
                        /> */}
                        <div className={`
                          absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12 text-white
                          transition-all duration-700 delay-200
                          ${activeSlide === index
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-8 opacity-0'
                          }
                        `}>
                          <div className="max-w-2xl">
                            <div className="flex gap-3 md:gap-4 ">
                              <button
                                onClick={() => handleRunAs(item)}
                                className="flex group items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white text-black  text-sm font-medium hover:bg-white/90 hover:translate-x-1 transition-all"
                              >
                                Run as
                                <FaPlay className="transition-transform group-hover:translate-x-1" />
                              </button>
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
                <h2 className="max-w-7xl mx-auto text-4xl md:text-6xl font-bold text-white dark:text-black mb-12 text-center md:text-left">
                  02. Work Experience
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {workExperiences.map((exp, index) => (
                    <div
                      key={exp.id}
                      className="group relative bg-white/5 backdrop-blur-sm p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:transform hover:-translate-y-2 card-hover overflow-hidden"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* <div
                      key={exp.id}
                      className=" group relative bg-white/[0.03] backdrop-blur-sm p-6 border border-dashed border-white/20 hover:border-cyan-400/40 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    > */}
                      {/* <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/60" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/60" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/60" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/60" /> */}

                      <div className="text-2xl mb-4">{exp.logo}</div>
                      <h3 className="text-xl font-bold text-white mb-1">{exp.company}</h3>
                      <p className="text-sm text-white/60 mb-2"> <span className='px-2 border border-white/10 bg-white/10 text-black'>{exp.grade}</span> <span>{exp.position}</span></p>
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
                      {/* STACK BUTTON */}
                      <div className="absolute bottom-4 right-4 z-20">
                        <button
                          onClick={() =>
                            setOpenStackId(openStackId === exp.id ? null : exp.id)
                          }
                          className="flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/5 backdrop-blur-sm text-white text-sm hover:bg-white hover:text-black transition-all duration-300"
                        >
                          Stacks
                        </button>
                      </div>

                      {/* STACK PANEL */}
                      <div
                        className={`
                          absolute left-0 right-0 top-0
                          bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 backdrop-blur-md border-b border-white/10
                          overflow-hidden
                          transition-all duration-500 ease-out
                          z-10

                          ${openStackId === exp.id
                            ? "opacity-100 animate-drop-in"
                            : "-translate-y-full opacity-0 pointer-events-none"
                          }
                        `}
                      >
                        <div className="p-5">
                          <div className="flex flex-wrap gap-2">
                            {exp.stacks.map((stack, i) => (
                              <div
                                key={i}
                                className="
                                    flex items-center gap-2
                                    px-3 py-2
                                    text-xs
                                    bg-white/10
                                    border border-white/10
                                    text-white
                                    backdrop-blur-sm
                                    hover:bg-white/20
                                    transition-all duration-300
                                  "
                              >
                                <span className="text-sm">
                                  {techIcons[stack] || <FaCheck />}
                                </span>

                                <span>
                                  {stack}
                                </span>
                              </div>
                            ))}
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
                  <h2 className="max-w-7xl mx-auto text-4xl md:text-6xl font-bold text-white dark:text-black mb-12 text-center md:text-left">
                    03. About me
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
                        <div className="about-me_label text-sm opacity-60 text-white dark:text-black">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                  {Object.entries(skills).map(([category, items], index) => (
                    <div
                      className="group relative bg-white/5 backdrop-blur-sm p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:transform hover:-translate-y-2 card-hover"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      key={category}
                    >
                      <h4 className="text-lg font-medium  mb-4 capitalize text-white dark:text-white">{category}</h4>
                      <ul className="space-y-2">
                        {items.map(skill => (
                          // <li key={skill} className="text-sm opacity-70 py-1 border-b border-gray-400 dark:border-gray-600 text-white dark:text-white">
                          //   {skill}
                          // </li>
                          <li
                            key={skill}
                            className="flex items-center gap-2 text-sm opacity-70 py-1 border-b border-gray-400 dark:border-gray-600 text-white dark:text-white"
                          >
                            <span className="text-lg">
                              {techIcons[skill] || <FaCheck />}
                            </span>

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
            <section className="min-h-screen flex items-center justify-center px-6 md:px-16 py-24">
              <div
                className=" relative w-full max-w-5xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-14"
              >
                {/* Glow effect */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-fuchsia-500/10 blur-3xl rounded-full" />

                <div className="relative z-10 grid md:grid-cols-2 gap-14 items-center">

                  {/* LEFT */}
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-4">
                      Contact
                    </p>

                    <h2
                      className=" text-5xl md:text-7xl font-bold leading-[0.95] text-white mb-6 "
                    >
                      Let's build
                      <br />
                      something
                      <span className="text-cyan-400"> great.</span>
                    </h2>

                    <p className="text-white/60 leading-relaxed max-w-lg">
                      Disponible pour des collaborations, missions freelance,
                      développement d’applications web & mobile,
                      design UI/UX et projets innovants.
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="space-y-5">

                    {/* EMAIL CARD */}
                    <a
                      href="mailto:ahoussifred@gmail.com"
                      className=" group flex items-center justify-between p-5 border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 "
                    >
                      <div className="flex items-center gap-4">

                        <div
                          className=" w-14 h-14 flex items-center justify-center bg-white/10 border border-white/10 text-xl"
                        >
                          <FaEnvelope />
                        </div>

                        <div>
                          <p className="text-sm opacity-60">
                            Email
                          </p>

                          <p className="text-lg font-medium">
                            ahoussifred@gmail.com
                          </p>
                        </div>
                      </div>

                      <span
                        className="
                          opacity-40
                          group-hover:translate-x-1
                          transition-transform
                        "
                      >
                        <HiArrowUpRight />
                      </span>
                    </a>

                    {/* SOCIALS */}
                    <div className="grid grid-cols-2 gap-4">
                      {socials.map((social, index) => (
                        <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className=" group flex items-center justify-between p-4 border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 "
                        >
                          <span className="font-medium">
                            {social.name}
                          </span>

                          <span
                            className="
                                opacity-40
                                group-hover:translate-x-1
                                transition-transform
                              "
                          >
                            {/* <FaArrowRight /> */}
                            {/* <FaArrowUpRightFromSquare /> */}
                            <HiArrowUpRight />
                          </span>
                        </a>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="pt-4">
                      <a
                        href="mailto:ahoussifred@gmail.com"
                        className=" inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium hover:scale-[1.02] hover:bg-white/90 transition-all duration-300"
                      >
                        Start a project
                        <span>
                          <HiArrowUpRight />
                        </span>
                      </a>
                    </div>
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

      {/* Modal Projet */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-lg bg-[#111] text-white p-6 border border-white/10 animate-scale-up">

            {/* Bouton fermer */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-xl"
            >
              <FaWindowClose />
            </button>

            <div className="space-y-4">
              <img src={notFoundImage} alt="" className='' />

              <h3 className="text-2xl font-bold">
                {selectedProject.title}
              </h3>

              <p className="text-white/70 leading-relaxed">
                {selectedProject.description || "Description indisponible."}
              </p>

              {selectedProject.technologies && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedProject.technologies.map((tech, index) => (
                    // <span
                    //   key={index}
                    //   className="px-3 py-1 text-xs  bg-white/10 border border-white/10"
                    // >
                    //   {tech}
                    // </span>
                    <span
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 text-xs bg-white/10 border border-white/10"
                    >
                      {techIcons[tech] || <FaCheck />}
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2  bg-white text-black hover:bg-white/90 transition"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <FloatingNav />
      <Analytics />
    </div>
  );
};

export default App;