import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus, FiX } from "react-icons/fi";
import PhoneInput from 'react-phone-number-input/input';

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";

import '../styles/pages/create-orphanage.css';
import api from "../services/api";

export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0});
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [whatsapp, setWhatsapp] = useState('');
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng
    });
  }, []);

  const handleSubmit = useCallback( async (event: FormEvent) => {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach(image => data.append('images', image));
    data.append('whatsapp', whatsapp);

    await api.post('/orphanages', data);

    alert('Cadastro realizado com sucesso!');

    history.push('/app')
  }, [position, about, instructions, name, opening_hours, open_on_weekends, images, whatsapp, history]);

  const handleSelectImages = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const selectedImages = [...images, ...Array.from(event.target.files)] as File[];

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }, [images]);

  const deleteImagePreview = useCallback((index) => {
    setImages(oldState => oldState.filter((image, imageIndex) => imageIndex !== index));
    setPreviewImages(oldState => oldState.filter((image, imageIndex) => imageIndex !== index));
  }, []);

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-27.0982053, -48.9111422]} 
              style={{ width: '100%', height: 280 }}
              zoom={13}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {
                position.latitude !== 0 &&
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              }

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={e => setAbout(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image, index) => {
                  return (
                    <div key={index} className='images-preview'>
                      <FiX onClick={() => deleteImagePreview(index)} size={20} color='#FF669D' />
                      <img key={image} src={image} alt={name} />
                    </div>
                  )
                })}

                <label htmlFor='image[]' className="new-image">
                  <FiPlus id='ignore-svg' size={24} color="#15b6d6" />
                </label>
              </div>

              <input
                multiple
                type="file"
                id='image[]'
                onChange={handleSelectImages}
              />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={e => setOpeningHours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="whatsapp">Whatsapp</label>
              <PhoneInput
                id="whatsapp"
                value={whatsapp}
                maxLength={13}
                country='BR'
                onChange={setWhatsapp}
                placeholder='(xx) xxxxx - xxxx'
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active-yes' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>

                <button
                  type="button"
                  className={!open_on_weekends ? 'active-no' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
