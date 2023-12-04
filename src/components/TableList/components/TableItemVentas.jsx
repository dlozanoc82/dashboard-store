import React, { useState } from 'react';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { formatDateAndTime, formatearCantidad } from '../../../helpers/GeneralFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import VentasModal from './VentasModal'; // Ajusta la ruta según la ubicación real de tu componente

const TableItemVentas = ({ info }) => {
  const {
    apellidos,
    cod_venta,
    nombres,
    fecha_venta,
    documento,
    cod_pago,
    productos,
    total_venta
  } = info;


  const tipoPago = cod_pago == 1 ? 'Nequi' : cod_pago == 2 ? 'Daviplata' : 'Efectivo';

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <td>
        <center>{cod_venta}</center>
      </td>
      <td>
        <center>{formatDateAndTime(fecha_venta)}</center>
      </td>
      <td>
        <center>{nombres} {apellidos}</center>
      </td>
      <td>
        <center>{documento}</center>
      </td>
      <td>
        <center>{tipoPago}</center>
      </td>
      <td>
        <center>{formatearCantidad(total_venta)}</center>
      </td>
      <td>
        <center>
          <div className="btn__actions">
            <Link className="btn btn-secondary btn-padding" onClick={handleShowModal}>
              <FontAwesomeIcon icon={faEye} />
            </Link>
          </div>
        </center>
      </td>

      {showModal && (
        <VentasModal productos={productos} onHide={handleCloseModal} />
      )}
    </>
  );
};

export default TableItemVentas;
