import {Perso} from "../../types/perso/Perso";
import {affiniteViceVertuCoterie} from "../../donnees/coteries/affiniteViceVertu";
import {getValeurVertu} from "../../types/ViceVertu";
import {Coterie} from "../../types/Coterie";

export const SEUIL_AFFINITE:number = 8; // seuil à partir de quand une coterie intéresse le perso

export function calculerAffinite(perso: Perso, coterie: Coterie): number {
    let affinite = 0;
    affiniteViceVertuCoterie[coterie].forEach(viceVertuCoterie => {
        const valVertuPerso = getValeurVertu(perso, viceVertuCoterie.typeVertu);
        if (valVertuPerso == viceVertuCoterie.valVertu) {
            // valeur identique à la coterie
            if (valVertuPerso ==0) affinite+=2;
            if (Math.abs(valVertuPerso) ==1) affinite+=4;
            if (Math.abs(valVertuPerso) ==2) affinite+=6;
            if (Math.abs(valVertuPerso) ==3) affinite+=10;
        } else {
            // grosse différence de valeur avec la coterie
            if (Math.abs(valVertuPerso - viceVertuCoterie.valVertu) > 1) {
                affinite-=1;
            }
            // un positif et un négatif donc grosse différence
            if ((valVertuPerso > 0) !== (viceVertuCoterie.valVertu > 0)) {
                affinite-=1;
            } else {
                // au moins ils sont du même côté de l'échelle donc affinité
                affinite += 3;
            }
        }
    })
    if (perso.debogue) {
        console.log("Affinité avec " + coterie.toString() + " : " + affinite);
    }
    return affinite;
}