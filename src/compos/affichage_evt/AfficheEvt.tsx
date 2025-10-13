import {Box, Button, Grid2, Typography} from "@mui/material";
import {EvtExecute} from "../../types/Evt";
import {JSX, useCallback, useContext} from "react";
import {PersoContexte, PersoContexteType} from "../../contexte/ContexteTypes";
import {Perso} from "../../types/perso/Perso";
import {persoToPersoHisto} from "../../fonctions/perso/conversionsPerso";

export interface AfficheEvtProps {
    evt: EvtExecute;
    index: number;
    setSelectedImage: (value: (((prevState: (string | null)) => (string | null)) | string | null)) => void;
    setEvtsExecutes: (value: (((prevState: EvtExecute[]) => EvtExecute[]) | EvtExecute[])) => void
    setOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void;
}

const AfficheEvt: React.FC<AfficheEvtProps> = ({evt, index, setOpen, setSelectedImage, setEvtsExecutes}): JSX.Element => {
    const { perso, setPerso } = useContext(PersoContexte) as PersoContexteType;

    const handleClickOpen = (image: string): void => {
        setSelectedImage(image);
        setOpen(true);
    };

    const revenirACetEvt = useCallback((idEvt: string) => {
        if (perso.pointDestin < 1) {
            console.error("Plus de points de destin ! : " + idEvt);
            return;
        }
        let pointsDeDestin:number = perso.pointDestin - 1;
        // chercher dans les persos sauvegardés
        const persoPrecedent:Perso|undefined = perso.sauvegardes.find((persoPrec:Perso) => persoPrec.idTemporel === idEvt);
        if (!persoPrecedent) {
            console.error("perso précédent introuvable pour l'id d'événement : " + idEvt);
        } else {
            // resetter perso à ce perso sauvegardé
            persoPrecedent.idTemporel = idEvt;
            if (!perso.debogue) {
                // en débogue les points de destin sont infinis
                persoPrecedent.pointDestin = pointsDeDestin;
            }
            setEvtsExecutes(persoPrecedent.evtsPasses)
            setPerso(persoToPersoHisto(persoPrecedent));
        }
    }, [perso, setPerso, setEvtsExecutes]);

    return (
        <Grid2 container spacing={2} key={index} sx={{ mb: 2 }} columns={12}>
            {evt?.image && evt?.image != '' && (
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
                <Box display="flex" alignItems="center" gap={2}>
                    {evt.dateStr != '' &&
                        <Typography mb={1} align="left" sx={{ fontSize: 18 }}>
                            {
                                perso.debogue ?
                                    `${evt.dateStr} (${evt.id})`
                                    : evt.dateStr
                            }
                        </Typography>
                    }
                    {
                        perso.pointDestin > 0 && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => revenirACetEvt(evt.id)}
                            >
                                {
                                    `Rejouer d'ici (${perso.pointDestin} point de destin)`
                                }
                            </Button>
                        )
                    }
                </Box>
                <Typography mb={2} align="left">
                    <span dangerouslySetInnerHTML={{ __html: evt.texteFinal}} />
                </Typography>
            </Grid2>
        </Grid2>
    );
}

export default AfficheEvt;
