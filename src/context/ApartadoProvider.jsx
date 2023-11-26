import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

const ApartadoContext = createContext();

const ApartadoProvider = ({children}) => {

  const [apartados, setApartados] = useState([]);


  useEffect(() => {
    getApartados();
  }, [])
  

  const getApartados = async () => {
    try {
        const url = "http://localhost/invensoft/apartados?apartados";
        const { data } = await axios(url);
        console.log(data);
        setApartados(data);
    } catch (error) {
        console.log(error);
    }
  };

  const handleDeleteApartado = async (cod_apartado) => {
    let confirmado = await Swal.fire({
        title: "¿Esta seguro de eliminar este producto?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Si",
        denyButtonText: `No`
      });

    try {

        if(confirmado.isConfirmed){
        const respuesta = await axios.delete(`http://localhost/invensoft/apartados?cod_apartado=${cod_apartado}`);

        Swal.fire({
            icon: 'success',
            title: 'Registro Eliminado Correctamente',
            showConfirmButton: false,
            timer: 2000
        })
    }else{
        Swal.fire("Operación detenida", "", "info");
    }

        // getProductos();
        // getProductosByModificar();
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
    <ApartadoContext.Provider
        value={{
          apartados
        }}
    >
        {children}
    </ApartadoContext.Provider>
  )
}

export {
    ApartadoProvider
}

export default ApartadoContext;
