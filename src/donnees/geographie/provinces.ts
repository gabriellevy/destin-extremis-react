import {Option} from "../../types/lieux/Lieu";
import {SousProvince} from "./sousProvince";

export enum Province {
    gallia = 'Gallia',
    hispania = 'Hispania',
    britannia = 'Britannia',
    germania = 'Germania',
    italia = 'Italia',
    africa = 'Africa',
    aegyptus = 'Aegyptus',
    syria = 'Syria',
    iudaea = 'Iudaea',
    asia = 'Asia',
    macedonia = 'Macedonia',
    achaea = 'Achaea',
    dacia = 'Dacia',
    pannonia = 'Pannonia',
    moesia = 'Moesia',

    provinceInconnue = 'Province inconnue',
}

export const provinceOptions: Option[]= [
    { value: Province.gallia, label: Province.gallia},
    { value: Province.hispania, label: Province.hispania},
    { value: Province.britannia, label: Province.britannia},
    { value: Province.germania, label: Province.germania},
    { value: Province.italia, label: Province.italia},
    { value: Province.africa, label: Province.africa},
    { value: Province.aegyptus, label: Province.aegyptus},
];

export function getSousProvinces(provinceStr: string):SousProvince[] {
    switch (provinceStr) {
        case Province.gallia : return [
            // TODO
        ];
        case Province.hispania : return [
            // TODO
        ];
        case Province.britannia : return [
        // TODO
        ];
        case Province.germania : return [
            // TODO
        ];
        case Province.italia : return [
            SousProvince.latium,
            SousProvince.campanie,
            SousProvince.tuscia,
            SousProvince.umbria,
            SousProvince.aemilia,
            SousProvince.Venetia,
            SousProvince.Liguria,
            SousProvince.Pedemontium,
            SousProvince.Insubria,
            SousProvince.Sicilia,
            SousProvince.Sardinia,
            SousProvince.Bruttium,
            SousProvince.Apulia,
            SousProvince.Lucania,
            SousProvince.Sabinum,
            SousProvince.Samnium,
        ];
        case Province.africa : return [];
        case Province.aegyptus : return [
            // TODO
        ];
    }
    return [];
}
