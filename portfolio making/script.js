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
const sections = ['about', 'work', 'certifications', 'skills', 'contact']
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


// ---------- Popup for projects & certificates ----------
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalFig = document.getElementById('modal-fig');
const modalMeta = document.getElementById('modal-meta');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalLink = document.getElementById('modal-link');
let lastFocused = null;

function openModal(card) {
  const img = card.querySelector('.card-img img');
  const meta = card.querySelector('.card-meta');
  const title = card.querySelector('.card-title');
  const desc = card.querySelector('.card-desc');

  lastFocused = card;
  modalMeta.textContent = meta ? meta.textContent : '';
  modalTitle.textContent = title ? title.textContent.trim() : '';
  modalDesc.textContent = desc ? desc.textContent : '';

  // image (hide the box if the image file is missing)
  modalFig.hidden = false;
  modalImg.onerror = () => { modalFig.hidden = true; };
  modalImg.src = img ? img.getAttribute('src') : '';
  modalImg.alt = img ? img.alt : '';

  // optional real link: <a class="card" data-link="https://...">
  const link = card.dataset.link;
  if (link) {
    modalLink.href = link;
    modalLink.hidden = false;
  } else {
    modalLink.hidden = true;
  }

  modal.hidden = false;
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close').focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  if (lastFocused) lastFocused.focus();
}

document.querySelectorAll('[data-modal]').forEach((card) => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(card);
  });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(card);
    }
  });
});

modal.querySelectorAll('[data-close]').forEach((el) => {
  el.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hidden) closeModal();
});
