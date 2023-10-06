import { useState } from "react";

export const AddClient = () => {

    const [selectedValue, setSelectedValue] = useState(''); // Estado para mantener el valor seleccionado

  const handleChange = (event) => {
    setSelectedValue(event.target.value); // Actualiza el estado cuando se selecciona un nuevo valor
  };

  return (
    <>
        <div className="formulario bg-white rounded shadow-sm">
            <h2 className="form__title">Agregar Cliente</h2>
            
            <div>
                <div className="form__header">
                    <h3 className="form__subtitle" >Informacion de la compra</h3>
                </div>

                <div>
                    <form className="mt-3">
                        <div className="row p-2 mb-3">

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Proveedor *</label>
                            <select className="form-select" value={selectedValue} onChange={handleChange}>
                                <option value="">Seleccione una opción</option>
                                <option value="opcion1">Opción 1</option>
                                <option value="opcion2">Opción 2</option>
                                <option value="opcion3">Opción 3</option>
                            </select>
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Nombre del Producto *</label>
                            <input type="text" className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Stock o Existencias *</label>
                            <input type="text" className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Precio de la Compra *</label>
                            <input type="number" className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Precio Unitario *</label>
                            <input type="number" className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Precio de Venta *</label>
                            <input type="number" className="form-control" required />
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
    </>
  )
}