import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { iniciarSesionAdmin } from "../helpers/Validacion_login";
import jsPDF from 'jspdf';
import { formatDateToYearMonthDay, formatTime12Hours, obtenerHoraEnFormatoDoceHoras } from '../helpers/GeneralFunctions';

const KardexContext = createContext();

const KardexProvider = ({children}) => {

  iniciarSesionAdmin();   //Ejecucion de validacion login

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

  const generarPDFLibroDiario = () => {
    const doc = new jsPDF('landscape');

    // Logo
    const logoUrl = '/logo-circular.png'; // Replace with the path to your logo image
    doc.addImage(logoUrl, 'PNG', 10, 10, 30, 30); // Adjust the coordinates and dimensions as needed

    // Title
    const title = 'LIBRO DIARIO';
    doc.text(title, doc.internal.pageSize.width / 2, 28, 'center');

    // Date and Time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = formatTime12Hours(currentDate);
    const dateTimeText = `Generado el ${formattedDate} a las ${formattedTime}`;
    doc.setFontSize(11);
    doc.setFont('arial', 'italic', 'normal');
    doc.text(dateTimeText, doc.internal.pageSize.width - 15, 43, 'right');
    doc.setFont('normal');

    // Table
    const columns = ["#", "Fecha y Hora", "Movimientos(Entrada/Salida)", "Producto", "Valor Unitario", "Cantidad", "Total"];

    // Data
    const data = [];
    libroDiario.forEach((info, index) => {
        data.push([
            index + 1, // Index + 1 to start the numbering from 1
            formatDateToYearMonthDay(info.fecha_transaccion),
            info.entra_sale === 1 ? 'ENTRADA' : 'SALIDA',
            info.nombre,
            info.precio_venta,
            info.cantidad,
            info.cantidad * info.precio_venta,
        ]);
    });

    // Generate table
    doc.autoTable({
        head: [columns],
        body: data,
        startY: 45 // Adjust startY based on your needs
    });

    // Save the PDF
    doc.save(`libro_diario_${formatDateToYearMonthDay(currentDate)}_hora_${obtenerHoraEnFormatoDoceHoras(currentDate)}.pdf`);
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
          handleResetVariables,
          generarPDFLibroDiario
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
