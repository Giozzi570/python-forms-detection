import React, { useState } from 'react';
import './Header.css';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="header">

            <div className="logo">
                <h1>Points_python</h1>
            </div>

            <nav className={`navigation ${isMobileMenuOpen ? 'open' : ''}`}>
                <ul className="nav-links">
                    <li><a href="/">Ingreso</a></li>
                    <li><a href="/players">Jugadores</a></li>
                </ul>
            </nav>
            <div className="hamburger" onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        </header>
    );
};

export default Header;
