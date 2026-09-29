/* MENU PAGE JS */

const navbar = document.querySelector('.navbar');
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});

scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* hamburger */
const ham = document.querySelector('.hamburger');
const drawer = document.querySelector('.mobile-drawer');
ham.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  const spans = ham.querySelectorAll('span');
  spans[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  spans[1].style.opacity  = open ? '0' : '1';
  spans[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});
document.addEventListener('click', e => {
  if (!ham.contains(e.target) && !drawer.contains(e.target)) {
    drawer.classList.remove('open');
    ham.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
  }
});

/* reveal */
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

/* live open status */
function updateStatus() {
  const now = new Date();
  const hrs = now.getHours() + now.getMinutes() / 60;
  const open = hrs >= 8 && hrs < 20;
  document.querySelectorAll('.open-live').forEach(el => {
    el.textContent = open ? '🟢 Open Now' : '🔴 Closed';
    el.style.color  = open ? '#4ade80' : '#f87171';
  });
}
updateStatus();
setInterval(updateStatus, 60000);

/* active section highlight on quick-jump pills */
const sections = ['misal','usal','chulha','thali','combo','snacks','vadapav','sandwich','beverages','jain'];
const pills = document.querySelectorAll('.qp');
const sectionEls = sections.map(id => document.getElementById(id)).filter(Boolean);

window.addEventListener('scroll', () => {
  let current = '';
  sectionEls.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  pills.forEach(p => {
    const href = p.getAttribute('href').replace('#','');
    p.style.background = href === current ? 'var(--brown-500)' : '';
    p.style.borderColor = href === current ? 'var(--orange)' : '';
  });
}, { passive: true });

/* dish photos — drop a file at images/menu/<dish-name-slug>.jpg and it appears automatically.
   e.g. "Cheese Misal Pav" -> images/menu/cheese-misal-pav.jpg  (missing files are skipped, emoji stays) */
const slugify = t => t.toLowerCase().replace(/<[^>]*>/g, '').replace(/&amp;/g, 'and').replace(/\(.*?\)/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const dishTargets = [
  ['.mitem', '.mi-body h4', '.mi-emoji'],
  ['.sitem', 'h4', ':scope > span'],
  ['.snack-item', 'h4', ':scope > span'],
  ['.vp-item', 'h4', '.vp-emoji'],
  ['.sand-item', 'h4', '.sand-icon'],
  ['.bev-card', 'h4', '.bev-icon'],
  ['.combo-item', 'h4', '.combo-emoji'],
  ['.thali-card', 'h3', null],
];

dishTargets.forEach(([itemSel, nameSel, iconSel]) => {
  document.querySelectorAll(itemSel).forEach(item => {
    const nameEl = item.querySelector(nameSel);
    if (!nameEl) return;
    const name = nameEl.firstChild ? nameEl.firstChild.textContent : nameEl.textContent;
    const img = new Image();
    img.className = 'dish-img';
    img.alt = name.trim();
    img.loading = 'lazy';
    img.onload = () => {
      const icon = iconSel ? item.querySelector(iconSel) : null;
      if (icon) icon.style.display = 'none';
      const anchor = icon || item.firstElementChild;
      item.insertBefore(img, anchor);
    };
    img.src = `images/menu/${slugify(name)}.jpg`;
  });
});
