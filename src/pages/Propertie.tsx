import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Marker } from "react-leaflet";
import L from 'leaflet';
import { useParams } from 'react-router-dom';

//import mapMarkerImg from '../images/map-marker.svg';
import mapMarkerImg from '../images/truck/map-marker-caminhao.svg';

import PrimaryButton from "../components/PrimaryButton";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import api from '../service/api';


import '../styles/pages/properties.css';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

interface PropertieData {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface PropertieParams {
  id: string;
}

export default function Propertie() {
  const params = useParams<PropertieParams>();
  const [propertie, setPropertie] = useState<PropertieData>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`properties/${params.id}`).then(response => {
      setPropertie(response.data);
    });
  }, [params.id]);

  if (!propertie) {
    return <p>Carregando...</p>
  }

  return (
    <div id="page-propertie">
      <Sidebar />

      <main>
        <div className="propertie-details">
          <img src={propertie.images[activeImageIndex].url} alt={propertie.name} />

          <div className="images">
            {propertie.images.map((image, index) => {
              return (
                <button 
                  key={image.id} 
                  className={activeImageIndex === index ? 'active' : ''} 
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                  >
                  <img src={image.url} alt={propertie.name} />
                </button>
              );
            })}
            
          </div>
          
          <div className="propertie-details-content">
            <h1>{propertie.name}</h1>
            <p>{propertie.about}</p>

            <div className="map-container">
              <Map 
                interactive={false}
                center={[propertie.latitude,propertie.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
              >
                <Marker interactive={false} icon={happyMapIcon} position={[propertie.latitude,propertie.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${propertie.latitude},${propertie.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{propertie.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {propertie.opening_hours}
              </div>
              { propertie.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  Fim de Semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não Atendemos <br />
                  Fim de Semana
              </div>
              )}
            </div>

            {<PrimaryButton type="button">
              <FaWhatsapp size={20} color="#FFF" />
                <a href="https://api.whatsapp.com/send?phone=33991265762" target="_blank" rel="noreferrer" className="enter-app">Entrar em contato</a>
              </PrimaryButton>}
          </div>
        </div>
      </main>
    </div>
  );
}