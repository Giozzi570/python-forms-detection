import './App.css'
import BeautifulForm from './components/BeatifulCard'
import Header from './components/header/header'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Players from "./pages/PlayersPun/PlayersPun";
import PlayersMet from "./pages/PlayersMet/PlayersMet";
import React from 'react';
import SearchBar from './components/searchBar/search';
import Footer from './components/footer/footer';
import Integrantes from './components/integrantes/integrante';
function App() {
  
  return (
    <>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<><Header/><BeautifulForm /><Footer/></>}/>
          <Route path="/playersPun" element={<Players/>} />
          <Route path="/playersMet" element={<PlayersMet/>} />
          <Route path="/test" element={<Integrantes/>}/>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>

    </>
  )
}

export default App
