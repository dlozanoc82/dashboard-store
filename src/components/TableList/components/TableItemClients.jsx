
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useClients from "../../../hooks/useClients";
import { Link } from "react-router-dom";
import { formatDateAndTime } from "../../../helpers/GeneralFunctions";

const TableItemClients = ({info}) => {
    const {apellidos, celular, correo, documento, estado, fecha_reg, nombres, id, cod_usu, direccion} = info;

    const {handleDeleteCliente, setCliente} = useClients();
 //let bgcolor = "bgcolor='red'";
    
    // Define un estilo condicional basado en el estado
    const getBackgroundColor = (estado) => {
        if (estado == 'Activo') {
          return { backgroundColor: '#A1FF9D' }; // Cambia el color a verde para 'activo'
        } else if (estado == 'Inactivo') {
          return { backgroundColor: '#FDA586' }; // Cambia el color a rojo para 'inactivo'
        } else {
          return { backgroundColor: '#0B0B0A' }; // Otros estados mantienen el color por defecto (negro)
        }
      };
  return (
    <>
        <td><center>{id}</center></td>
        <td><center>{formatDateAndTime(fecha_reg)}</center></td>
        <td><center>{nombres}</center></td>
        <td><center>{apellidos}</center></td>
        <th><center>{documento}</center></th>
        <td><center>{correo}</center></td>
        <td><center>{celular}</center></td>
        <td style={getBackgroundColor(estado)}><center>{estado}</center></td>
        <td>
        <div className="btn__actions">
            <Link onClick={() => setCliente({cod_usu, nombres, apellidos, correo, documento, celular, direccion, estado})} to={`/clientes/editar/${cod_usu}`} className="btn btn-secondary btn-padding">
                <FontAwesomeIcon icon={faPencil} />
            </Link>
            <button disabled={estado=='INACTIVO'} onClick={() => handleDeleteCliente(cod_usu)} className="btn btn-danger btn-padding">
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
        </td>
    </>
  )
}

export default TableItemClients
