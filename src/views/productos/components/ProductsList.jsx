
const ProductsList = () => {
  return (
    <>
        <div className="formulario bg-white rounded shadow-sm">
            <h2 className="form__title">Listado de Productos</h2>

            <div className="product_container mb-3">
                <div className="product_info">
                    <p className='product_name' >Nombre del Producto</p>
                </div>
                <img className='product_img' src="/producto-ejemplo.jpg" alt="Imagen" />
                <div>
                    <label className="form-label">Descripcion</label>
                    <input type="text" disabled className="form-control product_desc" required />
                </div>
                <div>
                    <label className="form-label">Cantidad de veces vendidas</label>
                    <input type="text" disabled className="form-control product_amount" required />
                </div>
            </div>

        </div>
  </>
  )
}

export default ProductsList
