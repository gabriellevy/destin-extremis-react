import {Perso} from "../../../types/Perso";
import {metiersEnum} from "../../../types/metiers/metiers";
import {GroupeEvts} from "../../../types/Evt";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp, testMetier} from "../../../fonctions/des";
import {TypeCompetence} from "../../../types/comps/Comps";
import {age, anneesToJours} from "../../../types/Date";
import {aUneCarriere, commencerCarriere, travailleEnCeMomentComme} from "../../../types/metiers/metiersUtils";

const passageDiplomeBrasseur: (perso: Perso) => string = (perso: Perso) => {
    let texte: string =  "Vous êtes apprenti brasseur depuis longtemps. ";
    const resTestMetier:ResultatTest = testMetier(perso, {metier: metiersEnum.apprenti_brasseur, bonusMalus: 20});
    texte += resTestMetier.resume;
    if (resTestMetier.reussi) {
        texte +=  "Votre maître vous juge prêt. Vous allez pouvoir devenir brasseur à part entière.";
        commencerCarriere(perso, metiersEnum.brasseur, '');
    } else {
        texte += "Malheureusement d'après votre maître vous avez encore beaucoup à apprendre avant de pouvoir travailler seul. ";
        perso.evtsProgrammes.set(perso.date + anneesToJours(1), passageDiplomeBrasseur);
    }
    return texte;
}

export const evts_brasseur: GroupeEvts = {
    evts: [
        {
            id: "evts_brasseur1",
            description: (perso: Perso): string => {
                let texte: string = `Vous voudriez devenir brasseur. `
                const resTestDex:ResultatTest = testComp(perso, {comp: TypeCompetence.dexterite, bonusMalus: 20});
                const resTestEnd:ResultatTest = testComp(perso, {comp: TypeCompetence.endurance, bonusMalus: 20});
                texte += resTestEnd.resume;
                texte += resTestDex.resume;
                if (resTestEnd.reussi && resTestDex.reussi) {
                    commencerCarriere(perso, metiersEnum.apprenti_brasseur, '');
                    texte += `Votre motivation et votre dextérité impressionnent le brasseur qui vous engage comme apprenti à l'essai. `;
                    perso.evtsProgrammes.set(perso.date + anneesToJours(3), passageDiplomeBrasseur);
                } else {
                    texte += `Malheureusement vous n'impressionnez guère le brasseur qui refuse de vous prendre comme apprenti. `;
                }
                return texte;
            },
            image: "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Emil_Brauer.webp",
            conditions: (perso: Perso): boolean =>
                !aUneCarriere(perso)
                && age(perso) >= 14,
        },
        {
            id: "evts_brasseur2",
            description: (perso: Perso): string => {
                let texte: string = "";
                const resTestMetier:ResultatTest = testMetier(perso, {metier: metiersEnum.brasseur, bonusMalus: 0});
                texte += resTestMetier.resume;
                if (resTestMetier.reussi) {
                    texte += `Votre bière a très bonne qualité. `;
                } else {
                    texte += `Vous avez beaucoup de mal à brasser de la bière de qualité. `;
                }
                return texte;
            },
            image: "https://raw.githubusercontent.com/gabriellevy/destin-react/refs/heads/main/images/Emil_Brauer.webp",
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, metiersEnum.brasseur),
        },
    ],
    probaParDefaut: 5,
};