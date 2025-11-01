import {GroupeEvts} from "../../../types/Evt";
import {Perso, Sexe} from "../../../types/perso/Perso";
import {Quartier} from "../../geographie/quartiers";
import {modifierReputationDansQuartier} from "../../../fonctions/perso/Reputation";
import {getPatronyme} from "../../../fonctions/noms";
import {Coterie} from "../../../types/Coterie";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {Maitrise} from "../../maitrise";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp} from "../../../fonctions/des";
import {ajouterViceVal, getValeurVice, Vice} from "../../../types/ViceVertu";
import {aLaMaitrise} from "../../../fonctions/perso/maitrise";
import {getValeurCompetence} from "../../../fonctions/perso/competences";

export const evts_chatenay_malabry: GroupeEvts = {
    evts: [
        {
            id: "evts_chatenay_malabry1 banquet celte",
            description: async (perso: Perso): Promise<string> => {
                let majReputation: number = 0;
                let texte:string = "Vous êtes invité à un grand banquet celte. "
                    + "Le chef de clan " + getPatronyme(Coterie.celtes, Sexe.male) + " a fait les choses en grand. Du vin de la viande, du miel, tout est excellent. <br/>";
                if (perso.coterie === Coterie.celtes) {
                    majReputation += 1;
                    texte += "En tant que celte vous êtes bien accueilli et vite à l'aise. <br/>";
                }
                if (getValeurCompetence(perso, TypeCompetence.armeCaC) >= 50) {
                    majReputation += 1;
                    texte += "Votre réputation de bon combattant vous donne droit de diner à la table des guerriers. <br/>";
                }
                if (aLaMaitrise(perso, Maitrise.poesie)) {
                    texte += "Votre talent de poète intéresse l'assemblée. On vous demande d'interpréter un de vos poèmes. ";
                    const resTestDiscours:ResultatTest = testComp(perso, TypeCompetence.eloquence, 0);
                    texte += resTestDiscours.resume;
                    if (resTestDiscours.reussi) {
                        texte += "Votre interprétation impressionne le roi et tous les convives. Nul doute que votre réputation va augmenter. <br/>";
                        majReputation += 3;
                    } else {
                        if (resTestDiscours.critical) {
                            texte += "Peut-être est-ce le vin pur, peut-être est-ce le trac, mais vous faites erreurs sur erreur et faute de goût sur faute de goût. Vous interrompez votre récital sous les huées. <br/>";
                            majReputation -= 2;
                        } else {
                            texte += "Mais votre interprétation est peu applaudie. <br/>";
                        }
                    }
                }
                // gloutonnerie
                if (getValeurVice(perso, Vice.gourmand) < 2) {
                    if (Math.random() >= 0.9) {
                        texte += ajouterViceVal(perso, Vice.gourmand, 1);
                    }
                }

                modifierReputationDansQuartier(perso, Quartier.chatenay_malabry, majReputation, majReputation);
                return texte;
            },
            conditions: (perso: Perso): boolean => perso.lieu.quartier === Quartier.chatenay_malabry,
        },
    ],
    probaParDefaut: 10, // > à la moyenne car localisés à un quartier
};