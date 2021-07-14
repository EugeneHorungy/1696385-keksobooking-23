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
const userPhotoChooser = userAd.querySelector('input[type=file]');
const preview = userAd.querySelector('.ad-form-header__user-avatar');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

userPhotoChooser.addEventListener('change', () => {
  const file = userPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

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
