import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';

const OrphanagesMap = () => {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita</p>
        </header>

        <footer>
          <strong>Brusque</strong>
          <span>Santa Catarina</span>
        </footer>
      </aside>

      <Map
        center={[-27.1240857, -48.9505168]}
        zoom={15}
        style={{ width: '100%', height:  '100%' }}
      >
        {/* <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' /> // Another option for map view */}
        <TileLayer // change light for dark to get 'dark mode' view
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
      </Map>

      <Link to='' className="create-orphanage">
        <FiPlus size={32} color='#FFF' />
      </Link>
    </div>
  );
};

export default OrphanagesMap;