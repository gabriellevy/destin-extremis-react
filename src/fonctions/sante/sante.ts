import {PbDeSante} from "../../types/sante/pbDeSante";
import {blessures} from "../../donnees/sante/blessures";
import {getRandomInt0} from "../random";
import {Perso, PersoCommon} from "../../types/perso/Perso";

export const getBlessureAleatoire = ():PbDeSante=> {
    return blessures[getRandomInt0(blessures.length)];
}

export const getBlessureAleatoireSelonGravite = (minGravite:number, maxGravite:number):PbDeSante|null => {
    if (minGravite == 0 && maxGravite == 10) {
        return getBlessureAleatoire();
    }
    const blessuresValides = blessures
        .filter(blessure=>blessure.gravite >= minGravite)
        .filter(blessure=>blessure.gravite <= maxGravite);
    if (blessuresValides.length > 0) {
        return blessuresValides[getRandomInt0(blessuresValides.length)];
    }

    return null;
}

export const infligerBlessureAleatoire = (perso:Perso, minGravite:number, maxGravite:number): PbDeSante | null => {
    const blessure = getBlessureAleatoireSelonGravite(minGravite, maxGravite);
    if (blessure != null) {
        perso.nbJoursDHopital += blessure.nbJoursConvalescence;
        perso.pbDeSante.push(blessure);
    }
    return blessure;
}

/**
 * retourne le texte de soin de la blessure aléatoire soignée
 * (ou rien si le perso n'était pas blessé)
 * @param perso
 */
export const soignerBlessureAleatoire = (perso:PersoCommon):string|null => {
    if (perso.pbDeSante.length == 0) {
        return null;
    }
    const indexBlessureGuerie = getRandomInt0(perso.pbDeSante.length);
    const blessureSoignee = perso.pbDeSante.splice(indexBlessureGuerie, 1);
    return "Vous n'êtes plus " + blessureSoignee[0].nom;
}

export const soignerBlessure = (perso:Perso, blessureStr: string):string|null => {
    const blessureSoignee = perso.pbDeSante.filter(pbSante => pbSante.nom === blessureStr);
    if (blessureSoignee.length > 0) {
        return null;
    }
    return "Vous n'êtes plus " + blessureSoignee[0].nom;
}
