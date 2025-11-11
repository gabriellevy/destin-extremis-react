import {Coterie} from "../types/Coterie";
import {Portrait} from "@mui/icons-material";
import {Perso} from "../types/perso/Perso";
import {getAge} from "../types/Date";

export type Portrait = {
    url: string,
    ageMin: number,
    ageMax: number,
    coteries: (Coterie|undefined)[],
}

export function extrairePortrait(perso:Perso): string {
    const portraitsValides:Portrait[] = portraits.filter((portrait:Portrait) => {
        return getAge(perso) <= portrait.ageMax
            && getAge(perso) >= portrait.ageMin
        && (
            portrait.coteries.includes(perso.coterie)
            || portrait.coteries.includes(perso.bilanLycee.coterieActuelle)
            );
    });
    if (portraitsValides.length > 0) {
        return portraitsValides[Math.floor(Math.random() * portraitsValides.length)].url;
    }

    return "https://raw.githubusercontent.com/gabriellevy/destin-extremis-react/refs/heads/main/images/portraits/inconnu.jpg";
}

export const portraits:Portrait[] = [
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
        url: "",
        ageMin: 12,
        ageMax: 18,
        coteries: [Coterie.lumieres],
    },
    {
        url: "",
        ageMin: 18,
        ageMax: 30,
        coteries: [Coterie.lumieres],
    },
];
