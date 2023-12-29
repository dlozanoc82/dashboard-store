import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import { createContext, useEffect, useState } from 'react'
import { formatDateToYearMonthDay, formatTime12Hours, formatearCantidad } from '../helpers/GeneralFunctions';
import { iniciarSesionAdmin } from "../helpers/Validacion_login";
import { botonAcessibilidad } from "../helpers/Acessibilidad";

const CotizacionesContext = createContext();

const CotizacionesProvider = ({children}) => {
  iniciarSesionAdmin();   //Ejecucion de validacion login
  botonAcessibilidad();

  const [cotizaciones, setCotizaciones] = useState([]);
  const [cotizacionesByDates, setCotizacionesByDates] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [filteredCotizaciones, setFilteredCotizaciones] = useState([]);

  useEffect(() => {
    getCotizaciones();
  }, [])

  useEffect(() => {
    filterByDocumentNumber();
  }, [inputSearch])
  
  const filterByDocumentNumber = () => {
    const searchValue = inputSearch; // No es necesario convertirlo a minúsculas si es un número

    // Si no hay texto en el campo de búsqueda y el estado está vacío, mostramos todos los pagos
    if (!searchValue) {
        setFilteredCotizaciones(cotizaciones);
        return;
    }

    let filteredData = cotizaciones;

    filteredData = filteredData.filter((cotizacion) =>
        cotizacion.documento.toString().startsWith(searchValue.toString())
    );

    setFilteredCotizaciones(filteredData);
};

  const getCotizaciones = async () => {        
    try {
        const url = "https://invensoftvargas.com/invensoft/cotizacion?cotizacion";
        const { data } = await axios(url);
        console.log({data});
        setCotizaciones(data);
        setFilteredCotizaciones(data);
    } catch (error) {
        console.log({error});
    }
  };

  const getCotizacionesByDates = async (fechaInicial, fechaFinal) => {        
    try {
        const url = `https://invensoftvargas.com/invensoft/cotizacion?fecha_ini=${fechaInicial}&fecha_fin=${fechaFinal}`;
        const { data } = await axios(url);
        console.log({data});
        setCotizacionesByDates(data);
    } catch (error) {
        console.log({error});
    }
  };

  // GENERAR PDF
  const generarPDFCotizaciones = () => {
    const doc = new jsPDF('landscape');

    // Logo
    const logoUrl = '/logo-circular.png'; // Replace with the path to your logo image
    doc.addImage(logoUrl, 'PNG', 10, 10, 30, 30); // Adjust the coordinates and dimensions as needed

    // Title
    const title = 'LISTADO DE COMPRAS';
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
    const columns = ["#", "Fecha de Cotizacion", "No. Documento", "Nombre del Cliente", "Apellidos del Cliente", "Correo", "Productos", "Cantidad", "Precio Unitario", "Total"];

    // Data
    const data = [];
    cotizaciones.forEach((cotizacion, index) => {
        data.push([
            index + 1, // Index + 1 to start the numbering from 1
            formatDateToYearMonthDay(cotizacion.fecha_cotiz),
            cotizacion.documento,
            cotizacion.nombres,
            cotizacion.apellidos,
            cotizacion.correo,
            cotizacion.nombre,
            cotizacion.cantidad,
            formatearCantidad(cotizacion.valor_unit),
            formatearCantidad(cotizacion.total)
        ]);
    });

    
    // Generate table
    doc.autoTable({
        head: [columns],
        body: data,
        startY: 45 // Adjust startY based on your needs
    });

    // Save the PDF
    doc.save('lista_cotizaciones.pdf');
  }

  const generarPDFCotizacionesByDates = () => {
    const doc = new jsPDF('landscape');

    // Logo
    const logoUrl = '/logo-circular.png'; // Replace with the path to your logo image
    doc.addImage(logoUrl, 'PNG', 10, 10, 30, 30); // Adjust the coordinates and dimensions as needed

    // Title
    const title = 'LISTADO DE COMPRAS';
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
    const columns = ["#", "Fecha de Cotizacion", "No. Documento", "Nombre del Cliente", "Apellidos del Cliente", "Correo", "Productos", "Cantidad", "Precio Unitario", "Total"];

    // Data
    const data = [];
    cotizacionesByDates.forEach((cotizacion, index) => {
        data.push([
            index + 1, // Index + 1 to start the numbering from 1
            formatDateToYearMonthDay(cotizacion.fecha_cotiz),
            cotizacion.documento,
            cotizacion.nombres,
            cotizacion.apellidos,
            cotizacion.correo,
            cotizacion.nombre,
            cotizacion.cantidad,
            formatearCantidad(cotizacion.valor_unit),
            formatearCantidad(cotizacion.total)
        ]);
    });

    
    // Generate table
    doc.autoTable({
        head: [columns],
        body: data,
        startY: 45 // Adjust startY based on your needs
    });

    // Save the PDF
    doc.save('lista_cotizaciones_PorFechas.pdf');
  }



  return (
    <CotizacionesContext.Provider
        value={{
            cotizaciones,
            getCotizacionesByDates,
            cotizacionesByDates,
            setCotizacionesByDates,
            inputSearch,
            setInputSearch,
            filteredCotizaciones,
            generarPDFCotizaciones,
            generarPDFCotizacionesByDates
        }}
    >
        {children}
    </CotizacionesContext.Provider>
  )
}

export { 
    CotizacionesProvider
}

export default CotizacionesContext;
