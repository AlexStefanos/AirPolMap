/// <reference types="vite-plugin-svgr/client" />

import './App.css'
import FranceRegions from './assets/france.regions.svg?react'
import Pikaday from "pikaday";
import { useEffect, useRef } from "react";
import "pikaday/css/pikaday.css";

function App() {
  const pickerRef = useRef(null);

  useEffect(() => {
    const picker = new Pikaday({
      field: pickerRef.current,
      format: 'DD/MM/YYYY',
    });

    return () => picker.destroy();
  }, []);

  return (
    <>
        <div style={{ marginBottom: "30px", display: "flex", alignItems: "center", gap: "100px"}}>
          <input 
            ref={pickerRef}
            type="text"
            className="input pika-single"
            placeholder="Choisissez une date"
          />
          <fieldset>
            <legend>Polluant choisi</legend>
            <select defaultValue="Choisissez un polluant">
              <option>Dioxyde de soufre (SO2)</option>
              <option>Dioxyde d’azote (NO2)</option>
              <option>Monoxyde de carbone (CO)</option>
              <option>Ozone (O3)</option>
              <option>Oxyde d’azote (NOx)</option>
            </select>
          </fieldset>
        </div>
        <div>
          <FranceRegions style={{ marginLeft:"-100px", width: "160%"}} />
        </div>
    </>
  )
}

export default App
