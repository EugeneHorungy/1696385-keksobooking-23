import { activateForm } from './form.js';
import { userAd } from './form.js';
import { createCard } from './card.js';
import { filterAds } from './filter.js';

const MAP_ZOOM = 13;
const MapDefaultCenter = {
  LATITUDE: 35.67500,
  LONGITUDE: 139.75000,
};
const UserMarkerSize = {
  WIDTH: 52,
  HEIGHT: 52,
};
const SimilarMarkerSize = {
  WIDTH: 40,
  HEIGHT: 40,
};

const userAddress = userAd.querySelector('input[name="address"]');
const map = L.map('map-canvas');

const mainPinMarker = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [UserMarkerSize.WIDTH, UserMarkerSize.HEIGHT],
  iconAnchor: [UserMarkerSize.WIDTH / 2, UserMarkerSize.HEIGHT],
});

const userMarker = L.marker(
  {
    lat: MapDefaultCenter.LATITUDE,
    lng: MapDefaultCenter.LONGITUDE,
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
    lat: MapDefaultCenter.LATITUDE,
    lng: MapDefaultCenter.LONGITUDE,
  }, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

// Забирает координаты от ручного перемещения красного маркера и передаёт их в инпут адреса.
userMarker.on('drag', (evt) => {
  userAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const markerSet = L.layerGroup().addTo(map);

const getPlacemarks = (adsData) => {

  markerSet.clearLayers();

  const filteredAds = filterAds(adsData);

  filteredAds.forEach((ad) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [SimilarMarkerSize.WIDTH, SimilarMarkerSize.HEIGHT],
      iconAnchor: [SimilarMarkerSize.WIDTH / 2, SimilarMarkerSize.HEIGHT],
    });

    const marker = L.marker(
      {
        lat: ad.location.lat,
        lng: ad.location.lng,
      },
      {
        icon,
      },
    );

    marker.addTo(markerSet).bindPopup(createCard(ad));
  });
};

const resetMap = () => {
  userMarker.setLatLng({
    lat: MapDefaultCenter.LATITUDE,
    lng: MapDefaultCenter.LONGITUDE,
  });

  map.setView({
    lat: MapDefaultCenter.LATITUDE,
    lng: MapDefaultCenter.LONGITUDE,
  }, 13);
};

export { userMarker, getPlacemarks, resetMap, initMap };
