import React, { useState } from 'react'
import { formatDateAndTime, formatearCantidad } from '../../../helpers/GeneralFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import ApartadosModal from './ApartadosModal'; 
import useApartado from '../../../hooks/useApartado';
import AbonosModal from './AbonosModal';
import HistorialAbonosModal from './HistorialAbonosModal';

const TableItemApartados = ({info}) => {

    const {
        cod_cot,
        total_abonado,
        tipo_pago,
        fecha_limite_pago,
        total_a_pagar,
        saldo_restante,
        nombres,
        apellidos,
        documento,
        items} = info;

    const {handleDeleteApartado, getHistorial, setHistorialAbonosModal} = useApartado();

    const tipoPago = tipo_pago == 1 ? 'Nequi' : (tipo_pago == 2 ? 'Daviplata' : 'Efectivo');
    
    const [showModal, setShowModal] = useState(false);
    const [showModalAbonos, setShowModalAbonos] = useState(false);
    const [showHModalAbonos, setShowHModalAbonos] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleShowModalAbonos = () => setShowModalAbonos(true);
    const handleCloseModalAbonos = () => setShowModalAbonos(false);

    const handleShowModalHAbonos = () => {
        getHistorial(cod_cot);
        setShowHModalAbonos(true);
    }
    const handleCloseModalHAbonos = () => {
        setShowHModalAbonos(false)
    };

  return (
    <>
        <td><center>{cod_cot}</center></td>
        <td><center>{formatDateAndTime(fecha_limite_pago)}</center></td>
        <td><center>{nombres} {apellidos}</center></td>
        <td><center>{documento}</center></td>
        <td><center>{tipoPago}</center></td>
        <td><center>{formatearCantidad (total_abonado)}</center></td>
        <td><center>{formatearCantidad (saldo_restante)}</center></td>
        <td><center>{formatearCantidad (total_a_pagar)}</center></td>
 
        <td><center>
            <div className="btn__actions">
                <Link onClick={handleShowModalAbonos} className="btn btn-danger btn-padding">
                    Abonos
                </Link>
                <button onClick={handleShowModalHAbonos} className="btn btn-danger btn-padding">
                    Historial Abonos
                </button>
            </div></center>
        </td>    
        <td><center>
            <div className="btn__actions">
                <Link onClick={handleShowModal} className="btn btn-secondary btn-padding">
                    <FontAwesomeIcon icon={faEye} />
                </Link>
                <button onClick={() => handleDeleteApartado(cod_cot)} className="btn btn-danger btn-padding">
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div></center>
        </td>

        {showModal && (
            <ApartadosModal items={items} onHide={handleCloseModal} />
        )}

        {showModalAbonos && (
            <AbonosModal cod_cot={cod_cot} saldo_restante={saldo_restante} onHide={handleCloseModalAbonos} />
        )}

        {showHModalAbonos && (
            <HistorialAbonosModal  onHide={handleCloseModalHAbonos} />
        )}


    </>
  )
}

export default TableItemApartados
