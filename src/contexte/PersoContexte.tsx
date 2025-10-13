import {ReactNode, useEffect, useState} from "react";
import {PersoForm, PersoHisto} from "../types/perso/Perso";
import {enfant} from "../donnees/persos/persos_pregens";
import {PersoContexte} from "./ContexteTypes";
import {persoFormToPersoHisto} from "../fonctions/perso/conversionsPerso";
import {getViceOppose, Vertu} from "../types/ViceVertu";
import {PhaseDExecution} from "../types/Mode";
import {UseFormWatch} from "react-hook-form";
import {ChoixCoterieFormData} from "../ChoixDeCoterie/ChoixDeCoterie";
import {Competence} from "../types/perso/comps/Comps";

export interface PersoContexteProviderProps {
    children: ReactNode;
    initPerso?: UseFormWatch<ChoixCoterieFormData>;
}

function PersoContexteProvider({children, initPerso}:Readonly<PersoContexteProviderProps>) {
    const [perso, setPerso] = useState<PersoHisto>(persoFormToPersoHisto(enfant(false)));

    useEffect(() => {
        if (initPerso) {
            // initialisation à partir de données "jeu" c'est à dire par choix de vice, vertus etc par le joueur
            const valuesInitPerso = initPerso();
            const persoForm:PersoForm = enfant(true);
            let persoFinal: PersoHisto = persoFormToPersoHisto(persoForm);
            persoFinal.phaseDExecution = PhaseDExecution.histoire;

            // données de génération de perso par préférences de vices et vertus
            persoFinal.viceVertu = Object.values(Vertu)
                .map((typeVertu: Vertu) => {
                    return {
                        valVertu: valuesInitPerso.mauvais[getViceOppose(typeVertu)],
                        nbDeTestsFaits: 0,
                        typeVice: getViceOppose(typeVertu),
                        typeVertu: typeVertu,
                    }
                });
            // données de génération de perso par préférences de compétences
            const competencesChoisies = valuesInitPerso.competences;
            persoFinal.comps = persoFinal.comps.map((comp: Competence) => {
                if (competencesChoisies[comp.typeComp]) {
                    comp.val += 10;
                } else {
                    comp.val -= 2;
                }
                return comp;
            })

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