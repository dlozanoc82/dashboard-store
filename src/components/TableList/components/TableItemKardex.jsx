import { formatDateAndTime, formatearCantidad } from "../../../helpers/GeneralFunctions";

const TableItemKardex = ({info}) => {
    const {id, cod_transaccion, entra_sale, fecha_transaccion, nombre, valor_pro, precio_venta, cantidad, valor_abono} = info;

    
  return (
    <>
        <td><center>{id}</center></td>
        <td><center>{formatDateAndTime(fecha_transaccion)}</center></td>
        <td><center>{entra_sale == 1 ? `Entrada # ${cod_transaccion}` : entra_sale == 2 ? `Salida # ${cod_transaccion}`: entra_sale == 3 ? `Apartado # ${cod_transaccion}` : entra_sale == 30 ? `Apartado eliminado # ${cod_transaccion}`: entra_sale == 31 ? `Devolución (Apartado) # ${cod_transaccion}`: `Salida (apartado) # ${cod_transaccion}`}</center></td>
        <td><center>{nombre}</center></td>
        <td><center>{entra_sale == 1 ? formatearCantidad(valor_pro) : entra_sale == 2 ? formatearCantidad(precio_venta) : formatearCantidad(precio_venta)}</center></td>
        <td><center>{cantidad}</center></td>
        <td><center>{entra_sale == 1 ? formatearCantidad(cantidad * valor_pro) : entra_sale== 2 ? formatearCantidad(cantidad * precio_venta) : formatearCantidad(valor_abono)}</center></td>
      
    </>
  )
}

export default TableItemKardex
