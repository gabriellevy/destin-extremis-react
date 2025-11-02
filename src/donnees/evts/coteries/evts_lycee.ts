import {GroupeEvts} from "../../../types/Evt";
import {Perso, Sexe} from "../../../types/perso/Perso";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testVertu} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {modifierReputationDansQuartier} from "../../../fonctions/perso/Reputation";
import {Vertu} from "../../../types/ViceVertu";
import {Coterie} from "../../../types/Coterie";
import {getPrenom} from "../../../fonctions/noms";
import {modifierStatut} from "../../../fonctions/perso/statut";
import {PhaseLycee} from "../../../types/lycee/StadeUniversite";

export const evts_lycee: GroupeEvts = {
    evts: [
        {
            id: "evts_lycee1_agression",
            description: async (perso: Perso): Promise<string> => {
                const brute:string = getPrenom(Coterie.orks, Sexe.male);
                let texte:string = brute + ", une brute de votre lycée, prend votre placidité pour de la faiblesse. Il vous menace pour vous soutirer votre argent. ";

                const resPlacide:ResultatTest = testVertu(perso, Vertu.placide, 0);
                texte += resPlacide.resume;
                if (resPlacide.reussi) {
                    texte += "Et il a raison : vous vous laissez dépouiller sans rien faire et vous lui souhaitez une bonne journée. ";
                    texte += modifierStatut(perso, -1);
                    perso.bonheur -= 0.1;
                    texte += modifierReputationDansQuartier(perso, undefined, -4, 0);
                } else {
                    texte += "Mais il a tort : vous ne vous laissez pas faire. ";
                    const resTest:ResultatTest = testComp(perso, TypeCompetence.intimidation, -10);
                    texte += resTest.resume;
                    if (resTest.reussi) {
                        texte += "Voyant votre réaction il abandonne vite en essayant de ne pas perdre la face. <br/>";
                    } else {
                        texte += "Cela dégénère en bagarre. ";
                        const resTestBag:ResultatTest = testComp(perso, TypeCompetence.bagarre, 0);
                        texte += resTestBag.resume;
                        if (resTestBag.reussi) {
                            texte += "Vous le jetez au sol sous les moqueries de vos camarades. Il n'est pas prêt de recommencer ! ";
                            texte += modifierReputationDansQuartier(perso, undefined, 5, 3);
                        } else {
                            texte += "Il jette au sol, vous donne des coups de pieds, et finalement vous prend votre argent ! ";
                            texte += modifierReputationDansQuartier(perso, undefined, -3, 1);
                            texte += modifierStatut(perso, -1);
                        }
                    }
                }

                return texte;
            },
            conditions: (perso: Perso): boolean => perso.bilanLycee.phaseActuelle !== PhaseLycee.finie,
        },
    ],
    probaParDefaut: 0.05, // >>> à la moyenne car localisés à un quartier et une phase
};