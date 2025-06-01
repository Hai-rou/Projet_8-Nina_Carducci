document.addEventListener("DOMContentLoaded", function () {
  const galleryContainer = document.querySelector('.gallery-container');
  const gallery = galleryContainer.querySelector('.gallery');
  const tagsBar = galleryContainer.querySelector('.tags-bar');

  if (!gallery || !tagsBar) return;

  const images = Array.from(gallery.querySelectorAll('.gallery-item'));
  const tags = new Set();

  // Récupère les tags uniques
  images.forEach(img => {
    const tag = img.dataset.galleryTag;
    if (tag) tags.add(tag);
  });

  // Crée les boutons de filtre
  function createButton(name, isActive = false) {
    const button = document.createElement('button');
    button.textContent = name;
    button.dataset.filter = name;
    button.className = 'tag-button';
    if (isActive) button.classList.add('active');
    return button;
  }

  // Ajoute le bouton "Tous"
  tagsBar.appendChild(createButton("Tous", true));

  // Ajoute un bouton pour chaque tag
  tags.forEach(tag => {
    tagsBar.appendChild(createButton(tag));
  });

  // Fonction de filtrage
  function filterImages(tag) {
    images.forEach(img => {
      const imageTag = img.dataset.galleryTag;
      if (tag === "Tous" || tag === imageTag) {
        img.style.display = 'block';
      } else {
        img.style.display = 'none';
      }
    });
  }

  // Gère les clics sur les boutons
  tagsBar.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;

    const tag = e.target.dataset.filter;

    // Retire l'état actif des autres boutons
    tagsBar.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Filtre les images
    filterImages(tag);
  });

  // Affiche la galerie (au cas où elle est masquée par défaut)
  gallery.style.display = 'grid';
});
