import './App.css'
import BeautifulForm from './components/BeatifulCard'
import Header from './components/header/header'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Players from "/pages/Players";
import React from 'react';
import BoardGamePoints from './components/board/BoardGamePoints';

function App() {
  
  return (
    <>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<><Header/><BeautifulForm /></>}/>
          <Route path="/players" element={<Players/>} />
          <Route path="/test" element={<BoardGamePoints/>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>

    </>
  )
}

export default App
