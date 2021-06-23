import {userAd} from './form.js';

const userAdTitle = userAd.querySelector('input[name="title"]');
const userAdPrice = userAd.querySelector('input[name="price"]');
const userAdRooms = userAd.querySelector('select[name="rooms"]');
const userAdCapacity = userAd.querySelector('select[name="capacity"]');
const optionsCapacity = userAdCapacity.children;

document.addEventListener('DOMContentLoaded', () => {
  Array.from(optionsCapacity)[0].setAttribute('disabled', 'disabled');
  Array.from(optionsCapacity)[1].setAttribute('disabled', 'disabled');
  Array.from(optionsCapacity)[3].setAttribute('disabled', 'disabled');
});

userAdTitle.addEventListener('input', () => {
  const valueLength = userAdTitle.value.length;
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;

  if (valueLength < MIN_TITLE_LENGTH) {
    userAdTitle.setCustomValidity(`Минимально допустимое количество символов: ${MIN_TITLE_LENGTH}. Длина текста сейчас: ${valueLength}.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    userAdTitle.setCustomValidity(`Превышено максимально допустимое количество символов на: ${valueLength - MAX_TITLE_LENGTH}`);
  } else {
    userAdTitle.setCustomValidity('');
  }

  userAdTitle.reportValidity();
});

userAdPrice.addEventListener('input', () => {
  if (userAdPrice.value > 1000000) {
    userAdPrice.setCustomValidity('Максимальная цена 1 000 000');
  } else {
    userAdPrice.setCustomValidity('');
  }
});

userAdRooms.addEventListener('change', (evt) => {
  Array.from(optionsCapacity).forEach((element) => element.removeAttribute('disabled'));

  if (evt.target.value === '1') {
    Array.from(optionsCapacity)[0].setAttribute('disabled', 'disabled');
    Array.from(optionsCapacity)[1].setAttribute('disabled', 'disabled');
    Array.from(optionsCapacity)[3].setAttribute('disabled', 'disabled');
  } else if (evt.target.value === '2') {
    Array.from(optionsCapacity)[0].setAttribute('disabled', 'disabled');
    Array.from(optionsCapacity)[3].setAttribute('disabled', 'disabled');
  } else if (evt.target.value === '3') {
    Array.from(optionsCapacity)[3].setAttribute('disabled', 'disabled');
  } else if (evt.target.value === '100') {
    Array.from(optionsCapacity)[0].setAttribute('disabled', 'disabled');
    Array.from(optionsCapacity)[1].setAttribute('disabled', 'disabled');
    Array.from(optionsCapacity)[2].setAttribute('disabled', 'disabled');
  }
  // Говнокод какой-то получается;(
});
