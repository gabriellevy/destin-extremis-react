import {Perso} from "../../../types/perso/Perso";
import {GroupeEvts} from "../../../types/Evt";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testMetier} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {calculeAge} from "../../../types/Date";
import {
    aUneCarriere,
    commencerCarriere,
    compatibiliteCarriere,
    travailleEnCeMomentComme
} from "../../../fonctions/metiers/metiersUtils";
import {metiersEnum, metiersObjs} from "../../metiers";
import {journalAleatoire} from "../../carriere/journaliste/journal";

export const evts_journaliste: GroupeEvts = {
    evts: [
        {
            id: "evts_journaliste1",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous hésitez à devenir journaliste. `
                const resTestRagot:ResultatTest = testComp(perso, {comp: TypeCompetence.ragot, bonusMalus: 20});
                const resTestInt:ResultatTest = testComp(perso, {comp: TypeCompetence.intuition, bonusMalus: 20});
                texte += resTestRagot.resume;
                texte += resTestInt.resume;
                const titreJournal: string = journalAleatoire();
                if (resTestRagot.reussi && resTestInt.reussi) {
                    commencerCarriere(perso, metiersEnum.journaliste, titreJournal);
                    texte += "Votre talent à dénicher les bonnes histoires et à la raconter convainquent le rédacteur en chef du "
                        + titreJournal +  " de vous engager. ";
                } else {
                    texte += "Malheureusement le rédacteur en chef du " + titreJournal + " ne vous juge aps apte à ce travail. ";
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                !aUneCarriere(perso)
                && calculeAge(perso) >= 14
                && compatibiliteCarriere(perso, metiersObjs[metiersEnum.journaliste]) >= 0,
        },
        {
            id: "evts_journaliste2",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const resultatTestMetier:ResultatTest = testMetier(perso, {metier: metiersEnum.journaliste, bonusMalus: 20});
                texte += resultatTestMetier.resume;
                if (resultatTestMetier.reussi) {
                    texte += `Vous êtes un journaliste efficace et respecté. `;
                } else {
                    texte += `Vous avez beaucoup de mal à accomplir votre métier de journaliste. `;
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, metiersEnum.journaliste),
        },
    ],
    probaParDefaut: 5,
};