import {Ville} from "./villes";

// ~pays / métropoles etc
export enum Region {
    la_ville = "La Ville",
    siberie = "Sibérie",

    regionInconnue = 'Région inconnue',
}

export function getQuartiers(sousProvinceStr: string):Ville[] {
    switch (sousProvinceStr) {
        case Region.la_ville : return [Ville.rome, Ville.ostia, Ville.tivoli];
        case Region.siberie : return [
            Ville.pompei,
            Ville.herculanum,
            Ville.capua,
            Ville.neapolis
        ];
    }
    return [];
}
