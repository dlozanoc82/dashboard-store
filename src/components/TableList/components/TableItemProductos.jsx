import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import useProducts from '../../../hooks/useProducts';

const TableItemProductos = ({info}) => {
 
    const {cod_cat, cod_sub, cod_pro, nom_cat, nom_sub, nombre, descripcion, estado, img, garantia, duracion_garantia, stock} = info;
    
    const {handleDeleteProductos, setProduct} = useProducts();

    const location = useLocation();
    console.log(location.pathname);
    const isListarProductos = location.pathname === "/productos";
  
    return (
      <>
          <td><center>{cod_pro}</center></td>
          <td><center>{img}</center></td>
          <td><center>{nom_cat}</center></td>
          <td><center>{nom_sub}</center></td>
          <td><center>{nombre}</center></td>
          <td><center>{descripcion}</center></td>
          <td><center>{estado === 1 ? 'ACTIVO' : 'INACTIVO'}</center></td>
          <td><center>{garantia}</center></td>
          <td><center>{duracion_garantia}</center></td>
          <td><center>{stock}</center></td>
          <td>
          <div className="btn__actions">
              <Link className="btn btn-secondary btn-padding">
                  <FontAwesomeIcon icon={faPencil} />
              </Link>
              <button onClick={() => handleDeleteProductos(cod_pro)} className="btn btn-danger btn-padding">
                  <FontAwesomeIcon icon={faTrash} />
              </button>
          </div>
          </td>
      </>
    )
}

export default TableItemProductos
