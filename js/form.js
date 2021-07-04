import {sendUserData} from './requests.js';
import {showModalSuccess, showModalError} from './modal.js';
import {resetMap} from './map.js';
import {resetFilter} from './filter.js';

const userAd = document.querySelector('.ad-form');
const userAdFieldsets = userAd.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filterFormElements = filterForm.children;
const resetButton = userAd.querySelector('.ad-form__reset');
const userAdPrice = userAd.querySelector('input[name="price"]');

const disablePage = () => {
  userAd.classList.add('ad-form--disabled');
  filterForm.classList.add('map__filters--disabled');

  userAdFieldsets.forEach((fieldset) => fieldset.setAttribute('disabled', 'disabled'));

  Array.from(filterFormElements).forEach((element) => element.setAttribute('disabled', 'disabled'));
};

const activatePage = () => {
  userAd.classList.remove('ad-form--disabled');
  filterForm.classList.remove('map__filters--disabled');

  userAdFieldsets.forEach((fieldset) => fieldset.removeAttribute('disabled'));

  Array.from(filterFormElements).forEach((element) => element.removeAttribute('disabled'));
};

const resetForm = () => {
  userAd.reset();
  userAdPrice.placeholder = 1000;
};

userAd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendUserData(showModalSuccess, showModalError, new FormData(userAd));
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetMap();
  resetForm();
  resetFilter();
});

export {userAd, disablePage, activatePage, resetForm};
