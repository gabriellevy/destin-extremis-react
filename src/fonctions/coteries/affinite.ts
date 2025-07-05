import {Perso} from "../../types/Perso";
import {affiniteViceVertuCoterie} from "../../donnees/coteries/affiniteViceVertu";
import {getValeurVertu} from "../../types/ViceVertu";
import {Coterie} from "../../types/Coterie";

export const SEUIL_AFFINITE:number = 10; // seuil à partir de quand une coterie intéresse le perso

export function calculerAffinite(perso: Perso, coterie: Coterie): number {
    let affinite = 0;
    affiniteViceVertuCoterie[coterie].forEach(viceVertuCoterie => {
        const valVertuPerso = getValeurVertu(perso, viceVertuCoterie.typeVertu);
        if (valVertuPerso == viceVertuCoterie.valVertu) {
            // très très proche de la coterie
            if (valVertuPerso ==0) affinite+=2;
            if (Math.abs(valVertuPerso) ==1) affinite+=4;
            if (Math.abs(valVertuPerso) ==2) affinite+=8;
            if (Math.abs(valVertuPerso) ==3) affinite+=16;
        } else {
            if (Math.abs(valVertuPerso - viceVertuCoterie.valVertu) > 1) {
                // grosse difféernce de valeur avec la coterie
                affinite-=1;
            } else {
                affinite+=1;
            }
        }
    })
    return affinite;
}