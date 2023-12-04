import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { iniciarSesionAdmin } from "../helpers/Validacion_login";
import Swal from 'sweetalert2';

const ApartadoContext = createContext();

const ApartadoProvider = ({children}) => {

  iniciarSesionAdmin();   //Ejecucion de validacion login
  
  const [apartados, setApartados] = useState([]);
  const [organizarApartados, setOrganizarApartados] = useState([]);


  useEffect(() => {
    getApartados();
  }, [])
  
  useEffect(() => {
    const datosOrganizados = transformarApartados(apartados);
    setOrganizarApartados(datosOrganizados);
  }, [apartados])
 
  

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
        title: "¿Esta seguro de eliminar este apartado?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Si",
        denyButtonText: `No`
      });

    try {

        if(confirmado.isConfirmed){
        const respuesta = await axios.delete(` http://localhost/invensoft/apartados?cod_apartado=${cod_apartado}`);
          console.log(respuesta)
        Swal.fire({
            icon: 'success',
            title: 'Registro Eliminado Correctamente',
            showConfirmButton: false,
            timer: 2000
        })
        getApartados();
    }else{
        Swal.fire("Operación detenida", "", "info");
    }

    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo salió mal!',
        })
    }
  }


  const transformarApartados = (apartados) => {
    // Agrupar por el valor de 'cod_pedido'
    const groupedByPedido = apartados.reduce((result, apartado) => {
      const { cod_cot, nombres, apellidos, documento, celular } = apartado;
  
      if (!result[cod_cot]) {
        result[cod_cot] = {
          cod_cot,
          abono_general: 0,
          tipo_pago: 0,
          fecha_limite_pago: '',
          total_a_pagar: 0,
          nombres,
          apellidos,
          documento,
          saldo_restante: 0,
          total_abonado: 0, // Nuevo campo para almacenar el total abonado
          total_venta: 0,   // Nuevo campo para almacenar el total de la venta
          items: [],
        };
      }
  
      // Sumar el abono actual al total abonado
      result[cod_cot].total_abonado += apartado.valor_abono;
  
      result[cod_cot].tipo_pago = apartado.cod_pago;
      result[cod_cot].fecha_limite_pago = apartado.fecha_abono;
      result[cod_cot].total_a_pagar = apartado.total;
      
      // Calcular el saldo restante restando el total abonado del total a pagar
      result[cod_cot].saldo_restante = apartado.total - result[cod_cot].total_abonado;
  
      // Agregar el total de la venta actual al total de la venta
      result[cod_cot].total_venta += apartado.total;
  
      result[cod_cot].items.push({
        cod_detalle: apartado.cod_cot,
        nombre: apartado.nombre,
        cantidad: apartado.cantidad,
        valor_unit: apartado.valor_unit,
      });
  
      return result;
    }, {});
  
    // Convertir el objeto en un array de objetos
    const transformedData = Object.values(groupedByPedido);
  
    return transformedData;
  };
  
  
  // Llamar a la función con la variable 'apartados'
  const apartadosTransformados = transformarApartados(apartados);
  console.log({apartadosTransformados});
  


  return (
    <ApartadoContext.Provider
        value={{
          apartados,
          organizarApartados,
          handleDeleteApartado,
          getApartados
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
