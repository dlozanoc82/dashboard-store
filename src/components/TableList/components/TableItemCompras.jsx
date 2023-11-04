import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const TableItemCompras = ({info}) => {
    const {cod_compra, fecha_compra, nom_cat, nom_sub, nombre, cantidad_compra, nom_prov, valor_total, valor_unit_prov} = info;

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
        <td></td>
        <td></td>
        <td>
        <div className="btn__actions">
            <button onClick={() => handleClick(documento)} className="btn btn-secondary btn-padding">
                <FontAwesomeIcon icon={faPencil} />
            </button>
            <button className="btn btn-danger btn-padding">
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
        </td>
    </>
  )
}

export default TableItemCompras
