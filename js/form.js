import { sendUserData } from './requests.js';
import { showModalSuccess, showModalError } from './modal.js';
import { resetMap } from './map.js';
import { resetFilter } from './filter.js';
import { getPlacemarks } from './map.js';

const userAd = document.querySelector('.ad-form');
const userAdFieldsets = userAd.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filterFormElements = filterForm.children;
const resetButton = userAd.querySelector('.ad-form__reset');
const userAdPrice = userAd.querySelector('input[name="price"]');
const userAvatarChooser = userAd.querySelector('input[name="avatar"]');
const userAvatarPreview = userAd.querySelector('.ad-form-header__user-avatar');
const userPhotoChooser = userAd.querySelector('input[name="images"]');
const userPhotoPreviewContainer = userAd.querySelector('.ad-form__photo');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_USER_AVATAR = 'img/muffin-grey.svg';
const DEFAULT_USER_PRICE = 1000;

userAvatarChooser.addEventListener('change', () => {
  const file = userAvatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      userAvatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

userPhotoChooser.addEventListener('change', () => {
  const file = userPhotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const userPhotoPreview = document.createElement('img');
      userPhotoPreview.src = reader.result;
      userPhotoPreview.style.width = '60px';
      userPhotoPreview.style.height = '60px';
      userPhotoPreviewContainer.style.display = 'flex';
      userPhotoPreviewContainer.style.alignItems = 'center';
      userPhotoPreviewContainer.style.justifyContent = 'center';
      userPhotoPreview.style.objectFit = 'contain';
      userPhotoPreviewContainer.appendChild(userPhotoPreview);
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

const activateForm = () => {
  userAd.classList.remove('ad-form--disabled');
  userAdFieldsets.forEach((fieldset) => fieldset.removeAttribute('disabled'));
};

const activateFilter = () => {
  filterForm.classList.remove('map__filters--disabled');
  Array.from(filterFormElements).forEach((element) => element.removeAttribute('disabled'));
};

const resetForm = () => {
  userAd.reset();
  userAvatarPreview.src = DEFAULT_USER_AVATAR;
  userPhotoPreviewContainer.textContent = '';
  userAdPrice.placeholder = DEFAULT_USER_PRICE;
};

userAd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendUserData(showModalSuccess, showModalError, new FormData(userAd));
});

const onResetButtonClick = (adsData) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetMap();
    resetForm();
    resetFilter();
    getPlacemarks(adsData);
  });
};

export { userAd, disablePage, activateForm, activateFilter, resetForm, onResetButtonClick };
