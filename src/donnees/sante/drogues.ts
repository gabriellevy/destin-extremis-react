import {DrogueObj} from "../../types/sante/Drogue";

export enum droguesEnum {
    vissopressine = "Vissopressine",
}

export const droguesObjs: DrogueObj = {
    [droguesEnum.vissopressine]: {
        nom: droguesEnum.vissopressine,
        modifsCompetences: [{
            typeComp: "Intelligence",
            val: 95,
        },{
            // TODO : TypeCompetence.intuition provoque un pb de ReferenceError: can't access lexical declaration 'X' before initialization que je n'ai aps réussi à résoudre :
            typeComp: "Intuition",
            val: 95,
        }],
        modifsVicesVertus: [],
        description: "",
        prix:1,
    },
}
