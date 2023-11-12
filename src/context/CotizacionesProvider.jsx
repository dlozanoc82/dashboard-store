import axios from 'axios';
import { createContext, useEffect, useState } from 'react'

const CotizacionesContext = createContext();

const CotizacionesProvider = ({children}) => {

  const [cotizaciones, setCotizaciones] = useState([]);
  const [cotizacionesByDates, setCotizacionesByDates] = useState([]);

  useEffect(() => {
    getCotizaciones();
  }, [])
  

  const getCotizaciones = async () => {        
    try {
        const url = "http://localhost/invensoft/cotizacion?cotizacion";
        const { data } = await axios(url);
        console.log({data});
        setCotizaciones(data);
    } catch (error) {
        console.log({error});
    }
  };

  const getCotizacionesByDates = async (fechaInicial, fechaFinal) => {        
    try {
        const url = `http://localhost/invensoft/cotizacion?fecha_ini=${fechaInicial}&fecha_fin=${fechaFinal}`;
        const { data } = await axios(url);
        console.log({data});
        setCotizacionesByDates(data);
    } catch (error) {
        console.log({error});
    }
  };


  return (
    <CotizacionesContext.Provider
        value={{
            cotizaciones,
            getCotizacionesByDates,
            cotizacionesByDates,
            setCotizacionesByDates
        }}
    >
        {children}
    </CotizacionesContext.Provider>
  )
}

export { 
    CotizacionesProvider
}

export default CotizacionesContext;
