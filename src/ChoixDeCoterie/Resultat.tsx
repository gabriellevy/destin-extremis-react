import React from 'react';
import {UseFormWatch} from 'react-hook-form';
import {getViceOppose, TypeMauvais} from "../types/BonMauvais";
import {Coterie} from "../types/Coterie";
import {affiniteViceVertuCoterie} from "../donnees/coteries/affiniteViceVertu";
import Vignette from "./Vignette";
import {descriptionCot} from "../donnees/coteries/description";
import {iconesCot} from "../donnees/coteries/icones";

type FormData = {
    [key in TypeMauvais]: number;
};

type ResultatProps = {
    watch: UseFormWatch<FormData>;
};

const Resultat: React.FC<ResultatProps> = ({ watch }) => {
    // Exemple d'utilisation de `watch` pour accéder aux valeurs actuelles du formulaire
    const values = watch();

    // calcul du résultat
    const resParCoterie = new Map<Coterie, number>();
    Object.values(Coterie).forEach((coterie: Coterie) => {
        let res = 0;

        affiniteViceVertuCoterie[coterie].forEach(valBon => {
            const mauvais: TypeMauvais = getViceOppose(valBon.typeBon);
            const valMauvaisPerso = values[mauvais];
            if (Math.abs(valMauvaisPerso) !== 0) {
                // alors ça vaut le coup de compter :s
                const valeurCoterie:number = valBon.valBon;
                const amplitudeCombinee:number = parseInt(String(valeurCoterie)) + parseInt(String(valMauvaisPerso));
                res += Math.abs(amplitudeCombinee) * 5;
            }
        })

        resParCoterie.set(coterie, res);
    });
    let resMax: number = 0;
    resParCoterie.forEach((value) => {
        if (value > resMax) {
            resMax = value;
        }
    });

    return (
        <>
            <h2>Résultat : </h2>
            {
                Array.from(resParCoterie.entries())
                    .sort(([_coterie1, total1], [_coterie2, total2]) => {
                        return total2 - total1;
                    }).map(([coterie, total], index) => {
                    return (
                        <Vignette
                            key={index}
                            name={coterie}
                            description={descriptionCot[coterie]}
                            image={iconesCot[coterie]}
                            score={total/resMax*5}
                        />
                    )
                })
            }
        </>
    );
};

export default Resultat