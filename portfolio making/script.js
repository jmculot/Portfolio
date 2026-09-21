// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close the mobile menu after a link is tapped
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Nav background on scroll ----------
const nav = document.getElementById('site-nav');

function updateNavBackground() {
  if (window.scrollY > 12) {
    nav.classList.add('is-scrolled');
  } else {
    nav.classList.remove('is-scrolled');
  }
}
window.addEventListener('scroll', updateNavBackground, { passive: true });
updateNavBackground();

// ---------- Active section highlighting ----------
const sections = ['about', 'work', 'skills', 'contact']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const navItems = document.querySelectorAll('.nav-links a[data-nav]');

function setActive(id) {
  navItems.forEach((item) => {
    item.classList.toggle('active', item.dataset.nav === id);
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      // Pick the entry closest to the top of the viewport that's currently visible
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length > 0) {
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActive(top.target.id);
      }
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
} 
