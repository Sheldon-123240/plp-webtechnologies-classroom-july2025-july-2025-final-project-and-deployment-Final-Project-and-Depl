// main.js - handles nav toggle, year and simple form validation
document.addEventListener('DOMContentLoaded', function () {
  // set year in footer(s)
  const yearEls = document.querySelectorAll('#year, #year2, #year3');
  yearEls.forEach(el => el.textContent = new Date().getFullYear());

  // nav toggle (works for all pages using .nav-toggle)
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      // find the nav in same header
      const header = btn.closest('.header-inner') || document.querySelector('.header-inner');
      const nav = document.querySelector('#main-nav');
      if (!nav) return;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', (!expanded).toString());
      // simple show/hide; for production prefer CSS class toggling with transitions
      if (nav.style.display === 'flex' || nav.style.display === 'block') {
        nav.style.display = '';
      } else {
        nav.style.display = 'block';
      }
    })
  });

  // Basic contact form validation + feedback
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const status = document.getElementById('formStatus');
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      // simple checks
      if (!name.value.trim() || name.value.trim().length < 2) {
        status.textContent = 'Please enter a valid name (2+ characters).';
        name.focus();
        return;
      }
      if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) {
        status.textContent = 'Please enter a valid email address.';
        email.focus();
        return;
      }
      if (!message.value.trim() || message.value.trim().length < 10) {
        status.textContent = 'Please enter a message (10+ characters).';
        message.focus();
        return;
      }

      // If you have a backend, send data via fetch here.
      // For this assignment we simulate success:
      status.textContent = 'Sending...';
      setTimeout(() => {
        status.textContent = 'Message sent — thank you! I will respond shortly.';
        form.reset();
      }, 700);
    });
  }
});
