import {Perso, PersoHisto} from "../../../types/perso/Perso";
import {GroupeEvts} from "../../../types/Evt";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testMetier} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {getAge, anneesToJours} from "../../../types/Date";
import {
    aUneActiviteATempsPlein,
    commencerCarriere,
    compatibiliteCarriere, SEUIL_COMPATIBILITE_METIER,
    travailleEnCeMomentComme
} from "../../../fonctions/metiers/metiersUtils";
import {MetiersEnum, metiersObjs} from "../../metiers";

const passageDiplomeMedecin: (perso: Perso) => Promise<string> = (perso: Perso) => {
    let texte: string =  "Vous êtes étudiant en médecine depuis des années. ";
    const resTestMetier:ResultatTest = testMetier(perso, MetiersEnum.apprenti_chirurgien, 20);
    texte += resTestMetier.resume;
    if (resTestMetier.reussi) {
        texte +=  "Il est temps de passer votre diplôme. Vous allez pouvoir devenir un médecin à part entière.";
        texte += commencerCarriere(perso, MetiersEnum.medecin, '', false);
    } else {
        texte += "Malheureusement vous échouez. Vous avez encore beaucoup à apprendre avant de pouvoir travailler seul. ";
        perso.evtsProgrammes.push({
            date: (persoFutur:Perso) => perso.date + anneesToJours(1) === persoFutur.date,
            evt: {
                id: "passageDiplomeMedecin",
                description: passageDiplomeMedecin,
            }
        });
    }
    return new Promise((resolve) => resolve(texte))
}

export const evts_medecin: GroupeEvts = {
    evts: [
        {
            id: "evts_médecin1",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous voudriez devenir médecin. `
                const resTestInt:ResultatTest = testComp(perso, TypeCompetence.intelligence, 20);
                const resTestFm:ResultatTest = testComp(perso,TypeCompetence.volonte, 20);
                const resTestDex:ResultatTest = testComp(perso, TypeCompetence.adresse, 20);
                texte += resTestInt.resume;
                texte += resTestFm.resume;
                texte += resTestDex.resume;
                if (!resTestInt.reussi) {
                    texte += `C'est dur à avaler mais on vous fait rapidement comprendre que vous n'êtes pas assez intelligent pour faire un bon médecin. `;
                } else if (!resTestFm.reussi) {
                    texte += `Malheureusement vous vous rendez vite compte après avoir observé le médecin au travail pendant une journée complète, que vous n'avez pas l'estomac assez solide pour ce travail. `;
                } else if (!resTestDex.reussi) {
                    texte += `Malheureusement après quelques tests le barbier est sans appel : vous n'êtes pas assez habile de vos mains pour apprendre à manier le rasoir sans blesser le client. `;
                } else {
                    texte += `C'est formidable : le médecin vous juge apte à devenir son apprenti ! "
                    + "L'apprentissage est long et difficile  et durera des années mais cela en vaut la chandelle. `;
                    texte += commencerCarriere(perso, MetiersEnum.apprenti_chirurgien, '', true);
                    perso.evtsProgrammes.push({
                        date: (persoFutur:Perso) => perso.date + anneesToJours(5) === persoFutur.date,
                        evt: {
                            id: "passageDiplomeMedecin",
                            description: passageDiplomeMedecin,
                        }
                    });
                }
                return texte;
            },
            image: (_perso:PersoHisto) => "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Martha_Scheren.webp",
            conditions: (perso: Perso): boolean =>
                !aUneActiviteATempsPlein(perso)
                && compatibiliteCarriere(perso, metiersObjs[MetiersEnum.apprenti_chirurgien]) >= SEUIL_COMPATIBILITE_METIER
                && getAge(perso) >= 14,
        },
        {
            id: "evts_médecin2",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const resTestMetier:ResultatTest = testMetier(perso, MetiersEnum.medecin, 0);
                texte += resTestMetier.resume;
                if (resTestMetier.reussi) {
                    texte += `Vous êtes un médecin efficace et respecté. `;
                } else {
                    texte += `Vous avez beaucoup de mal à être un bon médecin. `;
                }
                return texte;
            },
            image: (_perso:PersoHisto) => "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Martha_Scheren.webp",
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, MetiersEnum.chirurgien),
            nbJoursEntreOccurences: 30,
        },
    ],
    probaParDefaut: 0.005,
};