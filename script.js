// ============================================
//   MISAL HUB — JAVASCRIPT v3
// ============================================

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 80);
  scrollTopBtn.classList.toggle('visible', y > 400);

  // active nav link
  let current = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (y >= s.offsetTop - 140) current = s.id;
  });
  document.querySelectorAll('.nav-links a, .mobile-drawer a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== HAMBURGER =====
const hamburger  = document.getElementById('hamburger');
const drawer     = document.getElementById('mobileDrawer');

hamburger.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  const [s0, s1, s2] = hamburger.querySelectorAll('span');
  s0.style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  s1.style.opacity   = open ? '0' : '';
  s2.style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});

drawer.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    drawer.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = s.style.opacity = ''; });
  });
});

document.addEventListener('click', e => {
  if (!drawer.contains(e.target) && !hamburger.contains(e.target)) {
    drawer.classList.remove('open');
  }
});

// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ===== STATS COUNTER =====
function countUp(el, target, decimals = 0) {
  const dur = 1800;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = decimals ? (ease * target).toFixed(decimals) : Math.floor(ease * target);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const statsSection = document.querySelector('.stats-cream');
if (statsSection) {
  const sObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.sn[data-target]').forEach(el => {
        const t   = parseFloat(el.dataset.target);
        const dec = el.dataset.decimal ? parseInt(el.dataset.decimal) : 0;
        countUp(el, t, dec);
      });
      sObs.disconnect();
    }
  }, { threshold: 0.4 });
  sObs.observe(statsSection);
}

// ===== FRANCHISE FORM =====
const form = document.getElementById('franchiseForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn  = form.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = '✅ Application Received!';
    btn.style.background = '#16a34a';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 4000);
  });
}

// ===== LIVE OPEN STATUS =====
function checkOpen() {
  const badges = document.querySelectorAll('.open-badge, .open-live');
  const now = new Date();
  const t   = now.getHours() * 60 + now.getMinutes();
  const open = t >= 8 * 60 && t < 20 * 60;
  badges.forEach(b => {
    if (b.classList.contains('open-live')) {
      b.textContent = open ? '🟢 Open Now' : '🔴 Closed';
      b.style.color = open ? '#4ade80' : '#f87171';
    } else {
      b.textContent = open ? 'Open Now 🟢' : 'Closed 🔴';
      b.style.background = open ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)';
      b.style.color = open ? '#16a34a' : '#dc2626';
    }
  });
}
checkOpen();
setInterval(checkOpen, 60000);

// ===== MARQUEE PAUSE ON HOVER =====
const track = document.querySelector('.marquee-track');
if (track) {
  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.addEventListener('mouseleave', () => track.style.animationPlayState = '');
}

// ===== MENU CARD TILT =====
document.querySelectorAll('.special-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 6;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 6;
    card.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

console.log('%c🍛 Misal Hub', 'font-size:2rem;color:#C8960A;font-weight:bold;');
