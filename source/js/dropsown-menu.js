var header = document.querySelector('.header');
var mainNav = document.querySelector('.main-nav');
var toggleIcon = document.querySelector('.toggle');

header.classList.remove('header--nojs');

toggleIcon.addEventListener('click', function () {
  toggleIcon.classList.toggle('toggle--close');
  mainNav.classList.toggle('main-nav--opened');
});
