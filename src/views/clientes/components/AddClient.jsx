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
                    <h3 className="form__subtitle" >DATOS DEL CLIENTE</h3>
                </div>

                <div>
                    <form className="mt-3">
                        <div className="row p-2 mb-3">

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Nombres *</label>
                            <input type="text" className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Apellidos *</label>
                            <input type="text" className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Correo Electronico *</label>
                            <input type="email" className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Número de Documento *</label>
                            <input type="number" className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Celular *</label>
                            <input type="number" className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Dirección *</label>
                            <input type="text" className="form-control" required />
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