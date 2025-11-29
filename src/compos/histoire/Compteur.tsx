import {JSX, useCallback, useContext, useEffect, useRef, useState} from "react";
import {Button, Grid2, Typography} from "@mui/material";
import {jourStr, leTempsPasse} from "../../types/Date";
import {Evt, EvtExecute, filtrerEtPreparerEvts} from "../../types/Evt";
import {evts_chatenay_malabry} from "../../donnees/evts/quartiers/evts_chatenay_malabry";
import {evts_montbrison} from "../../donnees/evts/quartiers/evts_montbrison";
import {evts_pilleur_de_ruches} from "../../donnees/evts/carrieres/evts_pilleur_de_ruches";
import {evts_bars} from "../../donnees/evts/sorties/evts_bars";
import {evts_amour} from "../../donnees/evts/amour/evts_amour";
import {evts_animaux} from "../../donnees/evts/animaux/evts_animaux";
import {evts_calendrier} from "../../donnees/evts/programmes/evts_calendrier";
import {evts_crime_ranconneur} from "../../donnees/evts/carrieres/crime/evts_crime_ranconneur";
import {evts_voleur} from "../../donnees/evts/carrieres/crime/evts_voleur";
import {evts_brute_de_lycee} from "../../donnees/evts/carrieres/lycee/evts_brute_de_lycee";
import {evts_dealer_de_lycee} from "../../donnees/evts/carrieres/lycee/evts_dealer_de_lycée";
import {evts_ingenieur} from "../../donnees/evts/carrieres/evts_ingenieur";
import {evts_possessions} from "../../donnees/evts/possessions/evts_possessions";
import {evts_argent} from "../../donnees/evts/possessions/evts_argent";
import {evts_logement} from "../../donnees/evts/possessions/evts_logement";
import {evts_television} from "../../donnees/evts/divertissements/evts_television";
import {evts_journaliste} from "../../donnees/evts/carrieres/evts_journaliste";
import {evts_lycee_entrees_sorties} from "../../donnees/evts/coteries/evts_lycee_entrees_sorties";
import {evts_lycee_celtes} from "../../donnees/evts/coteries/celtes/evts_lycee_celtes";
import {evts_lycee_orks} from "../../donnees/evts/coteries/orks/evts_lycee_orks";
import {evts_lycee_acheron} from "../../donnees/evts/coteries/acheron/evts_lycee_acheron";
import {evts_lycee_demokratos} from "../../donnees/evts/coteries/demokratos/evts_lycee_demokratos";
import {evts_lycee_cathares} from "../../donnees/evts/coteries/cathares/evts_lycee_cathares";
import {evts_cathares} from "../../donnees/evts/coteries/cathares/evts_cathares";
import {evts_orks} from "../../donnees/evts/coteries/orks/evts_orks";
import {evts_lycee_skavens} from "../../donnees/evts/coteries/skavens/evts_lycee_skavens";
import {evts_lycee} from "../../donnees/evts/coteries/evts_lycee";
import {evts_rejoindre} from "../../donnees/evts/coteries/evts_rejoindre";
import {evts_serveur} from "../../donnees/evts/carrieres/evts_serveur";
import {evts_macon} from "../../donnees/evts/carrieres/evts_macon";
import {evts_plombier} from "../../donnees/evts/carrieres/evts_plombier";
import {evts_sports} from "../../donnees/evts/evts_sport";
import {evts_boulanger} from "../../donnees/evts/carrieres/evts_boulanger";
import {evts_boucher} from "../../donnees/evts/carrieres/evts_boucher";
import {evts_carriere} from "../../donnees/evts/carrieres/evts_carriere";
import {evts_drogue} from "../../donnees/evts/drogues/evts_drogue";
import {evts_cigarette} from "../../donnees/evts/drogues/evts_cigarette";
import {evts_statut} from "../../donnees/evts/statut/evts_statut";
import {evts_brasseur} from "../../donnees/evts/carrieres/evts_brasseur";
import {evts_medecin} from "../../donnees/evts/carrieres/evts_medecin";
import {evts_tout} from "../../donnees/evts/evts_tout";
import {PersoContexte, PersoContexteType} from "../../contexte/ContexteTypes";
import {Perso} from "../../types/perso/Perso";
import {clonePersoHistoToPerso} from "../../fonctions/perso/conversionsPerso";
import {demarre} from "../Histoire";

export interface CompteurProps {
    evtsExecutes: EvtExecute[],
    setEvtsExecutes: React.Dispatch<React.SetStateAction<EvtExecute[]>>,
}

const Compteur: React.FC<CompteurProps> = ({evtsExecutes, setEvtsExecutes}): JSX.Element => {
    const { perso, setPerso } = useContext(PersoContexte) as PersoContexteType;
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const [tempsRestant, setTempsRestant] = useState<number | null>(perso.secondesEntreChaqueEvt);
    const [jourSansEvt, setJourSansEvt] = useState<number>(0);

    const executerEvt = useCallback((evtExecute: Evt, dateDejaAffichee: boolean) => {

        const previousPerso:Perso = clonePersoHistoToPerso(perso);
        const texte: Promise<string> = evtExecute.description(perso);
        texte.then((texte) => {
            const dateStr = dateDejaAffichee ? '' : jourStr(perso.date);
            const evtId:string = evtExecute.id + dateStr;
            const nouvEvt: EvtExecute = {
                id: evtId,
                dateStr: dateStr,
                joursDepuisDernierEvt: jourSansEvt,
                texteFinal: texte, // l'exécution elle-même
                image: evtExecute.image != undefined ? evtExecute.image(perso) : '',
            };

            // sauvegarder l'historique des évts et des états de perso précédents
            previousPerso.idTemporel = evtId;
            perso.evtsPasses = [
                ...evtsExecutes,
                nouvEvt
            ];
            if (evtExecute.nbJoursEntreOccurences === undefined || evtExecute.nbJoursEntreOccurences <= 0) {
                perso.idEvtsNonExecutables = [
                    ...perso.idEvtsNonExecutables,
                    evtExecute.id,
                ];
            } else if (evtExecute.nbJoursEntreOccurences > 1) {
                // evts that can't be reexecuted for a limited time :
                perso.evtsNonRexecutablesTemporairement = [
                    ...perso.evtsNonRexecutablesTemporairement,
                    {
                        id: evtExecute.id,
                        nbJoursRestants: evtExecute.nbJoursEntreOccurences,
                    }
                ]
            }

            perso.sauvegardes.push(previousPerso);

            setEvtsExecutes((prev: EvtExecute[]) => [
                ...prev,
                nouvEvt
            ]);

            setPerso({ ...perso });
        })
    }, [perso, setPerso]);

    const determinerEvtSuivant = useCallback(() => {
        const evtProgrammeExecute: boolean = leTempsPasse(perso, executerEvt);
        setPerso({
            ...perso,
        });

        // filtrer les evts non applicables
        const evtsApplicables: Evt[] = [
            ...filtrerEtPreparerEvts(evts_chatenay_malabry, perso),
            ...filtrerEtPreparerEvts(evts_montbrison, perso),
            ...filtrerEtPreparerEvts(evts_pilleur_de_ruches, perso),
            ...filtrerEtPreparerEvts(evts_bars, perso),
            ...filtrerEtPreparerEvts(evts_amour, perso),
            ...filtrerEtPreparerEvts(evts_animaux, perso),
            ...filtrerEtPreparerEvts(evts_calendrier, perso),
            ...filtrerEtPreparerEvts(evts_crime_ranconneur, perso),
            ...filtrerEtPreparerEvts(evts_voleur, perso),
            ...filtrerEtPreparerEvts(evts_brute_de_lycee, perso),
            ...filtrerEtPreparerEvts(evts_dealer_de_lycee, perso),
            ...filtrerEtPreparerEvts(evts_ingenieur, perso),
            ...filtrerEtPreparerEvts(evts_possessions, perso),
            ...filtrerEtPreparerEvts(evts_argent, perso),
            ...filtrerEtPreparerEvts(evts_logement, perso),
            ...filtrerEtPreparerEvts(evts_television, perso),
            ...filtrerEtPreparerEvts(evts_journaliste, perso),
            ...filtrerEtPreparerEvts(evts_lycee_entrees_sorties, perso),
            ...filtrerEtPreparerEvts(evts_lycee_celtes, perso),
            ...filtrerEtPreparerEvts(evts_lycee_orks, perso),
            ...filtrerEtPreparerEvts(evts_lycee_acheron, perso),
            ...filtrerEtPreparerEvts(evts_lycee_demokratos, perso),
            ...filtrerEtPreparerEvts(evts_lycee_cathares, perso),
            ...filtrerEtPreparerEvts(evts_cathares, perso),
            ...filtrerEtPreparerEvts(evts_orks, perso),
            ...filtrerEtPreparerEvts(evts_lycee_skavens, perso),
            ...filtrerEtPreparerEvts(evts_lycee, perso),
            ...filtrerEtPreparerEvts(evts_rejoindre, perso),
            ...filtrerEtPreparerEvts(evts_serveur, perso),
            ...filtrerEtPreparerEvts(evts_macon, perso),
            ...filtrerEtPreparerEvts(evts_plombier, perso),
            ...filtrerEtPreparerEvts(evts_sports, perso),
            ...filtrerEtPreparerEvts(evts_boulanger, perso),
            ...filtrerEtPreparerEvts(evts_boucher, perso),
            ...filtrerEtPreparerEvts(evts_carriere, perso),
            ...filtrerEtPreparerEvts(evts_drogue, perso),
            ...filtrerEtPreparerEvts(evts_cigarette, perso),
            ...filtrerEtPreparerEvts(evts_statut, perso),
            ...filtrerEtPreparerEvts(evts_brasseur, perso),
            ...filtrerEtPreparerEvts(evts_medecin, perso),
            ...filtrerEtPreparerEvts(evts_tout, perso),
        ];

        if (evtsApplicables.length > 0) {
            // sélectionner un des evts en fonction de leur proba
            let completeProba: number = 0;
            evtsApplicables.forEach(evt => {
                if (evt.proba) {
                    completeProba += evt.proba;
                }
            })
            let randomProba: number = Math.random();
            if (completeProba > 1) {
                randomProba *= completeProba;
            }
            let evtExecute:boolean = evtProgrammeExecute;
            evtsApplicables.every(evt => {
                if (evt.proba) {
                    randomProba -= evt.proba;
                    if (randomProba <= 0) {
                        executerEvt(evt, evtProgrammeExecute);
                        evtExecute = true;
                        return false;
                    }
                }
                return true
            })

            if (demarre) {
                if (perso.mort) {
                    const evt: Evt = {
                        id: "mort",
                        description: () =>  new Promise((resolve) => {
                            resolve("Vous êtes mort.");
                        }),
                    };
                    executerEvt(evt, true);
                } else {
                    if (evtExecute) {
                        setJourSansEvt(0);
                        setTempsRestant(perso.secondesEntreChaqueEvt);
                    } else {
                        setJourSansEvt(jourSansEvt + 1);
                        setTempsRestant(3);
                    }
                }
            }
        }
    }, [executerEvt, perso, setPerso, setTempsRestant, setJourSansEvt, jourSansEvt]);

    useEffect(() => {
        if (tempsRestant !== null && tempsRestant > 0) {
            timeoutRef.current = setTimeout(() => {
                setTempsRestant((prev) => (prev !== null ? prev - 1 : null));
            }, 1000);
        } else if (tempsRestant === 0) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            setTimeout(determinerEvtSuivant, 0);
        }
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [tempsRestant, determinerEvtSuivant]);

    const passerAuSuivant = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setTempsRestant(null);
        setJourSansEvt(0);
        determinerEvtSuivant();
    }, [determinerEvtSuivant]);

    return (
        <>
        {tempsRestant !== null && tempsRestant >= 0 && (
            <Grid2 container justifyContent="center" alignItems="center" spacing={2}
                   sx={{
                       backgroundColor: 'rgba(255, 249, 196, 0.9)',
                       padding: '16px',
                       borderRadius: '8px',
                       margin: 'auto',
                       maxWidth: '700px',
                       boxSizing: 'border-box',
                       mb: 2,
                   }}
            >
                <Grid2>
                    <Typography fontWeight="bold">
                        {
                            jourSansEvt > 0 ? jourSansEvt + " jours sans événement notable." : 'lendemain'
                        }
                        <br/>
                        Prochain événement dans {tempsRestant} seconde{tempsRestant > 1 ? 's' : ''}...
                    </Typography>
                </Grid2>
                {
                    perso.debogue && (
                        <Grid2>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={passerAuSuivant}
                            >
                                Suivant
                            </Button>
                        </Grid2>
                    )
                }
            </Grid2>
        )}
        </>
    );
}

export default Compteur;