import {Quartier} from "./quartiers";

// ~pays / métropoles etc
export enum Region {
    la_ville = "La Ville",
    espagne = "Espagne",
    siberie = "Sibérie",
    chine = "Chine",

    // regionInconnue = 'Région inconnue',
}

export function getRegion(quartierCherche:Quartier):Region|undefined {
    for (const regionStr in Region) {
        const region:Region = Region[regionStr as keyof typeof Region];
        for (const quartier of getQuartiers(region)) {
            if (quartier === quartierCherche) {
                return region;
            }
        }
    }
    console.error("Pas de région pour le quartier : " + quartierCherche);
    return undefined;
}

export function getQuartiers(sousProvinceStr: string|undefined):Quartier[] {
    switch (sousProvinceStr) {
        case Region.la_ville : return [
            Quartier.noisiel,
            Quartier.montmartre,
            Quartier.chatenay_malabry,
            Quartier.montbrison,
            Quartier.saint_malo,
            Quartier.montesson,
            Quartier.palais_royal,
            Quartier.saint_germain_en_laye,
            Quartier.bois_de_boulogne,
            Quartier.versailles,
            Quartier.vanves,
            Quartier.luxembourg,
            Quartier.la_defense,
            Quartier.bondy,
            Quartier.maisons_laffite,
            Quartier.genevilliers,
            Quartier.saint_ouen,
            Quartier.grande_crete,
            Quartier.catacombes_de_paris,
            Quartier.saint_denis,
            Quartier.argenteuil,
            Quartier.suresnes,
            Quartier.saint_maur_des_fosses
        ];
        case Region.siberie : return [
            Quartier.vladivostok
        ];
        case Region.espagne : return [
            Quartier.pyrenees
        ];
        case Region.chine : return [
            Quartier.comptoir_ghangzhou
        ];
    }
    return [];
}
