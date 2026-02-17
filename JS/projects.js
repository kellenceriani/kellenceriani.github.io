window.App = window.App || {};

(() => {
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
      impact: {
        role: 'Gameplay + interaction programming, 3D asset integration',
        outcome: 'Playable VR loop with grab mechanic and scoring flow',
        metrics: 'Demo-ready build across multi-year iterations',
        scope: 'Solo/lead dev across Unity, art, and UI',
        validation: 'Video demo + public repo'
      },
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
      impact: {
        role: 'Gameplay prototyping + controller integration',
        outcome: 'Playable party-game suite with multi-mode flow',
        metrics: 'Prototype covering multiple competitive challenges',
        scope: 'Team project with rapid iteration',
        validation: 'Gameplay video + presentation slides'
      },
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
      impact: {
        role: 'AR gameplay integration + cross-tool pipeline',
        outcome: 'AR platformer blending blackjack mechanics',
        metrics: 'End-to-end build across Unity and animation tools',
        scope: 'Team collaboration with shared pipeline',
        validation: 'Video + project files'
      },
      tools: ['Vuforia', 'Visual Studio', 'Unity', 'HTML5', 'Adobe Animate', 'After Effects', 'Illustrator'],
      languages: ['C#', 'C++'],
      video: 'https://www.youtube.com/embed/bzkznXykwyQ',
      projectFiles: 'https://drive.google.com/drive/folders/1lxReIjO5UWpR05taKU2PE3urf9YDFjSL?usp=share_link'
    },
    {
      id: 'guru-donuts',
      category: 'games',
      title: 'Guru Donuts Accessibility Companion – AR',
      date: '2023-2024',
      description: 'Accessibility-focused app helping non-verbal autistic users navigate coffee shops. Features visual guides and usability testing.',
      impact: {
        role: 'Accessibility flow design + AR UI implementation',
        outcome: 'Guided, non-verbal friendly navigation aid',
        metrics: 'Usability testing focused on accessibility needs',
        scope: 'Small team prototype with UX emphasis',
        validation: 'Video + GitHub repo'
      },
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
      impact: {
        role: 'Storyboarding lead + Unity integration',
        outcome: 'Interactive narrative experience',
        metrics: 'Multi-scene build with animated sequences',
        scope: 'Team project with task leadership',
        validation: 'Video + project files'
      },
      tools: ['Visual Studio', 'Unity', 'HTML5', 'Adobe Animate', 'Illustrator'],
      languages: ['C++', 'C#'],
      video: 'https://www.youtube.com/embed/S5P4gIgzos8',
      projectFiles: 'https://drive.google.com/drive/folders/14V1G4_qkltiB7M0LbsTzFEQ4Xm-DvR-z?usp=share_link'
    },
    {
      id: 'olympics-animation',
      category: 'animations',
      title: 'Olympics Animation (Rotoscoping)',
      date: '2022-2023',
      description: 'Promotional animation for the Olympics. Learned advanced rotoscoping techniques.',
      impact: {
        role: 'Rotoscoping + animation production',
        outcome: 'Promotional animation short',
        metrics: 'Full pipeline from footage to final cut',
        scope: 'Solo production',
        validation: 'Video'
      },
      tools: ['Adobe Animate'],
      video: 'https://www.youtube.com/embed/fu8AUTe-0m0'
    },
    {
      id: 'baseball-slide',
      category: 'animations',
      title: 'The Only Way to Slide in Baseball',
      date: '2021-2022',
      description: 'First animation project; foundational to skills in digital art and animation.',
      impact: {
        role: 'Animation + digital art production',
        outcome: 'Foundational short animation',
        metrics: 'First complete animation workflow',
        scope: 'Solo production',
        validation: 'Video'
      },
      tools: ['Adobe Animate'],
      video: 'https://www.youtube.com/embed/g8DkEvoixZE'
    },
    {
      id: 'art-gallery',
      category: 'animations',
      title: 'Art Gallery Phone App (Adobe XD)',
      date: '2023-2024',
      description: 'Mobile app showcasing illustrations, designed in Adobe XD with interactive design focus.',
      impact: {
        role: 'UI design + interactive prototyping',
        outcome: 'Mobile gallery flow for illustrations',
        metrics: 'Multi-screen interactive prototype',
        scope: 'Solo design project',
        validation: 'Video + wireframe files'
      },
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
      impact: {
        role: 'Product design + full-stack web development',
        outcome: 'Live fantasy drafting platform',
        metrics: 'Multiple game variants and rule sets',
        scope: 'Solo dev with multi-repo architecture',
        validation: 'Live site + GitHub repos'
      },
      tools: ['VS Code', 'GitHub', 'HTML5', 'Bootstrap'],
      languages: ['HTML', 'CSS', 'JavaScript', 'SQL'],
      video: '',
      live: 'https://lineupwars.com',
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
      impact: {
        role: 'Web app development + scoring logic',
        outcome: 'Live pick-em game with leaderboard',
        metrics: 'Real-time points + season tracking',
        scope: 'Solo/lead dev',
        validation: 'Live site + GitHub repo'
      },
      tools: ['VS Code', 'GitHub', 'HTML5', 'Bootstrap'],
      languages: ['HTML', 'CSS', 'JavaScript', 'SQL'],
      video: '',
      live: 'https://pickthestick.github.io/PickTheStick/signup.html',
      github: 'https://github.com/PickTheStick/PickTheStick'
    },
    {
      id: 'baseball-lineup',
      category: 'web',
      title: 'Baseball Lineup Creator',
      date: '2021-2023',
      description: 'Fantasy Pokémon baseball lineup generator with real-time backend interaction.',
      impact: {
        role: 'Web UI + backend integration',
        outcome: 'Fantasy lineup generator',
        metrics: 'Dynamic roster generation with persistence',
        scope: 'Solo dev',
        validation: 'Video + web file'
      },
      tools: ['VS Code', 'GitHub', 'HTML5', 'Bootstrap'],
      languages: ['HTML', 'CSS', 'JavaScript', 'SQL'],
      video: 'https://www.youtube.com/embed/lXgOXg24npk',
      webfile: 'https://drive.google.com/file/d/1xHW-VP5aigOckZHe_LFpDQ_bCZUMnamj/view?usp=sharing'
    },
    {
      id: 'talkingvids',
      category: 'web',
      title: 'TalkingVids Website',
      date: '2024-2026',
      description: 'Multimedia promotional site using Squarespace demonstrating responsive layout and interactive media.',
      impact: {
        role: 'Site build + multimedia layout',
        outcome: 'Promotional marketing site',
        metrics: 'Responsive layout with media embeds',
        scope: 'Client-style delivery',
        validation: 'Live site + video'
      },
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
      impact: {
        role: 'Site migration + UI adaptation',
        outcome: 'Brand site ported to new platform',
        metrics: 'Preserved content while improving UX',
        scope: 'Solo migration',
        validation: 'Live site + video'
      },
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
      impact: {
        role: '3D modeling + texturing',
        outcome: 'Game-ready asset pack for VR',
        metrics: 'Multiple models with PBR textures',
        scope: 'Solo asset pipeline',
        validation: 'Video'
      },
      tools: ['Maya', 'Substance Painter', 'Unity'],
      video: 'https://www.youtube.com/embed/yRQLlCv_mDs'
    },
    {
      id: 'audio-samples',
      category: 'misc',
      title: 'Audio Engineering Samples',
      date: '2019-2026',
      description: 'Collection of composed and engineered audio tracks including game themes and conceptual music.',
      impact: {
        role: 'Composition + audio engineering',
        outcome: 'Curated audio portfolio',
        metrics: 'Three representative tracks + full directory',
        scope: 'Solo production',
        validation: 'In-site players + audio folder'
      },
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
  let slideshowIntervals = [];

  function createTag(name) {
    const span = document.createElement('span');
    span.classList.add('tag');
    span.textContent = name;
    return span;
  }

  function createImpactSnapshot(impact, compact = false) {
    if (!impact) return null;
    const wrap = document.createElement('details');
    wrap.classList.add('impact-snapshot');
    if (compact) wrap.classList.add('compact');

    const title = document.createElement('summary');
    title.classList.add('impact-summary');
    title.textContent = 'Impact Snapshot';
    wrap.appendChild(title);

    const list = document.createElement('ul');
    list.classList.add('impact-list');

    const items = [
      { label: 'Role', value: impact.role },
      { label: 'Outcome', value: impact.outcome },
      { label: 'Metrics', value: impact.metrics }
    ];

    items.forEach(item => {
      if (!item.value) return;
      const li = document.createElement('li');
      const label = document.createElement('span');
      label.classList.add('impact-label');
      label.textContent = `${item.label}:`;
      const value = document.createElement('span');
      value.classList.add('impact-value');
      value.textContent = item.value;
      li.appendChild(label);
      li.appendChild(value);
      list.appendChild(li);
    });

    wrap.appendChild(list);
    return wrap;
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
    const projectGrid = document.getElementById('project-grid');
    if (!projectGrid) return;

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

      if (p.impact) {
        const impactBlock = createImpactSnapshot(p.impact, true);
        if (impactBlock) infoDiv.appendChild(impactBlock);
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
        if (!e.target.closest('.project-buttons') && !e.target.closest('a') && !e.target.closest('.impact-snapshot')) {
          infoBtn.click();
        }
      });
      projectGrid.appendChild(card);
    });

    // If we're in the 'All' view and not showing all projects, add a centered See More button
    if (filter === 'all' && !showAll && projects.length > list.length) {
      const existing = document.querySelector('.see-more-container');
      if (existing) existing.remove();

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

    if (window.App.attachModalButtons) window.App.attachModalButtons();
  }

  function applyTagVisibility(show) {
    const projectsSection = document.getElementById('projects');
    const toggle = document.getElementById('tag-visibility-toggle');
    if (!projectsSection || !toggle) return;

    projectsSection.classList.toggle('hide-tags', !show);
    toggle.classList.toggle('is-on', show);
    toggle.setAttribute('aria-pressed', show ? 'true' : 'false');
    toggle.setAttribute(
      'aria-label',
      show ? 'Hide tools and languages on project cards' : 'Show tools and languages on project cards'
    );

    const state = toggle.querySelector('.tag-toggle__state');
    if (state) state.textContent = show ? 'On' : 'Off';

    localStorage.setItem('showProjectTags', String(show));
  }

  function initTagToggle() {
    const toggle = document.getElementById('tag-visibility-toggle');
    if (!toggle) return;

    const stored = localStorage.getItem('showProjectTags');
    const initial = stored === null ? true : stored === 'true';
    let isShowing = initial;

    applyTagVisibility(isShowing);

    toggle.addEventListener('click', () => {
      isShowing = !isShowing;
      applyTagVisibility(isShowing);
    });
  }

  /* =========================
     FILTER BUTTON FUNCTIONALITY
  ========================= */
  function bindFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
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
  }

  function initProjects() {
    bindFilterButtons();
    initTagToggle();
    renderProjects('all');
  }

  window.App.projects = projects;
  window.App.createImpactSnapshot = createImpactSnapshot;
  window.App.renderProjects = renderProjects;
  window.App.initProjects = initProjects;
})();