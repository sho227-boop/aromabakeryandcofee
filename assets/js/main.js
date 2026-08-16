(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Intro splash ---------- */
  /* Shows once per browser session (sessionStorage-gated), not on every
     internal navigation/back button. Skips the blur/scale choreography
     entirely under prefers-reduced-motion — just a quick fade. */
  const intro = document.getElementById('introSplash');
  if (intro) {
    const alreadyShown = (() => {
      try { return sessionStorage.getItem('aromaIntroShown') === 'true'; }
      catch (_) { return false; }
    })();

    if (alreadyShown) {
      intro.classList.add('is-hidden');
      intro.setAttribute('aria-hidden', 'true');
      intro.style.display = 'none';
    } else {
      document.body.classList.add('nav-open'); // lock scroll during intro
      requestAnimationFrame(() => {
        requestAnimationFrame(() => intro.classList.add('is-visible'));
      });

      const holdMs = reduceMotion ? 400 : 2600;
      const fadeMs = reduceMotion ? 300 : 700;

      const dismiss = () => {
        intro.classList.add('is-hidden');
        intro.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('nav-open');
        try { sessionStorage.setItem('aromaIntroShown', 'true'); } catch (_) {}
        setTimeout(() => { intro.style.display = 'none'; }, fadeMs);
      };

      setTimeout(dismiss, holdMs);
    }
  }

  /* ---------- Sticky / transitioning header ---------- */
  const header = document.getElementById('siteHeader');
  // Pages without a full-bleed hero (menu.html, custom-cakes.html, etc.)
  // have nothing dark behind the header to justify the transparent/cream
  // starting state — force the solid "scrolled" style immediately so the
  // cream wordmark isn't invisible against the cream page background.
  const hasHero = !!document.querySelector('.hero');
  const setHeaderState = () => {
    header.classList.toggle('is-scrolled', !hasHero || window.scrollY > 60);
  };
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  /* ---------- Mobile nav ---------- */
  const menuTrigger = document.getElementById('menuTrigger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileScrim = document.getElementById('mobileScrim');

  const openNav = () => {
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    menuTrigger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  };
  const closeNav = () => {
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    menuTrigger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  };
  menuTrigger.addEventListener('click', () => {
    mobileNav.classList.contains('is-open') ? closeNav() : openNav();
  });
  mobileScrim.addEventListener('click', closeNav);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Hero load-in ---------- */
  const hero = document.querySelector('.hero');
  requestAnimationFrame(() => {
    setTimeout(() => hero && hero.classList.add('is-loaded'), 80);
  });

  /* ---------- Hero parallax (subtle, rAF-throttled) ---------- */
  if (!reduceMotion) {
    const heroContent = document.querySelector('.hero-content');
    let ticking = false;
    const applyParallax = () => {
      const y = window.scrollY;
      const heroH = hero ? hero.offsetHeight : 0;
      if (y < heroH && heroContent) {
        heroContent.style.transform = `translateY(${y * 0.18}px)`;
      }
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(applyParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- Signature mousse video ---------- */
  /* Inert until the real <video id="mousseVideo"> replaces the homepage
     placeholder (see the comment above .mousse-feature in index.html) —
     document.getElementById returns null against the current placeholder
     div, so this is a no-op today and activates automatically once the
     video element exists. Under prefers-reduced-motion: don't autoplay;
     pause on a still frame (falls back to the poster) instead. */
  const mousseVideo = document.getElementById('mousseVideo');
  if (mousseVideo) {
    if (reduceMotion) {
      mousseVideo.removeAttribute('autoplay');
      mousseVideo.pause();
    } else {
      // Some browsers still block autoplay depending on context; retry
      // once, and just leave the poster showing if it's refused.
      mousseVideo.play().catch(() => {});
    }
  }

  /* ---------- Menu tabs ---------- */
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');

  function activateTab(name) {
    tabs.forEach(t => {
      const active = t.dataset.tab === name;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', String(active));
    });
    panels.forEach(p => {
      const active = p.id === `panel-${name}`;
      p.classList.toggle('is-active', active);
      p.hidden = !active;
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab.dataset.tab));
  });

  document.querySelectorAll('[data-tab-target]').forEach(el => {
    el.addEventListener('click', (e) => {
      // Target may be nested inside a hidden panel (e.g. #custom-cakes),
      // so activate the tab first, then scroll to the anchor once it's
      // actually rendered.
      const hash = el.getAttribute('href');
      e.preventDefault();
      activateTab(el.dataset.tabTarget);
      requestAnimationFrame(() => {
        const dest = hash && document.querySelector(hash);
        if (dest) dest.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });
    });
  });

  /* ---------- Deep-link into a menu tab via #panel-<tab> ---------- */
  /* Used by the homepage's category cards (menu.html#panel-bread etc.) —
     the target panel starts `hidden`, so a plain URL-hash jump can't land
     on it. Activate the right tab first, then scroll to the tab section. */
  if (tabs.length && location.hash.startsWith('#panel-')) {
    const tabName = location.hash.slice('#panel-'.length);
    if (document.querySelector(`.menu-tab[data-tab="${tabName}"]`)) {
      activateTab(tabName);
      requestAnimationFrame(() => {
        document.getElementById('menu')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });
    }
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
