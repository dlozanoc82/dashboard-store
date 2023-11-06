
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClients from "../../../hooks/useClients";

const TableItemClients = ({info}) => {
    const {apellidos, celular, correo, documento, estado, fecha_reg, nombres, id, cod_usu} = info;

    const {handleDeleteCliente} = useClients();

  return (
    <>
        <td>{id}</td>
        <td>{fecha_reg}</td>
        <td>{nombres}</td>
        <td>{apellidos}</td>
        <th>{documento}</th>
        <td>{correo}</td>
        <td>{celular}</td>
        <td>{estado}</td>
        <td>
        <div className="btn__actions">
            <button className="btn btn-secondary btn-padding">
                <FontAwesomeIcon icon={faPencil} />
            </button>
            <button onClick={() => handleDeleteCliente(cod_usu)} className="btn btn-danger btn-padding">
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
        </td>
    </>
  )
}

export default TableItemClients
