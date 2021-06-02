// Функция, возвращающая случайное целое число из переданного диапазона включительно.
// При некорректных параметрах возвращается underfined.
const getIntNumber = (min, max) => {
  if (max < min || min < 0 || max < 0) {
    return undefined;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getIntNumber(4, 9);

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
// В параметр fraction передаётся количество знаков после запятой.
// При некорректных параметрах возвращается underfined.
const getFloatNumber = (min, max, fraction) => {
  if (max < min || min < 0 || max < 0) {
    return undefined;
  }

  return (Math.random() * (max - min) + min).toFixed(fraction);
};

getFloatNumber(0, 9, 9);
