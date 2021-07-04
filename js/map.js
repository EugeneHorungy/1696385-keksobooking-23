import {disablePage, activatePage} from './form.js';
import {userAd} from './form.js';

const map = L.map('map-canvas');
const userAddress = userAd.querySelector('input[name="address"]');

disablePage();

map.on('load', () => {
  activatePage();
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

// Забирает координаты от ручного перемещения красного маркера и передаёт их в инпут адреса.
userMarker.on('moveend', (evt) => {
  userAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const getPlacemarks = (adsData, cards) => {
  for (let i = 0; i < adsData.length; i++) {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: adsData[i].location.lat,
        lng: adsData[i].location.lng,
      },
      {
        icon,
      },
    );

    marker.addTo(map);
    marker.bindPopup(cards[i]);
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

export {map, userMarker, getPlacemarks, resetMap};
