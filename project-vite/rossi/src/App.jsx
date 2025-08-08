import './App.css'
import BeautifulForm from './components/BeatifulCard'
import Header from './components/header/header'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Players from "./Players";
import React from 'react';
import BoardGamePoints from './components/board/BoardGamePoints';
import ModalFinish from '../pages/Test';

function App() {
  
  return (
    <>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<><Header/><BeautifulForm /></>}/>
          <Route path="/players" element={<Players/>} />
          <Route path="/test" element={<ModalFinish />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>

    </>
  )
}

export default App
