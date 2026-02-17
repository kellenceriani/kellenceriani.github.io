window.App = window.App || {};

(() => {
  /* =========================
     HAMBURGER MENU TOGGLE
  ========================= */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  function toggleMenu() {
    if (!navLinks || !hamburger) return;
    const expanded = navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', expanded);
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });
  }

  /* =========================
     THEME TOGGLE / DARK MODE
  ========================= */
  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // update mobile chrome theme color
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      // prefer bg color for toolbar
      const color = getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim();
      meta.setAttribute('content', color);
    }
  }

  function updateToggleIcon() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    // choose sun for dark mode (switch to light), moon for light mode
    const isDark = document.documentElement.classList.contains('dark');
    btn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    btn.title = btn.getAttribute('aria-label');
  }

  function initTheme() {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored ? stored : (prefersDark ? 'dark' : 'light');
    setTheme(theme);
    updateToggleIcon();
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon();
  }

  /* =========================
     SMOOTH SCROLL FOR NAV LINKS
  ========================= */
  function bindSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const targetScroll = target.offsetTop - headerHeight;

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (window.App.moveMarkerAfterScroll) {
          window.App.moveMarkerAfterScroll(target.id, targetScroll);
        }
        if (navLinks && navLinks.classList.contains('active')) toggleMenu();
      });
    });
  }

  /* =========================
     SCROLL REVEAL ANIMATIONS
  ========================= */
  // add .reveal to sections in HTML via class or here
  const observerOptions = {
    threshold: 0.1
  };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  function bindReveal() {
    document.querySelectorAll('section, .project-card, .hero-text h1, .hero-text p, .hero-buttons').forEach(el => {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  function initBackToTop() {
    const backButton = document.getElementById('back-to-top');
    if (!backButton) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backButton.classList.add('show');
      } else {
        backButton.classList.remove('show');
      }
    });

    backButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initSectionHighlight() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    if (!sections.length || !navItems.length) return;

    const sectionObserver2 = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navItems.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    }, { threshold: 0.6 });

    sections.forEach(s => sectionObserver2.observe(s));
  }

  function initHeroDetailsToggle() {
    const heroText = document.querySelector('.hero-text');
    const toggleBtn = document.querySelector('.hero-details-toggle');
    if (!heroText || !toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      const isOpen = heroText.classList.toggle('hero-details-open');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      toggleBtn.setAttribute('aria-label', isOpen ? 'Hide hero details' : 'Show hero details');
    });
  }

  // apply observer to relevant elements once DOM is ready
  window.addEventListener('DOMContentLoaded', () => {
    // theme initialization (must happen before any elements relying on variables)
    initTheme();

    // attach click handler to toggle button (might not exist in older markup)
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
      themeBtn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTheme();
        }
      });
    }

    bindSmoothScroll();
    bindReveal();

    // hero load animation after short delay
    setTimeout(() => {
      const hero = document.querySelector('.hero-text');
      if (hero) hero.classList.add('loaded');
    }, 100);

    // initialize the custom baseball scrollbar overlay
    if (window.App.initCustomScrollbar) window.App.initCustomScrollbar();

    initBackToTop();
    initSectionHighlight();
    initHeroDetailsToggle();

    // modals before projects so attachModalButtons can bind immediately
    if (window.App.initModals) window.App.initModals();
    if (window.App.initProjects) window.App.initProjects();
  });
})();