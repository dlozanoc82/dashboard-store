import React, { useEffect, useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { formatearCantidad } from '../../../helpers/GeneralFunctions';
import useApartado from '../../../hooks/useApartado';

const HistorialAbonosModal = ({ cod_cot, onHide }) => {

    const {historialAbonosModal} = useApartado();
    const [historial, setHistorial] = useState([]);



    useEffect(() => {
        const nuevoArreglo = historialAbonosModal.reduce((resultado, item) => {
          const { cod_pago, valor_abono, fecha_abono } = item;
    
          const existente = resultado.find(
            (el) =>
              el.cod_pago === cod_pago &&
              el.valor_abono == valor_abono &&
              el.fecha_abono === fecha_abono
          );
    
          if (!existente) {
            resultado.push({
              fecha_abono,
              valor_abono,
              cod_pago,
            });
          }
    
          return resultado;
        }, []);
    
        setHistorial(nuevoArreglo);
      }, [historialAbonosModal]);
  



  return (
    <Modal show={true} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Historial de Abonos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Metodo Pago</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((item, index) => (
              <tr key={index}>
                <td>{item.fecha_abono}</td>
                <td>{ index !== 1 ? formatearCantidad(item.valor_abono*2) : formatearCantidad(item.valor_abono)}</td>
                <td>{item.cod_pago == 1 ? 'Nequi' : item.cod_pago == 2 ? 'Daviplata' : 'Efectivo'}</td>
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

export default HistorialAbonosModal;
