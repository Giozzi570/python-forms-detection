import './App.css'
import BeautifulForm from './components/BeautifulCard'
import Header from './components/header/header'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Players from "./pages/PlayersPun/PlayersPun";
import React from 'react';
import Footer from './components/footer/footer';
import Test from './pages/Test';
import BoardEstadisticas from './components/boards/boardEstadisticas/BoardEstadisticas';
import Promedio from './components/Promedios/Promedio';
import PanelJugadores from '../multijugador/panelJugadores/PanelJugadores';
import SeleccionDePersonaje from '../multijugador/panelJugadores/jugador1/ElegirPersonaje/SeleccionDePersonaje';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<><Header /><BeautifulForm /><Footer /></>} />
          <Route path="/ranking" element={<Players />} />
          <Route path="/multijugador" element={<PanelJugadores />} />
          <Route path="/test" element={<SeleccionDePersonaje />} />
          <Route path="/estadisticas" element={<BoardEstadisticas/>} />
          <Route path="/documentacion" element={<Promedio/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}



export default App
