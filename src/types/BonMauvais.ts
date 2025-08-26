import {Perso} from "./perso/Perso";

export type BonMauvais = {
    valBon: number, // la val de "mauvais"" est l'inverse
    nbDeTestsFaits?: number,
    typeMauvais?: TypeMauvais,
    typeBon: TypeBon,
}

// mauvais étant ici "mauvais citoyen" mais peut aussi être une qualité
export enum TypeMauvais {
    colerique = "Colérique",
    aventureux = "Aventureux",
    lache = "Lâche",
    naturaliste = "Naturaliste",
    trompeur = "Trompeur",
    paresseux = "Paresseux",
    luxurieux = "Luxurieux",
    gourmand = "Gourmand",
    cupide = "Cupide",
    cruel = "Cruel",
    envieux = "Envieux",
    orgueilleux = "Orgueilleux",
    solitaire = "Solitaire",
    sociopathique = "Sociopathique",
    rebelle = "Rebelle",
}

export enum TypeBon {
    placide = "Placide",
    prudent = "Prudent", // mou
    valeureux = "Valeureux",
    artificialiste = "Artificialiste",
    loyal = "Loyal",
    travailleur = "Travailleur",
    chaste = "Chaste",
    sobre = "Sobre",
    genereux = "Généreux",
    bienveillant = "Bienveillant", // empathique
    altruiste = "Altruiste",
    humble = "Humble",
    sociable = "Sociable",
    empathique = "Empathique",
    discipline = "Discipliné",
}

export function getViceOppose(typeVertu: TypeBon): TypeMauvais {
    switch (typeVertu) {
        case TypeBon.genereux : return TypeMauvais.cupide;
        case TypeBon.prudent : return TypeMauvais.aventureux;
        case TypeBon.placide : return TypeMauvais.colerique;
        case TypeBon.bienveillant : return TypeMauvais.cruel;
        case TypeBon.altruiste : return TypeMauvais.envieux;
        case TypeBon.sobre : return TypeMauvais.gourmand;
        case TypeBon.valeureux : return TypeMauvais.lache;
        case TypeBon.chaste : return TypeMauvais.luxurieux;
        case TypeBon.humble : return TypeMauvais.orgueilleux;
        case TypeBon.travailleur : return TypeMauvais.paresseux;
        case TypeBon.loyal : return TypeMauvais.trompeur;
        case TypeBon.artificialiste : return TypeMauvais.naturaliste;
        case TypeBon.sociable : return TypeMauvais.solitaire;
        case TypeBon.empathique : return TypeMauvais.sociopathique;
        case TypeBon.discipline : return TypeMauvais.rebelle;
    }
}
export function getVertuOppose(typeVice: TypeMauvais): TypeBon {
    switch (typeVice) {
        case TypeMauvais.cupide : return TypeBon.genereux;
        case TypeMauvais.aventureux : return TypeBon.prudent;
        case TypeMauvais.colerique : return TypeBon.placide;
        case TypeMauvais.cruel : return TypeBon.bienveillant;
        case TypeMauvais.envieux : return TypeBon.altruiste;
        case TypeMauvais.gourmand : return TypeBon.sobre;
        case TypeMauvais.lache : return TypeBon.valeureux;
        case TypeMauvais.luxurieux : return TypeBon.chaste;
        case TypeMauvais.orgueilleux : return TypeBon.humble;
        case TypeMauvais.paresseux : return TypeBon.travailleur;
        case TypeMauvais.trompeur : return TypeBon.loyal;
        case TypeMauvais.naturaliste : return TypeBon.artificialiste;
        case TypeMauvais.solitaire : return TypeBon.sociable;
        case TypeMauvais.sociopathique : return TypeBon.empathique;
        case TypeMauvais.rebelle : return TypeBon.discipline;
    }
}

export function getValeurVice(perso: Perso, typeVice: TypeMauvais): number {
    return - getValeurVertu(perso, getVertuOppose(typeVice));
}

export function getValeurVertu(perso: Perso, typeVertu: TypeBon): number {
    return perso.viceVertu.find((viceVertu: BonMauvais) => viceVertu.typeBon === typeVertu)?.valBon || 0;
}

export function viceVertuDeBase(): Array<BonMauvais> {
    return Object.values(TypeBon)
        .map(typeVertu => {
            return {
                valBon: valeurViceVertuAleatoire(),
                nbDeTestsFaits: 0,
                typeMauvais: getViceOppose(typeVertu),
                typeBon: typeVertu,
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
export function ajouterVertuVal(perso: Perso, typeVertu: TypeBon, val:number): string {
    const valPrecedente = getValeurVertu(perso, typeVertu);
    let valActuelle: number = getValeurVertu(perso, typeVertu) + val;
    if (valActuelle < -3) valActuelle = -3
    else if (valActuelle > 3) valActuelle = 3
    let viceVertu = perso.viceVertu.find(
        (viceVertu: BonMauvais) => viceVertu.typeBon === typeVertu);
    if (!viceVertu) {
        perso.viceVertu.push({
            valBon: valActuelle,
            nbDeTestsFaits: 0,
            typeMauvais: getViceOppose(typeVertu),
            typeBon: typeVertu,
        });
    } else {
        viceVertu.valBon = valActuelle;
    }
    if (valPrecedente != valActuelle) {
        return "<b>" + valActuelle + " en " + typeVertu.toString() + " </b> ";
    }
    return '';
}

export function ajouterViceVal(perso: Perso, typeVice: TypeMauvais, val:number): string {
    const vertu = getVertuOppose(typeVice);
    const valPrecedente = getValeurVice(perso, typeVice);
    ajouterVertuVal(perso, vertu, -val);
    const valActuelle = getValeurVice(perso, typeVice);
    if (valPrecedente != valActuelle) {
        return "<b>" + valActuelle + " en " + typeVice.toString() + " </b> ";
    }
    return '';
}