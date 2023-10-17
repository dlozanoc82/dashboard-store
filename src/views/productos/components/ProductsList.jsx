
const ProductsList = () => {
  return (
    <>
        <div className="formulario bg-white rounded shadow-sm mb-5">
            <h2 className="form__title">Listado de Productos</h2>

            <div className="product_list-container mb-3">
                <div className="product_list-info">
                    <p className='product_name' >Nombre del Producto</p>
                </div>

                <img className='product_list-img' src="/producto-ejemplo.jpg" alt="Imagen" />

                <div>
                    <label className="form-label">Descripcion</label>
                    <input type="text" disabled className="form-control product_list-desc" required />
                </div>
                <div>
                    <label className="form-label">Precio de la Venta</label>
                    <input type="text" disabled className="form-control product_list-amount" required />
                </div>
                <div>
                    <label className="form-label">Estado</label>
                    <input type="text" disabled className="form-control product_list-state" required />
                </div>
                <div>
                    <label className="form-label">Stock</label>
                    <input type="text" disabled className="form-control product_list-stock" required />
                </div>
                <div>
                    <label className="form-label">Garantia</label>
                    <input type="text" disabled className="form-control product_list-garantia" required />
                </div>
                <div>
                    <label className="form-label">Duracion de la Garantia</label>
                    <input type="text" disabled className="form-control product_list-dgarantia" required />
                </div>

                <div className="d-grid gap-2 mt-3 boton-container">
                    <button className="btn btn-primary" type="submit">Modificar</button>
                    <button className="btn btn-danger" type="submit">Eliminar</button>
                </div>

            </div>

            <div className="product_list-container mb-3">
                <div className="product_list-info">
                    <p className='product_name' >Nombre del Producto</p>
                </div>

                <img className='product_list-img' src="/producto-ejemplo.jpg" alt="Imagen" />

                <div>
                    <label className="form-label">Descripcion</label>
                    <input type="text" disabled className="form-control product_list-desc" required />
                </div>
                <div>
                    <label className="form-label">Precio de la Venta</label>
                    <input type="text" disabled className="form-control product_list-amount" required />
                </div>
                <div>
                    <label className="form-label">Estado</label>
                    <input type="text" disabled className="form-control product_list-state" required />
                </div>
                <div>
                    <label className="form-label">Stock</label>
                    <input type="text" disabled className="form-control product_list-stock" required />
                </div>
                <div>
                    <label className="form-label">Garantia</label>
                    <input type="text" disabled className="form-control product_list-garantia" required />
                </div>
                <div>
                    <label className="form-label">Duracion de la Garantia</label>
                    <input type="text" disabled className="form-control product_list-dgarantia" required />
                </div>

                <div className="d-grid gap-2 mt-3 boton-container">
                    <button className="btn btn-primary" type="submit">Modificar</button>
                    <button className="btn btn-danger" type="submit">Eliminar</button>
                </div>

            </div>

        </div>
  </>
  )
}

export default ProductsList
