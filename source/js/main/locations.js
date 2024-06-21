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
  const bullitItems = document.querySelectorAll(".js-bullit");

  const figures = map.querySelectorAll(".figure");

  const locations = {
    1: "Зона экстремальных видов спорта",
    2: "Мотофристайл",
    3: "Марафоны тренировок",
    // 4: "Фан-встречи",
    5: "Стритбол",
    6: "Стантрайдинг",
    7: "Настольный теннис",
    8: "Шахматы",
    9: "Мини-футбол",
    10: "Стретчинг",
    11: "Кубик Рубика",
    12: "Воркаут",
    13: "Брейк-данс",
    14: "Детская зона и беговелы",
    15: "Зона футбольных клубов",
    16: "Настольные игры",
    17: "Фестиваль фигурного катания",
    18: "Мастер-класс Этери Тутберидзе",
    19: "Рыболовный спорт",
    20: "Стронгмен",
    21: "Битбокс",
    22: "Концерт",
    23: "Сбершатер",
    24: "Фуд-корт Депо",
    25: "ГТО",
  };

  console.log(window.location);

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
  const motofreestyle = "2";
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
      setTimeout(() => {
        onGoToLocation(locationNumber);
      }, 0);
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

    bullitItems.forEach((item) => {
      item.addEventListener("click", (el) => {
        onGoToLocation(el.currentTarget.dataset.locationId);
      });
    });
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
    if (!locations[locationNumber]) return;

    modalText.textContent = locations[locationNumber];
    modalGoTo.dataset.locationNumber =
      locationNumber === motofreestyle ? 1 : locationNumber;
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
    let number = locationNumber;
    if (numbersWithoutAction.includes(number)) {
      return;
    }

    if (number === concertNumber) return;

    if (number === "18") {
      number = "17";
    }

    toggleContent(number);

    closeModal();

    swiperSlider.slideTo(getSlideIndex(number));
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

    locationsArray.forEach(([index, value]) => {
      const figure = document.querySelector(`.figure_${index}`);
      // не показываем локации, которых нет на карте.
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

      itemSpan.textContent = `${index}.`;
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
