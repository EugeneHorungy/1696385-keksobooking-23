import {getIntNumber, getFloatNumber, getElementsArray} from './utils.js';

const TYPES_HOUSE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TITLES = [
  'Роскошный дворец',
  'Квартира',
  'Городской особняк',
  'Уютное бунгало',
  'Комфортабельный отель',
];
const DESCRIPTIONS = [
  'Подойдёт для организации конференций и других вечеринок.',
  'Из окон открывается отличный вид на Токио.',
  'Со своей огороженной прилегающей территорией.',
  'Домик мечты недалеко от берега Тихого океана.',
  'В самом центре столицы Японии.',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createRandomAuthor = (min, max) => {
  const amountAds = [];

  return () => {
    const author = {};
    let randomNumber = getIntNumber(min, max);
    while (amountAds.includes(randomNumber)) {
      randomNumber = getIntNumber(min, max);
    }
    amountAds.push(randomNumber);
    author.avatar = `img/avatars/user0${randomNumber}.png`;
    if (randomNumber < 10) {
      author.avatar = `img/avatars/user0${randomNumber}.png`;
    } else {author.avatar = `img/avatars/user${randomNumber}.png`;}
    return author;
  };
};

const createAuthor = createRandomAuthor(1, 10);

// Фунция возвращающая объект со свойствами в виде случайных географических координат.
const createLocation = () => {
  const location = {};
  location.lat = getFloatNumber(35.65000, 35.70000, 5);
  location.lng = getFloatNumber(139.70000, 139.80000, 5);
  return location;
};

// Фунция генерирующая объект с заданными ключами.
const createOffer = () => {
  const getOfferIndex = getIntNumber(0, 4);
  const getLocation = createLocation();
  const offer = {
    title: TITLES[getOfferIndex],
    address: `${getLocation.lat}, ${getLocation.lng}`,
    price: getIntNumber(1000, 100000),
    type: TYPES_HOUSE[getOfferIndex],
    rooms: getIntNumber(1, 50),
    guests: getIntNumber(1, 100),
    checkin: TIMES[getIntNumber(0, TIMES.length - 1)],
    checkout: TIMES[getIntNumber(0, TIMES.length - 1)],
    features: getElementsArray(FEATURES),
    description: DESCRIPTIONS[getOfferIndex],
    photos: getElementsArray(PHOTOS),
  };
  return offer;
};

const createAd = () => {
  const ad = {};
  const getLocation = createLocation();
  ad.author = createAuthor();
  ad.offer = createOffer(getLocation);
  ad.location = getLocation;
  return ad;
};

// Создание массива объявлений.
const createAdList = new Array(10).fill().map(() => createAd());

export {createAdList};
