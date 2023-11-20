import React from 'react'
import { useResolvedPath } from 'react-router-dom';
import useCompras from '../../../hooks/useCompras';

const ComprasPDF = () => {
    const url = useResolvedPath("").pathname;
    const {generarPDFCompras, generarPDFComprasByDates} = useCompras();
  return (
    <>
      {url === '/compras' ?  <a onClick={() => generarPDFCompras()} className="submenu__link btn-danger mb-4">GENERAR PDF</a> : <></> }
      {url === '/compras/consultar' ?  <a onClick={() => generarPDFComprasByDates()} className="submenu__link btn-danger mb-4">GENERAR PDF</a> : <></> }  
    </>
  )
}

export default ComprasPDF
