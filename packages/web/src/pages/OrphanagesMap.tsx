import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import api from '../services/api';
import mapIcon from '../utils/mapIcon';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('/orphanages').then(response => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          {
            orphanages.length === 0 ?
            <>
              <h1>Carregando...</h1>
              <p>Aguarde</p> 
            </> :
            <>
              <h2>Escolha um orfanato no mapa</h2>
              <p>Muitas crianças estão esperando a sua visita</p>
            </>
          }
        </header>

        <footer>
          <strong>Brusque</strong>
          <span>Santa Catarina</span>
        </footer>
      </aside>

      <Map
        center={[-27.0982053, -48.9111422]}
        zoom={13}
        style={{ width: '100%', height:  '100%' }}
      >
        {/* <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' /> // Another option for map view */}
        <TileLayer // change light for dark to get 'dark mode' view
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map(orphanage => {
            return (
              <Marker
                icon={mapIcon}
                position={[orphanage.latitude, orphanage.longitude]}
                key={orphanage.id}
              >
                <Popup
                  closeButton={false}
                  minWidth={240}
                  maxWidth={240}
                  className='map-popup'
                >
                  {orphanage.name}
                  <Link to={`/orphanages/${orphanage.id}`}>
                    <FiArrowRight size={20} color='FFF' />
                  </Link>
                </Popup>
              </Marker>
            )
          })
        }
      </Map>

      <Link to='/orphanages/create' className="create-orphanage">
        <FiPlus size={32} color='#FFF' />
      </Link>
    </div>
  );
};

export default OrphanagesMap;