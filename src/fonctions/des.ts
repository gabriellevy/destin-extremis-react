import {ResultatTest, TestCompetence, TestMetier} from "../types/LancerDe";
import {augmenterNbDeTestsFaitsComp, getCompValue} from "../types/comps/Comps";
import {Perso} from "../types/Perso";
import {augmenterNbDeTestsFaitsMetier, getCompetenceMetier} from "../types/metiers/metiersUtils";

export function d2(): number {
    return Math.floor(Math.random() * 2) + 1;
}
export function d10(): number {
    return Math.floor(Math.random() * 10) + 1;
}
export function d100(): number {
    return Math.floor(Math.random() * 100) + 1;
}
export function d400(): number {
    return Math.floor(Math.random() * 400) + 1;
}

export function testComp(perso: Perso, test: TestCompetence): ResultatTest {
    const compVal: number = getCompValue(perso, test.comp);
    // augmenter tests effectués :
    const resAugmentation: string = augmenterNbDeTestsFaitsComp(perso, test.comp);
    return returnTestResult(resAugmentation, test.comp, compVal, test.bonusMalus);
}

export function testMetier(perso: Perso, test: TestMetier): ResultatTest {
    const valComp: number = getCompetenceMetier(perso, test.metier);
    // augmenter tests effectués :
    const resAugmentation: string = augmenterNbDeTestsFaitsMetier(perso, test.metier);
    return returnTestResult(resAugmentation, test.metier, valComp, test.bonusMalus);
}

/**
 *
 * @param resAugmentation
 * @param intituleTestee
 * @param valeurTestee peut être une compétence, une comp, un métier...
 * @param bonusMalus
 */
function returnTestResult(resAugmentation: string, intituleTestee:string, valeurTestee: number, bonusMalus: number): ResultatTest {
    const resDe: number = d100();
    const reussi: boolean = resDe <= (valeurTestee + bonusMalus);
    const texte: string = "<br/><i>Test de "
        + intituleTestee + " "
        + (reussi ? "réussi" : "raté")
        + ` (résultat ${resDe} contre compétence ${valeurTestee} ${bonusMalus > 0 ? "+" : ""} ${bonusMalus} ) `
        + resAugmentation
        + "</i>";
    return {
        reussi : reussi,
        critical: resDe % 10 == Math.floor(resDe / 10) || resDe === 100,
        resume : texte,
    }
}
