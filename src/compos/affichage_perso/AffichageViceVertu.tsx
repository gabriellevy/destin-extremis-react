import {getValeurVertu, getValeurVice, getViceOppose, TypeVertu} from "../../types/ViceVertu";
import {useContext} from "react";
import {PersoContexte, PersoContexteType} from "../../contexte/ContexteTypes";

// Style pour le tableau
const tableStyle: React.CSSProperties = {
    padding: '0px', // Réduit le rembourrage dans les cellules
    margin: '0', // Supprime la marge
    borderCollapse: 'collapse', // Supprime l'espacement entre les bordures des cellules
};

// Style pour les cellules du tableau
const cellStyle: React.CSSProperties = {
    padding: '0px', // Réduit le rembourrage dans les cellules
    margin: '0', // Supprime la marge
    lineHeight: '1', // Réduit la hauteur de ligne
};

export default function AffichageViceVertu () {
    const { perso } = useContext(PersoContexte) as PersoContexteType;

    return (<table style={tableStyle}>
        <tbody>
        {Object.values(TypeVertu).map((typeVertu: TypeVertu) => {
            if (getValeurVertu(perso, typeVertu) != 0) {
                const typeVice = getViceOppose(typeVertu);
                return (
                    <tr key={typeVertu.toString()}
                        style={{ display: 'inline', marginLeft: '10px', fontSize: '13px',
                            flexFlow: "column wrap",
                            gap: "0 0px", }}
                    >
                        <td style={{ ...cellStyle, color: 'red' }}>
                            { "(" + getValeurVice(perso, typeVice) + ") " + typeVice.toString() + "  >"}
                        </td>
                        <td>
                            {" ----- "}
                        </td>
                        <td style={{ ...cellStyle, color: 'blue' }}>
                            {"<  " + typeVertu.toString() + " (" + getValeurVertu(perso, typeVertu) + ")"}
                        </td>
                    </tr>
                    );
            }
        })
        }
        </tbody>
    </table>);
}