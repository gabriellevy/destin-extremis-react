import {Perso} from "../../../types/perso/Perso";
import {metiersEnum} from "../../metiers";
import {GroupeEvts} from "../../../types/Evt";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {
    commencerCarriere,
    suitUneCarriereDepuis,
    travailleEnCeMomentComme
} from "../../../fonctions/metiers/metiersUtils";

export const evts_centurion: GroupeEvts = {
    evts: [
        {
            id: "evts_centurion1",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous tentez d'obtenir le grade de centurion. `
                const resTestInt:ResultatTest = testComp(perso, {comp: TypeCompetence.intelligence, bonusMalus: 0});
                texte += resTestInt.resume;
                if (resTestInt.reussi) {
                    commencerCarriere(perso, metiersEnum.centurion, '');
                    texte += "Votre intelligence et sens de l'organisation impressionnent votre hiérarchie. "
                     + "Vous êtes maintenant un centurion";
                } else {
                    texte += "Malheureusement le poste de centurion nécessite une grande intelligence et un bon sens de l'organisation que vous n'avez pas encore. "
                    + "Bientôt peut-être ?";
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                suitUneCarriereDepuis(perso, metiersEnum.legionnaire, 4)
        },
        {
            id: "evts_centurion2",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const resTestFor:ResultatTest = testComp(perso, {comp: TypeCompetence.force, bonusMalus: 40});
                const resTestEnd:ResultatTest = testComp(perso, {comp: TypeCompetence.endurance, bonusMalus: 40});
                const resTestInt:ResultatTest = testComp(perso, {comp: TypeCompetence.intelligence, bonusMalus: 40});
                texte += resTestEnd.resume;
                texte += resTestEnd.resume;
                texte += resTestInt.resume;
                if (resTestFor.reussi && resTestEnd.reussi && resTestInt.reussi) {
                    texte += `Vous êtes un centurion respecté tant pour sa force que pour ses compétences d'officier. `;
                } else {
                    texte += `Vous avez beaucoup de mal à tenir le rythme épuisant de votre métier de centurion. `;
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, metiersEnum.centurion),
        },
    ],
    probaParDefaut: 5,
};