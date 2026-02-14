/* =========================
   HAMBURGER MENU TOGGLE
========================= */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

function toggleMenu() {
  const expanded = navLinks.classList.toggle('active');
  hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', expanded);
}

/* =========================
   CUSTOM SCROLLBAR STATE (shared)
========================= */
let customScrollbarMarkers = [];
let customScrollbarThumb;
let customScrollbarTrack;
let customScrollbarScrollbar;

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

hamburger.addEventListener('click', toggleMenu);
hamburger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
  }
});

/* =========================
   SMOOTH SCROLL FOR NAV LINKS
========================= */

function repositionMarker(id) {
  // unlock all markers first
  customScrollbarMarkers.forEach(m => m.marker.dataset.locked = 'false');
  const entry = customScrollbarMarkers.find(m => m.el.id === id);
  if (!entry) return;
  entry.marker.dataset.locked = 'true';
  if (customScrollbarThumb) {
    // determine where the thumb currently is (using scroll position) and
    // place the marker at the thumb's center rather than its top edge.
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const thumbHeightPct = parseFloat(customScrollbarThumb.style.height) || 0;
    const pct = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    let topPct = pct * (100 - thumbHeightPct) + thumbHeightPct / 2;
    // clamp to keep within view
    const trackHeight = customScrollbarTrack.clientHeight || 1;
    const halfMarkerPct = (entry.marker.offsetHeight / 2) / trackHeight * 100;
    topPct = Math.min(Math.max(topPct, halfMarkerPct), 100 - halfMarkerPct);
    entry.marker.style.top = topPct + '%';
  }
}

function moveMarkerAfterScroll(id, targetScroll) {
  function onScroll() {
    const cur = document.documentElement.scrollTop || document.body.scrollTop;
    if (Math.abs(cur - targetScroll) < 2) {
      repositionMarker(id);
      window.removeEventListener('scroll', onScroll);
    }
  }
  window.addEventListener('scroll', onScroll);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    const targetScroll = target.offsetTop - headerHeight;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    moveMarkerAfterScroll(target.id, targetScroll);
    if (navLinks.classList.contains('active')) toggleMenu();
  });
});

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

  document.querySelectorAll('section, .project-card, .hero-text h1, .hero-text p, .hero-buttons').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // hero load animation after short delay
  setTimeout(() => {
    document.querySelector('.hero-text').classList.add('loaded');
  }, 100);

  // initialize the custom baseball scrollbar overlay
  initCustomScrollbar();

  // back-to-top button logic
  const backButton = document.getElementById('back-to-top');
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

  // highlight current section in nav
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');
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
});

/* =========================
   PROJECT DATA
========================= */
const projects = [
  // Games & AR/VR
  {
    id: 'vr-baseball',
    category: 'games',
    title: 'VR Baseball – Shoot the Runner!',
    date: '2021-2025',
    description: `In this Unity VR game, players stand on a baseball field, following a wall of instructions as runners spawn. Using a gun, the objective is to stop the runners before they advance to the next base. Key highlight: unique grab interaction mechanic. Future enhancements include dynamic music, improved UI, and additional levels.`,
    tools: ['Visual Studio', 'Unity', 'Maya', 'Substance Painter', 'Oculus'],
    languages: ['C++', 'C#'],
    video: 'https://www.youtube.com/embed/mGSd7ccdzbQ',
    github: 'https://github.com/kellenceriani/ShootTheRunnerPublic',
    gameDemo: 'https://youtu.be/QeXn3gjfv9M'
  },
  {
    id: 'balls-unreal',
    category: 'games',
    title: 'Balls Unreal Game',
    date: '2024-2025',
    description: `A fast-paced, two-player competitive party game inspired by WarioWare. Players engage in sumo battles, obstacle races, and survival challenges. Features inclusive controller setup and rapid prototyping.`,
    tools: ['Arduino', 'Unreal Engine'],
    languages: ['C', 'C++', 'C#', 'Blueprint'],
    video: 'https://www.youtube.com/embed/9c8-w5UJ7_I',
    slides: 'https://docs.google.com/presentation/d/1c6uXmhmTLo0gNrbvIfbCVX28oyyuaT9SujZTCVZPDvE/edit#slide=id.g31ad6e893df_0_38'
  },
  {
    id: 'crackjack',
    category: 'games',
    title: 'CrackJack – AR 2D Platformer',
    date: '2021-2022',
    description: 'Unity-based 2D platformer with AR blackjack elements. Emphasized team collaboration, cross-tool integration, and AR interactivity.',
    tools: ['Vuforia', 'Visual Studio', 'Unity', 'HTML5', 'Adobe Animate', 'After Effects', 'Illustrator'],
    languages: ['C#', 'C++'],
    video: 'https://www.youtube.com/embed/bzkznXykwyQ'
    ,
    projectFiles: 'https://drive.google.com/drive/folders/1lxReIjO5UWpR05taKU2PE3urf9YDFjSL?usp=share_link'
  },
  {
    id: 'guru-donuts',
    category: 'games',
    title: 'Guru Donuts Accessibility Companion – AR',
    date: '2023-2024',
    description: 'Accessibility-focused app helping non-verbal autistic users navigate coffee shops. Features visual guides and usability testing.',
    tools: ['Swift', 'Oculus'],
    languages: ['Swift'],
    video: 'https://www.youtube.com/embed/tn2nnDER-As',
    github: 'https://github.com/kellenceriani/CoffeeGit'
  },

  // Animations & Art
  {
    id: 'interactive-comic',
    category: 'animations',
    title: 'Interactive Comic – The Emptiness of an Atom',
    date: '2022-2023',
    description: 'Immersive storytelling experience in Unity integrating animations and art. Led storyboarding and task assignments.',
    tools: ['Visual Studio', 'Unity', 'HTML5', 'Adobe Animate', 'Illustrator'],
    languages: ['C++', 'C#'],
    video: 'https://www.youtube.com/embed/S5P4gIgzos8'
    ,
    projectFiles: 'https://drive.google.com/drive/folders/14V1G4_qkltiB7M0LbsTzFEQ4Xm-DvR-z?usp=share_link'
  },
  {
    id: 'olympics-animation',
    category: 'animations',
    title: 'Olympics Animation (Rotoscoping)',
    date: '2022-2023',
    description: 'Promotional animation for the Olympics. Learned advanced rotoscoping techniques.',
    tools: ['Adobe Animate'],
    video: 'https://www.youtube.com/embed/fu8AUTe-0m0'
  },
  {
    id: 'baseball-slide',
    category: 'animations',
    title: 'The Only Way to Slide in Baseball',
    date: '2021-2022',
    description: 'First animation project; foundational to skills in digital art and animation.',
    tools: ['Adobe Animate'],
    video: 'https://www.youtube.com/embed/g8DkEvoixZE'
  },
  {
    id: 'art-gallery',
    category: 'animations',
    title: 'Art Gallery Phone App (Adobe XD)',
    date: '2023-2024',
    description: 'Mobile app showcasing illustrations, designed in Adobe XD with interactive design focus.',
    tools: ['Adobe Illustrator', 'Animate', 'XD'],
    video: 'https://www.youtube.com/embed/G_Ef7nvkwZI',
    wireframe: 'https://drive.google.com/drive/folders/1ED3l4Ms0n5ktCLh6F0fSz337SpJxLyF_?usp=share_link'
  },

  // Web Development
  {
    id: 'lineupwars',
    category: 'web',
    title: 'LineupWars!',
    date: '2025-2026',
    description: 'Multi-variant fantasy drafting website allowing dynamic player, character, or squad drafting under rules. Includes interactive forms and category rotation.',
    tools: ['VS Code', 'GitHub', 'HTML5', 'Bootstrap'],
    languages: ['HTML', 'CSS', 'JavaScript', 'SQL'],
    video: '',
    live: 'https://lineupwars.com'
    ,
    github: 'https://github.com/kellenceriani/LineupCreator',
    repos: [
      { label: 'LineupCreator (main)', url: 'https://github.com/kellenceriani/LineupCreator' },
      { label: 'RanDum', url: 'https://github.com/kellenceriani/RanDum' },
      { label: 'Heist', url: 'https://github.com/kellenceriani/Heist' },
      { label: 'UniverseBattle', url: 'https://github.com/kellenceriani/UniverseBattle' }
    ]
  },
  {
    id: 'pickthestick',
    category: 'web',
    title: 'PickTheStick',
    date: '2023-2025',
    description: 'Users select one player per game for scoring. Real-time points calculation and season leaderboard.',
    tools: ['VS Code', 'GitHub', 'HTML5', 'Bootstrap'],
    languages: ['HTML', 'CSS', 'JavaScript', 'SQL'],
    video: '',
    live: 'https://pickthestick.github.io/PickTheStick/signup.html'
    ,
    github: 'https://github.com/PickTheStick/PickTheStick'
  },
  {
    id: 'baseball-lineup',
    category: 'web',
    title: 'Baseball Lineup Creator',
    date: '2021-2023',
    description: 'Fantasy Pokémon baseball lineup generator with real-time backend interaction.',
    tools: ['VS Code', 'GitHub', 'HTML5', 'Bootstrap'],
    languages: ['HTML', 'CSS', 'JavaScript', 'SQL'],
    video: 'https://www.youtube.com/embed/lXgOXg24npk'
    ,
    webfile: 'https://drive.google.com/file/d/1xHW-VP5aigOckZHe_LFpDQ_bCZUMnamj/view?usp=sharing'
  },
  {
    id: 'talkingvids',
    category: 'web',
    title: 'TalkingVids Website',
    date: '2024-2026',
    description: 'Multimedia promotional site using Squarespace demonstrating responsive layout and interactive media.',
    tools: ['Adobe Creative Cloud', 'Squarespace'],
    video: 'https://www.youtube.com/embed/ehjbj8V3Rd4',
    live: 'http://talkingvids.com/'
  },
  {
    id: 'soundinggreat',
    category: 'web',
    title: 'SoundingGreat Website',
    date: '2022-2023',
    description: 'Originally built in Wix, migrated to Squarespace, demonstrating UI adaptability and full-stack deployment considerations.',
    tools: ['Adobe Creative Cloud', 'Wix', 'Squarespace'],
    video: 'https://www.youtube.com/embed/dLtcX_ihL9Y',
    live: 'http://soundinggreat.com/'
  },

  // Miscellaneous
  {
    id: 'vr-models',
    category: 'misc',
    title: 'VR Baseball – Models & Textures',
    date: '2023-2025',
    description: '3D models, textures, and animations for VR game "A Devil’s Revenge". Demonstrates 3D modeling and Unity integration.',
    tools: ['Maya', 'Substance Painter', 'Unity'],
    video: 'https://www.youtube.com/embed/yRQLlCv_mDs'
  },
  {
    id: 'audio-samples',
    category: 'misc',
    title: 'Audio Engineering Samples',
    date: '2019-2026',
    description: 'Collection of composed and engineered audio tracks including game themes and conceptual music.',
    tools: ['MuseScore3 & 4', 'ChucK', 'Unity', 'Audition'],
    audio: [
      { title: 'Conceptual Music', src: 'audio/ConceptualMusic.mp3' },
      { title: 'Devil’s Revenge Theme', src: 'audio/DevilsRevengeTheme.mp3' },
      { title: 'Random Game Music', src: 'audio/RandomGameMusicWithAbruptTransitions.mp3' }
    ],
    folderLink: 'https://drive.google.com/drive/folders/1oFUif12f2AWLHorq8yBRShPelbtVtV0_?usp=sharing'
  }
];

/* =========================
   PROJECT GRID RENDERING
========================= */
const projectGrid = document.getElementById('project-grid');
// keep track of active slideshow intervals so we can clear them when re-rendering
let slideshowIntervals = [];

function createTag(name) {
  const span = document.createElement('span');
  span.classList.add('tag');
  span.textContent = name;
  return span;
}

// map of icons for each project (could easily be extended)
const projectIcons = {
  'vr-baseball': '⚾',
  'balls-unreal': '🎮',
  'crackjack': '🃏',
  'guru-donuts': '🍩',
  'interactive-comic': '📖',
  'olympics-animation': '🎬',
  'baseball-slide': '⚾',
  'art-gallery': '🖼️',
  'lineupwars': '📝',
  'pickthestick': '🎯',
  'baseball-lineup': '📊',
  'talkingvids': '🎥',
  'soundinggreat': '🎵',
  'vr-models': '🧩',
  'audio-samples': '🎧'
};


function renderProjects(filter = 'all', showAll = false) {
  projectGrid.innerHTML = '';

  const featuredIds = ['vr-baseball', 'lineupwars', 'olympics-animation', 'balls-unreal', 'interactive-comic'];

  const list = projects.filter(p => {
    if (filter === 'all' && !showAll) return featuredIds.includes(p.id);
    return filter === 'all' || p.category === filter;
  });

  // clear any existing slideshow intervals (prevent duplicates on re-render)
  slideshowIntervals.forEach(id => clearInterval(id));
  slideshowIntervals = [];

  // sort by the latest year in `date` (descending)
  function endYear(d) {
    if (!d) return 0;
    const years = d.match(/\d{4}/g);
    if (!years) return 0;
    return parseInt(years[years.length - 1], 10);
  }

  function startYear(d) {
    if (!d) return 0;
    const years = d.match(/\d{4}/g);
    if (!years) return 0;
    return parseInt(years[0], 10);
  }

  list.sort((a, b) => {
    const ey = endYear(b.date) - endYear(a.date);
    if (ey !== 0) return ey;
    return startYear(b.date) - startYear(a.date);
  });

  list.forEach(p => {
      const card = document.createElement('div');
      card.classList.add('project-card');
      card.dataset.category = p.category;

      // Media
      const mediaDiv = document.createElement('div');
      mediaDiv.classList.add('project-media');

      if (p.video) {
        const iframe = document.createElement('iframe');
        iframe.src = p.video;
        iframe.title = p.title;
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';
        mediaDiv.appendChild(iframe);
      } else if (p.live) {
        // special-case: LineupWars uses a 6-image slideshow instead of a single thumbnail
        if (p.id === 'lineupwars') {
          const slideshow = document.createElement('div');
          slideshow.classList.add('slideshow');

          const slideCount = 6; // imgs named 1.png..6.png in imgs/
          const slides = [];
          for (let i = 1; i <= slideCount; i++) {
            const s = document.createElement('img');
            s.src = `imgs/${i}.png`;
            s.alt = `${p.title} slide ${i}`;
            s.loading = 'lazy';
            s.classList.add('slide');
            if (i === 1) s.classList.add('active');
            slideshow.appendChild(s);
            slides.push(s);
          }

          // slideshow controller
          let idx = 0;
          function start() {
            const id = setInterval(() => {
              slides[idx].classList.remove('active');
              idx = (idx + 1) % slides.length;
              slides[idx].classList.add('active');
            }, 2500);
            slideshowIntervals.push(id);
            slideshow._intervalId = id;
          }

          start();

          // pause on hover, resume on leave
          slideshow.addEventListener('mouseenter', () => {
            if (slideshow._intervalId) {
              clearInterval(slideshow._intervalId);
              slideshowIntervals = slideshowIntervals.filter(i => i !== slideshow._intervalId);
              slideshow._intervalId = null;
            }
          });
          slideshow.addEventListener('mouseleave', () => {
            if (!slideshow._intervalId) start();
          });

          mediaDiv.appendChild(slideshow);
        } else {
          const img = document.createElement('img');
          img.src = `imgs/${p.id}.png`;
          img.alt = p.title;
          img.loading = 'lazy';
          mediaDiv.appendChild(img);
        }
      } else if (p.audio) {
        // For audio project, create a responsive 3-track thumbnail
        const thumb = document.createElement('div');
        thumb.classList.add('audio-thumb');

        const audioEls = [];

        p.audio.forEach((track, i) => {
          const item = document.createElement('div');
          item.classList.add('thumb-item');
          item.dataset.index = i;

          const icon = document.createElement('div');
          icon.classList.add('play-icon');
          icon.textContent = '▶';
          item.appendChild(icon);

          const audio = document.createElement('audio');
          audio.preload = 'metadata';
          const source = document.createElement('source');
          source.src = track.src;
          source.type = 'audio/mpeg';
          audio.appendChild(source);
          audio.style.display = 'none';
          item.appendChild(audio);

          audioEls.push(audio);

          // Play/pause handling: pause other tracks, toggle this one
          item.addEventListener('click', (e) => {
            e.stopPropagation();
            audioEls.forEach(a => {
              if (a !== audio) {
                a.pause();
                a.currentTime = 0;
                if (a.parentElement) {
                  a.parentElement.classList.remove('playing');
                  const pi = a.parentElement.querySelector('.play-icon');
                  if (pi) pi.textContent = '▶';
                }
              }
            });

            if (audio.paused) {
              audio.play();
              item.classList.add('playing');
              icon.textContent = '⏸';
            } else {
              audio.pause();
              audio.currentTime = 0;
              item.classList.remove('playing');
              icon.textContent = '▶';
            }

            audio.addEventListener('ended', () => {
              item.classList.remove('playing');
              icon.textContent = '▶';
              audio.currentTime = 0;
            });
          });

          thumb.appendChild(item);
        });

        mediaDiv.appendChild(thumb);
      }

      // Info
      const infoDiv = document.createElement('div');
      infoDiv.classList.add('project-info');

      const h3 = document.createElement('h3');
      const icon = projectIcons[p.id] || '📁';
      h3.innerHTML = `${icon} ${p.title}`;
      infoDiv.appendChild(h3);

      // Date / timeline
      if (p.date) {
        const dateEl = document.createElement('div');
        dateEl.classList.add('project-date');
        dateEl.textContent = p.date;
        infoDiv.appendChild(dateEl);
      }

      // Tools
      if (p.tools) {
        const toolsDiv = document.createElement('div');
        toolsDiv.classList.add('tags-container');
        const label = document.createElement('strong');
        label.textContent = 'Tools: ';
        toolsDiv.appendChild(label);
        p.tools.forEach(tool => toolsDiv.appendChild(createTag(tool)));
        infoDiv.appendChild(toolsDiv);
      }

      // Languages
      if (p.languages) {
        const langDiv = document.createElement('div');
        langDiv.classList.add('tags-container');
        const label = document.createElement('strong');
        label.textContent = 'Languages: ';
        langDiv.appendChild(label);
        p.languages.forEach(lang => langDiv.appendChild(createTag(lang)));
        infoDiv.appendChild(langDiv);
      }

      // Buttons
      const buttonsDiv = document.createElement('div');
      buttonsDiv.classList.add('project-buttons');

      // Info button (ℹ️)
      const infoBtn = document.createElement('button');
      infoBtn.classList.add('btn-modal');
      infoBtn.dataset.project = p.id;
      infoBtn.textContent = 'ℹ️';
      infoBtn.setAttribute('aria-label', 'More info about this project');
      infoBtn.title = 'More info';
      buttonsDiv.appendChild(infoBtn);

      // GitHub, Slides, Wireframe, Live Demo buttons
      if (p.github) {
        const ghLink = document.createElement('a');
        ghLink.href = p.github;
        ghLink.target = '_blank';
        ghLink.rel = 'noopener noreferrer';
        ghLink.classList.add('btn-primary');
        ghLink.textContent = 'GitHub';
        buttonsDiv.appendChild(ghLink);
      }
      //unique case for vr-baseball: Additional Game Demo button linking to YouTube video (since the main GitHub repo doesn't have a demo link)
      if (p.gameDemo) {
        const demoLink = document.createElement('a');
        demoLink.href = p.gameDemo;
        demoLink.target = '_blank';
        demoLink.rel = 'noopener noreferrer';
        demoLink.classList.add('btn-primary');
        demoLink.textContent = 'Game Demo';
        buttonsDiv.appendChild(demoLink);
      }

      if (p.slides) {
        const slideLink = document.createElement('a');
        slideLink.href = p.slides;
        slideLink.target = '_blank';
        slideLink.rel = 'noopener noreferrer';
        slideLink.classList.add('btn-primary');
        slideLink.textContent = 'Slides';
        buttonsDiv.appendChild(slideLink);
      }

      if (p.wireframe) {
        const wfLink = document.createElement('a');
        wfLink.href = p.wireframe;
        wfLink.target = '_blank';
        wfLink.rel = 'noopener noreferrer';
        wfLink.classList.add('btn-primary');
        wfLink.textContent = 'Wireframe';
        buttonsDiv.appendChild(wfLink);
      }

      if (p.projectFiles) {
        const pfLink = document.createElement('a');
        pfLink.href = p.projectFiles;
        pfLink.target = '_blank';
        pfLink.rel = 'noopener noreferrer';
        pfLink.classList.add('btn-primary');
        pfLink.textContent = 'Project Files';
        buttonsDiv.appendChild(pfLink);
      }

      if (p.webfile) {
        const wf = document.createElement('a');
        wf.href = p.webfile;
        wf.target = '_blank';
        wf.rel = 'noopener noreferrer';
        wf.classList.add('btn-primary');
        wf.textContent = 'Web File';
        buttonsDiv.appendChild(wf);
      }

      if (p.live) {
        const liveLink = document.createElement('a');
        liveLink.href = p.live;
        liveLink.target = '_blank';
        liveLink.rel = 'noopener noreferrer';
        liveLink.classList.add('btn-primary');
        liveLink.textContent = 'Live Demo';
        buttonsDiv.appendChild(liveLink);
      }

      // Audio project: add folder link button
      if (p.audio && p.folderLink) {
        const folderBtn = document.createElement('a');
        folderBtn.href = p.folderLink;
        folderBtn.target = '_blank';
        folderBtn.rel = 'noopener noreferrer';
        folderBtn.classList.add('btn-primary');
        folderBtn.textContent = 'Full Audio Directory';
        buttonsDiv.appendChild(folderBtn);
      }

      infoDiv.appendChild(buttonsDiv);

      // audio tracks are now handled inside the media thumbnail; no audio-grid here

      card.appendChild(mediaDiv);
      card.appendChild(infoDiv);
      // clicking on card (but not on buttons/links) also opens modal info
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.project-buttons') && !e.target.closest('a')) {
          infoBtn.click();
        }
      });
      projectGrid.appendChild(card);
      });

    // If we're in the 'All' view and not showing all projects, add a centered See More button
    if (filter === 'all' && !showAll && projects.length > list.length) {
      const seeMoreWrap = document.createElement('div');
      seeMoreWrap.classList.add('see-more-container');
      const seeMoreBtn = document.createElement('button');
      seeMoreBtn.classList.add('btn-primary');
      seeMoreBtn.textContent = 'See More';
      seeMoreBtn.addEventListener('click', () => renderProjects('all', true));
      seeMoreWrap.appendChild(seeMoreBtn);
      projectGrid.parentElement.appendChild(seeMoreWrap);
    } else {
      // remove any existing see-more container when not needed
      const existing = document.querySelector('.see-more-container');
      if (existing) existing.remove();
    }

    attachModalButtons();
}

/* =========================
   FILTER BUTTON FUNCTIONALITY
========================= */
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected','false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected','true');
    renderProjects(btn.dataset.category);
  });
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      const next = filterButtons[(index + dir + filterButtons.length) % filterButtons.length];
      next.focus();
    }
  });
});

/* =========================
   MODAL FUNCTIONALITY
========================= */
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

function attachModalButtons() {
  document.querySelectorAll('.btn-modal').forEach(button => {
    button.addEventListener('click', () => {
      const projectId = button.dataset.project;
      const project = projects.find(p => p.id === projectId);
      if (!project) return;

      modalBody.innerHTML = `
        <h2 id="modal-title">${project.title}</h2>
        ${project.date ? `<p class="modal-date">${project.date}</p>` : ''}
        ${project.video ? `<iframe width="100%" height="400" src="${project.video}" frameborder="0" allowfullscreen loading="lazy"></iframe>` : ''}
        <p>${project.description}</p>
        ${project.tools ? `<div class="tags-container"><strong>Tools: </strong>${project.tools.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
        ${project.languages ? `<div class="tags-container"><strong>Languages: </strong>${project.languages.map(l => `<span class="tag">${l}</span>`).join('')}</div>` : ''}
        ${project.gameDemo ? `<p><a href="${project.gameDemo}" target="_blank" rel="noopener noreferrer" class="btn-primary">Game Demo</a></p>` : ''}
        ${project.github && !(project.repos && project.repos.some(r => r.url === project.github)) ? `<p><a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn-primary">GitHub</a></p>` : ''}
        ${project.slides ? `<p><a href="${project.slides}" target="_blank" rel="noopener noreferrer" class="btn-primary">Slides</a></p>` : ''}
        ${project.wireframe ? `<p><a href="${project.wireframe}" target="_blank" rel="noopener noreferrer" class="btn-primary">Wireframe</a></p>` : ''}
        ${project.live ? `<p><a href="${project.live}" target="_blank" rel="noopener noreferrer" class="btn-primary">Live Demo</a></p>` : ''}
        ${project.projectFiles ? `<p><a href="${project.projectFiles}" target="_blank" rel="noopener noreferrer" class="btn-primary">Project Files</a></p>` : ''}
        ${project.webfile ? `<p><a href="${project.webfile}" target="_blank" rel="noopener noreferrer" class="btn-primary">Web File</a></p>` : ''}
        ${project.audio && project.folderLink ? `<p><a href="${project.folderLink}" target="_blank" rel="noopener noreferrer" class="btn-primary">Full Audio Directory</a></p>` : ''}
        ${project.repos ? `<div style="margin-top:0.75rem;"><strong>Additional Repos:</strong><ul style="list-style:none;padding:0;margin:0.5rem 0 0 0;display:flex;flex-wrap:wrap;gap:0.5rem;">${project.repos.map(r => `<li><a href="${r.url}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="padding:0.4rem 0.7rem;font-size:0.9rem;">${r.label}</a></li>`).join('')}</ul></div>` : ''}
      `;
      // store element that had focus so we can restore it later
      modal._previouslyFocused = document.activeElement;
      modal.setAttribute('aria-hidden', 'false');
      modal.style.display = 'block';
      // trigger fade-in class and start trapping focus
      setTimeout(() => {
        modal.classList.add('show');
        modal.addEventListener('keydown', trapFocus);
        modal.focus(); // ensure dialog gets focus
      }, 10);
    });
  });
}

closeModal.addEventListener('click', () => {
  closeModalFunc();
});

function closeModalFunc() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  // return focus to element that opened modal
  if (modal._previouslyFocused) modal._previouslyFocused.focus();
  // wait for fade-out transition then hide
  setTimeout(() => { modal.style.display = 'none'; }, 400);
  modal.removeEventListener('keydown', trapFocus);
}

// handle clicking outside modal earlier
window.addEventListener('click', e => {
  if (e.target == modal) {
    closeModalFunc();
  }
});

// general keydown listener for Escape to close
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.style.display === 'block') {
    closeModalFunc();
  }
});

function trapFocus(e) {
  if (e.key !== 'Tab') return;
  const focusable = modal.querySelectorAll('a, button, iframe, [tabindex]:not([tabindex="-1"])');
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}
window.addEventListener('click', e => {
  if (e.target == modal) {
    modal.classList.remove('show');
    setTimeout(() => { modal.style.display = 'none'; }, 400);
  }
});


/* =========================
   CUSTOM BASEBALL SCROLLBAR
========================= */
function initCustomScrollbar() {
  // build DOM elements only once
  customScrollbarScrollbar = document.createElement('div');
  customScrollbarScrollbar.className = 'custom-scrollbar';
  customScrollbarTrack = document.createElement('div');
  customScrollbarTrack.className = 'track';
  customScrollbarThumb = document.createElement('div');
  customScrollbarThumb.className = 'thumb';
  customScrollbarTrack.appendChild(customScrollbarThumb);
  customScrollbarScrollbar.appendChild(customScrollbarTrack);
  document.body.appendChild(customScrollbarScrollbar);

  // create section markers based on page sections
  const sectionMap = [
    {id: 'home', label: 'HP'},
    {id: 'about', label: '1B'},
    {id: 'projects', label: '2B'},
    {id: 'resume', label: '3B'},
    {id: 'contact', label: 'HR'}
  ];
  customScrollbarMarkers = [];
  sectionMap.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) {
      const marker = document.createElement('div');
      marker.className = 'marker';
      const span = document.createElement('span');
      span.textContent = item.label;
      marker.appendChild(span);
      customScrollbarTrack.appendChild(marker);
      customScrollbarMarkers.push({el, marker});
    }
  });

  let isDragging = false;
  let startY = 0;
  let startTopPct = 0;

  function updateMarkers() {
    const doc = document.documentElement;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    if (scrollHeight <= 0) return;
    // compute thumb height percentage once since every marker uses it
    const thumbHeightPct = customScrollbarThumb ? parseFloat(customScrollbarThumb.style.height) : 0;

    customScrollbarMarkers.forEach(({el, marker}) => {
      if (marker.dataset.locked === 'true') return; // keep position if locked
      let target = el.offsetTop;
      target = Math.min(Math.max(target, 0), scrollHeight);
      const pct = scrollHeight > 0 ? target / scrollHeight : 0;
      // align marker center with thumb center: thumbTopPct + halfThumbHeightPct
      let topPct = pct * (100 - thumbHeightPct) + thumbHeightPct / 2;
      // ensure markers don't get cut off at the very top/bottom; compute
      // half-marker height in percent of track and clamp accordingly.
      const trackHeight = customScrollbarTrack.clientHeight || 1;
      const halfMarkerPct = (marker.offsetHeight / 2) / trackHeight * 100;
      topPct = Math.min(Math.max(topPct, halfMarkerPct), 100 - halfMarkerPct);
      marker.style.top = topPct + '%';
    });
  }

  function update() {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    if (scrollHeight <= 0) {
      customScrollbarScrollbar.style.display = 'none';
      return;
    } else {
      customScrollbarScrollbar.style.display = '';
    }
    const thumbHeightPct = Math.max((doc.clientHeight / doc.scrollHeight) * 100, 5);
    customScrollbarThumb.style.height = thumbHeightPct + '%';
    const topPct = (scrollTop / scrollHeight) * (100 - thumbHeightPct);
    customScrollbarThumb.style.top = topPct + '%';
    const angle = (scrollTop / scrollHeight) * 1080; // three full rotations over scroll
    customScrollbarThumb.style.setProperty('--rotate-angle', angle + 'deg');
    // reposition section markers
    updateMarkers();
  }

  // dragging the thumb
  customScrollbarTrack.addEventListener('mousedown', e => {
    if (e.target !== customScrollbarThumb) return; // start only when clicking the ball itself
    isDragging = true;
    startY = e.clientY;
    startTopPct = parseFloat(customScrollbarThumb.style.top) || 0;
    document.body.classList.add('no-select');
    e.preventDefault();
  });

  // clicking the track jumps to that position
  customScrollbarTrack.addEventListener('click', e => {
    if (e.target !== customScrollbarTrack) return; // ignore clicks on thumb
    const rect = customScrollbarTrack.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const pct = clickY / rect.height;
    const doc = document.documentElement;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    window.scrollTo({ top: pct * scrollHeight, behavior: 'smooth' });
  });
  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const delta = e.clientY - startY;
    const trackHeight = customScrollbarTrack.clientHeight;
    const pctDelta = (delta / trackHeight) * 100;
    let newTop = startTopPct + pctDelta;
    const thumbHeightPct = parseFloat(customScrollbarThumb.style.height);
    newTop = Math.max(0, Math.min(newTop, 100 - thumbHeightPct));
    customScrollbarThumb.style.top = newTop + '%';
    const doc = document.documentElement;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const ratio = newTop / (100 - thumbHeightPct);
    window.scrollTo(0, ratio * scrollHeight);
  });
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      document.body.classList.remove('no-select');
    }
  });

  document.addEventListener('scroll', update);
  window.addEventListener('resize', () => {
    update();
    updateMarkers();
  });
  update();
  updateMarkers();
}

/* =========================
   INITIAL RENDER
========================= */
renderProjects('all');
