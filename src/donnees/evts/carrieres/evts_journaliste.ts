import {Perso, Sexe} from "../../../types/perso/Perso";
import {GroupeEvts} from "../../../types/Evt";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testMetier} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {anneesToJours, getAge} from "../../../types/Date";
import {
    arreterCarriere,
    aUneActiviteATempsPlein,
    commencerCarriere,
    compatibiliteCarriere,
    getCompetenceMetier, SEUIL_COMPATIBILITE_METIER,
    travailleEnCeMomentComme
} from "../../../fonctions/metiers/metiersUtils";
import {MetiersEnum, metiersObjs} from "../../metiers";
import {journalAleatoire} from "../../carriere/journaliste/journal";
import {modifierStatut} from "../../../fonctions/perso/statut";
import {getNom} from "../../../fonctions/noms";
import {Coterie} from "../../../types/Coterie";
import {ajouterMaitrise, aLaMaitrise} from "../../../fonctions/perso/maitrise";
import {Maitrise} from "../../maitrise";

const passageDiplomeJournaliste: (perso: Perso) => Promise<string> = (perso: Perso) => {
    let texte: string =  "Vous passez vos examens de fin d'études de journalisme. ";
    const resTestJourn:ResultatTest = testMetier(perso, MetiersEnum.journaliste, 20);
    texte += resTestJourn.resume;
    if (resTestJourn.reussi) {
        texte += "C'est une réussite : vous êtes maintenant journaliste à part entière. ";
        arreterCarriere(perso, MetiersEnum.journaliste, false);
        texte += ajouterMaitrise(perso, Maitrise.diplome_journalisme);
    } else {
        texte += "Vous avez échoué. <br/>";
        const resTestVol:ResultatTest = testComp(perso,TypeCompetence.volonte, 0);
        texte += resTestVol.resume;
        if (resTestVol.reussi) {
            texte += "Vous ne vous laissez pas démonter et décidez de redoubler pour le passer l'an prochain. <br/>"
            perso.evtsProgrammes.push({
                date: (persoFutur:Perso) => perso.date + anneesToJours(1) === persoFutur.date,
                evt: {
                    id: "passageDiplomeJournaliste",
                    description: passageDiplomeJournaliste,
                }
            });
        } else {
            texte += "Vous abandonnez, vous trouverez autre chose. <br/>";
            arreterCarriere(perso, MetiersEnum.journaliste, false);
        }
    }
    return new Promise((resolve) => resolve(texte))
}

const passageAssistantJournaliste: (perso: Perso) => Promise<string> = (perso: Perso) => {
    let texte: string =  "";
    const nomJournaliste: string = getNom(Coterie.lumieres, Sexe.femelle);
    const resTestJourn:ResultatTest = testMetier(perso, MetiersEnum.journaliste, 20);
    texte += resTestJourn.resume;
    if (resTestJourn.reussi) {
        texte += "Pour finir vos études on vous affecte comme assistant de " + nomJournaliste + ", un célèbre journaliste chevronné pendant un an.<br/> ";
        perso.evtsProgrammes.push({
            date: (persoFutur:Perso) => perso.date + anneesToJours(1) === persoFutur.date,
            evt: {
                id: "passageDiplomeJournaliste",
                description: passageDiplomeJournaliste,
            }
        });
    } else {
        texte += "Vous n'êtes pas jugé prêt à commencer la dernière phase de vos études de journaliste : devenir assistant d'un grand journaliste.<br/> ";
        const resTestVol:ResultatTest = testComp(perso,TypeCompetence.volonte, 0);
        texte += resTestVol.resume;
        if (resTestVol.reussi) {
            texte += "Vous ne vous laissez pas démonter et décidez de redoubler pour le passer l'an prochain. <br/>"
            perso.evtsProgrammes.push({
                date: (persoFutur:Perso) => perso.date + anneesToJours(1) === persoFutur.date,
                evt: {
                    id: "passageAssistantJournaliste",
                    description: passageAssistantJournaliste,
                }
            });
        } else {
            texte += "Vous abandonnez, vous trouverez autre chose. <br/>";
            arreterCarriere(perso, MetiersEnum.journaliste, false);
        }
    }
    return new Promise((resolve) => resolve(texte))
}

export const evts_journaliste: GroupeEvts = {
    evts: [
        {
            id: "evts_journaliste1 devenir",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                    if (aLaMaitrise(perso, Maitrise.diplome_journalisme)) {
                        const titreJournal: string = journalAleatoire();
                        texte += "Vous postulez pour un poste de journaliste au " + titreJournal + ". <br/>";
                        const resTestJourn:ResultatTest = testMetier(perso, MetiersEnum.journaliste, 20);
                        texte += resTestJourn.resume;
                        if (resTestJourn.reussi) {
                            texte += commencerCarriere(perso, MetiersEnum.journaliste, titreJournal, false);
                            texte += "Vous êtes engagé par le rédacteur en chef du "
                                + titreJournal +  ". ";
                        } else {
                            texte += "Malheureusement le rédacteur en chef du " + titreJournal + " ne vous juge pas apte à ce poste. ";
                        }
                    } else {
                        texte += `Vous hésitez à devenir journaliste mais vous n'avez ni expérience ni diplôme de journaliste. `;
                        const resTestRagot:ResultatTest = testComp(perso, TypeCompetence.ragot, -10);
                        const resTestInt:ResultatTest = testComp(perso, TypeCompetence.intuition, -10);
                        texte += resTestRagot.resume;
                        texte += resTestInt.resume;
                        const titreJournal: string = journalAleatoire();
                        if (resTestRagot.reussi && resTestInt.reussi) {
                            texte += commencerCarriere(perso, MetiersEnum.journaliste, titreJournal, false);
                            texte += "Votre exceptionnel talent à dénicher les bonnes histoires et à les raconter convainquent le rédacteur en chef du "
                                + titreJournal +  " de vous engager. ";
                        } else {
                            texte += "Malheureusement le rédacteur en chef du " + titreJournal + " ne vous juge pas apte à ce travail. ";
                        }
                    }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                !aUneActiviteATempsPlein(perso)
                && getAge(perso) >= 20
                && compatibiliteCarriere(perso, metiersObjs[MetiersEnum.journaliste]) >= SEUIL_COMPATIBILITE_METIER,
            nbJoursEntreOccurences: 100,
        },
        {
            id: "evts_journaliste2",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const resultatTestMetier:ResultatTest = testMetier(perso, MetiersEnum.journaliste, 20);
                texte += resultatTestMetier.resume;
                if (resultatTestMetier.reussi) {
                    texte += `Vous êtes un journaliste efficace et respecté. `;
                } else {
                    texte += `Vous avez beaucoup de mal à accomplir votre métier de journaliste. `;
                    if (resultatTestMetier.critical) {
                        texte += arreterCarriere(perso, MetiersEnum.journaliste, true);
                    }
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, MetiersEnum.journaliste),
            nbJoursEntreOccurences: 30,
        },
        {
            id: "evts_journaliste3 contrat livre",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "Vous êtes si célèbre qu'un éditeur vous propose un contrat et une forte avance pour votre prochain livre. <br/>";
                modifierStatut(perso, 1);
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                ((travailleEnCeMomentComme(perso, MetiersEnum.journaliste) && getCompetenceMetier(perso, MetiersEnum.journaliste) > 40)
                || (travailleEnCeMomentComme(perso, MetiersEnum.ecrivain) && getCompetenceMetier(perso, MetiersEnum.ecrivain) > 40))
                && perso.reputation.amplitude > 10,
            nbJoursEntreOccurences: 100,
        },
        {
            id: "evts_journaliste4 commencer études de journalisme",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = `Vous décidez de commencer des études de journalisme. `
                const resTestRagot:ResultatTest = testComp(perso, TypeCompetence.ragot, 40);
                const resTestInt:ResultatTest = testComp(perso, TypeCompetence.intuition, 40);
                const resTestIntel:ResultatTest = testComp(perso, TypeCompetence.intelligence, 40);
                texte += resTestRagot.resume;
                texte += resTestInt.resume;
                texte += resTestIntel.resume;
                if (resTestRagot.reussi && resTestInt.reussi && resTestIntel.reussi) {
                    texte += commencerCarriere(perso, MetiersEnum.journaliste, "", true);
                    texte += "Vous réussissez les tests d'entrée. ";
                    // ajout du futur passage de diplôme :
                    perso.evtsProgrammes.push({
                        date: (persoFutur:Perso) => perso.date + anneesToJours(5) === persoFutur.date,
                        evt: {
                            id: "passageAssistantJournaliste",
                            description: passageAssistantJournaliste,
                        }
                    });
                } else {
                    texte += "Mais vous ratez les examens d'entrée. ";
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                !aUneActiviteATempsPlein(perso)
                && getAge(perso) >= 14
                && compatibiliteCarriere(perso, metiersObjs[MetiersEnum.journaliste]) >= 2,
            nbJoursEntreOccurences: 50,
        },
    ],
    probaParDefaut: 0.005,
};