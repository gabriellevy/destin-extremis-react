import {Perso} from "../../../types/perso/Perso";
import {GroupeEvts} from "../../../types/Evt";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testMetier} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {getAge} from "../../../types/Date";
import {
    arreterCarriere, aUneActiviteATempsPlein,
    aUneCarriere,
    commencerCarriere,
    compatibiliteCarriere,
    getCompetenceMetier,
    travailleEnCeMomentComme
} from "../../../fonctions/metiers/metiersUtils";
import {metiersEnum, metiersObjs} from "../../metiers";
import {journalAleatoire} from "../../carriere/journaliste/journal";
import {modifierStatut} from "../../../fonctions/perso/statut";

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
                    texte += commencerCarriere(perso, metiersEnum.journaliste, titreJournal);
                    texte += "Votre talent à dénicher les bonnes histoires et à la raconter convainquent le rédacteur en chef du "
                        + titreJournal +  " de vous engager. ";
                } else {
                    texte += "Malheureusement le rédacteur en chef du " + titreJournal + " ne vous juge pas apte à ce travail. ";
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                !aUneActiviteATempsPlein(perso)
                && getAge(perso) >= 14
                && compatibiliteCarriere(perso, metiersObjs[metiersEnum.journaliste]) >= 0,
            repetable: true,
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
                    if (resultatTestMetier.critical) {
                        texte += arreterCarriere(perso, metiersEnum.journaliste, true);
                    }
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, metiersEnum.journaliste),
            repetable: true,
        },
        {
            id: "evts_journaliste contrat livre",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "Vous êtes si célèbre qu'un éditeur vous propose un contrat et une forte avance pour votre prochain livre. <br/>";
                modifierStatut(perso, 1);
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                ((travailleEnCeMomentComme(perso, metiersEnum.journaliste) && getCompetenceMetier(perso, metiersEnum.journaliste) > 40)
                || (travailleEnCeMomentComme(perso, metiersEnum.ecrivain) && getCompetenceMetier(perso, metiersEnum.ecrivain) > 40))
                && perso.reputation.amplitude > 10,
        },
    ],
    probaParDefaut: 5,
};