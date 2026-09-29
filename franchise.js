/* ============================================
   MISAL HUB — FRANCHISE PAGE SCRIPT
   ============================================ */

const scrollTopBtn = document.querySelector('.scroll-top');
const navbar = document.querySelector('.navbar');

/* ---- NAVBAR / SCROLL-TOP ---- */
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---- HAMBURGER ---- */
const ham = document.querySelector('.hamburger');
const drawer = document.querySelector('.mobile-drawer');
ham.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  ham.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  ham.querySelectorAll('span')[1].style.opacity  = open ? '0' : '1';
  ham.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});
document.addEventListener('click', e => {
  if (!ham.contains(e.target) && !drawer.contains(e.target)) {
    drawer.classList.remove('open');
    ham.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

/* ---- REVEAL ON SCROLL ---- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- LIVE OPEN STATUS (8 AM – 8 PM, no emojis on this page) ---- */
function updateStatus() {
  const now = new Date();
  const hrs = now.getHours() + now.getMinutes() / 60;
  const open = hrs >= 8 && hrs < 20;
  document.querySelectorAll('.open-live').forEach(el => {
    el.textContent = open ? 'Open Now' : 'Closed';
    el.style.color = open ? '#4ade80' : '#f87171';
  });
}
updateStatus();
setInterval(updateStatus, 60000);

/* ---- APPLY FORM ---- */
const applyForm = document.getElementById('franchiseForm');
if (applyForm) {
  applyForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = applyForm.querySelector('.submit-btn');
    btn.textContent = 'Application Sent';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Submit Application';
      btn.disabled = false;
      applyForm.reset();
    }, 4000);
  });
}
