import {Perso} from "../../../types/perso/Perso";
import {MetiersEnum, metiersObjs} from "../../metiers";
import {GroupeEvts} from "../../../types/Evt";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testMetier} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {anneesToJours, getAge} from "../../../types/Date";
import {
    arreterCarriere,
    aUneCarriere,
    commencerCarriere,
    compatibiliteCarriere
} from "../../../fonctions/metiers/metiersUtils";


const passageDiplomePlombier: (perso: Perso) => Promise<string> = (perso: Perso) => {
    let texte: string =  "Vous êtes étudiant en plomberie depuis deux années. Hui vous passez votre diplôme. ";
    const resTestMetier:ResultatTest = testMetier(perso, {metier: MetiersEnum.plombier, bonusMalus: 40});
    texte += resTestMetier.resume;
    if (resTestMetier.reussi) {
        texte +=  "C'est une réussite, vous êtes maintenant un plombier.<br/>";
        texte += commencerCarriere(perso, MetiersEnum.plombier, '', false);
    } else {
        texte += "Malheureusement vous échouez lamentablemnt. <br/>"

        const resTestVol:ResultatTest = testComp(perso,TypeCompetence.volonte, 0);
        texte += resTestVol.resume;
        if (resTestVol.reussi) {
            texte += "Vous ne vous laissez pas démonter et décidez de redoubler pour le passer l'an prochain. <br/>"
            perso.evtsProgrammes.push({
                date: (persoFutur:Perso) => perso.date + anneesToJours(1) === persoFutur.date,
                evt: {
                    id: "passageDiplomePlombier",
                    description: passageDiplomePlombier,
                }
            });
        } else {
            texte += "Vous abandonnez, vous trouverez autre chose. <br/>";
            arreterCarriere(perso, MetiersEnum.plombier, false);
        }
    }
    return new Promise((resolve) => resolve(texte))
}

export const evts_plombier: GroupeEvts = {
    evts: [
        {
            id: "evts_plombier1 postule études",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous avez décidé d'étudier pour devenir plombier. `
                const resTestA:ResultatTest = testComp(perso,TypeCompetence.adresse, 40);
                const resTestI:ResultatTest = testComp(perso, TypeCompetence.intelligence, 40);
                texte += resTestA.resume;
                texte += resTestI.resume;
                if (!resTestA.reussi) {
                    texte += `Malheureusement vous êtes si maladroit qu'on ne vous juge pas capable d'être un plombier fiable. `;
                } else if (!resTestI.reussi) {
                    texte += `Malheureusement votre grand manque de mémoire et de méthode font que vous êtes refusé à l'examen d'entrée. `;
                } else {
                    texte += `Les études vont durer 2 ans. `;
                    texte += commencerCarriere(perso, MetiersEnum.plombier, '', true);
                    perso.evtsProgrammes.push({
                        date: (persoFutur:Perso) => perso.date + anneesToJours(2) === persoFutur.date,
                        evt: {
                            id: "passageDiplomePlombier",
                            description: passageDiplomePlombier,
                        }
                    });
                }
                return texte;
            },
            nbJoursEntreOccurences: 100,
            conditions: (perso: Perso): boolean =>
                !aUneCarriere(perso)
                && compatibiliteCarriere(perso, metiersObjs[MetiersEnum.plombier]) >= 1
                && getAge(perso) >= 16,
        },
    ],
    probaParDefaut: 0.005,
};