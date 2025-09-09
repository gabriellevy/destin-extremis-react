import React from 'react';
import {UseFormWatch} from 'react-hook-form';
import {getViceOppose, Vice, ViceVertu} from "../types/ViceVertu";
import {Coterie} from "../types/Coterie";
import {affiniteViceVertuCoterie} from "../donnees/coteries/affiniteViceVertu";
import Vignette from "./Vignette";
import {descriptionCot} from "../donnees/coteries/description";
import {iconesCot} from "../donnees/coteries/icones";
import {ChoixCoterieFormData} from "./ChoixDeCoterie";
import {getEffetsDeCoterieSurCompetences} from "../donnees/coteries/EffetsDesCoteriesSurPerso";
import {TypeCompetence} from "../types/perso/comps/Comps";

type ResultatProps = {
    watch: UseFormWatch<ChoixCoterieFormData>;
};

const Resultat: React.FC<ResultatProps> = ({ watch }) => {
    const values = watch();

    // calcul du résultat
    const resParCoterie = new Map<Coterie, number>();
    Object.values(Coterie).forEach((coterie: Coterie) => {
        let res = 0;

        affiniteViceVertuCoterie[coterie].forEach((viceVertu: ViceVertu) => {
            const mauvais: Vice = getViceOppose(viceVertu.typeVertu);
            const valMauvaisPerso = values.mauvais[mauvais];
            if (Math.abs(valMauvaisPerso) !== 0) {
                // alors ça vaut le coup de compter :s
                const valeurCoterie:number = viceVertu.valVertu;
                const amplitudeCombinee:number = parseInt(String(valeurCoterie)) + parseInt(String(valMauvaisPerso));
                res += Math.abs(amplitudeCombinee) * 5;
            }
        })

        const competencesChoisies = values.competences;
        getEffetsDeCoterieSurCompetences(coterie).plus10Values.forEach((comp: TypeCompetence) => {
            if (competencesChoisies[comp]) {
                res += 12;
            }
        })
        getEffetsDeCoterieSurCompetences(coterie).plus5Values.forEach((comp: TypeCompetence) => {
            if (competencesChoisies[comp]) {
                res += 6;
            }
        })
        getEffetsDeCoterieSurCompetences(coterie).minus10Values.forEach((comp: TypeCompetence) => {
            if (competencesChoisies[comp]) {
                res -= 7;
            }
        })
        getEffetsDeCoterieSurCompetences(coterie).minus5Values.forEach((comp: TypeCompetence) => {
            if (competencesChoisies[comp]) {
                res -= 3;
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
            <h2>Vos coteries recommandées par ordre d'affinité : </h2>
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