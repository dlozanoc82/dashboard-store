import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import useProducts from '../../../hooks/useProducts';

const TableItemProductos = ({info}) => {
 
    const {cod_cat, cod_sub, cod_pro, nom_cat, nom_sub, nombre, descripcion, estado, img, garantia, duracion_garantia, stock, base64Image} = info;
    
    const {handleDeleteProductos, setProduct} = useProducts();
    

    const location = useLocation();
    console.log(location.pathname);
    const isListarProductos = location.pathname === "/productos";

    // Obtener el nombre del archivo con la extensión
    const parts = img.split('/');
    const filenameWithExtension = parts.pop(); // Obtener el último segmento de la URL

    // Obtener solo la extensión del archivo
    const extension = filenameWithExtension.split('.').pop(); // Obtener la última parte después del último punto
    console.log(extension); // Esto mostrará 'jpeg' en la consola
  
    return (
        
      <>
          <td><center>{cod_pro}</center></td>
          <td><center><img src={`data:image/${extension};base64,${base64Image}`} alt={descripcion} width="50px" height="60px"/></center></td>
          <td><center>{nom_cat}</center></td>
          <td><center>{nom_sub}</center></td>
          <td><center>{nombre}</center></td>
          <td><center>{descripcion}</center></td>
          <td><center>{estado == 1 ? 'ACTIVO' : 'INACTIVO'}</center></td>
          <td><center>{garantia == 1 ? 'Si' : 'No'}</center></td>
          <td><center>{duracion_garantia}</center></td>
          <td><center>{stock}</center></td>
          <td>
          <div className="btn__actions">
              <Link onClick={() => setProduct({cod_cat, cod_sub, nombre, descripcion, garantia, duracion_garantia})} to={`/productos/editar/${cod_pro}`}  className="btn btn-secondary btn-padding">
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
