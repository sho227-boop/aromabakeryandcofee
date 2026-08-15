(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Sticky / transitioning header ---------- */
  const header = document.getElementById('siteHeader');
  const setHeaderState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 60);
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

  /* ---------- Bakery case panorama pan ---------- */
  const pano = document.getElementById('panoImg');
  if (pano && !reduceMotion) {
    let ticking2 = false;
    const applyPan = () => {
      const rect = pano.parentElement.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, 1 - (rect.top + rect.height) / (vh + rect.height)));
      const shift = (progress - 0.5) * 60; // px
      pano.style.transform = `translateY(${shift}px)`;
      ticking2 = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking2) { requestAnimationFrame(applyPan); ticking2 = true; }
    }, { passive: true });
    applyPan();
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
    el.addEventListener('click', () => {
      // let the anchor jump happen, then switch tab
      setTimeout(() => activateTab(el.dataset.tabTarget), 250);
    });
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
