import React from 'react'
import { useResolvedPath } from 'react-router-dom';
import useKardex from '../../../hooks/useKardex';

const KardexPDF = () => {
    const {generarPDFLibroDiario} = useKardex();
    const url = useResolvedPath("").pathname;
  return (
    <>
        {url === '/kardex/libro-diario' ?  <a onClick={() => generarPDFLibroDiario()} className="submenu__link btn-danger mb-4">GENERAR PDF</a> : <></> }
    </>
  )
}

export default KardexPDF
