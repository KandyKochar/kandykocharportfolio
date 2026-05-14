emailjs.init("1I8tclomvGH3DvrjU");

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');
mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  mobileMenu.querySelector('i').className =
    navLinks.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    mobileMenu.querySelector('i').className = 'fas fa-bars';
  });
});

const darkToggle = document.getElementById('darkToggle');
const darkIcon = document.getElementById('darkIcon');
if (localStorage.getItem('dark') === 'true') {
  document.body.classList.add('dark');
  darkIcon.className = 'fas fa-sun';
}
darkToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  darkIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('dark', isDark);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const track = document.getElementById('filmTrack');
if (track) { track.innerHTML += track.innerHTML; }

document.getElementById('sendBtn').addEventListener('click', () => {
  const name    = document.getElementById('nameInput').value.trim();
  const email   = document.getElementById('emailInput').value.trim();
  const subject = document.getElementById('subjectInput').value.trim();
  const message = document.getElementById('messageInput').value.trim();
  const btn     = document.getElementById('sendBtn');
  const status  = document.getElementById('formStatus');

  if (!name || !email || !message) {
    status.textContent = 'Please fill in your name, email and message.';
    status.className = 'form-note error';
    return;
  }
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;
  status.textContent = '';

  emailjs.send("service_5461", "template_7m5skvi", {
  name:    name,
  email:   email,
  subject: subject || 'Portfolio Contact',
  message: message
}).then(() => {
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    btn.disabled = false;
    ['nameInput','emailInput','subjectInput','messageInput']
      .forEach(id => document.getElementById(id).value = '');
    status.textContent = '✓ Message sent! I\'ll be in touch soon.';
    status.className = 'form-note success';
    setTimeout(() => { status.textContent = ''; }, 5000);
  }).catch(() => {
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    btn.disabled = false;
    status.textContent = 'Something went wrong. Email me directly at kandykochar@gmail.com';
    status.className = 'form-note error';
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});