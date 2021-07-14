import {getAds} from './requests.js';
import {getPlacemarks} from './map.js';
import {getModalError} from './modal.js';
import {onFilterFormChange} from './filter.js';
import {debounce} from './utils.js';
import './map.js';
import './form.js';
import './form-validation.js';

const getSimilarAds = () => {
  getAds((ads) => {
    getPlacemarks(ads);
    onFilterFormChange(debounce(() => getPlacemarks(ads)));
  }, getModalError);
};

getSimilarAds();
