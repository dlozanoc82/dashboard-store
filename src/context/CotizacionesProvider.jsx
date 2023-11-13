import axios from 'axios';
import { createContext, useEffect, useState } from 'react'

const CotizacionesContext = createContext();

const CotizacionesProvider = ({children}) => {

  const [cotizaciones, setCotizaciones] = useState([]);
  const [cotizacionesByDates, setCotizacionesByDates] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [filteredCotizaciones, setFilteredCotizaciones] = useState([]);

  useEffect(() => {
    getCotizaciones();
  }, [])

  useEffect(() => {
    filterByDocumentNumber();
  }, [inputSearch])
  
  const filterByDocumentNumber = () => {
    const searchValue = inputSearch; // No es necesario convertirlo a minúsculas si es un número

    // Si no hay texto en el campo de búsqueda y el estado está vacío, mostramos todos los pagos
    if (!searchValue) {
        setFilteredCotizaciones(cotizaciones);
        return;
    }

    let filteredData = cotizaciones;

    filteredData = filteredData.filter((cotizacion) =>
        cotizacion.documento.toString().startsWith(searchValue.toString())
    );

    setFilteredCotizaciones(filteredData);
};

  const getCotizaciones = async () => {        
    try {
        const url = "http://localhost/invensoft/cotizacion?cotizacion";
        const { data } = await axios(url);
        console.log({data});
        setCotizaciones(data);
        setFilteredCotizaciones(data);
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
            setCotizacionesByDates,
            inputSearch,
            setInputSearch,
            filteredCotizaciones
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
