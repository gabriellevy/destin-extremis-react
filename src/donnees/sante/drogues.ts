import {DrogueObj} from "../../types/sante/Drogue";

export enum droguesEnum {
    vissopressine = "Vissopressine",
    cigarette = "Cigarette",
}

export const droguesObjs: DrogueObj = {
    [droguesEnum.vissopressine]: {
        nom: droguesEnum.vissopressine,
        modifsCompetences: [{
            typeComp: "Intelligence",
            val: 10,
        },{
            // TODO : TypeCompetence.intuition provoque un pb de ReferenceError: can't access lexical declaration 'X' before initialization que je n'ai pas réussi à résoudre :
            typeComp: "Intuition",
            val: 10,
        }],
        modifsVicesVertus: [],
        description: "",
        prix:1,
    },
    [droguesEnum.cigarette]: {
        nom: droguesEnum.cigarette,
        modifsCompetences: [{
            typeComp: "Endurance",
            val: -5,
        }],
        modifsVicesVertus: [],
        description: "",
        prix:1,
    },
}
