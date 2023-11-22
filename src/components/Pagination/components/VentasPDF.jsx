
import { useResolvedPath } from 'react-router-dom';
import useVentas from '../../../hooks/useVentas';

const VentasPDF = () => {
    const {generarPDFVentas, generarPDFComprasByDates} = useVentas()
    const url = useResolvedPath("").pathname;
  return (
    <>
        {url === '/ventas' ?  <a onClick={() => generarPDFVentas()} className="submenu__link btn-danger mb-4">GENERAR PDF</a> : <></> }
        {url === '/ventas/consultar' ?  <a onClick={() => generarPDFComprasByDates()} className="submenu__link btn-danger mb-4">GENERAR PDF</a> : <></> }  
    </>
  )
}

export default VentasPDF
