import {NiveauIA, Perso, PersoHisto} from "../../../types/perso/Perso";
import {MetiersEnum, metiersObjs} from "../../metiers";
import {GroupeEvts} from "../../../types/Evt";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testMetier} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {getAge} from "../../../types/Date";
import {
    arreterCarriere, aUneActiviteATempsPlein,
    commencerCarriere,
    compatibiliteCarriere,
    travailleEnCeMomentComme
} from "../../../fonctions/metiers/metiersUtils";
import {appelLeChatParaphrase} from "../../../fonctions/le_chat";

export const evts_serveur: GroupeEvts = {
    evts: [
        {
            id: "evts_serveur1",
            description: async (perso: Perso): Promise<string> => {
                const taverne: string = "la taverne rouge";
                let texte: string = `Vous hésitez à devenir serveur et décider de postuler à ${taverne} de Klara Kellner. `
                const resTestDex:ResultatTest = testComp(perso, TypeCompetence.adresse, 40);
                const resTestSoc:ResultatTest = testComp(perso, TypeCompetence.charme, 40);
                texte += resTestDex.resume;
                texte += resTestSoc.resume;
                if (!resTestDex.reussi) {
                    texte += `Malheureusement vous êtes excessivement maladroit et la patronne vous recale gentiment. `;
                }
                else if (!resTestSoc.reussi) {
                    texte += `Malheureusement votre manque de tact et votre physique peu facile rebute la patronne qui vous conseille de vous lancer dans autre chose. `;
                }
                else {
                    texte += commencerCarriere(perso, MetiersEnum.serveur, taverne, false);
                    texte += `La patronne n'est pas très exigeante à l'embauche mais il va falloir lui prouver votre motivation. `;
                }
                return texte;
            },
            image: (_perso:PersoHisto) => "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Klara_Kellner.webp",
            conditions: (perso: Perso): boolean =>
                !aUneActiviteATempsPlein(perso)
                && compatibiliteCarriere(perso, metiersObjs[MetiersEnum.serveur]) >= 0
                && getAge(perso) >= 14, // TODO : tester que dans une ville ?
        },
        {
            id: "evts_serveur2",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                let texteTests: string = "";
                const resTestMetier:ResultatTest = testMetier(perso, MetiersEnum.serveur, 20);
                texteTests += resTestMetier.resume;
                if (resTestMetier.reussi) {
                    texte += `Vous êtes un serveur efficace et apprécié. `;
                } else {
                    if (resTestMetier.critical) {
                        texte += `Vous enchainez gaffe sur gaffe et finissez par être viré de la taverne. `;
                        texte += arreterCarriere(perso, MetiersEnum.serveur, true);
                    } else {
                        texte += `Vous avez beaucoup de mal à tenir le rythme épuisant de votre métier de serveur. `;
                    }
                }
                if (perso.niveauIA === NiveauIA.systematique) {
                    texte = await appelLeChatParaphrase(texte);
                }
                return texte + "<br/>" + texteTests;
            },
            image: (_perso:PersoHisto) => "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Klara_Kellner.webp",
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, MetiersEnum.serveur),
            nbJoursEntreOccurences: 30,
        },
    ],
    probaParDefaut: 0.005,
};