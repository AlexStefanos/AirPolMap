/// <reference types='vite-plugin-svgr/client' />

import './App.css'
import FranceRegions from './assets/FranceRegions'
import Pikaday from 'pikaday';
import { useEffect, useRef, useState } from 'react';
import 'pikaday/css/pikaday.css';

type Region = {
  id: string
  name: string
}

type RegionValue = {
  regionId: string
  value: number
}

function App() {
  const pickerRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [polluant, setPolluant] = useState<string>('SO2');
  const [metrique, setMetrique] = useState<string>('MoyJ');
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const apiData: RegionValue[] = [
    { regionId: 'ara', value: 2 },
    { regionId: 'bfc', value: 8 },
    { regionId: 'bre', value: 17 },
  ]
  const [regionValues, setRegionValues] = useState<Record<string, number>>({})

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

  const handleSearch = async () => {
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
    const result = await fetch(`https://api-airpolmap-4pco9.ondigitalocean.app/data?metrique=${metrique}&date=${formattedDate}&polluant=${polluant}`);
    const data = await result.json();
    const values: Record<string, number> = {}
      data.forEach((item: any) => {
      values[item.regionId] = item.value
    })
    setRegionValues(values);
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
        <div className='map-layout'>
          <FranceRegions
            style={{ width: '80%' }}
            selectedRegion={selectedRegion?.id}
            onRegionClick={setSelectedRegion}
            regionValues={regionValues}
          />
          <div className="legend">
            <h3>Données par région</h3>

            {selectedRegion ? (
              <>
                <p><strong>{selectedRegion.name}</strong></p>
                <div className="value-box">
                  {regionValues[selectedRegion.id] ?? '—'}
                </div>
              </>
              ) : (
                <p>Cliquez sur une région</p>
              )}
          </div>
        </div>
    </>
  )
}

export default App
