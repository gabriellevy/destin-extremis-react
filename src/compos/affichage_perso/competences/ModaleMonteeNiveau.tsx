import React from 'react';
import {TypeCompetence} from "../../../types/perso/comps/Comps";
import {Box, Button, Typography} from "@mui/material";

interface ModaleMonteeDeNiveauProps {
    isOpen: boolean;
    onClose: () => void;
    monteeCompetence: () => void;
    competenceType: TypeCompetence;
    texteBoutonChangtPersonnalite: string;
    modifierPersonnalite: () => void;
    texteBoutonAchat:string;
    acheterObjetParMonteeDeNiveau: () => void;
}

const ModaleMonteeDeNiveau: React.FC<ModaleMonteeDeNiveauProps> = (
    {
        isOpen,
        onClose,
        monteeCompetence,
        modifierPersonnalite,
        texteBoutonChangtPersonnalite,
        competenceType,
        texteBoutonAchat,
        acheterObjetParMonteeDeNiveau,
    }
    ) => {
    if (!isOpen) return null;

    return (
        <Box
            sx={{
                backgroundColor: '#FFF9C4', // Fond jaune pâle
                padding: '16px',
                borderRadius: '8px',
                margin: 'auto',
                width: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: '1px',
            }}
        >
            <Typography variant="h6" gutterBottom>{`Montée de niveau en ${competenceType}`}</Typography>
            <Typography variant="body2">
                Choisissez un des effets :
            </Typography>
            <br/>
            <Button
                onClick={monteeCompetence}
                variant="contained"
                size="small"
                sx={{ mb: 1 }}
            >
                {`+1 en ${competenceType}`}
            </Button>
            {
                texteBoutonChangtPersonnalite != '' ? (
                    <Button
                        onClick={modifierPersonnalite}
                        variant="contained"
                        size="small"
                        sx={{ mb: 1 }}
                    >
                        {texteBoutonChangtPersonnalite}
                    </Button>
                ) : undefined
            }
            {
                texteBoutonAchat != '' ? (
                    <Button
                        onClick={acheterObjetParMonteeDeNiveau}
                        variant="contained"
                        size="small"
                        sx={{ mb: 1 }}
                    >
                        {texteBoutonAchat}
                    </Button>
                ) : undefined
            }
            <Button
                onClick={onClose}
                variant="contained"
                size="small"
                sx={{ mb: 1 }}
            >
                Annuler
            </Button>
        </Box>
    );
};

export default ModaleMonteeDeNiveau;
