import {Perso} from "../../types/perso/Perso";
import {Bionique} from "../../types/sante/Bionique";

export const bioniqueLongevite:Bionique = {
    nom: "Bionique de longévité",
    nbJoursConvalescence: 20,
    effetAuxCaracs: (_perso:Perso) => {},
    description: "Un de vos yeux est crevé.",
};
export const oeilBionique:Bionique = {
    nom: "Oeil bionique",
    nbJoursConvalescence: 20,
    effetAuxCaracs: (_perso:Perso) => {},
    description: "",
};
export const jambeBionique:Bionique = {
    nom: "Jambe bionique",
    nbJoursConvalescence: 20,
    effetAuxCaracs: (_perso:Perso) => {},
    description: "",
};
export const brasBionique:Bionique = {
    nom: "Bras bionique",
    nbJoursConvalescence: 20,
    effetAuxCaracs: (_perso:Perso) => {},
    description: "",
};
export const stimulantReflexe:Bionique = {
    nom: "Stimulant de réflexe",
    nbJoursConvalescence: 20,
    effetAuxCaracs: (_perso:Perso) => {},
    description: "",
};

export const bioniques:Bionique[] = [
    bioniqueLongevite,
    oeilBionique,
    jambeBionique,
    brasBionique,
    stimulantReflexe
];

