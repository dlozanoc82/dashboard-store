import React from 'react'
import useGarantia from '../../../hooks/useGarantia';
import { formatDateAndTime } from '../../../helpers/GeneralFunctions';

const GarantiaSalida = () => {
    const { garantiasProceso, createGarantiaSalida, handleTerminarGarantia } = useGarantia();
  return (
    <div className='col-md-9 mb-md-4 m-auto pt-2'>

          <div className="form__header">
                <h3 className="form__subtitle mb-3">Garantias Realizada</h3>
          </div>

        <div className='table__scroll'>
          <table className="table border">
              <thead>
                  <tr>
                      <th><center>Nombre del Cliente</center></th>
                      <th><center>Celular</center> </th>
                      <th><center>Nombre del Producto</center></th>
                      <th><center>Descripcion</center></th>
                      <th><center>Fechas Entrada</center></th>
                      <th><center>Fechas Salida</center></th>
                      <th><center>Estado</center></th>
                  </tr>
              </thead>
              <tbody>
                {garantiasProceso.map((garantias, index) => (
                    <tr key={index}>
                        <td><center>{garantias.nombres} {garantias.apellidos}</center></td>
                        <td><center>{garantias.celular}</center></td>
                        <td><center>{garantias.nombre}</center></td>
                        <td><center>{garantias.descripcion}</center></td>
                        <td><center>{formatDateAndTime(garantias.fecha_entrada)}</center></td>
                        <td><center>{ garantias.fecha_salida==='0000-00-00 00:00:00' ? 'NO APLICA' : formatDateAndTime(garantias.fecha_salida)}</center></td>
                        <td> 
                            <center>
                                {garantias.estado == 2 ? 
                                    <button className='btn btn-danger disabled'>TERMINADO</button> : 
                                    <button onClick={() => handleTerminarGarantia(garantias.cod_garantia)} className='btn btn-danger'>TERMINADO</button>}
                            </center>
                        </td>
                    </tr>
                ))}
              </tbody>
          </table>
        </div>
    </div>
  )
}

export default GarantiaSalida
