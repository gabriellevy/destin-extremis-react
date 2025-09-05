import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import App from './App';
import ChoixDeCoterie from "./ChoixDeCoterie/ChoixDeCoterie";
import DestinExtremis from "./compos/DestinExtremis";
import {Mode} from "./types/Mode";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Router>
        <Routes>
            <Route path="/destin-extremis-react" element={<App />} />
            <Route path="/destin-extremis-test" element={<DestinExtremis mode={Mode.test} />} />
            <Route path="/destin-extremis" element={<ChoixDeCoterie mode={Mode.jeu}/>} />
            <Route path="/choix-coterie" element={<ChoixDeCoterie mode={Mode.choixCoterie} />} />
        </Routes>
    </Router>
);
