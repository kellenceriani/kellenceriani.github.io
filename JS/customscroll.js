window.App = window.App || {};

(() => {
  /* =========================
     CUSTOM SCROLLBAR STATE (shared)
  ========================= */
  let customScrollbarMarkers = [];
  let customScrollbarThumb;
  let customScrollbarTrack;
  let customScrollbarScrollbar;

  function repositionMarker(id) {
    if (!customScrollbarMarkers.length || !customScrollbarTrack) return;

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

  /* =========================
     CUSTOM BASEBALL SCROLLBAR
  ========================= */
  function initCustomScrollbar() {
    if (customScrollbarScrollbar) return;

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
      { id: 'home', label: 'HP' },
      { id: 'about', label: '1B' },
      { id: 'projects', label: '2B' },
      { id: 'resume', label: '3B' },
      { id: 'contact', label: 'HR' }
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
        customScrollbarMarkers.push({ el, marker });
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

      customScrollbarMarkers.forEach(({ el, marker }) => {
        if (marker.dataset.locked === 'true') return; // keep position if locked
        let target = el.offsetTop;
        target = Math.min(Math.max(target, 0), scrollHeight);
        const pct = scrollHeight > 0 ? target / scrollHeight : 0;
        // align marker center with thumb center: thumbTopPct + halfThumbHeightPct
        let topPct = pct * (100 - thumbHeightPct) + thumbHeightPct / 2;
        // ensure markers don't get cut off at the very top/bottom
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

  window.App.initCustomScrollbar = initCustomScrollbar;
  window.App.repositionMarker = repositionMarker;
  window.App.moveMarkerAfterScroll = moveMarkerAfterScroll;
})();