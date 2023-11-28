import React from 'react';
import GarantiaEntrada from './GarantiaEntrada';
import GarantiaSalida from './GarantiaSalida';
import useGarantia from '../../../hooks/useGarantia';
import { useState } from 'react';

const Garantia = () => {
  const { nombres, apellidos, getCliente, cliente, getVentas, getGarantiasProceso, setVentas, setNombres, setApellidos, setGarantiasProceso } = useGarantia();
  const [tipoProceso, setTipoProceso] = useState('0');
  const [documento, setDocumento] = useState('');

  const isDisabled = tipoProceso === '0';

  const handleSubmitClient = (e) => {
    e.preventDefault();
    getCliente(documento);

    if (tipoProceso === '1') {
      getVentas(cliente[0].cod_usu)
    }

    if (tipoProceso === '2') {
      getGarantiasProceso(cliente[0].cod_usu)
    }

  };

  const handleTipoProcesoChange = (e) => {
    setTipoProceso(e.target.value);
    setDocumento(''); // Limpiar el input del documento
    setVentas([]); // Reiniciar la variable de ventas
    setNombres('');
    setApellidos('');
    setGarantiasProceso([]);
  };

  return (
    <div className="container-fluid px-4 mt-5">
      <div className="formulario bg-white rounded shadow-sm">
        <h2 className="form__title">Agregar Garantia</h2>

        <div>
          <form onSubmit={handleSubmitClient} className="mt-3">
            <div className="row p-2 mb-3">
              <div className="col-md-4 mb-md-4">
                <label className="form-label">Tipo de Garantia *</label>
                <select
                  value={tipoProceso}
                  onChange={handleTipoProcesoChange}
                  className="form-select"
                >
                  <option value="0">Seleccione una opción</option>
                  <option value="1">ENTRADA</option>
                  <option value="2">SALIDA</option>
                </select>
              </div>

              <div className="col-md-4 mb-md-4">
                <label className="form-label">Documento *</label>
                <input
                  disabled={isDisabled}
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  type="number"
                  pattern="[0-9]*"
                  className="form-control"
                />
              </div>

              <div className="col-md-4 mt-4">
                <button className="btn btn-primary" type="submit">
                  Consultar
                </button>
              </div>

              <div hidden={isDisabled} className="col-md-4 mb-md-4">
                <label className="form-label">Cliente</label>
                <input
                  disabled
                  type="text"
                  value={`${nombres} ${apellidos}`}
                  className="form-control"
                />
              </div>
            </div>
          </form>
        </div>

        {tipoProceso === '0' ? (
          <></>
        ) : tipoProceso === '1' ? (
          <GarantiaEntrada />
        ) : (
          <GarantiaSalida />
        )}
      </div>
    </div>
  );
};

export default Garantia;
