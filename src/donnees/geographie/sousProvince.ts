import {Ville} from "./villes";

export enum SousProvince {
    latium = "Latium",
    campanie = "Campanie",
    tuscia = "Tuscia",
    umbria = "Umbria",
    aemilia = "Aemilia",
    Venetia = "Venetia",
    Liguria = "Liguria",
    Pedemontium = "Pedemontium",
    Insubria = "Insubria",
    Sicilia = "Sicilia",
    Sardinia = "Sardinia",
    Bruttium = "Bruttium",
    Apulia = "Apulia",
    Lucania = "Lucania",
    Sabinum = "Sabinum",
    Samnium = "Samnium",

    sousProvinceInconnue = 'Sous province inconnue',
}

export function getVilles(sousProvinceStr: string):Ville[] {
    switch (sousProvinceStr) {
        case SousProvince.latium : return [Ville.rome, Ville.ostia, Ville.tivoli];
        case SousProvince.campanie : return [
            Ville.pompei,
            Ville.herculanum,
            Ville.capua,
            Ville.neapolis
        ];
        case SousProvince.tuscia : return [
            Ville.florentia,
            Ville.pisae,
            Ville.luca,
        ];
        case SousProvince.umbria : return [
            Ville.perusia,
            Ville.asisium,
        ];
        case SousProvince.aemilia : return [
            Ville.bononia,
            Ville.Ariminum,
            Ville.Parma,
        ];
        case SousProvince.Venetia : return [
            Ville.Verona,
            Ville.Patavium,
            Ville.Aquileia,
        ];
        case SousProvince.Liguria : return [
            Ville.Genua,
            Ville.Savo,
        ];
        case SousProvince.Pedemontium : return [
            Ville.AugustaTaurinorum,
            Ville.AugustaPraetoria,
        ];
        case SousProvince.Insubria : return [
            Ville.Mediolanum,
            Ville.Comum,
        ];
        case SousProvince.Sicilia : return [
            Ville.Syracusae,
            Ville.Panormus,
            Ville.Catana,
        ];
        case SousProvince.Sardinia : return [
            Ville.Caralis,
            Ville.Olbia,
        ];
        case SousProvince.Bruttium : return [
            Ville.Rhegium,
            Ville.Croton,
        ];
        case SousProvince.Apulia : return [
            Ville.Barium,
            Ville.Brundisium,
        ];
        case SousProvince.Lucania : return [
            Ville.Potentia,
            Ville.Mateola,
        ];
        case SousProvince.Sabinum  : return [
            Ville.Amiternum,
            Ville.Teate,
        ];
        case SousProvince.Samnium : return [
            Ville.Potentia,
            Ville.CampusBassus,
            Ville.Aesernia,
        ];
    }
    return [];
}
