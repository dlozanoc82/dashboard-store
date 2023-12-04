import React, { useState } from 'react';
import { Modal, Table } from 'react-bootstrap'; // Asumiendo que estás utilizando react-bootstrap para los modales y tablas

const VentasModal = ({ productos, onHide }) => {
  return (
    <Modal show={true} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalles de Productos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio Unitario</th>
              <th>Cantidad</th>
              <th>Valor Venta</th>
              <th>Ganancias</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr key={index}>
                <td>{producto.nombre}</td>
                <td>{producto.valor_venta}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.valor_total_producto}</td>
                <td>{producto.ganancias < 0 ? producto.ganancias*-1 : producto.ganancias}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default VentasModal;
