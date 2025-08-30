import {useState} from "react";
import {Perso} from "../types/perso/Perso";
import {enfant} from "../donnees/persos/persos_pregens";
import { PersoContexte } from "./ContexteTypes";
import {persoFormToPerso} from "../fonctions/perso/conversionsPerso";

export const PersoContexteProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [perso, setPerso] = useState<Perso>(persoFormToPerso(enfant()));

    return (
        <PersoContexte.Provider value={{ perso, setPerso }}>
            {children}
        </PersoContexte.Provider>
    );
};

export default PersoContexteProvider;