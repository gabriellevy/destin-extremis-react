import {Perso, PersoCommon} from "./perso/Perso";

// duo de vertu et vices qui fonctionnent ensemble en opposition
export type BonMauvais = {
    valBon: number, // la val de "mauvais"" est l'inverse
    nbDeTestsFaits?: number,
    typeMauvais?: Vices,
    typeBon: Vertus,
}

// mauvais étant ici "mauvais citoyen" mais peut aussi être une qualité
export enum Vices {
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

export enum Vertus {
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

export function getViceOppose(typeVertu: Vertus): Vices {
    switch (typeVertu) {
        case Vertus.genereux : return Vices.cupide;
        case Vertus.prudent : return Vices.aventureux;
        case Vertus.placide : return Vices.colerique;
        case Vertus.bienveillant : return Vices.cruel;
        case Vertus.altruiste : return Vices.envieux;
        case Vertus.sobre : return Vices.gourmand;
        case Vertus.valeureux : return Vices.lache;
        case Vertus.chaste : return Vices.luxurieux;
        case Vertus.humble : return Vices.orgueilleux;
        case Vertus.travailleur : return Vices.paresseux;
        case Vertus.loyal : return Vices.trompeur;
        case Vertus.artificialiste : return Vices.naturaliste;
        case Vertus.sociable : return Vices.solitaire;
        case Vertus.empathique : return Vices.sociopathique;
        case Vertus.discipline : return Vices.rebelle;
    }
}
export function getVertuOppose(typeVice: Vices): Vertus {
    switch (typeVice) {
        case Vices.cupide : return Vertus.genereux;
        case Vices.aventureux : return Vertus.prudent;
        case Vices.colerique : return Vertus.placide;
        case Vices.cruel : return Vertus.bienveillant;
        case Vices.envieux : return Vertus.altruiste;
        case Vices.gourmand : return Vertus.sobre;
        case Vices.lache : return Vertus.valeureux;
        case Vices.luxurieux : return Vertus.chaste;
        case Vices.orgueilleux : return Vertus.humble;
        case Vices.paresseux : return Vertus.travailleur;
        case Vices.trompeur : return Vertus.loyal;
        case Vices.naturaliste : return Vertus.artificialiste;
        case Vices.solitaire : return Vertus.sociable;
        case Vices.sociopathique : return Vertus.empathique;
        case Vices.rebelle : return Vertus.discipline;
    }
}

export function getValeurVice(perso: PersoCommon, typeVice: Vices): number {
    return - getValeurVertu(perso, getVertuOppose(typeVice));
}

export function getValeurVertu(perso: PersoCommon, typeVertu: Vertus): number {
    return perso.viceVertu.find((viceVertu: BonMauvais) => viceVertu.typeBon === typeVertu)?.valBon || 0;
}

export function viceVertuDeBase(): Array<BonMauvais> {
    return Object.values(Vertus)
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
export function ajouterVertuVal(perso: Perso, typeVertu: Vertus, val:number): string {
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

export function ajouterViceVal(perso: Perso, typeVice: Vices, val:number): string {
    const vertu = getVertuOppose(typeVice);
    const valPrecedente = getValeurVice(perso, typeVice);
    ajouterVertuVal(perso, vertu, -val);
    const valActuelle = getValeurVice(perso, typeVice);
    if (valPrecedente != valActuelle) {
        return "<b>" + valActuelle + " en " + typeVice.toString() + " </b> ";
    }
    return '';
}