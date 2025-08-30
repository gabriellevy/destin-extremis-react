import {Perso} from "../../../types/perso/Perso";
import {metiersEnum} from "../../metiers";
import {GroupeEvts} from "../../../types/Evt";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testMetier} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {calculeAge} from "../../../types/Date";
import {aUneCarriere, commencerCarriere, travailleEnCeMomentComme} from "../../../fonctions/metiers/metiersUtils";

export const evts_serveur: GroupeEvts = {
    evts: [
        {
            id: "evts_serveur1",
            description: async (perso: Perso): Promise<string> => {
                const taverne: string = "la taverne rouge";
                let texte: string = `Vous hésitez à devenir serveur et décider de postuler à ${taverne} de Klara Kellner. `
                const resTestDex:ResultatTest = testComp(perso, {comp: TypeCompetence.dexterite, bonusMalus: 40});
                const resTestSoc:ResultatTest = testComp(perso, {comp: TypeCompetence.charme, bonusMalus: 40});
                texte += resTestDex.resume;
                texte += resTestSoc.resume;
                if (!resTestDex.reussi) {
                    texte += `Malheureusement vous êtes excessivement maladroit et la patronne vous recale gentiment. `;
                }
                else if (!resTestSoc.reussi) {
                    texte += `Malheureusement votre manque de tact et votre physique peu facile rebute la patronne qui vous conseille de vous lancer dans autre chose. `;
                }
                else {
                    commencerCarriere(perso, metiersEnum.serveur, taverne);
                    texte += `La patronne n'est pas très exigeante à l'embauche mais il va falloir lui prouver votre motivation. `;
                }
                return texte;
            },
            image: "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Klara_Kellner.webp",
            conditions: (perso: Perso): boolean =>
                !aUneCarriere(perso)
                && calculeAge(perso) >= 14, // TODO : tester que dans une ville ?
        },
        {
            id: "evts_serveur2",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "";
                const resTestMetier:ResultatTest = testMetier(perso, {metier: metiersEnum.serveur, bonusMalus: 20});
                texte += resTestMetier.resume;
                if (resTestMetier.reussi) {
                    texte += `Vous êtes un serveur efficace et apprécié. `;
                } else {
                    texte += `Vous avez beaucoup de mal à tenir le rythme épuisant de votre métier de serveur. `;
                }
                return texte;
            },
            image: "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Klara_Kellner.webp",
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, metiersEnum.serveur),
        },
    ],
    probaParDefaut: 5,
};