import {GroupeEvts} from "../../../../types/Evt";
import {Perso} from "../../../../types/perso/Perso";
import {
    aUneCarriere,
    commencerCarriere,
    compatibiliteCarriere,
    estAuLycee,
} from "../../../../fonctions/metiers/metiersUtils";
import {MetiersEnum, metiersObjs} from "../../../metiers";
import {getAge} from "../../../../types/Date";
import {ResultatTest} from "../../../../types/LancerDe";
import {testComp} from "../../../../fonctions/des";
import {TypeCompetence} from "../../../../types/perso/comps/Comps";

// carrière de jeunesse très proche de evts_brute_de_lycee dont elle utilise plusieurs evts
export const evts_dealer_de_lycee: GroupeEvts = {
    evts: [
        {
            id: "evts_dealer_de_lycee1_vocation",
            description: async (perso: Perso): Promise<string> => {
                let texte = '';
                texte += "Vu le pognon que ça fait tourner vous tentez de vous lancer comme vendeur de drogue au lycée. <br/>";

                const resTestMarchandage: ResultatTest = testComp(perso, TypeCompetence.marchandage, 0);
                texte += resTestMarchandage.resume;
                if (resTestMarchandage.reussi) {
                    texte += commencerCarriere(perso, MetiersEnum.dileur_de_lycee, '', false);
                } else {
                    texte += "Malheureusement vous n'êtes pas un très bon vendeur et n'arrivez pas à vous faire votre place. ";
                }
                return texte;
            },
            conditions: (perso: Perso): boolean => estAuLycee(perso)
                && !aUneCarriere(perso)
                && compatibiliteCarriere(perso, metiersObjs[MetiersEnum.dileur_de_lycee]) > 1
                && getAge(perso) <= 18,
            repetable: true,
        },
    ],
    probaParDefaut: 10,
};