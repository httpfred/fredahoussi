import React, { useState, useEffect, useCallback } from 'react';

const App = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [animate, setAnimate] = useState(true);
  const [snap, setSnap] = useState(true);
  const [hueStart, setHueStart] = useState(0);
  const [hueEnd, setHueEnd] = useState(360);
  const [showArrow, setShowArrow] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Portfolio content
  const portfolioItems = [
    {
      id: 1,
      title: 'Brand Identity & Digital Experience',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=800&fit=crop',
      description: 'Complete brand identity and digital presence for a modern lifestyle brand.',
      tags: ['Branding', 'Web Design', 'UX/UI'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      category: 'Development',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      description: 'Full-stack e-commerce solution with seamless payment integration.',
      tags: ['React', 'Node.js', 'Stripe'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'Mobile Application Suite',
      category: 'Mobile Dev',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop',
      description: 'Cross-platform mobile apps for iOS and Android with React Native.',
      tags: ['React Native', 'GraphQL', 'Firebase'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      title: 'AI-Powered Analytics Dashboard',
      category: 'Data Science',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      description: 'Real-time analytics dashboard with machine learning insights.',
      tags: ['Python', 'TensorFlow', 'D3.js'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 5,
      title: 'Creative Agency Website',
      category: 'Web Design',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop',
      description: 'Award-winning website design for a creative agency.',
      tags: ['Webflow', 'GSAP', 'Three.js'],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 6,
      title: 'SaaS Product Launch',
      category: 'Product Design',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop',
      description: 'From concept to launch — complete product design and development.',
      tags: ['UI/UX', 'Figma', 'React'],
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const scrollWords = [
    'design.', 'prototype.', 'solve.', 'build.', 'develop.',
    'debug.', 'learn.', 'create.', 'innovate.', 'ship.',
    'optimize.', 'scale.', 'transform.', 'inspire.', 'do it.'
  ];

  const skills = {
    frontend: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP / Framer'],
    backend: ['Node.js / Python', 'GraphQL / REST', 'PostgreSQL', 'Docker / AWS'],
    design: ['Figma / Sketch', 'UI/UX Design', 'Adobe Creative', 'Motion Design']
  };

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
      <div className="bg-grid-pattern"></div>

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

        {/* Header */}
        <header className="min-h-screen flex flex-col justify-center items-start px-8 md:px-20 relative">
          {/*
          <h1
            className="text-6xl md:text-8xl lg:text-9xl leading-[0.8] mb-8 bg-gradient-to-r from-current via-current to-current/40 bg-clip-text text-transparent animate-gradient"
          >
            creative<br />developer.
          </h1> 
          */}
          <h1
            className="text-6xl md:text-8xl lg:text-9xl leading-[0.8] mb-8 text-white dark:text-black font-bold"
          >
            creative<br />developer.
          </h1>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
            <span className="text-sm">scroll</span>
            <svg className="w-6 h-6 animate-bounce" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14m-7-7 7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </header>

        <main>
          {/* Scroll Words Section */}
          <section className={`min-h-screen flex px-8 md:px-20 ${snap ? 'scroll-snap-y' : ''}`}>
            <h2 className="sticky top-[calc(50%-0.5lh)] h-fit font-semibold bg-gradient-to-b from-current to-current/25 bg-clip-text text-transparent text-4xl md:text-6xl">
              <span aria-hidden="true">i can&nbsp;</span>
              <span className="sr-only">i can ship things.</span>
            </h2>
            <ul className="list-none font-semibold ml-8 md:ml-16 text-xl md:text-2xl">
              {scrollWords.map((word, i) => (
                <li
                  key={i}
                  className="py-2 transition-all duration-300"
                  style={{
                    color: `oklch(65% 0.3 ${hueStart + (i * (hueEnd - hueStart) / (scrollWords.length - 1))})`,
                  }}
                >
                  {word}
                </li>
              ))}
            </ul>
          </section>

          {/* Portfolio Showcase */}
          <section className="min-h-screen py-16 px-4 md:py-20 md:px-16">
            <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] container mx-auto">
              {/* Tabs */}
              <div className="absolute -bottom-16 left-0 right-0 z-10 flex justify-center gap-2 flex-wrap">
                {portfolioItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSlide(index)}
                    className={`
                      px-4 md:px-6 py-2 md:py-3 rounded-full text-sm font-medium
                      transition-all duration-300 cursor-pointer
                      ${activeSlide === index
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg scale-105'
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
                    <div className="relative w-full h-full rounded-2xl overflow-hidden group">
                      <img
                        src={item.image}
                        alt={item.title}
                        className={`
                          w-full h-full object-cover transition-transform duration-[10s] ease-out
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
                          <span className="text-xs md:text-sm uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block mb-3 md:mb-4">
                            {item.category}
                          </span>
                          <h3 className="text-xl md:text-3xl lg:text-4xl font-medium mb-2 md:mb-3">
                            {item.title}
                          </h3>
                          <p className="text-sm md:text-base opacity-80 mb-4 md:mb-6">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                            {item.tags.map(tag => (
                              <span key={tag} className="text-xs px-2 py-1 bg-white/15 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-3 md:gap-4">
                            <a href="#" className="px-4 md:px-6 py-2 md:py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90 hover:translate-x-1 transition-all">
                              View Project →
                            </a>
                            <a href="#" className="px-4 md:px-6 py-2 md:py-3 border border-white text-white rounded-full text-sm font-medium hover:bg-white hover:text-black transition-all">
                              Case Study
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

          {/* About Section */}
          <section className="min-h-screen py-20 px-8 md:px-20 flex items-center">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
              <div>
                <h2 className="text-5xl md:text-7xl mb-6 bg-gradient-to-b from-current to-current/25 bg-clip-text text-transparent">
                  about<br />me.
                </h2>
                <p className="text-lg leading-relaxed opacity-80 mb-8">
                  I'm a creative developer and designer who builds exceptional digital experiences.
                  With over 8 years of experience, I've helped brands from startups to enterprises
                  bring their visions to life through innovative design and robust development.
                </p>
                <div className="flex gap-8 md:gap-12">
                  {[
                    { number: '50+', label: 'Projects' },
                    { number: '30+', label: 'Clients' },
                    { number: '12', label: 'Awards' }
                  ].map((stat, i) => (
                    <div key={i} className="text-center md:text-left">
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-current to-current/60 bg-clip-text text-transparent">
                        {stat.number}
                      </div>
                      <div className="text-sm opacity-60">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <h4 className="text-lg font-medium mb-4 capitalize">{category}</h4>
                    <ul className="space-y-2">
                      {items.map(skill => (
                        <li key={skill} className="text-sm opacity-70 py-1 border-b border-gray-200 dark:border-gray-800">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="min-h-[70vh] flex items-center justify-center text-center py-16 px-8">
            <div>
              <h2 className="text-5xl md:text-7xl lg:text-8xl mb-8 bg-gradient-to-b from-current to-current/25 bg-clip-text text-transparent">
                let's<br />create.
              </h2>
              <div className="space-y-4">
                <a href="mailto:hello@creative.dev" className="text-xl md:text-2xl hover:opacity-60 transition-opacity block">
                  hello@creative.dev
                </a>
                <div className="flex gap-6 justify-center pt-8">
                  {['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].map(social => (
                    <a key={social} href="#" className="text-sm hover:opacity-60 transition-opacity">
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="text-center py-8 opacity-50 text-sm">
          <p>ʕ⊙ᴥ⊙ʔ creative.dev &copy; 2024</p>
        </footer>

        {/* Control Panel */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className="w-12 h-12 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H5.78a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.04.04A10 10 0 0 0 12 17.66a10 10 0 0 0 6.36-2.62Z" />
            </svg>
          </button>

          <div className={`
            absolute bottom-full right-0 mb-4 w-64 p-4 rounded-xl
            bg-white/90 dark:bg-gray-900/90 backdrop-blur-md
            border border-gray-200 dark:border-gray-700 shadow-xl
            transition-all duration-300
            ${isPanelOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}
          `}>
            <div className="space-y-4">
              <div>
                <label className="block text-xs opacity-70 mb-1">Theme</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Animate</label>
                <input
                  type="checkbox"
                  checked={animate}
                  onChange={(e) => setAnimate(e.target.checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Snap Scroll</label>
                <input
                  type="checkbox"
                  checked={snap}
                  onChange={(e) => setSnap(e.target.checked)}
                />
              </div>
              <div>
                <label className="block text-xs opacity-70 mb-1">Hue Start: {hueStart}</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hueStart}
                  onChange={(e) => setHueStart(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs opacity-70 mb-1">Hue End: {hueEnd}</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hueEnd}
                  onChange={(e) => setHueEnd(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Arrow Indicator */}
        {showArrow && (
          <div className="fixed left-[55%] top-[30%] md:top-auto md:bottom-8 md:left-auto md:right-4 text-sm opacity-70 z-50 pointer-events-none rotate-[-10deg] md:rotate-30">
            <span className="inline-block -rotate-24 w-[160%] -translate-x-[20%] translate-y-[110%] font-['Gloria_Hallelujah']">
              drag/press here
            </span>
            <svg className="w-12 md:w-16 scale-y-[-1] translate-x-[120%] translate-y-[30%]" viewBox="0 0 122 97" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M116.102 0.0996005C114.952 0.334095 112.7 1.53002 111.433 2.53834C110.869 2.98388 109.368 4.15635 108.077 5.11778C103.455 8.6352 102.61 9.40903 102.187 10.4877C101.39 12.5982 102.798 14.5914 105.097 14.5914C106.13 14.5914 108.241 13.7941 109.696 12.8561C110.424 12.3871 111.01 12.0823 111.01 12.1526C111.01 12.692 107.796 17.8274 106.2 19.8206C102.023 25.0733 95.6642 29.6928 86.2548 34.2889C81.0926 36.8214 77.4555 38.2753 73.9123 39.2367C71.7066 39.823 70.6507 39.9871 67.9053 40.0809C66.0516 40.1513 64.5499 40.1747 64.5499 40.1278C64.5499 40.0809 64.808 38.9788 65.1365 37.6891C65.465 36.3993 65.8404 34.1716 66.0047 32.7647C66.4505 28.3796 65.4884 24.2994 63.4704 22.2359C62.1564 20.8758 60.9363 20.3599 59.0121 20.3599C57.6043 20.3599 57.1115 20.4537 55.7975 21.1103C52.8878 22.5407 50.5648 25.9878 49.5089 30.4197C48.453 34.922 49.2742 38.0877 52.3481 41.1127C53.4744 42.2148 54.46 42.9183 55.9852 43.6921C57.1584 44.2549 58.1439 44.7473 58.1909 44.7708C58.5898 45.0053 54.5304 53.4705 52.0666 57.6211C47.4674 65.3125 39.3486 74.575 30.5728 82.0789C22.2427 89.2309 16.7285 92.4435 9.87677 94.1553C8.28116 94.554 7.13138 94.6478 4.2452 94.6478C1.17131 94.6712 0.608154 94.7181 0.608154 95.023C0.608154 95.234 1.19478 95.5857 2.13337 95.9609C3.54126 96.4768 3.96363 96.5472 7.41296 96.5237C10.5572 96.5237 11.4724 96.4299 13.1149 96.0078C21.7265 93.6863 31.1594 87.1908 42.6102 75.7006C49.2977 69.0175 52.5828 64.9373 56.1494 58.9343C58.0501 55.7217 60.6312 50.6801 61.7575 47.9365L62.5553 45.9902L64.0806 46.1543C71.3547 46.9047 77.7136 45.3101 88.3667 40.034C96.2274 36.1414 101.976 32.3426 106.505 28.0748C108.617 26.0816 111.855 22.2828 112.794 20.7117C113.028 20.313 113.286 19.9847 113.357 19.9847C113.427 19.9847 113.662 20.782 113.873 21.72C114.084 22.6814 114.647 24.276 115.093 25.2609C115.82 26.8085 116.008 27.043 116.454 26.9727C116.876 26.9258 117.228 26.4333 117.956 24.9795C119.317 22.2828 119.833 20.2661 120.772 13.8879C121.757 7.25168 121.781 4.4143 120.889 2.56179C119.95 0.615488 118.12 -0.322489 116.102 0.0996005ZM60.7016 25.7767C61.4525 26.9023 61.8279 29.2942 61.6637 31.9205C61.4759 34.7813 60.5139 38.9788 60.0681 38.9788C59.5284 38.9788 57.1584 37.6422 56.2198 36.8214C54.8354 35.6021 54.3426 34.2889 54.5538 32.2957C54.8589 29.2473 56.1964 26.2223 57.5808 25.3547C58.7306 24.6512 60.0681 24.8388 60.7016 25.7767Z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;