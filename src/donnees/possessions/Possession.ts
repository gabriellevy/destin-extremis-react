// seulement les possessions "spéciales" qui ne sont pas implicites via le statut du perso
export enum PossessionEnum {
    // armes
    couteau = "Couteau",
    pistolet = "Pistolet",
    armes_lourdes = "Armes lourdes", // implicitement grenades, lance-roquette etc
    // animaux domestiques
    chat = "Chat",
}

export interface Possession {
    possessionEnum: PossessionEnum;
    nom?: string;
}

// retour en baisse de statut
export function coutPossession(possession: PossessionEnum):number {
    switch (possession) {
        case PossessionEnum.armes_lourdes: return 3;
        case PossessionEnum.pistolet: return 1;
        case PossessionEnum.couteau: return 0;
        case PossessionEnum.chat: return 0;
    }
}
