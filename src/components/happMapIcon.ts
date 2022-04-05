import L from 'leaflet';
//import mapMarkerImg from '../images/map-marker.svg';
import mapMarkerImg from '../images/truck/map-marker-caminhao.svg';

export default L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [48, 58],
  iconAnchor: [24, 58],
  popupAnchor: [0, -60]
});