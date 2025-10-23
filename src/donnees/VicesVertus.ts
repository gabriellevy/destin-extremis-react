import {Vice} from "../types/ViceVertu";

export function descriptionVice(vice:Vice):string {
    switch (vice) {
        case Vice.naturaliste :
            return "Un anaturaliste aime la nature, les animaux, la campagne. Un artificialiste aime la ville, fabriquer, construire, dompter la nature par tous les moyens.";
        default : return "";
    }
}