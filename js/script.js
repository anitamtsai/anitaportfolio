/*code from https://codepen.io/mishelshaji/pen/EGZrbO */
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter-number");

  function animateCounter(counter) {
    const target = parseInt(counter.dataset.max, 10);
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(progress * target);

      counter.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  function startCounter(counter) {
    if (!counter.classList.contains("counted")) {
      counter.classList.add("counted");
      animateCounter(counter);
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  counters.forEach((counter) => {
    observer.observe(counter);

    const rect = counter.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startCounter(counter);
    }
  });
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