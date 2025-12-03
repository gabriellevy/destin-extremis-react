import {MetalStatut, Statut} from "../types/statut_social/Statut";
import {PersoHisto} from "../types/perso/Perso";
import seedrandom from "seedrandom";

export function getRandomEnumValue<T extends Record<string, unknown>>(enumObj: T): T[keyof T] {
    const enumValues = Object.values(enumObj);

    const randomIndex = Math.floor(Math.random() * enumValues.length);

    return enumValues[randomIndex] as T[keyof T];
}

export function randomStatut():Statut {
    const rang: number = Math.floor(Math.random() * 5) + 1;
    const numMetal: number = Math.floor(Math.random() * 20);
    let metalStatut: MetalStatut = MetalStatut.bronze;
    if (numMetal >= 12)  {
        metalStatut = MetalStatut.argent;
        if (numMetal >= 20)  {
            metalStatut = MetalStatut.or;
        }
    }
    return {rang, metalStatut};
}

// de 1 à num
export function getRandomInt(num: number): number {
    return Math.floor(Math.random() * num) + 1;
}

// de 0 à num
export function getRandomInt0(num: number): number {
    return Math.floor(Math.random() * num);
}

// de 0 à num
export function aleatoireDeTableauString(tableau: string[]): string {
    return tableau[Math.floor(Math.random() * tableau.length)];
}

// ------------------ version avec seed -----------
export function getAleatoireParSeed(perso: PersoHisto, extraSeedData: string): number {
    let seed: string = perso.sauvegardes.length > 0 ? perso.sauvegardes[0].idTemporel : perso.idTemporel;
    seed += extraSeedData;
    return seedrandom(seed)();
}

export function getRandomIntSeed(numMax: number, perso: PersoHisto, extraSeedData: string): number {
    return Math.floor(getAleatoireParSeed(perso, extraSeedData) * numMax) + 1;
}

export function getRandomInt0Seed(numMax: number, perso: PersoHisto, extraSeedData: string): number {
    return Math.floor(getAleatoireParSeed(perso, extraSeedData) * numMax);
}
