import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const GarantiaContext = createContext();

const GarantiaProvider = ({children}) => {

  const [garantias, setGarantias] = useState([]);
  const [garantiasProceso, setGarantiasProceso] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [ventas, setVentas] = useState([]);


  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');


  const getCliente = async (documento) => {        
    try {
        const url = `http://localhost/invensoft/ventas?doc=${documento}`;
        const { data } = await axios(url);
        console.log(data);
        setApellidos(data[0].apellidos);
        setNombres(data[0].nombres);
        setCliente(data);
    } catch (error) {
        console.log(error);
    }
  };

  const getVentas = async (documento) => {        
    try {
        const url = `http://localhost/invensoft/garantias?cod_usu=${documento}`;
        const { data } = await axios(url);
        console.log(data);
        setVentas(data); 
    } catch (error) {
        console.log(error);
    }
  };

  const getGarantiasProceso = async (documento) => {        
    try {
        const url = `http://localhost/invensoft/garantias?gar_usu=${documento}`;
        const { data } = await axios(url);
        console.log(data);
        setGarantiasProceso(data); 
    } catch (error) {
        console.log(error);
    }
  };


  const createGarantiaEntrada = async (cod_venta, descripcion) => {
    //Crear el producto en la API
    try {
        const respuesta = await axios.post(`http://localhost/invensoft/garantias?cod_venta=${cod_venta}`, {
            descripcion: descripcion
        });
        
        Swal.fire({
            icon: 'success',
            title: 'Información Almacenada Correctamente',
            showConfirmButton: false,
            timer: 2000
        })

    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo salió mal!',
        })
    }
  }

  const createGarantiaSalida = async (cod_garantia) => {
    //Crear el producto en la API
    try {
        const respuesta = await axios.post(`http://localhost/invensoft/garantias?cod_venta=${cod_garantia}`);
        
        Swal.fire({
            icon: 'success',
            title: 'Garantia de Entrada Creada Correctamente',
            showConfirmButton: false,
            timer: 2000
        })

        
    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo salió mal!',
        })
    }
}

  return (
    <GarantiaContext.Provider
        value={{
            getCliente,
            getVentas,
            getGarantiasProceso,
            nombres,
            apellidos,
            ventas,
            cliente,
            garantiasProceso,
            setVentas,
            setNombres,
            setApellidos,
            setGarantiasProceso,
            createGarantiaEntrada
        }}
    >
        {children}
    </GarantiaContext.Provider>
  )
}

export {
    GarantiaProvider
}

export default GarantiaContext;