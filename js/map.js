import {createAdList} from './data.js';
import {activatePage} from './form.js';
import {userAd} from './form.js';
import {cards} from './card.js';

const resetButton = userAd.querySelector('.ad-form__reset');
const userAddress = userAd.querySelector('input[name="address"]');

const map = L.map('map-canvas');

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

// Возвращает красный маркер и центр карты на место. Надо перенести в модуль form?
resetButton.addEventListener('click', () => {
  userMarker.setLatLng({
    lat: 35.67500,
    lng: 139.75000,
  });

  map.setView({
    lat: 35.67500,
    lng: 139.75000,
  }, 13);
});

for (let i = 0; i < createAdList.length; i++) {
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat: createAdList[i].location.lat,
      lng: createAdList[i].location.lng,
    },
    {
      icon,
    },
  );

  marker.addTo(map);
  marker.bindPopup(cards[i]);
}
