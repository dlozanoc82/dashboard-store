import React from 'react'
import useCotizaciones from '../../../hooks/useCotizaciones';
import { useResolvedPath } from 'react-router-dom';

const CotizacionesPDF = () => {
    const url = useResolvedPath("").pathname;
    const {generarPDFCotizaciones, generarPDFCotizacionesByDates} = useCotizaciones();
  return (
    <>
      {url === '/cotizacion' ?  <a onClick={() => generarPDFCotizaciones()} className="submenu__link btn-danger mb-4">GENERAR PDF</a> : <></> }
      {url === '/cotizacion/consultar' ?  <a onClick={() => generarPDFCotizacionesByDates()} className="submenu__link btn-danger mb-4">GENERAR PDF</a> : <></> }
    </>
  )
}

export default CotizacionesPDF
