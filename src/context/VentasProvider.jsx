import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

const VentasContext = createContext();

const VentasProvider = ({children}) => {

  const [ventas, setVentas] = useState([]);
  const [filteredVentas, setFilteredVentas] = useState([]);
  const [ventasByDates, setVentasByDates] = useState([]);

  const [inputSearch, setInputSearch] = useState("");

  const [productosVendidos, setProductosVendidos] = useState([]);


  useEffect(() => {
    getVentas();
  }, [])

  useEffect(() => {
    getProductosMasVendidos();
  }, [])
  
  //FILTROS
  const filterByNameProduct = () => {
    const searchValue = inputSearch.toLowerCase();

    // Si no hay texto en el campo de búsqueda y el estado está vacío, mostramos todos los pagos
    if (searchValue.trim() === "") {
        setFilteredCompras(compras);
        return;
    }

    let filteredData = compras;

    filteredData = filteredData.filter((compra) =>
        compra.nombre.toLowerCase().includes(searchValue)
    );

    setFilteredCompras(filteredData);
  }


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


  const getProductosMasVendidos = async () => {        
    try {
        const url = "http://localhost/invensoft/ventas?vendidos";
        const { data } = await axios(url);
        console.log(data);
        setProductosVendidos(data);
    } catch (error) {
        console.log(error);
    }
  };

  

  return (
    <VentasContext.Provider
        value={{
            ventas,
            getVentasByDates,
            setVentasByDates,
            ventasByDates,
            inputSearch,
            setInputSearch,
            productosVendidos
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
