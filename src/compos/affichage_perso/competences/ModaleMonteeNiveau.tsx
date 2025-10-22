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
                padding: '2px',
                borderRadius: '8px',
                margin: 'auto',
                width: '100%',
                boxSizing: 'border-box',
            }}
        >
            <Typography variant="h6" gutterBottom>{`Montée de niveau en ${competenceType}`}</Typography>
            <Typography variant="body2">
                Choisissez un des effets.
            </Typography>
            <div className="flex justify-end space-x-4">
                <Button
                    onClick={monteeCompetence}
                    variant="contained"
                    size="small"
                >
                    {`+1 en ${competenceType}`}
                </Button>
                {
                    texteBoutonChangtPersonnalite != '' ? (
                        <Button
                            onClick={modifierPersonnalite}
                            variant="contained"
                            size="small"
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
                        >
                            {texteBoutonAchat}
                        </Button>
                    ) : undefined
                }
                <Button
                    onClick={onClose}
                    variant="contained"
                    size="small"
                >
                    Annuler
                </Button>
            </div>
        </Box>
    );
};

export default ModaleMonteeDeNiveau;
