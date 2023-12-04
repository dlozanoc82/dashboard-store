import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Ajusta según tus dependencias y estilos
import Swal from 'sweetalert2';
import useApartado from '../../../hooks/useApartado';

const AbonosModal = ({ cod_cot, saldo_restante, onHide }) => {
  const [valorAbono, setValorAbono] = useState('');
  const [tipoPago, setTipoPago] = useState('');

  const {getApartados} = useApartado();

  const handleAbonoSubmit = async () => {
    // Validar que se ingresen datos válidos antes de enviar el abono
    if (valorAbono.trim() === '' || tipoPago.trim() === '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Todos los campos son obligatorios",
          });
      return;
    }

    if (valorAbono > saldo_restante) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El valor del abono no puede ser mayor al saldo restante",
          });
      return;
    }

    if (valorAbono == saldo_restante) {
        
        let confirmado = Swal.fire({
            title: "Con este pago terminas de pagar el apartado",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Si",
            denyButtonText: `No`
        });

        try {

            if (confirmado.isConfirmed) {
                const respuesta = await axios(`http://localhost/invensoft/apartados?cod_cot=83&abono=20000&cod_pago=1`);

                Swal.fire({
                    icon: 'success',
                    title: 'Venta Finalizada Corectamente',
                    showConfirmButton: false,
                    timer: 2000
                })
            } else {
                Swal.fire("Operación detenida", "", "info");
            }

            getClients();
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Algo salió mal!',
            })
        }


      return;
    }

    // Enviar los datos del abono al componente padre
    try {
        const total = valorAbono / 2;
        const respuesta = await axios(`http://localhost/invensoft/apartados?cod_cot=${cod_cot}&abono=${total}&cod_pago=${tipoPago}`);
        
        getApartados();
        Swal.fire({
            icon: 'success',
            title: 'Venta Finalizada Corectamente',
            showConfirmButton: false,
            timer: 2000
        })
        
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo salió mal!',
        })
    }

    // Limpiar los campos y cerrar el modal
    setValorAbono('');
    setTipoPago('');
    onHide();
  };





  return (
    <Modal show={true} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Realizar Abono</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        <Form.Group controlId="formCodCotizacion" style={{ marginBottom: '15px' }}>
            <Form.Label>Numero del Apartado</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={cod_cot}
            />
          </Form.Group>
        <Form.Group controlId="formValorRestante" style={{ marginBottom: '15px' }}>
            <Form.Label>Valor Restante</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={`$ ${saldo_restante.toFixed(2)}`}
            />
          </Form.Group>
          <Form.Group controlId="formValorAbono" style={{ marginBottom: '15px' }}>
            <Form.Label>Valor a Abonar</Form.Label>
            <Form.Control
              min={0}
              type="number"
              placeholder="Ingrese el valor a abonar"
              value={valorAbono}
              onChange={(e) => setValorAbono(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formTipoPago" style={{ marginBottom: '15px' }}>
            <Form.Label>Tipo de Pago</Form.Label>
            <Form.Control
              as="select"
              value={tipoPago}
              onChange={(e) => setTipoPago(e.target.value)}
            >
              <option value="">Seleccionar tipo de pago</option>
              <option value="1">Nequi</option>
              <option value="2">Daviplata</option>
              <option value="3">Efectivo</option>
              {/* Agrega más opciones según sea necesario */}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleAbonoSubmit}>
          Realizar Abono
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AbonosModal;