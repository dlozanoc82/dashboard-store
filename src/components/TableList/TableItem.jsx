import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const TableItem = ({info}) => {
    const {apellidos, celular, correo, direccion, documento, estado, fecha_reg, nombres} = info;
    return (
        <tr>
            <th>{documento}</th>
            <td>{nombres}</td>
            <td>{apellidos}</td>
            <td>{correo}</td>
            <td>{celular}</td>
            <td>{direccion}</td>
            <td>{estado}</td>
            <td>{fecha_reg}</td>
            <td>
                <div className="btn__actions">
                    <button className="btn btn-secondary btn-padding">
                        <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button className="btn btn-danger btn-padding">
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </td>
        </tr>
    )
}
