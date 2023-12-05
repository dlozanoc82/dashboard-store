import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import { formatDateToYearMonthDay, formatTime12Hours, formatearCantidad } from '../helpers/GeneralFunctions';
import Swal from 'sweetalert2';
import React, { createContext, useEffect, useState } from 'react'
import { iniciarSesionAdmin } from "../helpers/Validacion_login";
import { botonAcessibilidad } from "../helpers/Acessibilidad";

const VentasContext = createContext();

const VentasProvider = ({children}) => {

  iniciarSesionAdmin();   //Ejecucion de validacion login
  botonAcessibilidad();

  const [ventas, setVentas] = useState([]);
  const [filteredVentas, setFilteredVentas] = useState([]);
  const [ventasByDates, setVentasByDates] = useState([]);

  const [inputSearch, setInputSearch] = useState("");
  const [productosVendidos, setProductosVendidos] = useState([]);

  const [cliente, setCliente] = useState([]);
  const [producto, setProducto] = useState([]);

  const [clienteId, setClienteId] = useState('');
  const [ventasOrganizadas, setVentasOrganizadas] = useState([]);
  const [ventasOrganizadasDates, setVentasOrganizadasDates] = useState([]);

  const [cod_detalle, setCod_detalle] = useState('')
  const [allProducts, setAllProducts] = useState([]);


  useEffect(() => {
    getVentas();
  }, [])

  useEffect(() => {
    getProductosDataList();
  }, [])


  useEffect(() => {
    getProductosMasVendidos();
  }, [])

  useEffect(() => {
    filterByDocumentNumber();
  }, [inputSearch])

  useEffect(() => {
    organizeVentas(ventas);
  }, [ventas]);


  
  //FILTROS
      // FILTRO
  const filterByDocumentNumber = () => {
      const searchValue = inputSearch; // No es necesario convertirlo a minúsculas si es un número
  
      // Si no hay texto en el campo de búsqueda y el estado está vacío, mostramos todos los pagos
      if (searchValue === '') {
          setFilteredVentas(ventasOrganizadas);
          return;
      }
  
      let filteredData = ventasOrganizadas;
      console.log({filteredData})
  
      filteredData = filteredData.filter((venta) =>
          venta.documento.toString().startsWith(searchValue.toString())
      );
  
      setFilteredVentas(filteredData);
  };

  const organizeVentas = (ventasData) => {
    setVentasOrganizadas((prevVentas) => {
      const organizedData = { ...prevVentas };
  
      ventasData.forEach((venta) => {
        const codVenta = venta.cod_ven;
  
        if (!organizedData[codVenta]) {
          organizedData[codVenta] = {
            cod_venta: codVenta,
            nombres: venta.nombres,
            fecha_venta: venta.fecha_venta,
            documento: venta.documento,
            apellidos: venta.apellidos,
            cod_pago: venta.cod_pago,
            total_venta: 0,
            productos: [],
          };
        }
  
        organizedData[codVenta].productos.push({
          nombre: venta.nombre,
          cantidad: venta.cantidad,
          valor_venta: venta.valor_venta,
          valor_total_producto: venta.valor_total_producto,
          ganancias: venta.ganancias,
        });
  
        organizedData[codVenta].total_venta += parseFloat(venta.valor_total_producto);
      });
  
      const sortedData = Object.values(organizedData).sort((a, b) => {
        // Ordena por fecha_venta de manera descendente
        return new Date(b.fecha_venta) - new Date(a.fecha_venta);
      });
  
      setFilteredVentas(sortedData);
  
      return sortedData;
    });
  };
  
  const organizeVentasByDates = (ventasData) => {
    setVentasOrganizadasDates((prevVentas) => {
      const organizedData = { ...prevVentas };
  
      ventasData.forEach((venta) => {
        const codVenta = venta.cod_ven;
  
        if (!organizedData[codVenta]) {
          organizedData[codVenta] = {
            cod_venta: codVenta,
            nombres: venta.nombres,
            fecha_venta: venta.fecha_venta,
            documento: venta.documento,
            apellidos: venta.apellidos,
            cod_pago: venta.cod_pago,
            total_venta: 0,
            productos: [],
          };
        }
  
        organizedData[codVenta].productos.push({
          nombre: venta.nombre,
          cantidad: venta.cantidad,
          valor_venta: venta.valor_venta,
          valor_total_producto: parseFloat(venta.valor_total_producto),
          ganancias: venta.ganancias,
        });
  
        organizedData[codVenta].total_venta += parseFloat(venta.valor_total_producto);
      });
  
      const sortedData = Object.values(organizedData).sort((a, b) => {
        // Ordena por fecha_venta de manera descendente
        return new Date(b.fecha_venta) - new Date(a.fecha_venta);
      });
  
      return sortedData;
    });
  };
  


  //CRUD
  const getVentas = async () => {        
    try {
        const url = "http://localhost/invensoft/ventas?ventas";
        const { data } = await axios(url);
        console.log(data);
        setVentas(data);
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
        organizeVentasByDates(data);
    } catch (error) {
        console.log(error);
    }
  };

  const getProductosMasVendidos = async () => {        
    try {
        const url = "http://localhost/invensoft/ventas?vendidos";
        const { data } = await axios(url);
        console.log({data});
        setProductosVendidos(data);
    } catch (error) {
        console.log(error);
    }
  };

  const getProductAdd = async (cod_pro) => {        
    try {
        const url = `http://localhost/invensoft/ventas?productos=${cod_pro}`;
        const { data } = await axios(url);
        console.log('prueba');
        console.log(data);
        if(data && data.length>0){
        setCod_detalle(data[0].cod_detalle);
        setProducto(data);
        }else{
          Swal.fire({
            icon: 'info',
            title: 'Producto no encontrado',
            text: 'El producto no se encuentra, código incorrecto o stock agotado',
            });
        }
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
          Swal.fire({
            icon: 'info',
            title: 'Documento no encontrado',
            text: 'El usuario no se encuentra registrado o el documento es incorrecto',
            });
          
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


  const getProductosDataList = async() => {
    try {
      const url = "http://localhost/invensoft/ventas?products";
      const { data } = await axios(url);
      console.log(data);
      setAllProducts(data);
    } catch (error) {
        console.log(error);
    }
  }


  return (
    <VentasContext.Provider
        value={{
            ventas,
            getVentasByDates,
            ventasOrganizadas,
            ventasOrganizadasDates,
            setVentasByDates,
            setVentasOrganizadasDates,
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
            filteredVentas,
            getProductosMasVendidos,
            generarPDFComprasByDates, 
            cod_detalle,
            allProducts
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
