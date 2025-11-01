import {ResultatTest, TestMetier} from "../types/LancerDe";
import {Perso, PersoCommon} from "../types/perso/Perso";
import {augmenterNbDeTestsFaitsMetier, getCompetenceMetier} from "./metiers/metiersUtils";
import {getValeurVertu, getValeurVice, Vertu, Vice} from "../types/ViceVertu";
import {augmenterNbDeTestsFaitsComp, getValeurCompetence} from "./perso/competences";
import {ajouteLigneDeTexteItalique} from "./texte_fc";
import {TypeCompetence} from "../types/perso/comps/Comps";

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

export function testComp(perso: Perso, comp: TypeCompetence, bonusMalus: number): ResultatTest {
    const compVal: number = getValeurCompetence(perso, comp);
    // augmenter tests effectués :
    const resAugmentation: string = augmenterNbDeTestsFaitsComp(perso, comp);
    return returnTestResult(resAugmentation, comp, compVal, bonusMalus);
}

export function testVertu(perso: Perso, vertu: Vertu, bonusMalus:number): ResultatTest {
    const compVal: number = getValeurVertu(perso, vertu);
    const calculerValeur = 50 + compVal*15;

    return returnTestResult("", vertu, calculerValeur, bonusMalus);
}

export function testVice(perso: PersoCommon, vice: Vice, modificateur: number): ResultatTest {
    const compVal: number = getValeurVice(perso, vice);
    const calculerValeur = 50 + compVal*15;

    return returnTestResult("", vice, calculerValeur, modificateur);
}

export function testMetier(perso: Perso, test: TestMetier): ResultatTest {
    const valComp: number = getCompetenceMetier(perso, test.metier);
    // augmenter tests effectués :
    const resAugmentation: string = augmenterNbDeTestsFaitsMetier(perso, test.metier);
    return returnTestResult(resAugmentation, test.metier, valComp, test.bonusMalus);
}

function getCritical(resDe: number) {
    return resDe % 10 == Math.floor(resDe / 10) || resDe === 100;
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
    const texte: string = "Test de "
        + intituleTestee + " "
        + (reussi ? "réussite" : "échec")
        + (getCritical(resDe) ? " CRITIQUE" : "")
        + ` (résultat ${resDe} contre compétence ${valeurTestee} ${bonusMalus > 0 ? "+" : ""} ${bonusMalus != 0 ? bonusMalus : ""} ) `
        + resAugmentation;
    return {
        reussi : reussi,
        critical: getCritical(resDe),
        resume : ajouteLigneDeTexteItalique(texte),
    }
}
