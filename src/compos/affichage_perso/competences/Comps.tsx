import {Button, List, ListItem, ListItemText, Typography} from "@mui/material";
import {isCompDeBase, TypeCompetence} from "../../../types/perso/comps/Comps";
import React, {JSX, useContext, useMemo, useState} from "react";
import {PersoContexte, PersoContexteType} from "../../../contexte/ContexteTypes";
import {
    augmenterCompetence, depenserMonteeDeNiveau,
    getNbDeMonteesDeNiveauRestantes,
    getValeurCompetence
} from "../../../fonctions/perso/competences";
import {EmojiEvents, Star} from "@mui/icons-material";
import ModaleMonteeDeNiveau from "./ModaleMonteeNiveau";

interface CompProps {
    competenceType: TypeCompetence,
}

const Comp = ({ competenceType }: CompProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { perso, setPerso } = useContext(PersoContexte) as PersoContexteType;

    const valeur: number = useMemo(() =>
            getValeurCompetence(perso, competenceType),
        [perso, competenceType]
    );
    const nbMonteeDeNiveau: number = useMemo(() =>
            getNbDeMonteesDeNiveauRestantes(perso, competenceType),
        [perso, competenceType]
    );

    let styleTexte;
    let icone = null;

    if (valeur < 35) {
        styleTexte = { color: 'grey', fontStyle: 'italic', fontSize: '13px' };
    } else if (valeur >= 35 && valeur < 45) {
        styleTexte = { color: 'black', fontSize: '13px' };
    } else if (valeur >= 45 && valeur < 55) {
        styleTexte = {
            fontSize: '14px',
            backgroundColor: 'rgba(255, 255, 153, 0.3)',
            padding: '2px 4px',
            borderRadius: '2px'
        };
    } else if (valeur >= 55 && valeur < 65) {
        styleTexte = {
            fontSize: '14px',
            backgroundColor: 'rgba(255, 165, 0, 0.2)',
            padding: '2px 4px',
            borderRadius: '2px'
        };
        icone = <Star fontSize="small" color="warning" sx={{ marginRight: '4px' }} />;
    } else {
        styleTexte = {
            fontSize: '14px',
            backgroundColor: 'rgba(255, 105, 97, 0.2)',
            padding: '2px 4px',
            borderRadius: '2px'
        };
        icone = <EmojiEvents fontSize="small" color="error" sx={{ marginRight: '4px' }} />;
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const monteeNiveauStandard = () => {
        depenserMonteeDeNiveau(perso, competenceType);
        augmenterCompetence(perso, competenceType, 1);
        setPerso({...perso});
        setIsModalOpen(false);
    };

    return (
        <>
            <ListItem sx={{ padding: '0px', width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {icone}
                    <ListItemText
                        primary={
                            <Typography variant="body2" style={styleTexte}>
                                {valeur < 35 ? "Incompétent en " + competenceType.toString() :
                                    valeur < 45 ? "Capable en " + competenceType.toString() :
                                        valeur < 55 ? "Expérimenté en " + competenceType.toString() :
                                            valeur < 65 ? "Exceptionnel en " + competenceType.toString() :
                                                "Légendaire en " + competenceType.toString()}
                                {" (" + valeur + ") "}
                            </Typography>
                        }
                        sx={{ margin: '0px' }}
                    />
                </div>
                {
                    nbMonteeDeNiveau > 0 && !isModalOpen? (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleOpenModal}
                        >
                            Montée de niveau
                        </Button>
                    ) : undefined
                }

            </ListItem>
            <ModaleMonteeDeNiveau
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={monteeNiveauStandard}
                competenceType={competenceType}
            />
        </>
    );
};

const Comps: React.FC = (): JSX.Element => {

    return (
        <>
            <List sx={{
                display: "flex",
                flexDirection: "column",
                overflow: "auto"
            }}>
                {Object.values(TypeCompetence)
                    .filter((typeComp: TypeCompetence) => isCompDeBase(typeComp))
                    .map((typeComp: TypeCompetence) => (
                        <Comp
                            key={typeComp.toString()}
                            competenceType={typeComp}
                        />
                    ))}
            </List>
        </>
    );
};

export default Comps;
