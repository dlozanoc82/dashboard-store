import React from 'react'
import { useResolvedPath } from 'react-router-dom';
import useClients from '../../../hooks/useClients';

const ClientsPDF = () => {

    const url = useResolvedPath("").pathname;
    console.log(url)
    const {generarPDFClientes} = useClients();
    const generarPDF = () => {
        console.log('GENERAR PDF CONSULTAR')
    }

  return (
    <div>
        {url === '/clientes' ?  <a onClick={() => generarPDFClientes()} className="submenu__link btn-danger mb-4">GENERAR PDF</a> : <></> }
        {url === '/clientes/consultar' ?  <a onClick={() => generarPDF()} className="submenu__link btn-danger mb-4">GENERAR PDF</a> : <></> }  
    </div>
  )
}

export default ClientsPDF
