import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPlus, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from 'leaflet';

import '../styles/pages/properties-map.css';

import mapCargaTruckImg from '../images/truck/map-carga.svg';
import mapMarketImg from '../images/truck/map-marker-caminhao.svg';
import api from '../service/api';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarketImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
});

interface Propertie {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function PropertiesMap() {
  const { goBack } = useHistory();
  const [properties, setProperties] = useState<Propertie[]>([]);

  useEffect(() => {
    api.get('properties').then(response => {
      setProperties(response.data);
    });
  }, []);


  return (
    <div id="page-map">
      <aside>
        <header>
          <img onClick={goBack} src={mapCargaTruckImg} alt="Caminhoneiros GoBack" width={220} height={180}  /> {/* sizes={'24'}  */}

          <h2>Cargas e Caminhões</h2>
          <p>Veja todas as cargas disponíveis!</p>
        </header>

        <footer>
          <strong>Ubicua Cloud</strong>
          <span>São Paulo</span>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>       
      </aside>

      <Map 
      center={[-18.8475866,-41.9657477]} 
      zoom={14} 
      style={{ width: '100%', height: '100%' }}      
      >
      <TileLayer 
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
      />
      
      {properties.map(propertie => {
        return (
          <Marker 
          key={propertie.id}
          icon={mapIcon}
          position={[propertie.latitude,propertie.longitude]}
          >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {propertie.name}
              <Link to={`/properties/${propertie.id}`}>
                <FiArrowRight size={20} color="#FFF"/>
              </Link>
            </Popup>
          </Marker>
        )
      })};

     </Map>

      <Link to="/properties/create" className="create-properties">
        <FiPlus size={32} color="{#fff"></FiPlus>
      </Link>
    </div>
  );
}

export default PropertiesMap;