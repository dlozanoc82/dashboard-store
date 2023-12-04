import React, { useEffect, useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { formatearCantidad } from '../../../helpers/GeneralFunctions';

const ApartadosModal = ({ items, onHide }) => {

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const data = eliminarDuplicados(items);
    setProductos(data);
  }, [])
  

  const eliminarDuplicados = (arr) => {
    const uniqueItems = [];
  
    arr.forEach((item) => {
      const existe = uniqueItems.some(
        (uniqueItem) =>
          uniqueItem.nombre === item.nombre && uniqueItem.valor_unit === item.valor_unit
      );
  
      if (!existe) {
        uniqueItems.push(item);
      }
    });
  
    return uniqueItems;
  };

  return (
    <Modal show={true} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Apartado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Valor Unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((item, index) => (
              <tr key={index}>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
                <td>{formatearCantidad(item.valor_unit)}</td>
                <td>{formatearCantidad(item.valor_unit*item.cantidad)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApartadosModal;
