import {Coterie} from "../types/Coterie";
import {Portrait} from "@mui/icons-material";
import {Perso} from "../types/perso/Perso";
import {getAge} from "../types/Date";
import {MetiersEnum} from "./metiers";
import {getCarriereActive} from "../fonctions/metiers/metiersUtils";

export type Portrait = {
    url: string,
    ageMin: number,
    ageMax: number,
    coteries: (Coterie|undefined)[],
    metiers?: MetiersEnum[],
}

export function extrairePortrait(perso:Perso): string {
    // d'abord essayer d'en trouver un qui correspond au métier ?
    let portraitsValides:Portrait[] = portraits.filter((portrait:Portrait) => {
        return getAge(perso) <= portrait.ageMax
            && getAge(perso) >= portrait.ageMin
            && (
                portrait.coteries.includes(perso.coterie)
                || portrait.coteries.includes(perso.bilanLycee.coterieActuelle)
            )
            && (portrait.metiers && portrait.metiers.includes(getCarriereActive(perso).metier));
    });

    // sinon plus générique ?
    if (portraitsValides.length == 0) {
        portraitsValides = portraits.filter((portrait:Portrait) => {
            return getAge(perso) <= portrait.ageMax
                && getAge(perso) >= portrait.ageMin
                && (
                    portrait.coteries.includes(perso.coterie)
                    || portrait.coteries.includes(perso.bilanLycee.coterieActuelle)
                );
        });
    }
    if (portraitsValides.length > 0) {
        return portraitsValides[Math.floor(Math.random() * portraitsValides.length)].url;
    }

    return "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/portraits/inconnu.jpg";
}

export const portraits:Portrait[] = [
    {
        url: "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/portraits/skavens/12_18.png",
        ageMin: 12,
        ageMax: 18,
        coteries: [Coterie.skavens],
    },
    {
        url: "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/portraits/bastets/18_30.png",
        ageMin: 18,
        ageMax: 30,
        coteries: [Coterie.bastets],
    },
    {
        url: "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/portraits/templiers/15_22.png",
        ageMin: 14,
        ageMax: 22,
        coteries: [Coterie.templiers, Coterie.cathares],
    },
    {
        url: "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/portraits/celte/12_16.png",
        ageMin: 12,
        ageMax: 16,
        coteries: [Coterie.celtes],
    },
    {
        url: "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/portraits/ogre/12_20.jpg",
        ageMin: 12,
        ageMax: 20,
        coteries: [Coterie.ogres],
    },
    {
        url: "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/portraits/ach%C3%A9ron/12_20.jpg",
        ageMin: 12,
        ageMax: 20,
        coteries: [Coterie.acheron],
    },
    {
        url: "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/portraits/lumi%C3%A8res/14_18.jpg",
        ageMin: 12,
        ageMax: 18,
        coteries: [Coterie.lumieres],
    },
    {
        url: "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/portraits/lumi%C3%A8res/18_30.jpg",
        ageMin: 18,
        ageMax: 30,
        coteries: [Coterie.lumieres],
    },
    {
        url: "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/portraits/d%C3%A9mokratos/14_20.jpg",
        ageMin: 14,
        ageMax: 20,
        coteries: [Coterie.demokratos],
    },
    {
        url: "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/portraits/ork/dileur_8_17.jpg",
        ageMin: 14,
        ageMax: 20,
        coteries: [Coterie.orks],
        metiers: [MetiersEnum.dileur_de_lycee]
    },
    {
        url: "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/portraits/h%C3%A9donistes/12_16.png",
        ageMin: 12,
        ageMax: 16,
        coteries: [Coterie.hedonistes],
    },
];
