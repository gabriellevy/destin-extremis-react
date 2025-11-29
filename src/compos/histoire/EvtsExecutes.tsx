import {JSX, useState} from "react";
import {Box, Dialog, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AfficheEvtExecute from "./AfficheEvtExecute";
import {EvtExecute} from "../../types/Evt";

export interface ExecutedEvtsProps {
    evtsExecutes: EvtExecute[],
    setEvtsExecutes: React.Dispatch<React.SetStateAction<EvtExecute[]>>,
}

const EvtsExecutes: React.FC<ExecutedEvtsProps> = ({evtsExecutes, setEvtsExecutes}): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleClose = () => {
        setOpen(false);
        setSelectedImage(null);
    };

    return (<>
        {evtsExecutes.map((evt: EvtExecute, index: number) => (
                <AfficheEvtExecute
                    key={evt.id + index}
                    evt={evt}
                    index={index}
                    setOpen={setOpen}
                    setSelectedImage={setSelectedImage}
                    setEvtsExecutes={setEvtsExecutes}
                />
            ))
        }
        {selectedImage &&
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    sx={{position: 'absolute', right: 8, top: 8}}
                >
                    <CloseIcon/>
                </IconButton>
                <Box
                    component="img"
                    sx={{width: '100%', height: 'auto'}}
                    alt="Image agrandie"
                    src={selectedImage}
                />
            </Dialog>
        }
    </>);
}

export default EvtsExecutes;
