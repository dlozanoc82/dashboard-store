import { useContext } from 'react'
import CotizacionesContext from '../context/CotizacionesProvider';

const useCotizaciones = () => {
  return useContext(CotizacionesContext);
}

export default useCotizaciones;
