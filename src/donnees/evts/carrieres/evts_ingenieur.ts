import {Perso} from "../../../types/perso/Perso";
import {metiersEnum} from "../../metiers";
import {GroupeEvts} from "../../../types/Evt";
import {MetalStatut} from "../../../types/statut_social/Statut";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testMetier} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {anneesToJours} from "../../../types/Date";
import {aUneCarriere, commencerCarriere, suitUneCarriereDe} from "../../../types/metiers/metiersUtils";
import {appartientALaGuilde, rejointGuilde} from "../../../types/metiers/Guilde";
import {compareStatut} from "../../../fonctions/perso/statut";

const passageDiplome: (perso: Perso) => Promise<string> = (perso: Perso) => {
    let texte: string =  "C'est le jour du passage de diplôme ! ";
    const resTestInge:ResultatTest = testMetier(perso, {metier: metiersEnum.etudiant_ingenieur, bonusMalus: 20});
    texte += resTestInge.resume;
    if (resTestInge.reussi) {
        texte +=  "Au soir vous avez déjà confirmation que vous avez réussi. Vous êtes maintenant un ingénieur à part entière.";
        commencerCarriere(perso, metiersEnum.ingenieur, '');
    } else {
        texte += "Malheureusement c'est un échec pour vous. Vous êtes recalé... Vous avez néanmoins encore une chance de le passer l'an prochain. ";
        perso.evtsProgrammes.set(perso.date + anneesToJours(1), passageDiplome);
    }
    return new Promise((resolve) => resolve(texte))
}

export const evts_ingenieur: GroupeEvts = {
    evts: [
        {
            id: "evts_ingenieur1",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous avez la ferme intention de devenir apprenti ingénieur, mais les tests d'entrée sont difficiles. `
                const resTestInt:ResultatTest = testComp(perso, {comp: TypeCompetence.intelligence, bonusMalus: 20});
                const resTestDex:ResultatTest = testComp(perso, {comp: TypeCompetence.dexterite, bonusMalus: 20});
                texte += resTestInt.resume;
                texte += resTestDex.resume;
                if (resTestInt.reussi && resTestDex.reussi) {
                    commencerCarriere(perso, metiersEnum.etudiant_ingenieur, '');
                    texte += `Vous êtes reçu à l'école d'ingéniérie ! Maintenant il va falloir travailler dur pour réussir le diplôme dans 5 ans. `;
                    // ajout du futur passage de diplôme :
                    perso.evtsProgrammes.set(perso.date + anneesToJours(5), passageDiplome);
                } else {
                    texte += `Malheureusement vous n'avez pas été retenu. Peut-être une autre fois ? `;
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                !aUneCarriere(perso)
                && !compareStatut(perso.statut, {metalStatut: MetalStatut.argent, rang: 3}),
            proba: 5,
        },
        {
            id: "evts_ingenieur2",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const resTestInt:ResultatTest = testComp(perso, {comp: TypeCompetence.intelligence, bonusMalus: 40});
                const resTestDex:ResultatTest = testComp(perso, {comp: TypeCompetence.dexterite, bonusMalus: 40});
                texte += resTestInt.resume;
                texte += resTestDex.resume;
                if (resTestInt.reussi && resTestDex.reussi) {
                    texte += `Vous travaillez dur et progressez rapidement. Vous serez bientôt un ingénieur de talent, c'est sûr. `;
                } else {
                    texte += `Vos notes sont basses, vous avez le sentiment de ne pas progresser, mais refusez d'abandonner. `;
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                suitUneCarriereDe(perso, metiersEnum.etudiant_ingenieur),
            proba: 1,
        },
        {
            id: "evts_ingenieur3_entre_a_la_guilde",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "Vous aimeriez bien rejoindre la guilde des ingénieurs.";
                const resTestInge:ResultatTest = testMetier(perso, {metier: metiersEnum.etudiant_ingenieur, bonusMalus: 0});
                texte += resTestInge.resume;
                if (resTestInge.reussi) {
                    rejointGuilde(perso, metiersEnum.ingenieur);

                    texte += `Vous devenez membre à part entière de la guilde. `;
                } else {
                    texte += `Vous êtes jugé trop peu expérimenté pour rejoindre la guilde. Mais cela viendra bientôt. `;
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                suitUneCarriereDe(perso, metiersEnum.ingenieur)
            && !appartientALaGuilde(perso, metiersEnum.ingenieur),
            proba: 5,
        },
    ],
    probaParDefaut: 10,
};