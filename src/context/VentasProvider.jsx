import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import { formatDateToYearMonthDay, formatTime12Hours, formatearCantidad } from '../helpers/GeneralFunctions';
import Swal from 'sweetalert2';
import React, { createContext, useEffect, useState } from 'react'

const VentasContext = createContext();

const VentasProvider = ({children}) => {

  const [ventas, setVentas] = useState([]);
  const [filteredVentas, setFilteredVentas] = useState([]);
  const [ventasByDates, setVentasByDates] = useState([]);

  const [inputSearch, setInputSearch] = useState("");
  const [productosVendidos, setProductosVendidos] = useState([]);

  const [cliente, setCliente] = useState([]);
  const [producto, setProducto] = useState([]);

  const [clienteId, setClienteId] = useState('');



  useEffect(() => {
    getVentas();
  }, [])

  useEffect(() => {
    getProductosMasVendidos();
  }, [])

  useEffect(() => {
    filterByDocumentNumber();
}, [inputSearch])
  
  //FILTROS
      // FILTRO
      const filterByDocumentNumber = () => {
        const searchValue = inputSearch; // No es necesario convertirlo a minúsculas si es un número
    
        // Si no hay texto en el campo de búsqueda y el estado está vacío, mostramos todos los pagos
        if (!searchValue) {
            setFilteredVentas(ventas);
            return;
        }
    
        let filteredData = ventas;
    
        filteredData = filteredData.filter((venta) =>
            venta.documento.toString().startsWith(searchValue.toString())
        );
    
        setFilteredVentas(filteredData);
    };


  //CRUD
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

  const getProductAdd = async (cod_pro) => {        
    try {
        const url = `http://localhost/invensoft/ventas?productos=${cod_pro}`;
        const { data } = await axios(url);
        console.log(data);
        setProducto(data);
    } catch (error) {
        console.log(error);
    }
  };


  //AÑADIR VENTAS
  const getCliente = async (documento) => {        
    try {
        const url = `http://localhost/invensoft/ventas?doc=${documento}`;
        const { data } = await axios(url);
        console.log(data);
        if (data && data.length > 0) {
        setCliente(data);
        setClienteId(data[0].cod_usu);
        }else{
          
        }
    } catch (error) {
        console.log(error);
    }
  };

  //GENERAR PDF
  const generarPDFVentas = () => {
      const doc = new jsPDF('landscape');

      // Logo
      const logoUrl = '/logo-circular.png'; // Replace with the path to your logo image
      doc.addImage(logoUrl, 'PNG', 10, 10, 30, 30); // Adjust the coordinates and dimensions as needed

      // Title
      const title = 'LISTADO DE VENTAS';
      doc.text(title, doc.internal.pageSize.width / 2, 28, 'center');

      // Date and Time
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      const formattedTime = formatTime12Hours(currentDate);
      const dateTimeText = `Generado el ${formattedDate} a las ${formattedTime}`;
      doc.setFontSize(11);
      doc.setFont('arial','italic', 'normal');
      doc.text(dateTimeText, doc.internal.pageSize.width - 15, 43, 'right');
      doc.setFont('normal');

      // Table
      const columns = ["#", "Codigo Venta", "Fecha de Venta","Cliente", "No. Documento", "Producto", "Cantidad", "Precio Unitario", "Tipo de Pago", "Total", "Ganancias"];

      // Data
      const data = [];
      ventas.forEach((venta, index) => {
          data.push([
              index + 1, // Index + 1 to start the numbering from 1
              venta.cod_ven,
              formatDateToYearMonthDay(venta.fecha_venta),
              venta.nombres,
              venta.documento,
              venta.nombre,
              venta.cantidad,
              formatearCantidad(venta.valor_venta),
              venta.cod_pago,
              formatearCantidad(venta.valor_total_producto),
              formatearCantidad(venta.ganancias)
          ]);
      });

      
      // Generate table
      doc.autoTable({
          head: [columns],
          body: data,
          startY: 45 // Adjust startY based on your needs
      });

      // Save the PDF
      doc.save('ventas_list.pdf');
  }

  const generarPDFComprasByDates = () => {
      const doc = new jsPDF('landscape');

      // Logo
      const logoUrl = '/logo-circular.png'; // Replace with the path to your logo image
      doc.addImage(logoUrl, 'PNG', 10, 10, 30, 30); // Adjust the coordinates and dimensions as needed

      // Title
      const title = 'LISTADO DE VENTAS - DATE';
      doc.text(title, doc.internal.pageSize.width / 2, 28, 'center');
      
      // Date and Time
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      const formattedTime = formatTime12Hours(currentDate);
      const dateTimeText = `Generado el ${formattedDate} a las ${formattedTime}`;
      doc.setFontSize(11);
      doc.setFont('arial','italic', 'normal');
      doc.text(dateTimeText, doc.internal.pageSize.width - 15, 43, 'right');
      doc.setFont('normal');

      // Table
      const columns = ["#", "Cod_Venta", "Fecha de Venta","Cliente", "No. Documento", "Producto", "Cantidad", "Precio Unitario", "Tipo de Pago", "Total", "Ganancias"];

      // Data
      const data = [];
      ventasByDates.forEach((venta, index) => {
        data.push([
          index + 1, // Index + 1 to start the numbering from 1
          venta.cod_ven,
          formatDateToYearMonthDay(venta.fecha_venta),
          venta.nombres,
          venta.documento,
          venta.nombre,
          venta.cantidad,
          formatearCantidad(venta.valor_venta),
          venta.cod_pago,
          formatearCantidad(venta.valor_total_producto),
          formatearCantidad(venta.ganancias)
      ]);
      });

      // Generate table
      doc.autoTable({
          head: [columns],
          body: data,
          startY: 45 // Adjust startY based on your needs
      });

      // Save the PDF
      doc.save('ventas_list_byDates.pdf');
  }




  return (
    <VentasContext.Provider
        value={{
            ventas,
            getVentasByDates,
            setVentasByDates,
            ventasByDates,
            inputSearch,
            setInputSearch,
            productosVendidos,
            generarPDFVentas,
            getCliente,
            cliente,
            getProductAdd,
            producto,
            //getProductAdd,
            clienteId,
            getVentas,
            setProducto,
            setCliente,
            filteredVentas
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
