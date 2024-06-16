"use strict";
(function () {
  let upButton = document.querySelector(".up");

  if (upButton) {
    window.onscroll = function () {
      if (window.pageYOffset > 260) {
        upButton.classList.add("up--shown");
      } else {
        upButton.classList.remove("up--shown");
      }
    };
  }
})();

"use strict";
(function () {
  const dropdowns = document.querySelectorAll(".js-dropdown");

  console.log("dropdowns", dropdowns);

  if (!dropdowns.length) {
    return;
  }

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector(".js-dropdown-trigger");

    trigger.addEventListener("click", () => {
      dropdown.classList.toggle("open");
    });
  });
})();

"use strict";
(function () {
  const togglers = document.querySelectorAll(".js-faq-toggler");
  if (!togglers.length) return;

  togglers.forEach((toggler) => {
    toggler.addEventListener("click", (event) => {
      const target = event.currentTarget;
      if (!target) return;
      const content = target.nextElementSibling;
      if (!content) return;
      target.classList.toggle("active");
      content.classList.toggle("active");
    });
  });
})();

"use strict";
(function () {
  const contentsEls = document.querySelectorAll(".js-content");
  const thumbs = document.querySelectorAll(".js-thumb");

  const swiperSlider = new Swiper(".js-slider", {
    // Optional parameters
    slidesPerView: "auto",
    spaceBetween: 56,
    initialSlide: 0,
    speed: 0,
    draggable: false,
    pagination: false,
    loop: false,
    allowTouchMove: false,
    slideToClickedSlide: false,
    on: {
      slideChange: function (e) {
        const vw = window.innerWidth;

        if (vw > 743) {
          return;
        }

        const currentSlide = e.slides[e.realIndex];

        if (!currentSlide) return;

        const locationNumber = currentSlide.dataset.thumbIndex;

        toggleContent(locationNumber);
      },
    },

    navigation: {
      nextEl: ".swiper__next",
      prevEl: ".swiper__prev",
    },
    breakpoints: {
      320: {
        slidesPerView: "auto",
        spaceBetween: 16,
        draggable: true,
        allowTouchMove: true,
        centeredSlides: true,
      },

      744: {
        slidesPerView: "auto",
        spaceBetween: 15,
        draggable: true,
        allowTouchMove: true,
        speed: 300,
      },

      1025: {
        slidesPerView: "auto",
        spaceBetween: 56,
      },
    },
  });

  const map = document.querySelector(".js-map");
  const mapScroller = document.querySelector(".js-map-scroll");
  const mapModal = document.querySelector(".js-map-modal");
  const modalText = mapModal.querySelector(".js-map-modal-text");
  const modalGoTo = mapModal.querySelector(".js-map-modal-goto");
  const modalClose = mapModal.querySelector(".js-map-modal-close");

  const figures = map.querySelectorAll(".figure");

  const locations = {
    figure_1: "Зона экстремальных видов спорта",
    "figure_1-1": "Мотофристайл",
    figure_2: "Марафоны тренировок",
    figure_3: "Фан-встречи",
    figure_4: "Стритбол",
    figure_5: "Стантрайдинг",
    figure_6: "Настольный теннис",
    figure_7: "Шахматы",
    figure_8: "Массовый турнир по мини-футболу",
    figure_9: "Массовая тренировка по стретчингу",
    figure_10: "Кубик Рубика",
    figure_11: "Воркаут",
    figure_13: "Брейк-данс",
    figure_14: "Детская зона и беговелы",
    figure_15: "Зона футбольных клубов",
    figure_16: "Настольные игры",
    figure_18: "Фестиваль фигурного катания",
    "figure_18-1": "Мастер-класс Этери Тутберидзе",
    figure_19: "Рыболовный спорт",
    figure_20: "Стронгмен",
    figure_21: "Чемпионат России по битбоксу",
    figure_22: "Концерт",
    figure_23: "Сбершатер",
    figure_24: "Фуд-корт Депо",
  };

  // Функция для генерации
  function getURls() {
    Object.entries(locations).forEach(([index, value]) => {
      console.log(
        value,
        `https://day.moscow.sport/?locationId=${index}#locations`
      );
    });
  }

  // 32 убрать, когда заработает.
  const numbersWithoutAction = ["23", "24"];

  const concertNumber = "22";
  const artObject = "2";
  const footballNumber = "30";
  const vw = window.innerWidth;
  // ACTIONS

  setTimeout(() => {
    mapScroller?.scroll({ left: 275 });
  }, 500);

  figures.forEach((figure) => {
    figure.addEventListener("click", () => {
      // все классы фигур идут вид "figure /*номер*/" поэтому смело берем [1]
      onFigureClick(figure);
    });
  });

  modalGoTo.addEventListener("click", () => {
    const locationNumber = modalGoTo.dataset.locationNumber;
    onGoToLocation(locationNumber);
    closeModal();
  });

  modalClose.addEventListener("click", () => {
    closeModal();
  });

  thumbs.forEach((item) => {
    const thumbIndex = item.dataset.thumbIndex;
    item.addEventListener("click", () => {
      toggleContent(thumbIndex);
    });
  });

  init();

  // FUNCTIONS

  function init() {
    const locationNumber = findGetParameter("locationId");
    const artObjectLinks = document.querySelectorAll(".js-art-object-link");
    if (locationNumber) {
      onGoToLocation(locationNumber);
    }

    // Собираем легенду.
    fillLegendList();
    artObjectLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const figure = document.getElementById(`figure ${artObject}`);
        onFigureClick(figure);
      });
    });
    setTimeout(() => {
      reinitSlider(document.querySelector(`[data-content-index="1"]`));
    }, 300);
  }

  function onFigureClick(figure) {
    modalGoTo.classList.remove("is-hidden");
    const locationNumber = figure.classList[1].split("_")[1];

    const mapOffset =
      document.getElementById("map").getBoundingClientRect().top +
      document.documentElement.scrollTop;

    const legendItem = document.querySelector(
      `.js-legend-item[data-legend-item-id="${locationNumber}"]`
    );

    if (locationNumber === concertNumber) {
      modalGoTo.href = "#concert";
    } else {
      modalGoTo.href = "#locations";
    }

    if (locationNumber === footballNumber) {
      modalGoTo.href = "https://mfl.life/";
    }

    if (numbersWithoutAction.includes(locationNumber)) {
      modalGoTo.classList.add("is-hidden");
    }

    window.scroll.animateScroll(mapOffset);

    if (figure.classList.contains("is-active")) {
      resetFigures();
      resetLegends();
      closeModal(locationNumber);
    } else {
      resetFigures();
      resetLegends();
      figure.classList.add("is-active");
      openModal(locationNumber);
      legendItem.classList.add("is-active");
    }
  }

  function resetFigures() {
    figures.forEach((figure) => {
      figure.classList.remove("is-active");
    });
  }

  function resetLegends() {
    const legends = document.querySelectorAll(".js-legend-item");
    legends.forEach((legend) => {
      legend.classList.remove("is-active");
    });
  }

  function openModal(locationNumber) {
    const locationText = locations[`figure_${locationNumber}`];
    if (!locationText) return;

    modalText.textContent = locationText;
    modalGoTo.dataset.locationNumber = locationNumber;
    mapModal.classList.add("is-active");
  }

  function closeModal() {
    mapModal.classList.remove("is-active");
    setTimeout(() => {
      modalText.textContent = "";
      modalGoTo.dataset.locationNumber = "";
    }, 300);
    resetFigures();
    resetLegends();
  }

  function onGoToLocation(locationNumber) {
    if (numbersWithoutAction.includes(locationNumber)) {
      return;
    }

    if (locationNumber === concertNumber) return;
    toggleContent(locationNumber);
    closeModal();

    swiperSlider.slideTo(getSlideIndex(locationNumber));
    // добавить скролл
  }

  function getSlideIndex(locationNumber) {
    const element = document.querySelector(
      `.js-thumb[data-thumb-index="${locationNumber}"]`
    );
    const elIndex = Array.from(element.parentNode.children).indexOf(element);
    return Number(elIndex);
  }

  function toggleContent(locationNumber) {
    reinitSlider(
      document.querySelector(`[data-content-index="${locationNumber}"]`)
    );

    contentsEls.forEach((item) => {
      const contentIndex = item.dataset.contentIndex;
      if (Number(contentIndex) === Number(locationNumber)) {
        item.classList.add("is-active");
      } else {
        item.classList.remove("is-active");
      }
    });

    thumbs.forEach((item) => {
      const thumbIndex = item.dataset.thumbIndex;
      if (Number(thumbIndex) === Number(locationNumber)) {
        item.classList.add("is-active");
      } else {
        item.classList.remove("is-active");
      }
    });
  }

  function findGetParameter(parameterName) {
    var result = null,
      tmp = [];
    location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
    return result;
  }

  function fillLegendList() {
    const container = document.querySelector(".js-legend-list");
    const locationsArray = Object.entries(locations);

    console.log("locationsArray", locationsArray);

    locationsArray.forEach(([selector, value]) => {
      const figure = document.querySelector(`.${selector}`);
      // не показываем локации, которых нет на карте.
      const index = selector.split("_")[1];
      console.log("index", index);
      if (!figure) return;

      const itemLi = document.createElement("li");
      const itemSpan = document.createElement("span");
      const itemP = document.createElement("p");

      itemLi.classList.add("map__list-item");
      itemLi.classList.add("js-legend-item");
      itemLi.dataset["legendItemId"] = index;

      itemLi.addEventListener("click", function () {
        onFigureClick(figure);
      });

      itemSpan.textContent = `${index.split("-").join(".")}.`;
      itemP.textContent = value;
      itemLi.append(itemSpan);
      itemLi.append(itemP);
      container.append(itemLi);
    });
  }

  function reinitSlider(container) {
    const cont = container.querySelector(".js-people-slider-container");
    const slider = container.querySelector(".js-people-slider");

    if (!slider) {
      return;
    }
    const wrapper = slider.querySelector(".swiper-wrapper");
    const id = slider.id;

    if (wrapper.childNodes.length > 3 && vw >= 744) {
      setTimeout(() => {
        new Swiper(`#${id}`, {
          // Optional parameters
          slidesPerView: 3,
          spaceBetween: 30,
          initialSlide: 0,
          draggable: false,
          pagination: false,
          loop: false,

          navigation: {
            nextEl: ".js-people-next-extreme",
            prevEl: ".js-people-prev-extreme",
          },
        });
      }, 300);
    } else {
      cont.classList.add("disabled");
    }
  }
})();

"use strict";
(function () {
  const nav = document.querySelector('.js-nav');
  const toggler = nav.querySelector('.js-nav-toggler');
  const closeButton = nav.querySelector('.js-nav-close');
  const links = nav.querySelectorAll('.js-scroll');

  toggler.addEventListener('click', () => {
    nav.classList.toggle('is-active');
  })

  closeButton.addEventListener('click', () => {
    closeNav();
  })

  links.forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    })
  })


  function closeNav() {
    nav.classList.remove('is-active');
  }


})();

"use strict";
(function () {
  const slider = document.querySelector(".js-people-slider-concert-container");
  const vw = window.innerWidth;
  const wrapper = slider.querySelector(".swiper-wrapper");

  if (wrapper.childNodes.length > 3 && vw >= 744) {
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

"use strict";
(function () {
  window.scroll = new SmoothScroll(".js-scroll", {
    speed: 800,
    speedAsDuration: true,
    easing: "easeOutQuad",
  });
})();
