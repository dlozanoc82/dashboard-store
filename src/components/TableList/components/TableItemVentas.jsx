
import { formatDateAndTime, formatearCantidad } from '../../../helpers/GeneralFunctions';

const TableItemVentas = ({info}) => {

    const {apellidos,
        cantidad,
        cod_detalle,
        cod_pago,
        cod_ven,
        documento,
        fecha_venta,
        ganancias,
        nombre,
        nombres,
        valor_total_producto,
        valor_venta} = info;

    const tipoPago = cod_pago === 1 ? 'Nequi' : (cod_pago === 2 ? 'Daviplata' : 'Efectivo');

  return (
    <>
        <td><center>{cod_ven}</center></td>
        <td><center>{formatDateAndTime(fecha_venta)}</center></td>
        <td><center>{nombres} {apellidos}</center></td>
        <td><center>{documento}</center></td>
        <th><center>{nombre}</center></th>
        <td><center>{cantidad}</center></td>
        <td><center>{formatearCantidad(valor_venta)}</center></td>
        <td><center>{tipoPago}</center></td>
        <td><center>{formatearCantidad(valor_total_producto)}</center></td>
        <td><center>{formatearCantidad(ganancias)}</center></td>
    </>
  )
}

export default TableItemVentas
