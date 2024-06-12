"use strict";
(function () {
  const slider = document.querySelector(".js-people-slider-concert-container");

  const wrapper = slider.querySelector(".swiper-wrapper");

  console.log(wrapper.childNodes);

  if (wrapper.childNodes.length > 3) {
    new Swiper(`.js-people-slider-concert`, {
      // Optional parameters
      slidesPerView: 3,
      spaceBetween: 30,
      initialSlide: 0,
      draggable: false,
      pagination: false,
      loop: false,
      navigation: {
        nextEl: ".js-people-next-concert",
        prevEl: ".js-people-prev-concert",
      },
    });
  } else {
    slider.classList.add("disabled");
  }
})();
