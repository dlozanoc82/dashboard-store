import { useState } from "react";

const AddApartado = () => {
  const [selectedValue, setSelectedValue] = useState(''); // Estado para mantener el valor seleccionado

  const handleChange = (event) => {
    setSelectedValue(event.target.value); // Actualiza el estado cuando se selecciona un nuevo valor
  };

  return (
    <div className="formulario bg-white rounded shadow-sm mb-5">
      <h2 className="form__title">Agregar Apartado</h2>

      <div>
          <div className="form__header">
              <h3 className="form__subtitle<">Información del Cliente</h3>
          </div>

          <div>
              <form className="mt-3">
                  <div className="row p-2 mb-3">
                    <div className="col-md-4 mb-md-4">
                        <label className="form-label">Numero de Documento *</label>
                        <input type="number" className="form-control" required />
                    </div>
                    <div className="col-md-4 d-flex justify-content-start align-items-center mt-2">
                      <button className="btn btn-primary" type="submit">Consultar</button>
                    </div>
                  </div>
              </form>
          </div>
      </div>
      
      <div>
          <div className="form__header">
              <h3 className="form__subtitle<">Información de la Venta</h3>
          </div>

          <div>
              <form className="mt-3">
                  <div className="row p-2 mb-3">

                  <div className="col-md-4 mb-md-4">
                      <label className="form-label">Categoria *</label>
                      <select className="form-select" value={selectedValue} onChange={handleChange}>
                          <option value="">Seleccione una opción</option>
                          <option value="opcion1">Opción 1</option>
                          <option value="opcion2">Opción 2</option>
                          <option value="opcion3">Opción 3</option>
                      </select>
                  </div>

                  <div className="col-md-4 mb-md-4">
                      <label className="form-label">Subcategoria *</label>
                      <select className="form-select" value={selectedValue} onChange={handleChange}>
                          <option value="">Seleccione una opción</option>
                          <option value="opcion1">Opción 1</option>
                          <option value="opcion2">Opción 2</option>
                          <option value="opcion3">Opción 3</option>
                      </select>
                  </div>

                  <div className="col-md-4 mb-md-4">
                      <label className="form-label">Nombre del Producto *</label>
                      <select className="form-select" value={selectedValue} onChange={handleChange}>
                          <option value="">Seleccione una opción</option>
                          <option value="opcion1">Opción 1</option>
                          <option value="opcion2">Opción 2</option>
                          <option value="opcion3">Opción 3</option>
                      </select>
                  </div>

                  <div className="col-md-4 mb-md-4">
                      <label className="form-label">Stock</label>
                      <input type="text" disabled className="form-control" required />
                  </div>

                  <div className="col-md-4 mb-md-4">
                      <label className="form-label">Proovedor *</label>
                      <select className="form-select" value={selectedValue} onChange={handleChange}>
                          <option value="">Seleccione una opción</option>
                          <option value="opcion1">Opción 1</option>
                          <option value="opcion2">Opción 2</option>
                          <option value="opcion3">Opción 3</option>
                      </select>
                  </div>

                  <div className="col-md-4 mb-md-4">
                      <label className="form-label">Tipo de Pago *</label>
                      <select className="form-select" value={selectedValue} onChange={handleChange}>
                          <option value="">Seleccione una opción</option>
                          <option value="opcion1">Opción 1</option>
                          <option value="opcion2">Opción 2</option>
                          <option value="opcion3">Opción 3</option>
                      </select>
                  </div>

                  <div className="col-md-4 mb-md-4">
                      <label className="form-label">Cantidad de Productos *</label>
                      <input type="number" className="form-control" required />
                  </div>

                  <div className="col-md-4 mb-md-4">
                      <label className="form-label">Precio Unitario *</label>
                      <input type="number" className="form-control" required />
                  </div>

                  <div className="col-md-4 mb-md-4">
                      <label className="form-label">Precio Total *</label>
                      <input type="number" className="form-control" required />
                  </div>

                  <div className="col-md-4 mb-md-4">
                      <label className="form-label">Fecha limite de Pago *</label>
                      <input type="date" className="form-control" required />
                  </div>

                  </div>

                  <div className="col-12 d-flex justify-content-center gap-3">
                      <button className="btn btn-secondary" type="submit">Limpiar</button>
                      <button className="btn btn-primary" type="submit">Agregar</button>
                  </div>
              </form>
          </div>
      </div>
    </div>
  )
}

export default AddApartado
