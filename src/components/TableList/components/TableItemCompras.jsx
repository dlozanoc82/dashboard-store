import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import useCompras from '../../../hooks/useCompras';
import { Link } from 'react-router-dom';

const TableItemCompras = ({info}) => {
  
  const {setCompra, handleDeleteCompra} = useCompras();
  const {cod_compra, fecha_compra, nom_cat, nom_sub, nombre, cantidad_compra, nom_prov, valor_total, valor_unit_prov, cod_cat, cod_sub, cod_pro, cod_prov} = info;


  return (
    <>
        <td>{cod_compra}</td>
        <td>{fecha_compra}</td>
        <td>{nom_cat}</td>
        <td>{nom_sub}</td>
        <th>{nombre}</th>
        <td>{cantidad_compra}</td>
        <td>{nom_prov}</td>
        <td>{valor_total}</td>
        <td>{valor_unit_prov}</td>
        <td>
        <div className="btn__actions">
            <Link onClick={() => setCompra({cod_compra, cod_cat, cod_sub, cod_pro, cod_prov, cantidad_compra, valor_unit_prov, valor_total} )} to={`/compras/editar/${cod_compra}`} className="btn btn-secondary btn-padding">
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
