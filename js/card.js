import {createAdList} from './data.js';

// const map = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

/* Функция обрабатывает массив с удобствами, и в соответствии
 с ним выводит в карточку обьявления определённые иконки. */
const getFeatures = (element, card) => {
  const featuresAd = createAdList[element].offer.features;
  const featureListElement = card.querySelector('.popup__features');
  const modifiers =  featuresAd.map((feature) => `popup__feature--${feature}`);

  featureListElement.querySelectorAll('.popup__feature').forEach((item) => {
    const modifier = item.classList[1];

    if (!modifiers.includes(modifier)) {
      item.remove();
    }
  });
};

const getPhotos = (element, card) => {
  const photosAd = createAdList[element].offer.photos;
  const photosElement = card.querySelector('.popup__photos');
  const photoItem = photosElement.querySelector('.popup__photo');

  photoItem.remove();

  photosAd.forEach((item) => {
    const photo = photoItem.cloneNode(false);
    photoItem.remove();
    photo.src = item;
    photosElement.appendChild(photo);
  });
};

function getType (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
  }
}

const isValue = (value, element) => {
  if (!value) {
    element.remove();
  }
};

/* Функция отдаёт правильный падеж
 для комнат в завимости от их кол-ва.*/
const getCaseRooms = (array) => {
  const lastNumber = +array[array.length - 1];
  let endRooms = '';

  if (lastNumber === 1) {
    endRooms = 'а';
  } else if (lastNumber > 1 && lastNumber < 5) {
    endRooms = 'ы';
  }

  return endRooms;
};

/* Функция отдаёт правильный падеж
 для гостей в завимости от их кол-ва.*/
const getCaseGuests = (array) => {
  const lastNumber = +array[array.length - 1];
  let endGuests = 'ей';

  if (lastNumber === 1) {
    endGuests = 'я';
  }

  return endGuests;
};

const createCards = () => {
  const similarCards = [];

  for (let i = 0; i < createAdList.length; i++) {
    const card = cardTemplate.cloneNode(true);
    const title = card.querySelector('.popup__title');
    const address = card.querySelector('.popup__text--address');
    const price = card.querySelector('.popup__text--price');
    const type = card.querySelector('.popup__type');
    const capacity = card.querySelector('.popup__text--capacity');
    const timeCheck = card.querySelector('.popup__text--time');
    const description = card.querySelector('.popup__description');
    const avatar = card.querySelector('.popup__avatar');

    title.textContent = createAdList[i].offer.title;
    isValue(createAdList[i].offer.title, title);
    address.textContent = createAdList[i].offer.address;
    isValue(createAdList[i].offer.address, address);
    price.textContent = `${createAdList[i].offer.price} ₽/ночь`;
    isValue(createAdList[i].offer.price, price);

    if (createAdList[i].offer.rooms === undefined || createAdList[i].offer.guests === undefined) {
      capacity.remove();
    } else {
      capacity.textContent = `${createAdList[i].offer.rooms} комнат${getCaseRooms(Array.from(createAdList[i].offer.rooms.toString()))} для ${createAdList[i].offer.guests} гост${getCaseGuests(Array.from(createAdList[i].offer.guests.toString()))}`;
    }

    timeCheck.textContent = `Заезд после ${createAdList[i].offer.checkin}, выезд до ${createAdList[i].offer.checkout}`;
    isValue(createAdList[i].offer.checkin, timeCheck);
    isValue(createAdList[i].offer.checkout, timeCheck);
    type.textContent = getType(createAdList[i].offer.type);
    isValue(createAdList[i].offer.type, type);
    description.textContent = createAdList[i].offer.description;
    isValue(createAdList[i].offer.description, description);

    if (!createAdList[i].author) {
      avatar.remove();
    } else {
      avatar.src = createAdList[i].author.avatar;
    }

    getFeatures(i, card);
    getPhotos(i, card);
    similarCards.push(card);
  }

  return similarCards;
};

const cards = createCards();

export {cards};
