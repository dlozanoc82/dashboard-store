import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const TableItemProductos = ({info}) => {
 
    const {cod_pro, nom_cat, nom_sub, nombre, descripcion, estado, img, garantia, duracion_garantia, stock} = info;
    
    const location = useLocation();
    console.log(location.pathname);
    const isListarProductos = location.pathname === "/productos";
  
    return (
      <>
          <td>{cod_pro}</td>
          <td>{img}</td>
          <td>{nom_cat}</td>
          <td>{nom_sub}</td>
          <td>{nombre}</td>
          <td>{descripcion}</td>
          <td>{estado === 1 ? 'ACTIVO' : 'INACTIVO'}</td>
          <td>{garantia}</td>
          <td>{duracion_garantia}</td>
          <td>{stock}</td>
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

export default TableItemProductos
