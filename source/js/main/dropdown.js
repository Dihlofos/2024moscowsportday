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
