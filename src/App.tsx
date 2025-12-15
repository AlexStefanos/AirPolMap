/// <reference types='vite-plugin-svgr/client' />

import './App.css'
import FranceRegions from './assets/france.regions.svg?react'
import Pikaday from 'pikaday';
import { useEffect, useRef, useState } from 'react';
import 'pikaday/css/pikaday.css';

function App() {
  const pickerRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [polluant, setPolluant] = useState<string>('SO2');
  const [metrique, setMetrique] = useState<string>('MoyJ');

  useEffect(() => {
    const picker = new Pikaday({
      field: pickerRef.current,
      format: 'DD/MM/YYYY',
      onSelect: (date) => {
        setSelectedDate(date);
      }
    });

    return () => picker.destroy();
  }, []);

  const handleSearch = () => {
    if(!selectedDate) {
      alert('Veuillez sélectionner une date');
      return;
    }
    const formattedDate = selectedDate.toISOString().split('T')[0];
    
    console.log({
      date: formattedDate,
      polluant: polluant,
      metrique: metrique
    });
    fetch(`https://api-airpolmap-4pco9.ondigitalocean.app/data?${metrique}&date=${formattedDate}&polluant=${polluant}`);
  };

  return (
    <>
        <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '100px'}}>
          <fieldset>
            <legend>Date choisie</legend>
            <input 
              ref={pickerRef}
              type='text'
              className='input pika-single'
              placeholder='Choisissez une date'
            />
          </fieldset>
          <fieldset>
            <legend>Polluant choisi</legend>
            <select value={polluant}
                    onChange={(e) => setPolluant(e.target.value)}>
              <option value='SO2'>Dioxyde de soufre (SO2)</option>
              <option value='NO2'>Dioxyde d’azote (NO2)</option>
              <option value='CO'>Monoxyde de carbone (CO)</option>
              <option value='O3'>Ozone (O3)</option>
              <option value='NOx'>Oxyde d’azote (NOx)</option>
            </select>
          </fieldset>
          <fieldset>
            <legend>Métrique choisie</legend>
            <select value={metrique}
                    onChange={(e) => setMetrique(e.target.value)}>
              <option value='MoyJ'>Moyenne par jour</option>
              <option value='MoyH'>Moyenne par heure</option>
              <option value='MoyA'>Moyenne par an</option>
              <option value='MaxJH'>Maximum par jour</option>
            </select>
          </fieldset>
        <button onClick={handleSearch}>Rechercher</button>
        </div>
        <div>
          <FranceRegions style={{ width: '80%'}} />
        </div>
    </>
  )
}

export default App
