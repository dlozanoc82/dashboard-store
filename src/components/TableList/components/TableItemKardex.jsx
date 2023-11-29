import { formatDateAndTime, formatearCantidad } from "../../../helpers/GeneralFunctions";

const TableItemKardex = ({info}) => {
    const {id, cod_transaccion, entra_sale, fecha_transaccion, nombre, valor_pro, precio_venta, cantidad} = info;

    
  return (
    <>
        <td><center>{id}</center></td>
        <td><center>{formatDateAndTime(fecha_transaccion)}</center></td>
        <td><center>{entra_sale === 1 ? 'ENTRADA' : 'SALIDA'}</center></td>
        <td><center>{nombre}</center></td>
        <td><center>{entra_sale === 1 ? valor_pro : precio_venta}</center></td>
        <td><center>{cantidad}</center></td>
        <td><center>{entra_sale === 1 ? cantidad * valor_pro : cantidad * precio_venta}</center></td>
      
    </>
  )
}

export default TableItemKardex
