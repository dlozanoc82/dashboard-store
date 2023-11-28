import React, { useState } from 'react';
import useGarantia from '../../../hooks/useGarantia';

const GarantiaEntrada = () => {
    const { ventas, createGarantiaEntrada } = useGarantia();
    const [selectedProducto, setSelectedProducto] = useState(null);
    const [descripcion, setDescripcion] = useState('');

    const handleCheckboxChange = (codigoVenta) => {
        setSelectedProducto(codigoVenta === selectedProducto ? null : codigoVenta);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createGarantiaEntrada(selectedProducto, descripcion);
    }

    return (
        <div className='col-md-8 mb-md-4 m-auto pt-2'>
            <div className="form__header">
                <h3 className="form__subtitle mb-3">Información de la Garantía</h3>
            </div>

            <table className="table border">
                <thead>
                    <tr>
                        <th><center>Seleccionar</center></th>
                        <th><center>Fecha de la Compra</center></th>
                        <th><center>Nombre del Producto</center></th>
                        <th><center>Fecha Límite de la Garantía</center></th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta, index) => (
                        <tr key={index}>
                            <td><center><input type="checkbox" onChange={() => handleCheckboxChange(venta.cod_detalle)} checked={venta.cod_detalle === selectedProducto} /></center></td>
                            <td><center>{venta.fecha_venta}</center></td>
                            <td><center>{venta.nombre}</center></td>
                            <td><center>{venta.duracion_garantia}</center></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
            <div className="col-md-4 pt-3">
                <label className="form-label">Descripción *</label>
                <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} type="text" className="form-control" />
            </div>

            <div className="col-12 d-flex justify-content-center gap-3 pb-5">
                <button className="btn btn-primary" onClick={handleSubmit} type="submit">AGREGAR</button>
            </div>
        </div>
    );
}

export default GarantiaEntrada;
