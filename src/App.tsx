import './App.css'

import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/destin-extremis" className="navbar-link">
                        Destin Extrémis
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/choix-coterie" className="navbar-link">
                        Choix de Coterie
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/destin-extremis-react" className="navbar-link">
                        Page d'accueil
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;

