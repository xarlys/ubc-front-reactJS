import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

//import mapMarkerImg from '../images/map-marker.svg';
import mapMarkerImg from '../images/truck/map-marker-caminhao.svg';

import '../styles/components/sidebar.css';

export default function Sidebar() {
  const { goBack } = useHistory();

  return (
    <aside className="sidebar">
      <img src={mapMarkerImg} alt="Caminhoneiros"/> { /*width={58} height={58} sizes={'24'}  */}

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}