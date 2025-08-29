// App.jsx
import React, { useState } from 'react';
import './Header.css';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const CleanLocalStorage = () => localStorage.clear();

  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <h1>Points_python</h1>
        </div>

        <nav className={`navigation ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><a href="/">Ingreso</a></li>
            <li><a href="/players">Jugadores</a></li>
            <li><button onClick={CleanLocalStorage}>Limpiar LocalStorage</button></li>
          </ul>
        </nav>

        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </header>

      <main className="content">
        <h2>Contenido detrás del header</h2>
        <p>Desplázate hacia abajo para ver el efecto blur.</p>
      </main>
    </div>
  );
}

export default App;
