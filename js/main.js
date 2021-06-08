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

// Функция, возвращающая случайное целое число из переданного диапазона включительно.
// При некорректных параметрах возвращается undefined.
const getIntNumber = (min, max) => {
  if (max < min || min < 0 || max < 0) {
    return undefined;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
// В параметр fraction передаётся количество знаков после запятой.
// При некорректных параметрах возвращается undefined.
const getFloatNumber = (min, max, fraction) => {
  if (max < min || min < 0 || max < 0) {
    return undefined;
  }

  return (Math.random() * (max - min) + min).toFixed(fraction);
};

// Функция возвращающая случайное количество элементов массива без дублирования элементов.
const getElementsArray = (array) => {
  const amountOfElements = getIntNumber(1, array.length);
  const elementsArray = [];
  for (let index = 0; index < amountOfElements; index++) {
    const randomIndex = getIntNumber(0, array.length - 1);
    const randomElement = array[randomIndex];
    if (elementsArray.includes(randomElement)) {
      continue;
    }
    elementsArray.push(randomElement);
  }
  return elementsArray;
};

/*Вызов функции задан в перенную для дальнейшего использования этой переменной
в функции createOffer, чтобы передаваемый случайный индекс был одинаков
при формировании значений title, type и description из соответствующих массивов.*/
const getOfferIndex = getIntNumber(0, 4);

/*Функция генерирующая массив чисел от 1 до 10*/
const getArrayNumbers = () => {
  const arrayNumbers = [];
  for (let index = 1; index <= 10; index++) {
    arrayNumbers.push(index);
  }
  return arrayNumbers;
};

/*Вызывается для создания массива чисел 1-10 и дальнейшего его использования
при генерации объекта author.*/
const amountAds = getArrayNumbers();

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

// Ссылка на массив указана чтобы линтер не ругался, а то тесты не пройдут из-за неиспользуемой переменной.
createAdList;
