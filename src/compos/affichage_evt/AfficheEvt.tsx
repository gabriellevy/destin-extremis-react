import {Box, Grid2, Typography} from "@mui/material";
import {EvtExecute} from "../../types/Evt";
import {JSX, useContext} from "react";
import {PersoContexte, PersoContexteType} from "../../contexte/ContexteTypes";

export interface AfficheEvtProps {
    evt: EvtExecute;
    index: number;
    setSelectedImage: (value: (((prevState: (string | null)) => (string | null)) | string | null)) => void;
    setOpen: (value: (((prevState: boolean) => boolean) | boolean)) => void;
}

const AfficheEvt: React.FC<AfficheEvtProps> = ({evt, index, setOpen, setSelectedImage}): JSX.Element => {
    const { perso } = useContext(PersoContexte) as PersoContexteType;

    const handleClickOpen = (image: string): void => {
        setSelectedImage(image);
        setOpen(true);
    };

    return (
        <Grid2 container spacing={2} key={index} sx={{ mb: 2 }} columns={12}>
            {evt?.image != '' && (
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
                {perso.debogue &&
                    <Typography mb={1} align="right" sx={{ fontSize: 10 }}>{evt.id}</Typography>
                }
                <Typography mb={2} align="left">
                    <span dangerouslySetInnerHTML={{ __html: evt.texteFinal}} />
                </Typography>
            </Grid2>
        </Grid2>
    );
}

export default AfficheEvt;
