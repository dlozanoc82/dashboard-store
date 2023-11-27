import React from 'react'

const Garantia = () => {
  return (
    <div className="container-fluid px-4 mt-5">

      <div className="formulario bg-white rounded shadow-sm">

        <h2 className="form__title">Agregar Garantia</h2>

        <div>        
            <form className="mt-3">
                <div className="row p-2 mb-3">

                    <div className="col-md-4 mb-md-4">
                        <label className="form-label">Tipo de Garantia *</label>
                        <select className="form-select">
                            <option value="0">Seleccione una opción</option>
                            <option value="1">ENTRADA</option>
                            <option value="2">SALIDA</option>
                        </select>
                    </div>

                    <div className="col-md-4 mb-md-4">
                        <label className="form-label">Documento *</label>
                        <input type="number" pattern="[0-9]*" className="form-control" />
                    </div>

                    <div className="col-md-4 mt-4">
                      <button className="btn btn-primary" type="submit">Consultar</button>
                    </div>

                </div>
            </form>
                             
        </div>

        <div className='col-md-8 mb-md-4 m-auto pt-2'>

          <div className="form__header">
                <h3 className="form__subtitle mb-3">Información de la Garantia</h3>
          </div>

          <table className="table border">
              <thead>
                  <tr>
                      <th><center>Fecha de la Compra</center></th>
                      <th><center>Nombre del Porducto</center> </th>
                      <th><center>Fecha Limite de la Garantia</center></th>
                  </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
          </table>

          <div className="col-md-4 pt-3">
              <label className="form-label">Descripcion *</label>
              <textarea type="text"className="form-control" />
          </div>

          <div className="col-12 d-flex justify-content-center gap-3 pb-5">
              <button className="btn btn-primary" type="submit">AGREGAR</button>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Garantia
