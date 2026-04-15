// Anime les cartes avec une entrée en cascade au chargement de la page

document.addEventListener('DOMContentLoaded', function () {

  var cards = document.querySelectorAll('.card');

  cards.forEach(function (card, index) {
    setTimeout(function () {
      card.classList.add('visible');
    }, 300 + index * 130);
  });

});
