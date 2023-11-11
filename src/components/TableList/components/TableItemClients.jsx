
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClients from "../../../hooks/useClients";
import { Link } from "react-router-dom";
import { formatDateAndTime } from "../../../helpers/GeneralFunctions";

const TableItemClients = ({info}) => {
    const {apellidos, celular, correo, documento, estado, fecha_reg, nombres, id, cod_usu, direccion} = info;

    const {handleDeleteCliente, setCliente} = useClients();

    
  return (
    <>
        <td>{id}</td>
        <td>{formatDateAndTime(fecha_reg)}</td>
        <td>{nombres}</td>
        <td>{apellidos}</td>
        <th>{documento}</th>
        <td>{correo}</td>
        <td>{celular}</td>
        <td>{estado}</td>
        <td>
        <div className="btn__actions">
            <Link onClick={() => setCliente({cod_usu, nombres, apellidos, correo, documento, celular, direccion})} to={`/clientes/editar/${cod_usu}`} className="btn btn-secondary btn-padding">
                <FontAwesomeIcon icon={faPencil} />
            </Link>
            <button onClick={() => handleDeleteCliente(cod_usu)} className="btn btn-danger btn-padding">
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
        </td>
    </>
  )
}

export default TableItemClients
