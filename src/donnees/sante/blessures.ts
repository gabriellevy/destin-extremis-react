import {Perso} from "../../types/perso/Perso";
import {PbDeSante} from "../../types/sante/pbDeSante";

const oeilCreve:PbDeSante = {
    nom: "Oeil crevé",
    gravite: 7,
    nbJoursConvalescence: 30,
    effetAuxCaracs: (_perso:Perso) => {},
    peutEtrePrisALaNaissance: false,
    description: "Un de vos yeux est crevé.",
};
