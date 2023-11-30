import React from 'react'
import { formatDateAndTime, formatearCantidad } from '../../../helpers/GeneralFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const TableItemApartados = ({info}) => {

    const {cod_pedido,fecha_abono, nombre, nombres, apellidos, documento, cantidad, valor_unit, cod_pago, total, saldo_restante, valor_abono} = info;

  return (
    <>
        <td><center>{cod_pedido}</center></td>
        <td><center>{nombre}</center></td>
        <td><center>{nombres} {apellidos}</center></td>
        <td><center>{documento}</center></td>
        <td><center>{cantidad}</center></td>
        <td><center>{formatearCantidad(valor_unit)}</center></td>
        <td><center>{cod_pago}</center></td>
        <td><center>{formatDateAndTime(fecha_abono)}</center></td>
        <td><center>{formatearCantidad(valor_abono)}</center></td>
        <td><center>{formatearCantidad(total)}</center></td>
        <td><center>{formatearCantidad(saldo_restante)}</center></td>    
        <td>
            <div className="btn__actions">
                <Link className="btn btn-secondary btn-padding">
                    <FontAwesomeIcon icon={faPencil} />
                </Link>
                <button className="btn btn-danger btn-padding">
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </td>
    </>
  )
}

export default TableItemApartados
