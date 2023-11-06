import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import useCompras from '../../../hooks/useCompras';

const TableItemCompras = ({info}) => {
  
  const {setCompraUpdate, handleDeleteCompra} = useCompras();
  const {cod_compra, fecha_compra, nom_cat, nom_sub, nombre, cantidad_compra, nom_prov, valor_total, valor_unit_prov} = info;

  const handleUpdateCompra = () => {
    setCompraUpdate([
        cod_compra,
        cantidad_compra,
        valor_unit_prov,
        valor_total
    ])
  }



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
            <button onClick={() => handleUpdateCompra()} className="btn btn-secondary btn-padding">
                <FontAwesomeIcon icon={faPencil} />
            </button>
            <button className="btn btn-danger btn-padding">
                <FontAwesomeIcon onClick={() => handleDeleteCompra(cod_compra)} icon={faTrash} />
            </button>
        </div>
        </td>
    </>
  )
}

export default TableItemCompras
