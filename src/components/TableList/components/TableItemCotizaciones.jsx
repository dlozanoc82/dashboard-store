import { formatDateAndTime, formatearCantidad } from "../../../helpers/GeneralFunctions";

const TableItemCotizaciones = ({info}) => {
    const {id, fecha_cotiz, documento, nombres, apellidos, correo, nombre, cantidad, valor_unit, total} = info;

    
  return (
    <>
        <td><center>{id}</center></td>
        <td><center>{formatDateAndTime(fecha_cotiz)}</center></td>
        <td><center>{documento}</center></td>
        <td><center>{nombres}</center></td>
        <td><center>{apellidos}</center></td>
        <td><center>{correo}</center></td>
        <td><center>{nombre}</center></td>
        <td><center>{cantidad}</center></td>
        <td><center>{formatearCantidad(valor_unit)}</center></td>
        <td><center>{formatearCantidad(total)}</center></td>
    </>
  )
}

export default TableItemCotizaciones
