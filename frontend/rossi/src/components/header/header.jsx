// App.jsx
import React, { useState } from 'react';
import './header.css';
import Home from '/home.svg';
import GitHub from '/github.png';
function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="App">
      <header className="header">
        <div className="logo">
          <a href="/"> <img src={Home} alt="Logo" width={25} /></a>
        </div>
        
        <nav className={`navigation ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><a href="/">Ingreso</a></li>
            <li><a href="/ranking">Ranking de Jugadores</a></li>
            <li><a href="/partidas">Partidas Multijugador</a></li>
            {/* <li><a href="/playersMet">Jugadores Metrología</a></li> */}
          </ul>
          <div id='githubMobile' className="github">
          <p className='github-text'>Link del proyecto</p>
          <a href="https://github.com/Giozzi570/python-forms-detection">
            <img src={GitHub} alt="GitHub" width={50} />
          </a>
        </div>
        </nav>
        <div id='github' className="github">
          <a href="https://github.com/Giozzi570/python-forms-detection">
            <img src={GitHub} alt="GitHub" width={50} />
          </a>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <div id='bar1' className={isMobileMenuOpen ? 'bar1-active bar' : 'bar'}></div>
          <div id='bar2' className={isMobileMenuOpen ? 'bar2-active bar' : 'bar'}></div>
          <div id='bar3' className={isMobileMenuOpen ? 'bar3-active bar' : 'bar'}></div>
        </div>
      </header>
    </div>
  );
}

export default App;
