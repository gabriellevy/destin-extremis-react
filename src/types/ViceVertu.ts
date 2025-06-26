import {Perso} from "./Perso";

export type ViceVertu = {
    valVertu: number, // la val de vice est l'inverse
    nbDeTestsFaits: number,
    typeVice: TypeVice,
    typeVertu: TypeVertu,
}

export enum TypeVice {
    cupide = "Cupide",
    colerique = "Colérique",
}

export enum TypeVertu {
    genereux = "Généreux",
    prudent = "Prudent",
}

export function getViceOppose(typeVertu: TypeVertu): TypeVice {
    switch (typeVertu) {
        case TypeVertu.genereux : return TypeVice.cupide;
        case TypeVertu.prudent : return TypeVice.colerique;
    }
}
export function getVertuOppose(typeVice: TypeVice): TypeVertu {
    switch (typeVice) {
        case TypeVice.cupide : return TypeVertu.genereux;
        case TypeVice.colerique : return TypeVertu.prudent;
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
    console.log(rand);
    console.log("(rand < 0.8 : " + (rand < 0.8));
    if (rand < 0.8) return 0;
    console.log("(rand < 0.9 : " + (rand < 0.9));

    if (rand < 0.9) {
        // positif
        if (rand < 0.82) return 2;
        return 1;
    }
    // négatif
    if (rand < 0.92) return -2;
    return -1;
}