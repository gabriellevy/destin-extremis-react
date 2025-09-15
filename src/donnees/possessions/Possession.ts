

// seulement les possessions "spéciales" qui ne sont pas implicites via le statut du perso
export enum Possession {
    pistolet = "Pistolet",
    armes_lourdes = "Armes lourdes", // implicitement grenades, lance-roquette etc
}

// retour en baisse de statut
export function coutPossession(possession: Possession):number {
    switch (possession) {
        case Possession.armes_lourdes: return 3;
        case Possession.pistolet: return 1;
    }
    return 0;
}