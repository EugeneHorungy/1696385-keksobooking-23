import {activateForm} from './form.js';
import {userAd} from './form.js';
import {createCards} from './card.js';
import {filterAds} from './filter.js';

const userAddress = userAd.querySelector('input[name="address"]');
const map = L.map('map-canvas');

const mainPinMarker = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const userMarker = L.marker(
  {
    lat: 35.67500,
    lng: 139.75000,
  },
  {
    draggable: true,
    icon: mainPinMarker,
  },
);

userMarker.addTo(map);

const initMap = (cb) => {
  map.on('load', () => {
    activateForm();
    cb();
  });

  map.setView({
    lat: 35.67500,
    lng: 139.75000,
  }, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

// Забирает координаты от ручного перемещения красного маркера и передаёт их в инпут адреса.
userMarker.on('moveend', (evt) => {
  userAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const markerSet = L.layerGroup().addTo(map);

const getPlacemarks = (adsData) => {

  markerSet.clearLayers();

  const filteredAds = filterAds(adsData);

  const popups = createCards(filteredAds);
  for (let i = 0; i < filteredAds.length; i++) {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: filteredAds[i].location.lat,
        lng: filteredAds[i].location.lng,
      },
      {
        icon,
      },
    );

    marker.addTo(markerSet).bindPopup(popups[i]);
  }
};

const resetMap = () => {
  userMarker.setLatLng({
    lat: 35.67500,
    lng: 139.75000,
  });

  map.setView({
    lat: 35.67500,
    lng: 139.75000,
  }, 13);
};

export {userMarker, getPlacemarks, resetMap, initMap};
