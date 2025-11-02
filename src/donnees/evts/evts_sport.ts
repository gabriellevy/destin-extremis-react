import {GroupeEvts} from "../../types/Evt";
import {Perso} from "../../types/perso/Perso";
import {ResultatTest} from "../../types/LancerDe";
import {testComp} from "../../fonctions/des";
import {TypeCompetence} from "../../types/perso/comps/Comps";
import {modifierReputationDansQuartier} from "../../fonctions/perso/Reputation";
import {getValeurVertu, Vertu} from "../../types/ViceVertu";


export const evts_sports: GroupeEvts = {
    evts: [
        {
            id: "evts_sports1 évacue tension",
            description: async (perso: Perso): Promise<string> => {
                let texte: string = "Vous n'êtes pas le genre à vous goinfrer de fastfood et de pornographie. "
                + "Vous prenez soin de vous et vous faites du sport régulièrement. "
                + "Hui c'est du cardio brutal, ça vous aide à relâcher la pression. <br/>";

                const resTestF:ResultatTest = testComp(perso,TypeCompetence.force, 0);
                const resTestM:ResultatTest = testComp(perso, TypeCompetence.mouvement, 0);
                const resTestEnd:ResultatTest = testComp(perso, TypeCompetence.endurance, 0);
                const resTestRefl:ResultatTest = testComp(perso, TypeCompetence.reflexes, 0);
                texte += resTestF.resume;
                texte += resTestM.resume;
                texte += resTestEnd.resume;
                texte += resTestRefl.resume;
                if (resTestF.reussi && resTestM.reussi && resTestEnd.reussi && resTestRefl.reussi) {
                    texte += `Vous êtes exceptionnellement doué. À la fois fort, rapide et endurant. Vous commencez à faire de la compétition en athlétisme. `;
                    modifierReputationDansQuartier(perso, undefined, 3, 5);
                }
                return texte;
            },
            repetable: false,
            conditions: (perso: Perso): boolean =>
                getValeurVertu(perso, Vertu.chaste) >= 1 && getValeurVertu(perso, Vertu.sobre) <= 1,
        },
    ],
    probaParDefaut: 3,
};