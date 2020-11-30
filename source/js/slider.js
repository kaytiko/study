// (function () {
//   var $mobile = 480;
//   var $tablet = 768;
//   var $desctop = 1440;

//   var slider = document.querySelector('.slider');
//   var scale = document.querySelector('.slider__scale');
//   var grip = document.querySelector('.slider__grip');

//   var beforeButton = document.querySelector('.slider__button--before');
//   var afterButton = document.querySelector('.slider__button--after');
//   var beforeImage = document.querySelector('.slider__image--before');
//   var afterImage = document.querySelector('.slider__image--after');

//   var sliderWidth, scaleWidth, gripWidth;

//   beforeButton.addEventListener('click', function (event) {
//     event.preventDefault();
//     beforeImage.style.width = "100%";
//     afterImage.style.width = "0";
//     grip.style.marginLeft = "auto";

//     if(window.matchMedia('(max-width: ' + $tablet + 'px)').matches){
//       console.log('Ты на планшете, ёпта!')
//     }
//   });

//   afterButton.addEventListener('click', function (event) {
//     event.preventDefault();
//     beforeImage.style.width = "0";
//     afterImage.style.width = "100%";
//     grip.style.marginRight = "auto";

//     if(window.matchMedia('(max-width: ' + $mobile + 'px)').matches){
//       console.log('Ты на мобиле, ёпта!')
//     }
//   });

//   var getElemWidth = function (elem) {
//     return parseInt(getComputedStyle(elem).width, 10);
//   };

//   var getCoords = function (elem) {
//     var box = elem.getBoundingClientRect();
//     return box.left + pageXOffset;
//   };

//   var gripDownHandler = function (evtDown) {
//     var gripCoords = getCoords(grip);
//     var scaleCoords = getCoords(scale);
//     grip.style.transition = "none";

//     var shiftX = evtDown.pageX - gripCoords;

//     document.onmousemove = function (evtMove) {
//       var newLeft = evtMove.pageX - shiftX - scaleCoords;

//       if (newLeft < 0) {
//         newLeft = 0;
//       }

//       var rightEdge = scaleWidth - gripWidth;
//       if (newLeft > rightEdge) {
//         newLeft = rightEdge;
//       }

//       var gripValue = newLeft / rightEdge * 100;
//       grip.style.marginLeft = newLeft + "px";

//       beforeImage.style.width = (100 - gripValue) + "%";
//       afterImage.style.width = gripValue + "%";
//     };

//     document.onmouseup = function () {
//       document.onmousemove = document.onmouseup = null;
//     };

//     return false;
//   };

//   var addGripHandlers = function () {
//     grip.addEventListener("mousedown", gripDownHandler);
//   };

//   var removeGripHandlers = function () {
//     grip.removeEventListener("mousedown", gripDownHandler);
//   };

//   var initialize = function() {
//     var viewport = document.documentElement.clientWidth || window.innerWidth;

//     if (viewport >= $tablet) {
//       addGripHandlers();
//     } else {
//       removeGripHandlers();
//     }

//     sliderWidth = getElemWidth(slider);
//     scaleWidth = getElemWidth(scale);
//     gripWidth = getElemWidth(grip);

//     beforeImage.style.width = "";
//     afterImage.style.width = "";
//     grip.style.marginLeft = "";
//   };

//   window.addEventListener("load", initialize);
//   window.addEventListener("resize", initialize);
// })();
