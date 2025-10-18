import {Perso} from "../../../../types/perso/Perso";
import {GroupeEvts} from "../../../../types/Evt";
import {
    arreterCarriere,
    commencerCarriere,
    compatibiliteCarriere,
    estAuLycee, plusUnEnCompetenceMetier,
    suitUneCarriereDe
} from "../../../../fonctions/metiers/metiersUtils";
import {metiersEnum, metiersObjs} from "../../../metiers";
import {getAge} from "../../../../types/Date";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp} from "../../../../fonctions/des";
import {TypeCompetence} from "../../../../types/perso/comps/Comps";
import {modifierReputationDansQuartier} from "../../../../fonctions/perso/Reputation";
import {Quartier} from "../../../geographie/quartiers";

export const evts_brute_de_lycee: GroupeEvts = {
    evts: [
        {
            id: "evts_brute_de_lycee_vocation",
            description: async (perso: Perso): Promise<string> => {
                let texte = '';
                texte += "Vous décidez de vous en prendre à d'autres jeunes plus faibles pour leur vider les poches. <br/>";
                texte += commencerCarriere(perso, metiersEnum.brute_de_lycee, '');
                return texte;
            },
            conditions: (perso: Perso): boolean => estAuLycee(perso)
                && !suitUneCarriereDe(perso, metiersEnum.brute_de_lycee)
                && compatibiliteCarriere(perso, metiersObjs[metiersEnum.brute_de_lycee]) >= 0
                && getAge(perso) <= 18,
            repetable: true,
        },
    ],
    probaParDefaut: 5,
};
