import { formatDateAndTime, formatearCantidad } from "../../../helpers/GeneralFunctions";

const TableItemCotizaciones = ({info}) => {
    const {id, fecha_cotiz, documento, nombres, apellidos, correo, nombre, cantidad, valor_unit, total} = info;

    
  return (
    <>
        <td>{id}</td>
        <td>{formatDateAndTime(fecha_cotiz)}</td>
        <td>{documento}</td>
        <td>{nombres}</td>
        <td>{apellidos}</td>
        <td>{correo}</td>
        <td>{nombre}</td>
        <td>{cantidad}</td>
        <td>{formatearCantidad(valor_unit)}</td>
        <td>{formatearCantidad(total)}</td>
    </>
  )
}

export default TableItemCotizaciones
