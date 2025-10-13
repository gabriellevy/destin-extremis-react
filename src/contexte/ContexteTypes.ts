import {createContext} from "react";
import {PersoHisto} from "../types/perso/Perso";

export type PersoContexteType = {
    perso: PersoHisto;
    setPerso: (perso: PersoHisto) => void;
};

export const PersoContexte = createContext<PersoContexteType | null>(null);