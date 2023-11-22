import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

const VentasContext = createContext();

const VentasProvider = ({children}) => {

  const [ventas, setVentas] = useState([]);
  const [filteredVentas, setFilteredVentas] = useState([]);
  const [ventasByDates, setVentasByDates] = useState([])


  useEffect(() => {
    getVentas();
  }, [])
  

  const getVentas = async () => {        
    try {
        const url = "http://localhost/invensoft/ventas?ventas";
        const { data } = await axios(url);
        console.log(data);
        setVentas(data);
        setFilteredVentas(data);
    } catch (error) {
        console.log(error);
    }
  };

  const getVentasByDates = async (fechaInicial, fechaFinal) => {        
    try {
        const url = `http://localhost/invensoft/ventas?fecha_ini=${fechaInicial}&fecha_fin=${fechaFinal}`;
        const { data } = await axios(url);
        console.log('ventas por fecha')
        console.log(data);
        setVentasByDates(data);
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <VentasContext.Provider
        value={{
            ventas,
            getVentasByDates,
            ventasByDates
        }}
    >
        {children}
    </VentasContext.Provider>
  )
}

export { 
    VentasProvider
}

export default VentasContext;
