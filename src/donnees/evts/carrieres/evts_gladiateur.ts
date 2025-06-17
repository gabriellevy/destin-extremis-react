import {Perso} from "../../../types/Perso";
import {metiersEnum} from "../../../types/metiers/metiers";
import {GroupeEvts} from "../../../types/Evt";
import {ResultatTest} from "../../../types/LancerDe";
import {testComp} from "../../../fonctions/des";
import {getCompValue, TypeCompetence} from "../../../types/comps/Comps";
import {age} from "../../../types/Date";
import {commencerCarriere, travailleEnCeMomentComme} from "../../../types/metiers/metiersUtils";
import {ClasseSociale} from "../../../types/statut_social/ClasseSociale";

export const evts_gladiateur: GroupeEvts = {
    evts: [
        {
            id: "evts_gladiateur1",
            description: (perso: Perso): string => {
                let texte: string = `Votre maître vous estime suffisamment fort pour devenir gladiateur. `
                const resTestFor:ResultatTest = testComp(perso, {comp: TypeCompetence.force, bonusMalus: 20});
                const resTestEnd:ResultatTest = testComp(perso, {comp: TypeCompetence.endurance, bonusMalus: 20});
                const resTestAdr:ResultatTest = testComp(perso, {comp: TypeCompetence.adresse, bonusMalus: 20});
                texte += resTestFor.resume;
                texte += resTestEnd.resume;
                texte += resTestAdr.resume;
                if (resTestFor.reussi && resTestEnd.reussi && resTestAdr.reussi) {
                    commencerCarriere(perso, metiersEnum.gladiateur, '');
                    texte += `Coriace comme vous l'êtes, vous impressionnez l'entraineur qui vous achète à votre ancien maître. `;
                } else {
                    texte += `Ce métier qui demande une très robuste constitution et vous êtes jugé trop frêle par le recruteur. `;
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                getCompValue(perso, TypeCompetence.force) >= 30
                && getCompValue(perso, TypeCompetence.endurance) >= 30
                && getCompValue(perso, TypeCompetence.adresse) >= 30
                && age(perso) >= 17
                && age(perso) <= 30
                && perso.classeSociale === ClasseSociale.esclave,
        },
        {
            id: "evts_gladiateur2",
            description: (perso: Perso): string => {
                let texte: string = "";
                const resTestFor:ResultatTest = testComp(perso, {comp: TypeCompetence.force, bonusMalus: 40});
                const resTestCaC:ResultatTest = testComp(perso, {comp: TypeCompetence.armeCaC, bonusMalus: 20});
                texte += resTestFor.resume;
                texte += resTestCaC.resume;
                if (resTestFor.reussi && resTestCaC.reussi) {
                    texte += `Vous excellez à l'entrainement et vous améliorez de jour en jour. `;
                } else {
                    texte += `Vous avez beaucoup de mal à tenir le rythme épuisant de votre entrainement de gladiateur. `;
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, metiersEnum.legionnaire),
        },
        {
            id: "evts_gladiateur3",
            description: (perso: Perso): string => {
                let texte: string = "";
                const resTestFor:ResultatTest = testComp(perso, {comp: TypeCompetence.force, bonusMalus: 20});
                const resTestEnd:ResultatTest = testComp(perso, {comp: TypeCompetence.endurance, bonusMalus: 20});
                const resTestAdr:ResultatTest = testComp(perso, {comp: TypeCompetence.adresse, bonusMalus: 20});
                const resTestCaC:ResultatTest = testComp(perso, {comp: TypeCompetence.armeCaC, bonusMalus: 20});
                texte += resTestFor.resume;
                texte += resTestEnd.resume;
                texte += resTestAdr.resume;
                texte += resTestCaC.resume;
                if (resTestFor.reussi && resTestEnd.reussi && resTestAdr.reussi && resTestCaC.reussi) {
                    texte += `Vous gagnez votre combat. `;
                } else {
                    texte += `Vous avez perdu votre combat. `;
                    const bonusMalus: number = (resTestFor.reussi ? 10 : 0)
                        + (resTestEnd.reussi ? 10 : 0)
                        + (resTestAdr.reussi ? 10 : 0)
                        + (resTestCaC.reussi ? 10 : 0);
                    const resTestChance:ResultatTest = testComp(
                        perso,
                        {comp: TypeCompetence.chance, bonusMalus: bonusMalus}
                    );
                    texte += resTestChance.resume;
                    if (resTestChance.reussi) {
                        texte += `Heureusement vous vous en sortez sans blessure grave. `;
                    } else {
                        // TODO : gérer blessures
                        texte += `Vous ne survivez pas à vos blessures. `;
                        perso.mort = true;
                    }
                }
                return texte;
            },
            conditions: (perso: Perso): boolean =>
                travailleEnCeMomentComme(perso, metiersEnum.gladiateur),
        },
    ],
    probaParDefaut: 5,
};