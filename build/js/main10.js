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
  const dropdowns = document.querySelectorAll('.js-dropdown');

  dropdowns.forEach((dropdown)=> {
    const trigger = dropdown.querySelector('.js-dropdown-trigger');

    trigger.addEventListener('click', () => {
      dropdown.classList.toggle('open');
    })
  })

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
    slidesPerView: 4,
    spaceBetween: 0,
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
        slidesPerView: 1,
        spaceBetween: 16,
        draggable: true,
        allowTouchMove: true,
        centeredSlides: true,

      },

      744: {
        slidesPerView: 2,
        spaceBetween: 30,
        draggable: true,
        allowTouchMove: true,
        speed: 300,
      },

      1025: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });

  const map = document.querySelector('.js-map');
  const mapScroller = document.querySelector('.js-map-scroll');
  const mapModal = document.querySelector('.js-map-modal');
  const modalText = mapModal.querySelector('.js-map-modal-text');
  const modalGoTo = mapModal.querySelector('.js-map-modal-goto');
  const modalClose = mapModal.querySelector('.js-map-modal-close');

  const figures = map.querySelectorAll('.figure');

  const locations = {
    '1': 'Зона регистрации',
    '2': 'Арт-объект с оркестром',
    '3': 'Спортивная зона челленджей',
    '4': 'Детская зона',
    '5' : 'Фан-встречи',
    '6': 'Фестиваль городских видов спорта',
    '7' : 'Стронгмен',
    '8': 'Шахматы',
    '9': 'Мини-футбол',
    '10' : 'Фигурное катание',
    '28': 'Легкая атлетика',
    '11' : 'Стритбол',
    '17': 'Брейк-данс',
    '12': 'Грэпплинг',
    '13': 'Силовой экстрим «Богатырские игры»',
    '16' : 'Мода',
    '22' : 'Настольный теннис',
    '14' : 'Зона экстремальных видов спорта',
    '15' : 'фудкорд «Депо»',
    '18' : 'Стантрайдинг',
    '19' : 'Воркаут',
    '20' : 'Полоса препятствий',
    '21' : 'Фехтование',
    '23' : 'Семейный фестиваль',
    '25' : 'Луктаг и Лазертаг',
    '24' : 'Кроссфит',
    '26' : 'Сайклинг',
    '27' : 'Регби',
    '29' : 'Стретчинг',
    '30' : 'Финал медийной футбольной лиги',
    '32' : 'Кино',
    '34' : 'Зоны футбольных клубов',
    '31' : 'Концерт',
  }

  // Функция для генерации
  function getURls() {
    Object.entries(locations).forEach(([index, value]) => {
      console.log(value, `https://day.moscow.sport/?locationId=${index}#locations`);
    })
  }

  // 32 убрать, когда заработает.
  const numbersWithoutAction = ['2','15', '34']

  const concertNumber = '31';
  const artObject = '2';
  const footballNumber = '30';
  const vw = window.innerWidth;
  // ACTIONS

  setTimeout(()=>{
    mapScroller?.scroll({left: 275})
  },0)


  figures.forEach((figure) => {
    figure.addEventListener('click', () => {
      // все классы фигур идут вид "figure /*номер*/" поэтому смело берем [1]
      onFigureClick(figure)
    })
  })

  modalGoTo.addEventListener('click', () => {
    const locationNumber = modalGoTo.dataset.locationNumber;
    onGoToLocation(locationNumber);
    closeModal();
  })

  modalClose.addEventListener('click', () => {
    closeModal();
  })


  thumbs.forEach((item) => {
    const thumbIndex = item.dataset.thumbIndex;
    item.addEventListener('click', () => {
      toggleContent(thumbIndex);
    })
  });


  init();


  // FUNCTIONS

  function init() {
    const locationNumber = findGetParameter('locationId');
    const artObjectLinks = document.querySelectorAll('.js-art-object-link');
    if (locationNumber) {
      onGoToLocation(locationNumber);
    }

    // Собираем легенду.
    fillLegendList();
    artObjectLinks.forEach((link) => {
      link.addEventListener('click', ()=>{
        const figure = document.getElementById(`figure ${artObject}`);
        onFigureClick(figure);
      })
    })

  }

  function onFigureClick(figure) {
    modalGoTo.classList.remove('is-hidden');
    const locationNumber = figure.classList[1].split('_')[1];

    const mapOffset = document.getElementById('map').getBoundingClientRect().top + document.documentElement.scrollTop

    const legendItem = document.querySelector(`.js-legend-item[data-legend-item-id="${locationNumber}"]`);

    if (locationNumber === concertNumber) {
      modalGoTo.href = '#concert';
    } else {
      modalGoTo.href = '#locations';
    }

    if (locationNumber === footballNumber) {
      modalGoTo.href = 'https://mfl.life/';
    }


    if (numbersWithoutAction.includes(locationNumber)) {
      modalGoTo.classList.add('is-hidden');
    }

    window.scroll.animateScroll(mapOffset)


    if (figure.classList.contains('is-active')) {
      resetFigures();
      resetLegends();
      closeModal(locationNumber);
    } else {
      resetFigures();
      resetLegends();
      figure.classList.add('is-active');
      openModal(locationNumber);
      legendItem.classList.add('is-active');
    }
  }

  function resetFigures() {
    figures.forEach((figure) => {
      figure.classList.remove('is-active');
    })
  }

  function resetLegends() {
    const legends = document.querySelectorAll('.js-legend-item');
    legends.forEach((legend) => {
      legend.classList.remove('is-active');
    })
  }

  function openModal(locationNumber) {
    if (!locations[locationNumber]) return;

    modalText.textContent = locations[locationNumber]
    modalGoTo.dataset.locationNumber = locationNumber;
    mapModal.classList.add('is-active');
  }

  function closeModal() {
    mapModal.classList.remove('is-active');
    setTimeout(()=>{
      modalText.textContent = ''
      modalGoTo.dataset.locationNumber = '';
    }, 300)
    resetFigures();
    resetLegends();
  }

  function onGoToLocation(locationNumber) {
    if (numbersWithoutAction.includes(locationNumber))  {
      return;
    }

    if (locationNumber === concertNumber) return;
    toggleContent(locationNumber);
    closeModal();


    swiperSlider.slideTo(getSlideIndex(locationNumber));
    // добавить скролл
  }

  function getSlideIndex(locationNumber) {
    const element = document.querySelector(`.js-thumb[data-thumb-index="${locationNumber}"]`);
    const elIndex = Array.from(element.parentNode.children).indexOf(element);
    return Number(elIndex);
  }


  function toggleContent(locationNumber) {
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
  };


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
  const container = document.querySelector('.js-legend-list');
  const locationsArray = Object.entries(locations);

  locationsArray.forEach(([index,value]) => {

    const figure = document.querySelector(`.figure_${index}`);
    // не показываем локации, которых нет на карте.
    if (!figure) return;

    const itemLi = document.createElement('li');
    const itemSpan = document.createElement('span');
    const itemP = document.createElement('p');

    itemLi.classList.add('map__list-item');
    itemLi.classList.add('js-legend-item');
    itemLi.dataset['legendItemId'] = index;

    itemLi.addEventListener('click', function() {
      onFigureClick(figure);
    })

    itemSpan.textContent = `${index}.`
    itemP.textContent = value;
    itemLi.append(itemSpan);
    itemLi.append(itemP);
    container.append(itemLi);
  })

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
  window.scroll = new SmoothScroll(".js-scroll", {
    speed: 800,
    speedAsDuration: true,
    easing: "easeOutQuad",
  });
})();
