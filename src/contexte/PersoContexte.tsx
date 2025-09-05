import {ReactNode, useEffect, useState} from "react";
import {Perso, PersoForm} from "../types/perso/Perso";
import {enfant} from "../donnees/persos/persos_pregens";
import {PersoContexte} from "./ContexteTypes";
import {persoFormToPerso} from "../fonctions/perso/conversionsPerso";
import {getViceOppose, Vertus} from "../types/ViceVertu";
import {PhaseDExecution} from "../types/Mode";
import {UseFormWatch} from "react-hook-form";
import {ChoixCoterieFormData} from "../ChoixDeCoterie/ChoixDeCoterie";

export interface PersoContexteProviderProps {
    children: ReactNode;
    initPerso?: UseFormWatch<ChoixCoterieFormData>;
}

function PersoContexteProvider({children, initPerso}:Readonly<PersoContexteProviderProps>) {
    const [perso, setPerso] = useState<Perso>(persoFormToPerso(enfant(true)));
    console.log("Mathieu perso : ", perso);

    useEffect(() => {
        if (initPerso) {
            console.log("Mathieu initPerso : ");
            const valuesInitPerso = initPerso();
            // initialisation à partir de données de génération de perso par préférences de traits
            const persoForm:PersoForm = enfant(true);
            let persoFinal: Perso = persoFormToPerso(persoForm);
            persoFinal.prenom = "truc";
            persoFinal.phaseDExecution = PhaseDExecution.histoire;

            persoFinal.viceVertu = Object.values(Vertus)
                .map(typeVertu => {
                    return {
                        valBon: valuesInitPerso.mauvais[getViceOppose(typeVertu)],
                        nbDeTestsFaits: 0,
                        typeMauvais: getViceOppose(typeVertu),
                        typeBon: typeVertu,
                    }
                });

            setPerso(persoFinal);
        }
    }, [initPerso]);

    return (
        <PersoContexte.Provider value={{ perso, setPerso }}>
            {children}
        </PersoContexte.Provider>
    );
}

export default PersoContexteProvider;