import { userAd } from './form.js';

const userAdTitle = userAd.querySelector('input[name="title"]');
const userAdPrice = userAd.querySelector('input[name="price"]');
const userAdRooms = userAd.querySelector('select[name="rooms"]');
const userAdCapacity = userAd.querySelector('select[name="capacity"]');
const userAdType = userAd.querySelector('select[name="type"]');
const userAdCheckin = userAd.querySelector('select[name="timein"]');
const userAdCheckout = userAd.querySelector('select[name="timeout"]');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_USER_PRICE_VALUE = 1000000;

const MinPriceValue = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};

const AmountGuestsForRooms = {
  ONE_ROOMS: ['1'],
  TWO_ROOMS: ['1', '2'],
  THREE_ROOMS: ['1', '2', '3'],
  ONE_HUNDREED_ROOMS: ['0'],
};

const AmountRoomsForGuests = {
  ONE_GUESTS: ['1', '2', '3'],
  TWO_GUESTS: ['2', '3'],
  THREE_GUESTS: ['3'],
  NO_GUESTS: ['100'],
};

userAdTitle.addEventListener('input', () => {
  const valueLength = userAdTitle.value.length;

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
  if (userAdPrice.value > MAX_USER_PRICE_VALUE) {
    userAdPrice.setCustomValidity(`Максимальная цена ${MAX_USER_PRICE_VALUE}`);
  } else {
    userAdPrice.setCustomValidity('');
  }

  userAdPrice.reportValidity();
});

userAdPrice.addEventListener('input', () => {
  const minPrice = +userAdPrice.placeholder;

  if (userAdPrice.value > MAX_USER_PRICE_VALUE || userAdPrice.value < minPrice) {
    userAdPrice.setCustomValidity(`Минимальная цена ${minPrice}. Максимальная цена ${MAX_USER_PRICE_VALUE}.`);
  } else {
    userAdPrice.setCustomValidity('');
  }

  userAdPrice.reportValidity();
});

userAdRooms.addEventListener('input', (evt) => {
  if (evt.target.value === '1' && AmountGuestsForRooms.ONE_ROOMS.includes(userAdCapacity.value)) {
    userAdCapacity.setCustomValidity('');
  } else if (evt.target.value === '2' && AmountGuestsForRooms.TWO_ROOMS.includes(userAdCapacity.value)) {
    userAdCapacity.setCustomValidity('');
  } else if (evt.target.value === '3' && AmountGuestsForRooms.THREE_ROOMS.includes(userAdCapacity.value)) {
    userAdCapacity.setCustomValidity('');
  } else if (evt.target.value === '100' && AmountGuestsForRooms.ONE_HUNDREED_ROOMS.includes(userAdCapacity.value)) {
    userAdCapacity.setCustomValidity('');
  } else {
    userAdCapacity.setCustomValidity('Выберите допустимое значение для этого поля.');
  }

  userAdCapacity.reportValidity();
});

userAdCapacity.addEventListener('input', (evt) => {
  if (evt.target.value === '3' && AmountRoomsForGuests.THREE_GUESTS.includes(userAdRooms.value)) {
    userAdCapacity.setCustomValidity('');
  } else if (evt.target.value === '2' && AmountRoomsForGuests.TWO_GUESTS.includes(userAdRooms.value)) {
    userAdCapacity.setCustomValidity('');
  } else if (evt.target.value === '1' && AmountRoomsForGuests.ONE_GUESTS.includes(userAdRooms.value)) {
    userAdCapacity.setCustomValidity('');
  } else if (evt.target.value === '0' && AmountRoomsForGuests.NO_GUESTS.includes(userAdRooms.value)) {
    userAdCapacity.setCustomValidity('');
  } else {
    userAdCapacity.setCustomValidity('Выберите допустимое значение для этого поля.');
  }

  userAdCapacity.reportValidity();
});

const changePriceAttribute = (minPrice) => {
  userAdPrice.setAttribute('min', minPrice);
  userAdPrice.setAttribute('placeholder', minPrice);
};

userAdType.addEventListener('change', (evt) => {
  switch (evt.target.value) {
    case 'bungalow':
      changePriceAttribute(`${MinPriceValue.BUNGALOW}`);
      break;
    case 'flat':
      changePriceAttribute(`${MinPriceValue.FLAT}`);
      break;
    case 'hotel':
      changePriceAttribute(`${MinPriceValue.HOTEL}`);
      break;
    case 'house':
      changePriceAttribute(`${MinPriceValue.HOUSE}`);
      break;
    case 'palace':
      changePriceAttribute(`${MinPriceValue.PALACE}`);
  }
});

userAdCheckin.addEventListener('change', () => {
  userAdCheckout.value = userAdCheckin.value;
});

userAdCheckout.addEventListener('change', () => {
  userAdCheckin.value = userAdCheckout.value;
});
