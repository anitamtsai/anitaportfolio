/*code from https://codepen.io/mishelshaji/pen/EGZrbO */

const prefersReducedMotion = () => 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function inVisible(element) {
  const windowTop = window.scrollY;
  const windowBottom = windowTop + window.innerHeight;
  const elementTop = element.offsetTop;
  const elementBottom = elementTop + element.offsetHeight;

  if (elementBottom <= windowBottom && elementTop >= windowTop) {
    animateCounter(element);
  }
}

function animateCounter(element) {
  /* If it's already been counted, stop */
  if (element.classList.contains('counted')) return;

  const rawValue = element.getAttribute('data-max');
  
  if (prefersReducedMotion()) {
    element.textContent = rawValue;
    element.classList.add('counted'); 
    return; 
  }

  element.classList.add('counted');
  const targetNumber = parseInt(rawValue, 10);
  const hasPlus = rawValue.includes('+');
  let currentNumber = 0;
  
  const duration = 2000; 
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    currentNumber = Math.floor(progress * targetNumber);

    element.textContent = currentNumber + (hasPlus && progress === 1 ? "+" : "");

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

window.addEventListener('scroll', function() {
  const counters = document.querySelectorAll('.counter-number');
  counters.forEach(counter => inVisible(counter));
});

/*code from https://codepen.io/TPG/pen/pvJLvvo */

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const flipCard = () => {
      card.classList.toggle("is-flipped");
    };

    card.addEventListener("click", function (event) {
      // Don't flip if the user clicks a link inside the card
      if (event.target.tagName === 'A') return;
      flipCard();
    });

    // Listen for Enter key when card is focused
    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        flipCard();
      }
    });
  });
});