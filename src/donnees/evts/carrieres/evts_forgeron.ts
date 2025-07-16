import {Perso} from "../../../types/perso/Perso";
import {metiersEnum} from "../../../types/metiers/metiers";
import {GroupeEvts} from "../../../types/Evt";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testMetier} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {calculeAge, anneesToJours} from "../../../types/Date";
import {aUneCarriere, commencerCarriere, travailleEnCeMomentComme} from "../../../types/metiers/metiersUtils";

const passageDiplomeForgeron: (perso: Perso) => string = (perso: Perso) => {
    let texte: string =  "Vous êtes apprenti forgeron depuis longtemps. ";
    const resTestMetier:ResultatTest = testMetier(perso, {metier: metiersEnum.apprenti_Forgeron, bonusMalus: 0});
    texte += resTestMetier.resume;
    if (resTestMetier.reussi) {
        texte +=  "Votre maître vous juge prêt. Vous allez pouvoir devenir forgeron à part entière.";
        commencerCarriere(perso, metiersEnum.brasseur, '');
    } else {
        texte += "Malheureusement d'après votre maître vous avez encore beaucoup à apprendre avant de pouvoir travailler seul. ";
        perso.evtsProgrammes.set(perso.date + anneesToJours(1), passageDiplomeForgeron);
    }
    return texte;
}

export const evts_forgeron: GroupeEvts = {
    evts: [
        {
            id: "evts_forgeron1",
            description: (perso: Perso): string => {
                let texte: string = `Vous voudriez devenir apprenti forgeron. `
                const resTestFor:ResultatTest = testComp(perso, {comp: TypeCompetence.force, bonusMalus: 20});
                const resTestDex:ResultatTest = testComp(perso, {comp: TypeCompetence.endurance, bonusMalus: 20});
                texte += resTestFor.resume;
                texte += resTestDex.resume;
                if (resTestFor.reussi && resTestDex.reussi) {
                    commencerCarriere(perso, metiersEnum.apprenti_Forgeron, '');
                    texte += `Votre force et votre dextérité impressionnent le forgeron qui vous engage comme apprenti à l'essai. `;// ajout du futur passage de diplôme :
                    perso.evtsProgrammes.set(perso.date + anneesToJours(3), passageDiplomeForgeron);
                } else {
                    texte += `Malheureusement votre dextérité et votre force n'impressionnent guère le forgeron. Il vous estime incapable de manier le marteau. `;
                }
                return texte;
            },
            image: "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Hugo_Schmidt.webp",
            conditions: (perso: Perso): boolean =>
                !aUneCarriere(perso)
                && calculeAge(perso) >= 14,
        },
        {
            id: "evts_forgeron2",
            description: (perso: Perso): string => {
                let texte: string = "";
                const resTestFor:ResultatTest = testComp(perso, {comp: TypeCompetence.force, bonusMalus: 20});
                const resTestDex:ResultatTest = testComp(perso, {comp: TypeCompetence.endurance, bonusMalus: 20});
                const resTestMetier:ResultatTest = testMetier(perso, {metier: metiersEnum.forgeron, bonusMalus: 0});
                texte += resTestMetier.resume;
                texte += resTestFor.resume;
                texte += resTestDex.resume;
                if (resTestFor.reussi && resTestDex.reussi && resTestMetier.reussi) {
                    texte += `Vous êtes un forgeron efficace et respecté. `;
                } else {
                    texte += `Vous avez beaucoup de mal à tenir le rythme épuisant de votre métier de forgeron. `;
                }
                return texte;
            },
            image: "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Hugo_Schmidt.webp",
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, metiersEnum.forgeron),
        },
    ],
    probaParDefaut: 5,
};