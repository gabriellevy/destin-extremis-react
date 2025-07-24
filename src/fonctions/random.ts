import {MetalStatut, Statut} from "../types/statut_social/Statut";

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
