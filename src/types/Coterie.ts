
// à l'échelle de l'empire romain
import {Option} from "./lieux/Lieu";

export enum Coterie {
    acheron = 'Achéron',
    conquistador = 'Conquistador',
}

export const classeSocialOptions: Option[]= [
    { value: Coterie.acheron, label: Coterie.acheron},
    { value: Coterie.conquistador, label: Coterie.conquistador},
];

