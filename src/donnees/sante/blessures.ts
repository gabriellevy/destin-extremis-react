import {Perso} from "../../types/perso/Perso";
import {PbDeSante} from "../../types/sante/pbDeSante";

export const oeilCreve:PbDeSante = {
    nom: "Oeil crevé",
    gravite: 7,
    nbJoursConvalescence: 30,
    effetAuxCaracs: (_perso:Perso) => {},
    peutEtrePrisALaNaissance: false,
    description: "Un de vos yeux est crevé.",
};
export const doigtArrache:PbDeSante = {
    nom: "Doigt arraché",
    gravite: 5,
    nbJoursConvalescence: 12,
    effetAuxCaracs: (_perso:Perso) => {},
    peutEtrePrisALaNaissance: false,
    description: "description à faire",
};
export const cicatriceVisage:PbDeSante = {
    nom: "Cicatrice au visage",
    gravite: 4,
    nbJoursConvalescence: 12,
    effetAuxCaracs: (_perso:Perso) => {},
    peutEtrePrisALaNaissance: false,
    description: "description à faire",
};
export const defigure:PbDeSante = {
    nom: "Defiguré",
    gravite: 8,
    nbJoursConvalescence: 40,
    effetAuxCaracs: (_perso:Perso) => {},
    peutEtrePrisALaNaissance: false,
    description: "description à faire",
};
export const jambeAmputee:PbDeSante = {
    nom: "Jambe amputée",
    gravite: 8,
    nbJoursConvalescence: 40,
    effetAuxCaracs: (_perso:Perso) => {},
    peutEtrePrisALaNaissance: false,
    description: "Votre jambe est si gravement endommagée qu'on doit vous l'amputer.",
};
export const brasAmpute:PbDeSante = {
    nom: "Bras amputé",
    gravite: 8,
    nbJoursConvalescence: 40,
    effetAuxCaracs: (_perso:Perso) => {},
    peutEtrePrisALaNaissance: false,
    description: "Votre bras est si gravement endommagé qu'on doit vous l'amputer.",
};
export const traumatismeCranien:PbDeSante = {
    nom: "Traumatisme crânien",
    gravite: 8,
    nbJoursConvalescence: 30,
    effetAuxCaracs: (_perso:Perso) => {},
    peutEtrePrisALaNaissance: false,
    description: "Vous vous heurtez la tête violemment au point de perdre connaissance.",
};
export const hemoragieInterne:PbDeSante = {
    nom: "Hémoragie Interne",
    gravite: 8,
    nbJoursConvalescence: 30,
    effetAuxCaracs: (_perso:Perso) => {},
    peutEtrePrisALaNaissance: false,
    description: "Vous pensiez vous en tirer à plutôt bon compte avec des blessures légères quand vous crachez du sang dans une douleur épouvantable. Vous avez une hémorragie interne.",
};
export const oreilleCoupee:PbDeSante = {
    nom: "Oreille coupée",
    gravite: 5,
    nbJoursConvalescence: 25,
    effetAuxCaracs: (_perso:Perso) => {},
    peutEtrePrisALaNaissance: false,
    description: "description à faire",
};

export const blessures:PbDeSante[] = [
    oreilleCoupee,
    hemoragieInterne,
    oeilCreve,
    traumatismeCranien,
    brasAmpute,
    doigtArrache,
    cicatriceVisage,
    defigure,
    jambeAmputee
];


