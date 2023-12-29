import React from 'react'

const Producto = ({product}) => {

  const parts = product.img.split('/');
  const filenameWithExtension = parts.pop(); // Obtener el último segmento de la URL

  // Obtener solo la extensión del archivo
  const extension = filenameWithExtension.split('.').pop(); // Obtener la última parte después del último punto
  console.log(extension); // Esto mostrará 'jpeg' en la consola


  return (
    <div className="product_container mb-3">
          <div className="product_info">
            <p className='product_name' > {  product.nombre_producto.toUpperCase() } </p>
          </div>
          <img className='product_img' src={`data:image/${extension};base64,${product.base64Image}`} alt={product.nombre_producto} />
          <div>
            <label className="form-label">Descripcion</label>
            <input type="text" value={product.descripcion} disabled className="form-control product_desc" required />
          </div>
          <div>
            <label className="form-label">Cantidad de veces vendidas</label>
            <input type="text" value={product.cantidad_vendida} disabled className="form-control product_amount" required />
          </div>
    </div>
  )
}

export default Producto
