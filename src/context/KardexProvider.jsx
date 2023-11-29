import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const KardexContext = createContext();

const KardexProvider = ({children}) => {

  const [libroDiario, setLibroDiario] = useState([])
  const [infoKardex, setInfoKardex] = useState([]);
  const [minimo, setMinimo] = useState('');
  const [maximo, setMaximo] = useState('');

  const getKardexByProducto = async (fecha_ini, fecha_fin, cod_pro) => {        
    try {
        const url = `http://localhost/invensoft/kardex?fecha_ini=${fecha_ini}&fecha_fin=${fecha_fin}&cod_pro=${cod_pro}`;
        const { data } = await axios(url);
        console.log(data);
        setInfoKardex(data);
        
        Swal.fire({
          icon: 'success',
          title: 'Información Consultada Correctamente',
          showConfirmButton: false,
          timer: 2000
        })

        setMaximo(data[0].stock_max);
        setMinimo(data[0].stock_min);
    } catch (error) {
        console.log(error);
    }
  };

  const getLibroDiario = async (fecha_diaria) => {        
    try {
        const url = `http://localhost/invensoft/kardex?fecha=${fecha_diaria}`;
        const { data } = await axios(url);
        console.log(data);
        setLibroDiario(data);
        handleResetVariablesLibro();
    } catch (error) {
        console.log(error);
    }
  };
  
  const handleResetVariables = () => {
    setInfoKardex([]);
    setLibroDiario([]);
    setMinimo('');
    setMaximo('');
  }

  const handleResetVariablesLibro = () => {
    setInfoKardex([]);
    setMinimo('');
    setMaximo('');
  }

  return (
    <KardexContext.Provider
        value={{
          getKardexByProducto,
          getLibroDiario,
          libroDiario, 
          infoKardex,
          minimo,
          maximo,
          handleResetVariables
        }}
    >
        {children}
    </KardexContext.Provider>
  )
}

export {
    KardexProvider
}

export default KardexContext;
