import {Perso} from "./perso/Perso";

export type ViceVertu = {
    valVertu: number, // la val de vice est l'inverse
    nbDeTestsFaits?: number,
    typeVice?: TypeVice,
    typeVertu: TypeVertu,
}

export enum TypeVice {
    cupide = "Cupide",
    aventureux = "Aventureux",
    colerique = "Colérique",
    cruel = "Cruel",
    envieux = "Envieux",
    gourmand = "Gourmand",
    lache = "Lâche",
    luxurieux = "Luxurieux",
    orgueilleux = "Orgueilleux",
    paresseux = "Paresseux",
    trompeur = "Trompeur",
    artificialiste = "Artificialiste",
    solitaire = "Solitaire",
    sociopathique = "Sociopathique",
    rebelle = "Rebelle",
}

export enum TypeVertu {
    genereux = "Généreux",
    prudent = "Prudent",
    tempere = "Tempéré",
    bienveillant = "Bienveillant",
    altruiste = "Altruiste",
    sobre = "Sobre",
    valeureux = "Valeureux",
    chaste = "Chaste",
    humble = "Humble",
    travailleur = "Travailleur",
    loyal = "Loyal",
    naturaliste = "Naturaliste",
    sociable = "Sociable",
    empathique = "Empathique",
    discipline = "Discipliné",
}

export function getViceOppose(typeVertu: TypeVertu): TypeVice {
    switch (typeVertu) {
        case TypeVertu.genereux : return TypeVice.cupide;
        case TypeVertu.prudent : return TypeVice.aventureux;
        case TypeVertu.tempere : return TypeVice.colerique;
        case TypeVertu.bienveillant : return TypeVice.cruel;
        case TypeVertu.altruiste : return TypeVice.envieux;
        case TypeVertu.sobre : return TypeVice.gourmand;
        case TypeVertu.valeureux : return TypeVice.lache;
        case TypeVertu.chaste : return TypeVice.luxurieux;
        case TypeVertu.humble : return TypeVice.orgueilleux;
        case TypeVertu.travailleur : return TypeVice.paresseux;
        case TypeVertu.loyal : return TypeVice.trompeur;
        case TypeVertu.naturaliste : return TypeVice.artificialiste;
        case TypeVertu.sociable : return TypeVice.solitaire;
        case TypeVertu.empathique : return TypeVice.sociopathique;
        case TypeVertu.discipline : return TypeVice.rebelle;
    }
}
export function getVertuOppose(typeVice: TypeVice): TypeVertu {
    switch (typeVice) {
        case TypeVice.cupide : return TypeVertu.genereux;
        case TypeVice.aventureux : return TypeVertu.prudent;
        case TypeVice.colerique : return TypeVertu.tempere;
        case TypeVice.cruel : return TypeVertu.bienveillant;
        case TypeVice.envieux : return TypeVertu.altruiste;
        case TypeVice.gourmand : return TypeVertu.sobre;
        case TypeVice.lache : return TypeVertu.valeureux;
        case TypeVice.luxurieux : return TypeVertu.chaste;
        case TypeVice.orgueilleux : return TypeVertu.humble;
        case TypeVice.paresseux : return TypeVertu.travailleur;
        case TypeVice.trompeur : return TypeVertu.loyal;
        case TypeVice.artificialiste : return TypeVertu.naturaliste;
        case TypeVice.solitaire : return TypeVertu.sociable;
        case TypeVice.sociopathique : return TypeVertu.empathique;
        case TypeVice.rebelle : return TypeVertu.discipline;
    }
}

export function getValeurVice(perso: Perso, typeVice: TypeVice): number {
    return - getValeurVertu(perso, getVertuOppose(typeVice));
}

export function getValeurVertu(perso: Perso, typeVertu: TypeVertu): number {
    return perso.viceVertu.find((viceVertu: ViceVertu) => viceVertu.typeVertu === typeVertu)?.valVertu || 0;
}

export function viceVertuDeBase(): Array<ViceVertu> {
    return Object.values(TypeVertu)
        .map(typeVertu => {
            return {
                valVertu: valeurViceVertuAleatoire(),
                nbDeTestsFaits: 0,
                typeVice: getViceOppose(typeVertu),
                typeVertu: typeVertu,
            }
        });
}

export function valeurViceVertuAleatoire(): number {
    const rand:number = Math.random();

    if (rand < 0.8) return 0;

    if (rand < 0.9) {
        // positif
        if (rand < 0.82) return 2;
        return 1;
    }
    // négatif
    if (rand < 0.92) return -2;
    return -1;
}

// ajout de manière relative à la valeur précédent (donc ajoute ou soustrait)
export function ajouterVertuVal(perso: Perso, typeVertu: TypeVertu, val:number): string {
    const valPrecedente = getValeurVertu(perso, typeVertu);
    let valActuelle: number = getValeurVertu(perso, typeVertu) + val;
    if (valActuelle < -3) valActuelle = -3
    else if (valActuelle > 3) valActuelle = 3
    let viceVertu = perso.viceVertu.find(
        (viceVertu: ViceVertu) => viceVertu.typeVertu === typeVertu);
    if (!viceVertu) {
        perso.viceVertu.push({
            valVertu: valActuelle,
            nbDeTestsFaits: 0,
            typeVice: getViceOppose(typeVertu),
            typeVertu: typeVertu,
        });
    } else {
        viceVertu.valVertu = valActuelle;
    }
    if (valPrecedente != valActuelle) {
        return "<b>" + valActuelle + " en " + typeVertu.toString() + " </b> ";
    }
    return '';
}

export function ajouterViceVal(perso: Perso, typeVice: TypeVice, val:number): string {
    const vertu = getVertuOppose(typeVice);
    const valPrecedente = getValeurVice(perso, typeVice);
    ajouterVertuVal(perso, vertu, -val);
    const valActuelle = getValeurVice(perso, typeVice);
    if (valPrecedente != valActuelle) {
        return "<b>" + valActuelle + " en " + typeVice.toString() + " </b> ";
    }
    return '';
}