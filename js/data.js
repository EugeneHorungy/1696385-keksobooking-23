import {getIntNumber, getFloatNumber, getElementsArray, getArrayNumbers} from './utils.js';

const TYPES_HOUSE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TITLES = ['Роскошный дворец', 'Квартира', 'Городской особняк', 'Уютное бунгало', 'Комфортабельный отель'];
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

/*Вызывается для создания массива чисел 1-10 и дальнейшего его использования
при генерации объекта author.*/
const amountAds = getArrayNumbers(1, 10);

// Функция генерирующая объект author
const createAuthor = () => {
  const author = {};
  author.avatar = `img/avatars/user0${amountAds[0]}.png`;
  amountAds.splice(0, 1);
  if (author.avatar === 'img/avatars/user010.png') {
    author.avatar = 'img/avatars/user10.png';
  }
  return author;
};

/*Вызов функции задан в перенную для дальнейшего использования этой переменной
в функции createOffer, чтобы передаваемый случайный индекс был одинаков
при формировании значений title, type и description из соответствующих массивов.*/
const getOfferIndex = getIntNumber(0, 4);

// Фунция возвращающая объект со свойствами в виде случайных географических координат.
const createLocation = () => {
  const location = {};
  location.lat = getFloatNumber(35.65000, 35.70000, 5);
  location.lng = getFloatNumber(139.70000, 139.80000, 5);
  return location;
};

/*Вызывается для получения фиксированных географических координат
и последующего использования их в фунции createOffer.*/
const getLocation = createLocation();

// Фунция генерирующая объект с заданными ключами.
const createOffer = () => {
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
  ad.author = createAuthor();
  ad.offer = createOffer();
  ad.location = getLocation;
  return ad;
};

// Создание массива объявлений.
const createAdList = new Array(10).fill().map(() => createAd());

export {createAdList};