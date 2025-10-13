import './App.css'
import BeautifulForm from './components/BeatifulCard'
import Header from './components/header/header'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Players from "./pages/PlayersPun/PlayersPun";
import PlayersMet from "./pages/PlayersMet/PlayersMet";
import React from 'react';
import SearchBar from './components/searchBar/search';
import ModalTypeCamera from './pages/Test';
function App() {
  
  return (
    <>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<><Header/><BeautifulForm /></>}/>
          <Route path="/playersPun" element={<Players/>} />
          <Route path="/playersMet" element={<PlayersMet/>} />
          <Route path="/test" element={<ModalTypeCamera />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>

    </>
  )
}

export default App
