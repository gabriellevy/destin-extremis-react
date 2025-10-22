import {Perso, PersoCommon} from "./perso/Perso";

// duo de vertu et vices qui fonctionnent ensemble en opposition
export type ViceVertu = {
    valVertu: number, // la val de "vice" est l'inverse
    nbDeTestsFaits?: number,
    typeVice?: Vice,
    typeVertu: Vertu,
}

export type ModificateurViceVertu = {
    typeVertu: Vertu,
    val: number;
}

// mauvais étant ici "mauvais citoyen" mais peut aussi être une qualité
export enum Vice {
    impulsif = "Impulsif",
    colerique = "Colérique",
    aventureux = "Aventureux",
    lache = "Lâche",
    naturaliste = "Naturaliste",
    trompeur = "Trompeur",
    paresseux = "Paresseux",
    luxurieux = "Luxurieux",
    gourmand = "Gourmand", // inclut drogue et alcool
    cupide = "Cupide",
    cruel = "Cruel",
    envieux = "Envieux", // ambitieux, veut plus
    orgueilleux = "Orgueilleux",
    solitaire = "Solitaire",
    sociopathique = "Sociopathique",
    // inclut d'une manière général la tendance à être malhonnête, à ne pas respecter les règles de la société
    rebelle = "Rebelle",
    sceptique = "Sceptique",
    // à haut niveau devient paranoïaque
    mefiant = "Méfiant",
}

export enum Vertu {
    reflechi = "Réfléchi",
    placide = "Placide",
    prudent = "Prudent",
    valeureux = "Valeureux",
    artificialiste = "Artificialiste",
    loyal = "Loyal",
    travailleur = "Travailleur",
    chaste = "Chaste",
    sobre = "Sobre",
    genereux = "Généreux", // Prodigue
    bienveillant = "Bienveillant",
    altruiste = "Altruiste",
    humble = "Humble",
    sociable = "Sociable",
    empathique = "Empathique",
    // inclut le respect des règles en général, donc le fait d'être honnête
    discipline = "Discipliné",
    spirituel = "Spirituel",
    naif = "Naïf",
}

export function getViceOppose(typeVertu: Vertu): Vice {
    switch (typeVertu) {
        case Vertu.reflechi : return Vice.impulsif;
        case Vertu.genereux : return Vice.cupide;
        case Vertu.prudent : return Vice.aventureux;
        case Vertu.placide : return Vice.colerique;
        case Vertu.bienveillant : return Vice.cruel;
        case Vertu.altruiste : return Vice.envieux;
        case Vertu.sobre : return Vice.gourmand;
        case Vertu.valeureux : return Vice.lache;
        case Vertu.chaste : return Vice.luxurieux;
        case Vertu.humble : return Vice.orgueilleux;
        case Vertu.travailleur : return Vice.paresseux;
        case Vertu.loyal : return Vice.trompeur;
        case Vertu.artificialiste : return Vice.naturaliste;
        case Vertu.sociable : return Vice.solitaire;
        case Vertu.empathique : return Vice.sociopathique;
        case Vertu.discipline : return Vice.rebelle;
        case Vertu.spirituel : return Vice.sceptique;
        case Vertu.naif : return Vice.mefiant;
    }
}
export function getVertuOppose(typeVice: Vice): Vertu {
    switch (typeVice) {
        case Vice.impulsif : return Vertu.reflechi;
        case Vice.cupide : return Vertu.genereux;
        case Vice.aventureux : return Vertu.prudent;
        case Vice.colerique : return Vertu.placide;
        case Vice.cruel : return Vertu.bienveillant;
        case Vice.envieux : return Vertu.altruiste;
        case Vice.gourmand : return Vertu.sobre;
        case Vice.lache : return Vertu.valeureux;
        case Vice.luxurieux : return Vertu.chaste;
        case Vice.orgueilleux : return Vertu.humble;
        case Vice.paresseux : return Vertu.travailleur;
        case Vice.trompeur : return Vertu.loyal;
        case Vice.naturaliste : return Vertu.artificialiste;
        case Vice.solitaire : return Vertu.sociable;
        case Vice.sociopathique : return Vertu.empathique;
        case Vice.rebelle : return Vertu.discipline;
        case Vice.sceptique : return Vertu.spirituel;
        case Vice.mefiant : return Vertu.naif;
    }
}

export function getValeurVice(perso: PersoCommon, typeVice: Vice): number {
    return - getValeurVertu(perso, getVertuOppose(typeVice));
}

export function getValeurVertu(perso: PersoCommon, typeVertu: Vertu): number {
    return perso.viceVertu.find((viceVertu: ViceVertu) => viceVertu.typeVertu === typeVertu)?.valVertu || 0;
}

export function viceVertuDeBase(): Array<ViceVertu> {
    return Object.values(Vertu)
        .map((typeVertu: Vertu) => {
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
export function ajouterVertuVal(perso: Perso, typeVertu: Vertu, val:number): string {
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

export function ajouterViceVal(perso: Perso, typeVice: Vice, val:number): string {
    const vertu = getVertuOppose(typeVice);
    const valPrecedente = getValeurVice(perso, typeVice);
    ajouterVertuVal(perso, vertu, -val);
    const valActuelle = getValeurVice(perso, typeVice);
    if (valPrecedente != valActuelle) {
        return "<b>" + valActuelle + " en " + typeVice.toString() + " </b> ";
    }
    return '';
}