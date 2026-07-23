window.App = window.App || {};

(() => {
  /* =========================
     CUSTOM SCROLLBAR STATE (shared)
  ========================= */
  const MIN_THUMB_HEIGHT_PCT = 5;
  const MARKER_MOVE_EPSILON_PCT = 0.08;
  const MARKER_REFRESH_DELAY_MS = 90;

  let customScrollbarMarkers = [];
  let customScrollbarThumb;
  let customScrollbarTrack;
  let customScrollbarScrollbar;
  let scrollbarLayout;
  let animationFramePending = false;
  let markerRefreshTimer = 0;
  let scrollSettleCleanup;
  let lastViewportWidth = window.innerWidth || 0;
  let lastDocumentHeight = 0;
  let resizeObserver;
  let mutationObserver;
  let isDragging = false;
  let startY = 0;
  let startTopPct = 0;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function getScrollTop() {
    const doc = document.documentElement;
    return window.scrollY || window.pageYOffset || doc.scrollTop || document.body.scrollTop || 0;
  }

  function getDocumentHeight() {
    const doc = document.documentElement;
    const body = document.body;
    return Math.max(
      doc.scrollHeight,
      body ? body.scrollHeight : 0,
      doc.offsetHeight,
      body ? body.offsetHeight : 0
    );
  }

  function parsePx(value) {
    const parsed = parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function isCoarsePointer() {
    return window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  }

  function readScrollbarLayout() {
    const doc = document.documentElement;
    const viewportHeight = Math.max(doc.clientHeight || window.innerHeight || 1, 1);
    const scrollHeight = Math.max(getDocumentHeight(), viewportHeight);
    const scrollRange = Math.max(scrollHeight - viewportHeight, 0);
    const trackHeight = Math.max(customScrollbarTrack?.clientHeight || viewportHeight, 1);
    const thumbHeightPct = clamp(
      Math.max((viewportHeight / scrollHeight) * 100, MIN_THUMB_HEIGHT_PCT),
      MIN_THUMB_HEIGHT_PCT,
      100
    );

    return {
      viewportHeight,
      scrollHeight,
      scrollRange,
      trackHeight,
      thumbHeightPct,
      thumbTravelPct: Math.max(100 - thumbHeightPct, 0)
    };
  }

  function syncScrollbarLayout() {
    scrollbarLayout = readScrollbarLayout();
    lastDocumentHeight = scrollbarLayout.scrollHeight;

    if (customScrollbarThumb) {
      customScrollbarThumb.style.height = scrollbarLayout.thumbHeightPct.toFixed(3) + '%';
    }

    if (customScrollbarScrollbar) {
      customScrollbarScrollbar.style.display = scrollbarLayout.scrollRange <= 0 ? 'none' : '';
    }

    return scrollbarLayout;
  }

  function getSectionTargetScroll(el, layout) {
    const sectionTop = el.getBoundingClientRect().top + getScrollTop();
    const scrollMarginTop = parsePx(window.getComputedStyle(el).scrollMarginTop);
    return clamp(sectionTop - scrollMarginTop, 0, layout.scrollRange);
  }

  function markerTopForScrollTarget(targetScroll, marker, layout) {
    const pct = layout.scrollRange > 0 ? targetScroll / layout.scrollRange : 0;
    let topPct = pct * layout.thumbTravelPct + layout.thumbHeightPct / 2;
    const markerHeight = marker.offsetHeight || 24;
    const halfMarkerPct = (markerHeight / 2 / layout.trackHeight) * 100;
    return clamp(topPct, halfMarkerPct, 100 - halfMarkerPct);
  }

  function setMarkerTop(marker, topPct) {
    const previousTopPct = marker._customScrollbarTopPct;
    if (
      typeof previousTopPct === 'number' &&
      Math.abs(previousTopPct - topPct) < MARKER_MOVE_EPSILON_PCT
    ) {
      return;
    }

    marker._customScrollbarTopPct = topPct;
    marker.style.top = topPct.toFixed(3) + '%';
  }

  function refreshMarkerLayout() {
    window.clearTimeout(markerRefreshTimer);
    const layout = syncScrollbarLayout();
    if (!customScrollbarMarkers.length || !customScrollbarTrack || layout.scrollRange <= 0) {
      update();
      return;
    }

    customScrollbarMarkers.forEach(({ el, marker }) => {
      const targetScroll = getSectionTargetScroll(el, layout);
      setMarkerTop(marker, markerTopForScrollTarget(targetScroll, marker, layout));
    });

    update();
  }

  function scheduleMarkerRefresh(delay = MARKER_REFRESH_DELAY_MS) {
    window.clearTimeout(markerRefreshTimer);
    markerRefreshTimer = window.setTimeout(() => {
      window.requestAnimationFrame(refreshMarkerLayout);
    }, delay);
  }

  function update() {
    animationFramePending = false;
    if (!customScrollbarScrollbar || !customScrollbarThumb) return;

    const layout = scrollbarLayout || syncScrollbarLayout();
    if (layout.scrollRange <= 0) {
      customScrollbarScrollbar.style.display = 'none';
      return;
    } else {
      customScrollbarScrollbar.style.display = '';
    }

    const ratio = clamp(getScrollTop() / layout.scrollRange, 0, 1);
    const topPct = ratio * layout.thumbTravelPct;
    customScrollbarThumb.style.top = topPct.toFixed(3) + '%';
    const angle = ratio * 1080; // three full rotations over scroll
    customScrollbarThumb.style.setProperty('--rotate-angle', angle + 'deg');
  }

  function scheduleUpdate() {
    if (animationFramePending) return;
    animationFramePending = true;
    window.requestAnimationFrame(update);
  }

  function handlePossibleLayoutChange() {
    const documentHeight = getDocumentHeight();
    if (Math.abs(documentHeight - lastDocumentHeight) > 2) {
      scheduleMarkerRefresh();
    }
  }

  function repositionMarker(id) {
    if (id && !customScrollbarMarkers.some(m => m.el.id === id)) return;
    refreshMarkerLayout();
  }

  function moveMarkerAfterScroll(id, targetScroll) {
    if (scrollSettleCleanup) scrollSettleCleanup();

    let settleTimer = 0;
    let maxTimer = 0;
    const target = typeof targetScroll === 'number' ? targetScroll : null;

    function cleanup() {
      window.clearTimeout(settleTimer);
      window.clearTimeout(maxTimer);
      window.removeEventListener('scroll', onScroll);
      scrollSettleCleanup = null;
      repositionMarker(id);
    }

    function onScroll() {
      window.clearTimeout(settleTimer);

      if (target !== null && Math.abs(getScrollTop() - target) < 2) {
        cleanup();
        return;
      }

      settleTimer = window.setTimeout(cleanup, 140);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    maxTimer = window.setTimeout(cleanup, 1600);
    scrollSettleCleanup = cleanup;
    onScroll();
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
      const layout = scrollbarLayout || syncScrollbarLayout();
      window.scrollTo({ top: pct * layout.scrollRange, behavior: 'smooth' });
    });

    document.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const delta = e.clientY - startY;
      const trackHeight = customScrollbarTrack.clientHeight;
      const pctDelta = (delta / trackHeight) * 100;
      let newTop = startTopPct + pctDelta;
      const layout = scrollbarLayout || syncScrollbarLayout();
      const thumbHeightPct = layout.thumbHeightPct;
      newTop = Math.max(0, Math.min(newTop, 100 - thumbHeightPct));
      customScrollbarThumb.style.top = newTop + '%';
      const ratio = (100 - thumbHeightPct) > 0 ? newTop / (100 - thumbHeightPct) : 0;
      window.scrollTo(0, ratio * layout.scrollRange);
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        document.body.classList.remove('no-select');
      }
    });

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', () => {
      scheduleUpdate();

      const viewportWidth = window.innerWidth || 0;
      const widthChanged = Math.abs(viewportWidth - lastViewportWidth) > 1;
      lastViewportWidth = viewportWidth;

      if (widthChanged || !isCoarsePointer()) {
        scheduleMarkerRefresh(140);
      }
    });

    window.addEventListener('load', () => scheduleMarkerRefresh(0));

    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(handlePossibleLayoutChange);
      resizeObserver.observe(document.body);
    }

    if (window.MutationObserver) {
      const root = document.querySelector('main') || document.body;
      mutationObserver = new MutationObserver(() => scheduleMarkerRefresh(120));
      mutationObserver.observe(root, { childList: true, subtree: true });
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', scheduleUpdate, { passive: true });
    }

    refreshMarkerLayout();
  }

  window.App.initCustomScrollbar = initCustomScrollbar;
  window.App.repositionMarker = repositionMarker;
  window.App.moveMarkerAfterScroll = moveMarkerAfterScroll;
})();
