import { getWordsCase } from './utils.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const getFeatures = (card, featuresAd) => {
  const featureListElement = card.querySelector('.popup__features');

  try {
    const modifiers = featuresAd.map((feature) => `popup__feature--${feature}`);

    featureListElement.querySelectorAll('.popup__feature').forEach((item) => {
      const modifier = item.classList[1];

      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  } catch (error) {
    featureListElement.remove();
  }
};

const getPhotos = (card, photosAd) => {
  const photosElement = card.querySelector('.popup__photos');
  const photoItem = photosElement.querySelector('.popup__photo');

  try {
    photosAd.forEach((item) => {
      const photo = photoItem.cloneNode(false);
      photoItem.remove();
      photo.src = item;
      photosElement.appendChild(photo);
    });
  } catch (error) {
    photosElement.remove();
  }
};

const getType = (type) => {
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
};

const isValue = (value, element) => {
  if (!value) {
    element.remove();
  }
};

const createCard = (adData) => {

  const card = cardTemplate.cloneNode(true);
  const title = card.querySelector('.popup__title');
  const address = card.querySelector('.popup__text--address');
  const price = card.querySelector('.popup__text--price');
  const type = card.querySelector('.popup__type');
  const capacity = card.querySelector('.popup__text--capacity');
  const timeCheck = card.querySelector('.popup__text--time');
  const description = card.querySelector('.popup__description');
  const avatar = card.querySelector('.popup__avatar');

  title.textContent = adData.offer.title;
  isValue(adData.offer.title, title);
  address.textContent = adData.offer.address;
  isValue(adData.offer.address, address);
  price.textContent = `${adData.offer.price} ₽/ночь`;
  isValue(adData.offer.price, price);

  if (adData.offer.rooms === undefined || adData.offer.guests === undefined) {
    capacity.remove();
  } else {
    capacity.textContent = `${adData.offer.rooms} ${getWordsCase(adData.offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${adData.offer.guests} ${getWordsCase(adData.offer.guests, ['гостя', 'гостей', 'гостей'])}`;
  }

  timeCheck.textContent = `Заезд после ${adData.offer.checkin}, выезд до ${adData.offer.checkout}`;
  isValue(adData.offer.checkin, timeCheck);
  isValue(adData.offer.checkout, timeCheck);
  type.textContent = getType(adData.offer.type);
  isValue(adData.offer.type, type);
  description.textContent = adData.offer.description;
  isValue(adData.offer.description, description);

  if (!adData.author) {
    avatar.remove();
  } else {
    avatar.src = adData.author.avatar;
  }
  getFeatures(card, adData.offer.features);
  getPhotos(card, adData.offer.photos);
  return card;
};

export { createCard };
