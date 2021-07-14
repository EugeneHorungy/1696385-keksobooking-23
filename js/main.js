import {getAds} from './requests.js';
import {getPlacemarks, initMap} from './map.js';
import {getModalError} from './modal.js';
import {onFilterFormChange} from './filter.js';
import {debounce} from './utils.js';
import {disablePage} from './form.js';
import './map.js';
import './form.js';
import './form-validation.js';

disablePage();

const getSimilarAds = () => {
  getAds((ads) => {
    getPlacemarks(ads);
    onFilterFormChange(debounce(() => getPlacemarks(ads)));
  }, getModalError);
};

initMap(getSimilarAds);
