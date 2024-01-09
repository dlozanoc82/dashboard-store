import { formatDateAndTime, formatearCantidad } from "../../../helpers/GeneralFunctions";

const TableItemKardex = ({info}) => {
    const {id, cod_transaccion, entra_sale, fecha_transaccion, nombre, valor_pro, precio_venta, cantidad} = info;

    
  return (
    <>
        <td><center>{id}</center></td>
        <td><center>{formatDateAndTime(fecha_transaccion)}</center></td>
        <td><center>{entra_sale == 1 ? `Entrada # ${cod_transaccion}` : entra_sale == 2 ? `Salida # ${cod_transaccion}`: entra_sale == 3 ? `Apartado # ${info.cod_transaccion}` : `Salida (apartado) # ${info.cod_transaccion}`}</center></td>
        <td><center>{nombre}</center></td>
        <td><center>{entra_sale == 1 ? formatearCantidad(precio_venta) : formatearCantidad(valor_pro)}</center></td>
        <td><center>{cantidad}</center></td>
        <td><center>{entra_sale == 1 ? formatearCantidad(cantidad * precio_venta) : formatearCantidad(cantidad * valor_pro)}</center></td>
      
    </>
  )
}

export default TableItemKardex
