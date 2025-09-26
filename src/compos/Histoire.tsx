import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Evt, EvtExecute, filtrerEtPreparerEvts} from "../types/Evt";
import {jourStr, leTempsPasse} from "../types/Date";
import {evts_calendrier} from "../donnees/evts/evts_calendrier";
import {evts_crime} from "../donnees/evts/carrieres/evts_crime";
import {evts_ingenieur} from "../donnees/evts/carrieres/evts_ingenieur";
import {evts_batelier} from "../donnees/evts/carrieres/evts_bateliers";
import {PersoContexte, PersoContexteType} from "../contexte/ContexteTypes";
import {evts_tout} from "../donnees/evts/evts_tout";
import {evts_serveur} from "../donnees/evts/carrieres/evts_serveur";
import {evts_brasseur} from "../donnees/evts/carrieres/evts_brasseur";
import {Box, Dialog, Grid2, IconButton, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {evts_macon} from "../donnees/evts/carrieres/evts_macon";
import {evts_boulanger} from "../donnees/evts/carrieres/evts_boulanger";
import {evts_medecin} from "../donnees/evts/carrieres/evts_medecin";
import {evts_boucher} from "../donnees/evts/carrieres/evts_boucher";
import {descriptionQuartier, imageQuartier} from "../donnees/geographie/quartiers";
import {evts_lycee} from "../donnees/evts/coteries/evts_lycee";
import {evts_rejoindre} from "../donnees/evts/coteries/evts_rejoindre";
import {evts_chatenay_malabry} from "../donnees/evts/quartiers/evts_chatenay_malabry";
import {evts_lycee_celtes} from "../donnees/evts/coteries/celtes/evts_lycee_celtes";
import {evts_lycee_skavens} from "../donnees/evts/coteries/skavens/evts_lycee_skavens";
import {evts_bars} from "../donnees/evts/vie_courante/evts_bars";
import {evts_amour} from "../donnees/evts/amour/evts_amour";
import {evts_montbrison} from "../donnees/evts/quartiers/evts_montbrison";
import {evts_pilleur_de_ruches} from "../donnees/evts/carrieres/evts_pilleur_de_ruches";
import {evts_lycee_orks} from "../donnees/evts/coteries/orks/evts_lycee_orks";
import {evts_orks} from "../donnees/evts/coteries/orks/evts_orks";
import {evts_carriere} from "../donnees/evts/carrieres/evts_carriere";
import {evts_journaliste} from "../donnees/evts/carrieres/evts_journaliste";
import { rejointCoterie } from '../fonctions/coteries/generales';
import {evts_statut} from "../donnees/evts/statut/evts_statut";
import {evts_possessions} from "../donnees/evts/possessions/evts_possessions";
import {evts_drogue} from "../donnees/evts/evts_drogue";
import {evts_lycee_demokratos} from "../donnees/evts/coteries/demokratos/evts_lycee_demokratos";

let demarre:boolean = false; // le destin a été lancé et est en cours

export default function Histoire() {
    const [evtsExecutes, setEvtsExecutes] = useState<EvtExecute[]>([]); // événements déjà exécutés
    const [plusDEvts, setPlusDEvts] = useState(false); // true si il n'y a plus aucun evt exécutable
    const { perso, setPerso } = useContext(PersoContexte) as PersoContexteType;
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [perso.date]);

    const handleClickOpen = (image: string): void => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedImage(null);
    };

    const executerEvt = useCallback((evtExecute: Evt, dateDejaAffichee: boolean) => {
        const texte: Promise<string> = evtExecute.description(perso);
        texte.then((texte) => {
            const nouvEvt: EvtExecute = {
                id: evtExecute.id,
                dateStr: dateDejaAffichee ? '' : jourStr(perso.date),
                texteFinal: texte, // l'exécution elle-même
                image: evtExecute.image,
            };

            setEvtsExecutes((prev: EvtExecute[]) => [
                ...prev,
                nouvEvt
            ]);

            setPerso({
                ...perso,
            });
        })
    }, [perso, setPerso]);

    const determinerEvtSuivant = useCallback(() => {
        const dateDejaAffichee: boolean = leTempsPasse(perso, executerEvt);
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
            ...filtrerEtPreparerEvts(evts_calendrier, perso),
            ...filtrerEtPreparerEvts(evts_crime, perso),
            ...filtrerEtPreparerEvts(evts_ingenieur, perso),
            ...filtrerEtPreparerEvts(evts_batelier, perso),
            ...filtrerEtPreparerEvts(evts_possessions, perso),
            ...filtrerEtPreparerEvts(evts_journaliste, perso),
            ...filtrerEtPreparerEvts(evts_lycee, perso),
            ...filtrerEtPreparerEvts(evts_lycee_celtes, perso),
            ...filtrerEtPreparerEvts(evts_lycee_orks, perso),
            ...filtrerEtPreparerEvts(evts_lycee_demokratos, perso),
            ...filtrerEtPreparerEvts(evts_orks, perso),
            ...filtrerEtPreparerEvts(evts_lycee_skavens, perso),
            ...filtrerEtPreparerEvts(evts_rejoindre, perso),
            ...filtrerEtPreparerEvts(evts_serveur, perso),
            ...filtrerEtPreparerEvts(evts_macon, perso),
            ...filtrerEtPreparerEvts(evts_boulanger, perso),
            ...filtrerEtPreparerEvts(evts_boucher, perso),
            ...filtrerEtPreparerEvts(evts_carriere, perso),
            ...filtrerEtPreparerEvts(evts_drogue, perso),
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
            let randomProba: number = Math.random() * completeProba;

            evtsApplicables.every(evt => {
                if (evt.proba) {
                    randomProba -= evt.proba;
                    if (randomProba <= 0) {
                        executerEvt(evt, dateDejaAffichee);
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
                    setTimeout(determinerEvtSuivant, perso.vitesseExecution);
                }
            }
        } else {
            setPlusDEvts(true);
            demarre= false;
        }
    }, [executerEvt, perso, setPerso]);

    // démarrer la boucle d'événements
    useEffect(() => {
        if (!demarre) {
            demarre = true;
            // applique au perso les effets de sa coterie actuelle :
            rejointCoterie(perso, perso.coterie);
            // ajouterVertuVal(perso, TypeVertu.bienveillant, -10); // exemple tmp
            // événement d'intro :
            let textQuartier = "Pas de quartier";
            let adresseQuartier = "Pas d'image";
            if (perso.lieu.quartier) {
                textQuartier = descriptionQuartier(perso.lieu.quartier);
                adresseQuartier = imageQuartier(perso.lieu.quartier);
            }
            const nouvEvt: EvtExecute = {
                id: "intro",
                dateStr: jourStr(perso.date),
                texteFinal: textQuartier, // l'exécution elle-même
                image: adresseQuartier,
            };

            setEvtsExecutes((prev: EvtExecute[]) => [
                ...prev,
                nouvEvt
            ]);

            setTimeout(determinerEvtSuivant, perso.vitesseExecution);
        }
    }, [determinerEvtSuivant, perso.date, perso.lieu.quartier, perso.vitesseExecution]);

    return (
        <>
            {evtsExecutes.map((evt: EvtExecute, index: number) => (
                <Grid2 container spacing={2} key={index} sx={{ mb: 2 }} columns={12}>
                    {evt.image && (
                        <Grid2 size={4} order={{ xs: index % 2 === 0 ? 1 : 2, md: index % 2 === 0 ? 1 : 2 }}>
                            <Box
                                component="img"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    cursor: 'pointer',
                                }}
                                alt={`image de l'événement ${evt.id}`}
                                src={evt.image}
                                onClick={() => evt.image && handleClickOpen(evt.image)}
                            />
                        </Grid2>
                    )}
                    <Grid2 size={evt.image ? 8 : 12} order={{ xs: index % 2 === 0 ? 2 : 1, md: index % 2 === 0 ? 2 : 1 }}>
                        {evt.dateStr != '' &&
                            <Typography mb={1} align="left" sx={{ fontSize: 18 }}>{evt.dateStr}</Typography>
                        }
                        <Typography mb={2} align="left">
                            <span dangerouslySetInnerHTML={{ __html: evt.texteFinal}} />
                        </Typography>
                    </Grid2>
                </Grid2>
            ))}
            <div ref={messagesEndRef} />
            {plusDEvts && (
                <Typography mb={2} fontWeight="bold">
                    Plus d'événements à exécuter !!!! Faut en ajouter mon vieux !!
                </Typography>
            )}
            {selectedImage &&
                <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box
                        component="img"
                        sx={{ width: '100%', height: 'auto' }}
                        alt="Image agrandie"
                        src={selectedImage}
                    />
                </Dialog>
            }
        </>
    );
}
