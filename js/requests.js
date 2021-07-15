import {resetMap} from './map.js';
import {resetForm, activateFilter} from './form.js';
import {resetFilter} from './filter.js';

const GET_URL = 'https://23.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://23.javascript.pages.academy/keksobooking';

const getAds = (onSuccess, onFail) => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        activateFilter();
        return response.json();
      }

      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then(onSuccess)
    .catch(onFail);
};

const sendUserData = (onSuccess, onFail, body) => {
  fetch(POST_URL, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        resetMap();
        resetForm();
        resetFilter();
      } else {
        onFail();
      }
    })
    .catch(onFail);
};

export {getAds, sendUserData};
