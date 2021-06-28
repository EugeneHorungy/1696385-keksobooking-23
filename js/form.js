const userAd = document.querySelector('.ad-form');
const userAdFieldsets = userAd.querySelectorAll('fieldset');
const filterForm = document.querySelector('.map__filters');
const filterFormElements = filterForm.children;

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

disablePage();

export {userAd, activatePage};
