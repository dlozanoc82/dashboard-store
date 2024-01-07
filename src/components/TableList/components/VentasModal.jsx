import React, { useState } from 'react';
import { formatDateAndTime, formatearCantidad } from '../../../helpers/GeneralFunctions';
import { Modal, Table } from 'react-bootstrap'; // Asumiendo que estás utilizando react-bootstrap para los modales y tablas

const VentasModal = ({ productos, onHide }) => {
  return (
    <Modal show={true} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalle Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>SubTotal</th>
              <th>Ganancias</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{producto.nombre}</td>
                <td>{producto.cantidad}</td>
                <td>{formatearCantidad(producto.valor_venta)}</td>
                <td>{formatearCantidad(producto.valor_total_producto)}</td>
                <td>{formatearCantidad(producto.ganancias)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default VentasModal;
