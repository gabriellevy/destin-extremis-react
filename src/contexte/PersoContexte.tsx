import {useState} from "react";
import {Perso} from "../types/Perso";
import {jeuneHommeEnVoyageEnCampanie} from "../donnees/persos/persos_pregens";
import { PersoContexte } from "./ContexteTypes";

export const PersoContexteProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [perso, setPerso] = useState<Perso>(jeuneHommeEnVoyageEnCampanie);

    return (
        <PersoContexte.Provider value={{ perso, setPerso }}>
            {children}
        </PersoContexte.Provider>
    );
};

export default PersoContexteProvider;