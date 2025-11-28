import './App.css'
import BeautifulForm from './components/BeautifulCard'
import Header from './components/header/header'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Players from "./pages/PlayersPun/PlayersPun";
import React from 'react';
import Footer from './components/footer/footer';
import Test from './pages/Test';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<><Header /><BeautifulForm /><Footer /></>} />
          <Route path="/ranking" element={<Players />} />
          <Route path="/partidas" element={<Players />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}



export default App
