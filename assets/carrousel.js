document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll('.carousel-item');
  const indicators = document.querySelectorAll('.carousel-indicators span');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  let current = 0;
  let interval = setInterval(nextSlide, 5000); // 5 sec autoplay

  function showSlide(index) {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
      indicators[i].classList.toggle('active', i === index);
    });
    current = index;
  }

  function nextSlide() {
    const nextIndex = (current + 1) % items.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (current - 1 + items.length) % items.length;
    showSlide(prevIndex);
  }

  next.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  prev.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(index);
      resetAutoplay();
    });
  });

  function resetAutoplay() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 5000);
  }
});