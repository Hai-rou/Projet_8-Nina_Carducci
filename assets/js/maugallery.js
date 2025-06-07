document.addEventListener("DOMContentLoaded", function () {
  const galleryContainer = document.querySelector('.gallery-container');
  const gallery = galleryContainer.querySelector('.gallery');
  const tagsBar = galleryContainer.querySelector('.tags-bar');

  if (!gallery || !tagsBar) return;

  const images = Array.from(gallery.querySelectorAll('.gallery-item'));
  const tags = new Set();

  images.forEach(img => {
    const tag = img.dataset.galleryTag;
    if (tag) tags.add(tag);
  });

  function createButton(name, isActive = false) {
    const button = document.createElement('button');
    button.textContent = name;
    button.dataset.filter = name;
    button.className = 'tag-button';
    if (isActive) button.classList.add('active');
    return button;
  }

  tagsBar.appendChild(createButton("Tous", true));
  tags.forEach(tag => tagsBar.appendChild(createButton(tag)));

  function filterImages(tag) {
    images.forEach(img => {
      const imageTag = img.dataset.galleryTag;
      img.style.display = (tag === "Tous" || tag === imageTag) ? 'block' : 'none';
    });
  }

  tagsBar.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;

    const tag = e.target.dataset.filter;
    tagsBar.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    filterImages(tag);
  });

  gallery.style.display = 'grid';

  // === MODAL AVEC OVERLAY ===
  const modal = document.getElementById('image-modal');
  const modalImg = modal.querySelector('.modal-img');
  const prevBtn = modal.querySelector('.modal-prev');
  const nextBtn = modal.querySelector('.modal-next');

  // Récupère l'overlay existant dans le HTML
  const overlay = document.getElementById('modal-overlay');

  let currentIndex = -1;

  function getVisibleImages() {
    return images.filter(img => img.style.display !== 'none');
  }

  function openModal(index) {
    const visibleImages = getVisibleImages();
    if (visibleImages.length === 0) return;

    const img = visibleImages[index];
    if (!img) return;

    modalImg.src = img.src;
    modalImg.alt = img.alt || '';
    modal.style.display = 'flex';
    overlay.style.display = 'block';
    currentIndex = index;
  }

  function closeModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    modalImg.src = '';
    currentIndex = -1;
  }

  function showNext() {
    const visible = getVisibleImages();
    if (visible.length === 0) return;

    currentIndex = (currentIndex + 1) % visible.length;
    openModal(currentIndex);
  }

  function showPrev() {
    const visible = getVisibleImages();
    if (visible.length === 0) return;

    currentIndex = (currentIndex - 1 + visible.length) % visible.length;
    openModal(currentIndex);
  }

  images.forEach((img) => {
    img.addEventListener('click', () => {
      const visible = getVisibleImages();
      const index = visible.indexOf(img);
      if (index !== -1) openModal(index);
    });
  });

  overlay.addEventListener('click', closeModal);

  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    }
  });
});
