const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

/* Функция обрабатывает массив с удобствами, и в соответствии
 с ним выводит в карточку обьявления определённые иконки. */
const getFeatures = (element, card, dataArray) => {
  const featuresAd = dataArray[element].offer.features;
  const featureListElement = card.querySelector('.popup__features');

  try {
    const modifiers =  featuresAd.map((feature) => `popup__feature--${feature}`);

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

const getPhotos = (element, card, dataArray) => {
  const photosAd = dataArray[element].offer.photos;
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

const createCards = (adsData) => {
  const similarCards = [];

  for (let i = 0; i < adsData.length; i++) {
    const card = cardTemplate.cloneNode(true);
    const title = card.querySelector('.popup__title');
    const address = card.querySelector('.popup__text--address');
    const price = card.querySelector('.popup__text--price');
    const type = card.querySelector('.popup__type');
    const capacity = card.querySelector('.popup__text--capacity');
    const timeCheck = card.querySelector('.popup__text--time');
    const description = card.querySelector('.popup__description');
    const avatar = card.querySelector('.popup__avatar');

    title.textContent = adsData[i].offer.title;
    isValue(adsData[i].offer.title, title);
    address.textContent = adsData[i].offer.address;
    isValue(adsData[i].offer.address, address);
    price.textContent = `${adsData[i].offer.price} ₽/ночь`;
    isValue(adsData[i].offer.price, price);

    if (adsData[i].offer.rooms === undefined || adsData[i].offer.guests === undefined) {
      capacity.remove();
    } else {
      capacity.textContent = `${adsData[i].offer.rooms} комнат${getCaseRooms(Array.from(adsData[i].offer.rooms.toString()))} для ${adsData[i].offer.guests} гост${getCaseGuests(Array.from(adsData[i].offer.guests.toString()))}`;
    }

    timeCheck.textContent = `Заезд после ${adsData[i].offer.checkin}, выезд до ${adsData[i].offer.checkout}`;
    isValue(adsData[i].offer.checkin, timeCheck);
    isValue(adsData[i].offer.checkout, timeCheck);
    type.textContent = getType(adsData[i].offer.type);
    isValue(adsData[i].offer.type, type);
    description.textContent = adsData[i].offer.description;
    isValue(adsData[i].offer.description, description);

    if (!adsData[i].author) {
      avatar.remove();
    } else {
      avatar.src = adsData[i].author.avatar;
    }
    getFeatures(i, card, adsData);
    getPhotos(i, card, adsData);
    similarCards.push(card);
  }

  return similarCards;
};

export {createCards};
