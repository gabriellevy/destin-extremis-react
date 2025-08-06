import React from 'react';
import {UseFormWatch} from 'react-hook-form';
import {getViceOppose, TypeMauvais} from "../types/BonMauvais";
import {Coterie} from "../types/Coterie";
import {affiniteViceVertuCoterie} from "../donnees/coteries/affiniteViceVertu";

type FormData = {
    [key in TypeMauvais]: number;
};

type ResultatProps = {
    watch: UseFormWatch<FormData>;
};

const Resultat: React.FC<ResultatProps> = ({ watch }) => {
    // Exemple d'utilisation de `watch` pour accéder aux valeurs actuelles du formulaire
    const values = watch();

    const resParCoterie = new Map<Coterie, number>();
    Object.values(Coterie).forEach((coterie: Coterie) => {
        let res = 0;

        affiniteViceVertuCoterie[coterie].forEach(valBon => {
            const mauvais: TypeMauvais = getViceOppose(valBon.typeBon);
            const valMauvaisPerso = values[mauvais];
            if (Math.abs(valMauvaisPerso) !== 0) {
                // alors ça vaut le coup de compter :
                const valeurCoterie = valBon.valBon;
                const amplitudeCombinee = valeurCoterie - valMauvaisPerso;
                res += Math.abs(amplitudeCombinee) * 5;
            }
        })

        resParCoterie.set(coterie, res);
    });

    return (
        <>
            <h2>Résultat : </h2>
            {
                Array.from(resParCoterie.entries()).map(([coterie, total], index) => {
                    return (
                        <li key={index}>
                            {coterie} : {total}
                        </li>
                    )
                })
            }
        </>
    );
};

export default Resultat