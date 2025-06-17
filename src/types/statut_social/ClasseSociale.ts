
// à l'échelle de l'empire romain
import {Option} from "../lieux/Lieu";

export enum ClasseSociale {
    esclave = 'Esclave',
    peregrin = 'Pérégrin',
    citoyen_romain = 'Citoyen romain',
    citoyen_riche = 'Citoyen riche', // gros patrimoine bien connu
    patricien = 'Patricien',
}

export const classeSocialOptions: Option[]= [
    { value: ClasseSociale.esclave, label: ClasseSociale.esclave},
    { value: ClasseSociale.peregrin, label: ClasseSociale.peregrin},
    { value: ClasseSociale.citoyen_romain, label: ClasseSociale.citoyen_romain},
    { value: ClasseSociale.citoyen_riche, label: ClasseSociale.citoyen_riche},
    { value: ClasseSociale.patricien, label: ClasseSociale.patricien},
];

