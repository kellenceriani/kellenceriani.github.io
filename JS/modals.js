window.App = window.App || {};

(() => {
  let modal;
  let modalBody;
  let closeModal;

  /* =========================
     MODAL FUNCTIONALITY
  ========================= */
  function attachModalButtons() {
    if (!modal || !modalBody) return;

    document.querySelectorAll('.btn-modal').forEach(button => {
      button.addEventListener('click', () => {
        const projectId = button.dataset.project;
        const project = (window.App.projects || []).find(p => p.id === projectId);
        if (!project) return;

        // Clear previous content and slideshows
        document.querySelectorAll('.slideshow').forEach(s => {
          if (s._clearInterval) s._clearInterval();
        });
        modalBody.innerHTML = '';

        // TITLE
        const title = document.createElement('h2');
        title.id = 'modal-title';
        title.textContent = project.title;
        modalBody.appendChild(title);

        // DATE
        if (project.date) {
          const dateEl = document.createElement('p');
          dateEl.classList.add('modal-date');
          dateEl.textContent = project.date;
          modalBody.appendChild(dateEl);
        }

        // =======================
        // MEDIA SECTION IN MODAL
        // =======================

        // VIDEO
        if (project.video) {
          const iframe = document.createElement('iframe');
          iframe.width = '100%';
          iframe.height = '400';
          iframe.src = project.video;
          iframe.frameborder = '0';
          iframe.allowFullscreen = true;
          iframe.loading = 'lazy';
          modalBody.appendChild(iframe);
        }

        // LINEUPWARS MODAL SLIDESHOW
        if (project.id === 'lineupwars') {
          const slideshowContainer = document.createElement('div');
          slideshowContainer.style.position = 'relative';
          slideshowContainer.style.marginBottom = '1rem';

          const slideshow = document.createElement('div');
          slideshow.classList.add('slideshow');

          const slideCount = 6;
          const slides = [];
          for (let i = 1; i <= slideCount; i++) {
            const img = document.createElement('img');
            img.src = `imgs/${i}.png`;
            img.alt = `${project.title} slide ${i}`;
            img.loading = 'lazy';
            img.classList.add('slide');
            if (i === 1) img.classList.add('active');
            slideshow.appendChild(img);
            slides.push(img);
          }

          let idx = 0;
          let intervalId = null;

          function startSlideshow() {
            if (intervalId) clearInterval(intervalId);
            intervalId = setInterval(() => {
              slides[idx].classList.remove('active');
              idx = (idx + 1) % slides.length;
              slides[idx].classList.add('active');
            }, 2500);
          }

          function goToSlide(n) {
            slides[idx].classList.remove('active');
            idx = (n + slideCount) % slideCount;
            slides[idx].classList.add('active');
            if (intervalId) clearInterval(intervalId);
            startSlideshow();
          }

          startSlideshow();

          slideshow.addEventListener('mouseenter', () => {
            if (intervalId) {
              clearInterval(intervalId);
              intervalId = null;
            }
          });

          slideshow.addEventListener('mouseleave', startSlideshow);

          slideshow._clearInterval = () => {
            if (intervalId) clearInterval(intervalId);
          };

          slideshowContainer.appendChild(slideshow);

          // Navigation arrows
          const prevBtn = document.createElement('button');
          prevBtn.classList.add('slideshow-control', 'prev');
          prevBtn.innerHTML = '&#10094;';
          prevBtn.setAttribute('aria-label', 'Previous slide');
          prevBtn.addEventListener('click', () => goToSlide(idx - 1));
          slideshowContainer.appendChild(prevBtn);

          const nextBtn = document.createElement('button');
          nextBtn.classList.add('slideshow-control', 'next');
          nextBtn.innerHTML = '&#10095;';
          nextBtn.setAttribute('aria-label', 'Next slide');
          nextBtn.addEventListener('click', () => goToSlide(idx + 1));
          slideshowContainer.appendChild(nextBtn);

          modalBody.appendChild(slideshowContainer);
        }

        // PICKTHESTICK IMAGE
        if (project.id === 'pickthestick') {
          const img = document.createElement('img');
          img.src = 'imgs/pickthestick.png';
          img.alt = project.title;
          img.style.width = '100%';
          img.style.borderRadius = '10px';
          img.style.marginBottom = '1rem';
          modalBody.appendChild(img);
        }

        // AUDIO PROJECT
        if (project.audio) {
          const audioWrap = document.createElement('div');
          audioWrap.style.display = 'grid';
          audioWrap.style.gap = '1rem';
          audioWrap.style.marginBottom = '1rem';

          project.audio.forEach(track => {
            const div = document.createElement('div');
            div.innerHTML = `
      <strong>${track.title}</strong><br>
      <audio controls style="width:100%;">
        <source src="${track.src}" type="audio/mpeg">
      </audio>
    `;
            audioWrap.appendChild(div);
          });

          modalBody.appendChild(audioWrap);
        }

        // DESCRIPTION
        const desc = document.createElement('p');
        desc.textContent = project.description;
        modalBody.appendChild(desc);

        // TAGS
        if (project.tools) {
          const toolsDiv = document.createElement('div');
          toolsDiv.classList.add('tags-container');
          toolsDiv.innerHTML = '<strong>Tools: </strong>';
          project.tools.forEach(t => {
            const tag = document.createElement('span');
            tag.classList.add('tag');
            tag.textContent = t;
            toolsDiv.appendChild(tag);
          });
          modalBody.appendChild(toolsDiv);
        }

        if (project.languages) {
          const langDiv = document.createElement('div');
          langDiv.classList.add('tags-container');
          langDiv.innerHTML = '<strong>Languages: </strong>';
          project.languages.forEach(l => {
            const tag = document.createElement('span');
            tag.classList.add('tag');
            tag.textContent = l;
            langDiv.appendChild(tag);
          });
          modalBody.appendChild(langDiv);
        }

        // BUTTONS - reorganized for LineupWars
        const btnWrapper = document.createElement('div');
        btnWrapper.style.display = 'flex';
        btnWrapper.style.flexWrap = 'wrap';
        btnWrapper.style.gap = '0.5rem';
        btnWrapper.style.marginTop = '1rem';

        if (project.gameDemo) {
          const btn = document.createElement('a');
          btn.href = project.gameDemo;
          btn.target = '_blank';
          btn.rel = 'noopener noreferrer';
          btn.classList.add('btn-primary');
          btn.textContent = 'Game Demo';
          btnWrapper.appendChild(btn);
        }
        if (project.github) {
          const btn = document.createElement('a');
          btn.href = project.github;
          btn.target = '_blank';
          btn.rel = 'noopener noreferrer';
          btn.classList.add('btn-primary');
          btn.textContent = 'GitHub';
          btnWrapper.appendChild(btn);
        }
        if (project.slides) {
          const btn = document.createElement('a');
          btn.href = project.slides;
          btn.target = '_blank';
          btn.rel = 'noopener noreferrer';
          btn.classList.add('btn-primary');
          btn.textContent = 'Slides';
          btnWrapper.appendChild(btn);
        }
        if (project.live) {
          const btn = document.createElement('a');
          btn.href = project.live;
          btn.target = '_blank';
          btn.rel = 'noopener noreferrer';
          btn.classList.add('btn-primary');
          btn.textContent = 'Live Demo';
          btnWrapper.appendChild(btn);
        }
        if (project.folderLink) {
          const btn = document.createElement('a');
          btn.href = project.folderLink;
          btn.target = '_blank';
          btn.rel = 'noopener noreferrer';
          btn.classList.add('btn-primary');
          btn.textContent = 'Full Audio Directory';
          btnWrapper.appendChild(btn);
        }

        if (project.repos) {
          const repoDiv = document.createElement('div');
          repoDiv.style.width = '100%';
          repoDiv.style.marginTop = '0.75rem';
          repoDiv.innerHTML = '<strong>Additional Repos:</strong>';
          const list = document.createElement('ul');
          list.style.listStyle = 'none';
          list.style.padding = '0';
          list.style.margin = '0.5rem 0 0 0';
          list.style.display = 'flex';
          list.style.flexWrap = 'wrap';
          list.style.gap = '0.5rem';

          project.repos.forEach(r => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = r.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.classList.add('btn-primary');
            a.style.padding = '0.4rem 0.7rem';
            a.style.fontSize = '0.9rem';
            a.textContent = r.label;
            li.appendChild(a);
            list.appendChild(li);
          });
          repoDiv.appendChild(list);
          btnWrapper.appendChild(repoDiv);
        }

        modalBody.appendChild(btnWrapper);

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

  function closeModalFunc() {
    if (!modal) return;
    // clear any active slideshows in the modal
    document.querySelectorAll('.slideshow').forEach(s => {
      if (s._clearInterval) s._clearInterval();
    });
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    // return focus to element that opened modal
    if (modal._previouslyFocused) {
      setTimeout(() => modal._previouslyFocused.focus(), 10);
    }
    // wait for fade-out transition then hide
    setTimeout(() => { modal.style.display = 'none'; }, 400);
    modal.removeEventListener('keydown', trapFocus);
  }

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

  function initModals() {
    modal = document.getElementById('project-modal');
    modalBody = document.getElementById('modal-body');
    closeModal = document.querySelector('.close-modal');

    if (!modal || !modalBody || !closeModal) return;

    closeModal.addEventListener('click', () => {
      closeModalFunc();
    });

    // handle clicking outside modal earlier
    window.addEventListener('click', e => {
      if (e.target === modal) {
        closeModalFunc();
      }
    });

    // general keydown listener for Escape to close
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModalFunc();
      }
    });
  }

  window.App.attachModalButtons = attachModalButtons;
  window.App.initModals = initModals;
})();