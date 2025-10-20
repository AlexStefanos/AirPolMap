/// <reference types="vite-plugin-svgr/client" />

import './App.css'
import FranceRegions from './assets/france.regions.svg?react'

function App() {
  return (
    <>
        <div>
          <FranceRegions />
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
    </>
  )
}

export default App
