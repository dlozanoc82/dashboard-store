import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import useCompras from '../../../hooks/useCompras';
import { Link } from 'react-router-dom';
import { formatDateAndTime, formatearCantidad } from '../../../helpers/GeneralFunctions';

const TableItemCompras = ({info}) => {
  
  const {setCompra, handleDeleteCompra} = useCompras();
  const {id, cod_compra,valor_venta, fecha_compra, nom_cat, nom_sub, nombre, cantidad_compra, nom_prov, valor_total, valor_unit_prov, cod_cat, cod_sub, cod_pro, cod_prov, stock} = info;

  console.log({stock})

  return (
    <>
        <td><center>{id}</center></td>
        <td><center>{formatDateAndTime(fecha_compra)}</center></td>
        <td><center>{nom_cat}</center></td>
        <td><center>{nom_sub}</center></td>
        <th><center>{nombre}</center></th>
        <td><center>{cantidad_compra}</center></td>
        <td><center>{nom_prov}</center></td>
        <td><center>{formatearCantidad(valor_total)}</center></td>
        <td><center>{formatearCantidad(valor_unit_prov)}</center></td>
        <td><center>{formatearCantidad(valor_venta)}</center></td>
        <td>
        <div className="btn__actions">
            <Link onClick={() => setCompra({cod_compra, cod_cat, cod_sub, cod_pro, cod_prov, cantidad_compra, valor_unit_prov, valor_venta, valor_total, stock} )} to={`/compras/editar/${cod_compra}`} className="btn btn-secondary btn-padding">
                <FontAwesomeIcon icon={faPencil} />
            </Link>
            <button className="btn btn-danger btn-padding">
                <FontAwesomeIcon onClick={() => handleDeleteCompra(cod_compra)} icon={faTrash} />
            </button>
        </div>
        </td>
    </>
  )
}

export default TableItemCompras
