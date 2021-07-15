const filterForm = document.querySelector('.map__filters');
const selectType = filterForm.querySelector('select[name="housing-type"]');
const selectPrice = filterForm.querySelector('select[name="housing-price"]');
const selectRooms = filterForm.querySelector('select[name="housing-rooms"]');
const selectGuests = filterForm.querySelector('select[name="housing-guests"]');
const checkboxesFeatures = filterForm.querySelectorAll('input[name="features"]');

const PriceValue = {
  LOW: {
    MIN: 0,
    MAX: 10000,
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000,
  },
  HIGH: {
    MIN: 50000,
  },
};

const filterType = (element) => element.offer.type === selectType.value || selectType.value === 'any';

const filterPrice = (element) => {
  switch (selectPrice.value) {
    case 'low':
      return element.offer.price >= PriceValue.LOW.MIN && element.offer.price <= PriceValue.LOW.MAX;
    case 'middle':
      return element.offer.price >= PriceValue.MIDDLE.MIN && element.offer.price <= PriceValue.MIDDLE.MAX;
    case 'high':
      return element.offer.price >= PriceValue.HIGH.MIN;
    case 'any':
      return true;
  }
};

const filterRooms = (element) => element.offer.rooms === Number(selectRooms.value) || selectRooms.value === 'any';

const filterGuests = (element) => element.offer.guests === Number(selectGuests.value) || selectGuests.value === 'any';

const filterFeatures = (ads) => {
  const currentFeatures = Array.from(checkboxesFeatures).filter((checkbox) => checkbox.checked);
  const filteredAds = ads.slice().filter((ad) =>
    currentFeatures.every((feature) =>
      Object.prototype.hasOwnProperty.call(ad.offer, 'features') && ad.offer.features.includes(feature.value)));

  return filteredAds;
};

const filterAds = (adsData) => {
  const similarAds = adsData.slice();
  const filteredAds = filterFeatures(similarAds)
    .filter(filterType)
    .filter(filterPrice)
    .filter(filterRooms)
    .filter(filterGuests)
    .slice(0,10);

  return filteredAds;
};

const onFilterFormChange = (cb) => {
  filterForm.addEventListener('change', () => {
    cb();
  });
};

const resetFilter = () => {
  filterForm.reset();
};

export {resetFilter, onFilterFormChange, filterAds};
