// ============================================
//   MISAL HUB — ABOUT PAGE JS
// ============================================

// Navbar scroll
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Hamburger
const hamburger = document.getElementById('hamburger');
const drawer    = document.getElementById('mobileDrawer');
hamburger.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  const [s0, s1, s2] = hamburger.querySelectorAll('span');
  s0.style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  s1.style.opacity   = open ? '0' : '';
  s2.style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  drawer.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(s => { s.style.transform = s.style.opacity = ''; });
}));

// Scroll reveal
const ro = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 100);
      ro.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// Live open status
function checkOpen() {
  const t = new Date().getHours() * 60 + new Date().getMinutes();
  const open = t >= 480 && t < 1200;
  document.querySelectorAll('.open-live').forEach(b => {
    b.textContent = open ? '🟢 Open Now' : '🔴 Closed';
    b.style.color = open ? '#4ade80' : '#f87171';
  });
}
checkOpen();
setInterval(checkOpen, 60000);

// Gallery lightbox feel — scale on click
document.querySelectorAll('.gallery-item').forEach(item => {
  item.style.cursor = 'zoom-in';
});


