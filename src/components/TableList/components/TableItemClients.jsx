
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
        <td><center>{id}</center></td>
        <td><center>{formatDateAndTime(fecha_reg)}</center></td>
        <td><center>{nombres}</center></td>
        <td><center>{apellidos}</center></td>
        <th><center>{documento}</center></th>
        <td><center>{correo}</center></td>
        <td><center>{celular}</center></td>
        <td><center>{estado}</center></td>
        <td>
        <div className="btn__actions">
            <Link onClick={() => setCliente({cod_usu, nombres, apellidos, correo, documento, celular, direccion, estado})} to={`/clientes/editar/${cod_usu}`} className="btn btn-secondary btn-padding">
                <FontAwesomeIcon icon={faPencil} />
            </Link>
            <button disabled={estado==='INACTIVO'} onClick={() => handleDeleteCliente(cod_usu)} className="btn btn-danger btn-padding">
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
        </td>
    </>
  )
}

export default TableItemClients
