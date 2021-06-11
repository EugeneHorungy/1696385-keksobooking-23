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
  for (let i = 0; i < amountOfElements; i++) {
    const randomIndex = getIntNumber(0, array.length - 1);
    const randomElement = array[randomIndex];
    if (elementsArray.includes(randomElement)) {
      continue;
    }
    elementsArray.push(randomElement);
  }
  return elementsArray;
};

/*Функция генерирующая массив чисел от min до max*/
const getArrayNumbers = (min, max) => {
  const arrayNumbers = [];
  for (let i = min; i <= max; i++) {
    arrayNumbers.push(i);
  }
  return arrayNumbers;
};

export {getIntNumber, getFloatNumber, getElementsArray, getArrayNumbers};
