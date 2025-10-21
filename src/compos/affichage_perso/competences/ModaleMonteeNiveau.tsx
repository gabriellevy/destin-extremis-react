import React from 'react';
import {TypeCompetence} from "../../../types/perso/comps/Comps";

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4">{`Montée de niveau en ${competenceType}`}</h2>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={monteeCompetence}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {`+1 en ${competenceType}`}
                    </button>
                    {
                        texteBoutonChangtPersonnalite != '' ? (
                            <button
                                onClick={modifierPersonnalite}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                {texteBoutonChangtPersonnalite}
                            </button>
                        ) : undefined
                    }
                    {
                        texteBoutonAchat != '' ? (
                            <button
                                onClick={acheterObjetParMonteeDeNiveau}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                {texteBoutonAchat}
                            </button>
                        ) : undefined
                    }
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModaleMonteeDeNiveau;
