import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { iniciarSesionAdmin } from "../helpers/Validacion_login";
import { botonAcessibilidad } from "../helpers/Acessibilidad";
import { formatDateToYearMonthDay, formatTime12Hours, formatearCantidad } from '../helpers/GeneralFunctions';
import Swal from 'sweetalert2';

const ApartadoContext = createContext();

const ApartadoProvider = ({children}) => { 

  botonAcessibilidad();
  iniciarSesionAdmin();   //Ejecucion de validacion login
  
  const [apartados, setApartados] = useState([]);
  const [organizarApartados, setOrganizarApartados] = useState([]);
  const [historialAbonosModal, setHistorialAbonosModal] = useState([]);

  const [historyLength, setHistoryLength] = useState('');


  useEffect(() => {
    getApartados();
  }, [])
  
  useEffect(() => {
    const datosOrganizados = transformarApartados(apartados);
    setOrganizarApartados(datosOrganizados);
  }, [apartados])

  
  const getApartados = async () => {
    try {
        const url = "https://invensoftvargas.com/invensoft/apartados?apartados";
        const { data } = await axios(url);
        console.log({data})
        if (data && data.length > 0) {
          console.log({data})
          setApartados(data);
        }else{
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No hay datos para mostrar',
          });
        }
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
        const respuesta = await axios.delete(` https://invensoftvargas.com/invensoft/apartados?cod_apartado=${cod_apartado}`);
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
    const groupedByPedido = apartados.reduce((result, apartado) => {
      const { cod_cot, nombres, apellidos, documento, nombre, cantidad, valor_unit, valor_abono, cod_abono } = apartado;
  
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
          total_abonado: 0,
          total_venta: 0,
          items: [],
          abonosRegistrados: {},
        };
      }
  
      // Validar si el cod_abono y valor_abono son iguales, y agregar al total_abonado solo una vez
      const abonoKey = `${cod_abono}_${valor_abono}`;
      if (!result[cod_cot].abonosRegistrados[abonoKey]) {
        result[cod_cot].abonosRegistrados[abonoKey] = true;
        result[cod_cot].total_abonado += parseInt(valor_abono);
      }
  
      result[cod_cot].tipo_pago = apartado.cod_pago;
      result[cod_cot].fecha_limite_pago = apartado.fecha_abono;
      result[cod_cot].total_a_pagar = apartado.total;
  
      // Calcular el saldo restante restando el total abonado del total a pagar
      result[cod_cot].saldo_restante = apartado.total - result[cod_cot].total_abonado;
  
      // Agregar el total de la venta actual al total de la venta
      result[cod_cot].total_venta += apartado.total;
  
      const existingProductIndex = result[cod_cot].items.findIndex(
        (item) =>
          item.nombre === apartado.nombre &&
          item.cantidad === apartado.cantidad &&
          item.valor_unit === apartado.valor_unit
      );
  
      if (existingProductIndex === -1) {
        // Si el producto no existe, agregar un nuevo elemento al array items
        result[cod_cot].items.push({
          cod_detalle: apartado.cod_cot,
          nombre: apartado.nombre,
          cantidad: apartado.cantidad,
          valor_unit: apartado.valor_unit,
        });
      }
  
      return result;
    }, {});
  
    // Calcular total_venta después de procesar todos los items
    Object.values(groupedByPedido).forEach((pedido) => {
      pedido.total_venta = pedido.items.reduce(
        (total, item) => total + item.valor_unit * item.cantidad,
        0
      );
    });
  
    // Convertir el objeto en un array de objetos
    const transformedData = Object.values(groupedByPedido);
  
    return transformedData;
  };
  

  const getHistorial = async (cod_coti) => {
    try {
        const url = `https://invensoftvargas.com/invensoft/apartados?cod_coti=${cod_coti}`;
        const { data } = await axios(url);
        console.log({data});
        setHistorialAbonosModal(data);
    } catch (error) {
        console.log(error);
    }
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
          getApartados,
          getHistorial,
          historialAbonosModal,
          setHistorialAbonosModal,
          historyLength, 
          setHistoryLength
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
