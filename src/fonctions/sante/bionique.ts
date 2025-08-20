import {getRandomInt0} from "../random";
import {bioniques} from "../../donnees/sante/bionique";
import {Perso} from "../../types/perso/Perso";
import {Bionique} from "../../types/sante/Bionique";
import {modifierStatut} from "../perso/statut";

export const getBioniqueAleatoire = ():Bionique=> {
    return bioniques[getRandomInt0(bioniques.length)];
}

export const poserBioniqueAleatoire = (perso:Perso): Bionique | null => {
    const bionique: Bionique = getBioniqueAleatoire();
    if (bionique != null) {
        perso.nbJoursDHopital += bionique.nbJoursConvalescence;
        perso.bioniques.push(bionique);
        if (bionique.prix) {
            modifierStatut(perso, bionique.prix);
        }
    }
    return bionique;
}
