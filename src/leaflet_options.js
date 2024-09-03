'use strict';

var L = require('leaflet');

var mapboxTileURL = 'http://10.10.4.52:8005/geoserver/gwc/service/tms/1.0.0/INDIA_V1/{z}/{x}/{-y}.png',
// var mapboxTileURL = 'http://mt1.google.com/vt/lyrs=m@110&hl=${lcl}&x={x}&y={y}&z={z}',
    mapboxAttribution = '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    mapboxToken = 'pk.eyJ1IjoibXNsZWUiLCJhIjoiclpiTWV5SSJ9.P_h8r37vD8jpIH1A6i1VRg',
    osmAttribution = '© <a href="https://www.openstreetmap.org/copyright/en">OpenStreetMap</a> contributors',
    waymarkedtrailsAttribution = '© <a href="http://waymarkedtrails.org">Sarah Hoffmann</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)';

var streets = L.tileLayer(mapboxTileURL, {
    attribution: mapboxAttribution,
    tileSize: 512,
    zoomOffset: -1,
    id: 'mapbox/streets-v11',
    accessToken: mapboxToken
  }),
  outdoors = L.tileLayer(mapboxTileURL, {
    attribution: mapboxAttribution,
    tileSize: 512,
    zoomOffset: -1,
    id: 'mapbox/outdoors-v11',
    accessToken: mapboxToken
  }),
  satellite = L.tileLayer(mapboxTileURL, {
    attribution: mapboxAttribution,
    tileSize: 512,
    zoomOffset: -1,
    id: 'mapbox/satellite-streets-v11',
    accessToken: mapboxToken
  }),
  // osm = L.tileLayer('http://10.10.4.52:8005/geoserver/gwc/service/tms/1.0.0/INDIA_V1/{z}/{x}/{-y}.png', {
  //   attribution: osmAttribution,
  // }),
  // osm = L.tileLayer('http://10.10.4.52:8005/INDIA_V3/{z}/{x}/{-y}.png', {
  //   attribution: osmAttribution,
  // }),
  osm = L.tileLayer('https://mt1.google.com/vt/lyrs=m@110&hl=$%7Blcl%7D&x={x}&y={y}&z={z}', {
    attribution: osmAttribution,
  }),
  osm_de = L.tileLayer('http://10.10.4.52:8005/INDIA_V3/{z}/{x}/{-y}.png', {
    attribution: osmAttribution,
  }),
  hiking = L.tileLayer('https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
    attribution: waymarkedtrailsAttribution,
  }),
  bike = L.tileLayer('https://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png', {
    attribution: waymarkedtrailsAttribution,
  }),
  small_components = L.tileLayer('https://tools.geofabrik.de/osmi/tiles/routing/{z}/{x}/{y}.png', {});

module.exports = {
  defaultState: {
    center: L.latLng(12.92052027305486,77.57254336767198),
    zoom: 13,
    waypoints: [],
    language: 'en',
    alternative: 0,
    layer: streets
  },
  services: [{
    label: 'Car (fastest)',
    path: 'http://10.10.4.52:5002/route/v1'
  }],
  layer: [{
    'Mapbox Streets': streets,
    'Mapbox Outdoors': outdoors,
    'Mapbox Streets Satellite': satellite,
    'openstreetmap.org': osm,
    'openstreetmap.de.org': osm_de
  }],
  overlay: {
    'Hiking': hiking,
    'Bike': bike,
    'Small Components': small_components
  },
  baselayer: {
    one: streets,
    two: outdoors,
    three: satellite,
    four: osm,
    five: osm_de
  }
};
