import React from 'react'

const Producto = ({product}) => {
  return (
    <div className="product_container mb-3">
          <div className="product_info">
            <p className='product_name' > {  product.nombre_producto.toUpperCase() } </p>
          </div>
          <img className='product_img' src="/producto-ejemplo.jpg" alt="Imagen" />
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
