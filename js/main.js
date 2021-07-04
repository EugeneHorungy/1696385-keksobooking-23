import {getAds} from './requests.js';
import {getPlacemarks} from './map.js';
import {createCards} from './card.js';
import {getModalError} from './modal.js';
import './card.js';
import './map.js';
import './form.js';
import './form-validation.js';
import './requests.js';

getAds((ads) => getPlacemarks(ads.slice(0, 10), createCards(ads)), getModalError);
