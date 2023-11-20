import React from 'react'
import { useResolvedPath } from 'react-router-dom';
import useClients from '../../../hooks/useClients';

const ClientsPDF = () => {

    const url = useResolvedPath("").pathname;
    const {generarPDFClientes, generarPDFClientesByDates} = useClients();

  return (
    <>
        {url === '/clientes' ?  <a onClick={() => generarPDFClientes()} className="submenu__link btn-danger mb-4">GENERAR PDF</a> : <></> }
        {url === '/clientes/consultar' ?  <a onClick={() => generarPDFClientesByDates()} className="submenu__link btn-danger mb-4">GENERAR PDF</a> : <></> }  
    </>
  )
}

export default ClientsPDF
