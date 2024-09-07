import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { formatDateToYearMonthDay, formatTime12Hours, formatearCantidad } from '../helpers/GeneralFunctions';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import { iniciarSesionAdmin } from "../helpers/Validacion_login";
import { botonAcessibilidad } from "../helpers/Acessibilidad";

const ComprasContext = createContext();

const ComprasProvider = ({children}) => {
    
    iniciarSesionAdmin();   //Ejecucion de validacion login
    botonAcessibilidad();

  const [compras, setCompras] = useState([]);
  const [comprasByDates, setComprasByDates] = useState([])
  const [compra, setCompra] = useState({});

  const [categorias, setCategorias] = useState([]);  //Guarda las categorias
  const [subcategorias, setSubCategorias] = useState([]); // Guarda las subcategorias
  const [idSubCategoria, setIdSubcategoria] = useState(); // Recibe el cambio del ID de la categoria
  const [idProductsSubcategory, setIdProductsSubcategory] = useState(); // Resive el Cambio del ID de la subcategoria
  const [productsBySubCategory, setProductsBySubCategory] = useState([]); // Guarda los productos por subcategoria
  const [proovedores, setProovedores] = useState([]); // Obtiene los proveedores
  
  const [idProducto, setIdProducto] = useState();
  const [productosInStock, setProductosInStock] = useState('');

  const [inputSearch, setInputSearch] = useState("");
  const [filteredCompras, setFilteredCompras] = useState([]);


    //SE ENCARGA DE EJECUTAR LAS FUNCIONES CADA VEZ QUE DETECTA UN CAMBIO

    useEffect(() => {
        getCompras();
    }, [])

    useEffect(() => {
        getCategorias();
    }, [])
  
    useEffect(() => {
      getProveedores();
    }, [])

    useEffect(() => {
        filterByNameProduct();
    }, [inputSearch])
  
    useEffect(() => {
        getSubCategorias(idSubCategoria);
    }, [idSubCategoria])
  
    useEffect(() => {
      getProductsBySubCategory(idProductsSubcategory);
    }, [idProductsSubcategory])

    useEffect(() => {
        getStock(idProducto);
    }, [idProducto])
    

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

    // CRUD VISTA COMPRAS 
    const getCompras = async () => {        
        try {
            const url = "http://localhost/CODIGO/invensoft/compras?compras";
            const { data } = await axios(url);
            console.log(data);
            setCompras(data);
            setFilteredCompras(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getComprasByDates = async (fechaInicial, fechaFinal) => {        
        try {
            const url = `http://localhost/CODIGO/invensoft/compras?fecha_ini=${fechaInicial}&fecha_fin=${fechaFinal}`;
            const { data } = await axios(url);
            console.log('compras por fecha')
            console.log(data);
            setComprasByDates(data);
            if (data && data.length == 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'No hay registros entre esas fechas',
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    const createCompras = async (cod_producto,cod_proveedor,cantidad,precio_unit,precio_venta,precio_compra) => {
        //Crear el producto en la API
        try {
            console.log("Valor de la venta: "+precio_venta);
            const respuesta = await axios.post('http://localhost/CODIGO/invensoft/compras', {cod_producto,cod_proveedor,cantidad,precio_unit,precio_venta,precio_compra});
            console.log(respuesta);
            Swal.fire({
                icon: 'success',
                title: respuesta.data.result.msj,
                showConfirmButton: false,
                timer: 2000
            })

            getCompras();

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Algo salió mal!'+error,
            })
        }
    }

    const upadateCompra = async (cod_compra, cod_producto, cod_proveedor, cantidad, precio_unit, precio_venta, precio_compra) => {
        console.log(cod_compra, cod_producto, cod_proveedor, cantidad, precio_unit, precio_venta, precio_compra)
        try {
            const respuesta = await axios.put(`http://localhost/CODIGO/invensoft/compras?cod_compra=${cod_compra}`, {cod_producto, cod_proveedor, cantidad, precio_unit, precio_venta, precio_compra});
            console.log({respuesta})
            Swal.fire({
                icon: 'success',
                title: respuesta.data.result.msj,
                showConfirmButton: false,
                timer: 2000
            })

            getCompras();

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Algo salió mal!',
            })
        }
    }

    const handleDeleteCompra = async (cod_compra) => {
        let confirmado = await Swal.fire({
            title: "¿Esta seguro de eliminar esta compra?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Si",
            denyButtonText: `No`
          });

        try {
            
              if(confirmado.isConfirmed){
                console.log({cod_compra});
                const respuesta = await axios.delete(`http://localhost/CODIGO/invensoft/compras?cod_compra=${cod_compra}`);
                
                Swal.fire({
                    icon: 'success',
                    title: 'Registro Eliminado Correctamente',
                    showConfirmButton: false,
                    timer: 2000
                })  
        }else{
            Swal.fire("Operación detenida", "", "info");
        }

            getCompras();
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Algo salió mal!',
            })
        }
    }


    // FUNCIONES PARA OBTENER CATEGORIAS, SUBCATEGORIAS, PRODUCTOS Y PROVEEDORES
    const getCategorias = async () => {        
        try {
            const url = "http://localhost/CODIGO/invensoft/categorias";
            const { data } = await axios(url);
            console.log(data);
            setCategorias(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getSubCategorias = async (id = 1) => {        
        try {
            const url = `http://localhost/CODIGO/invensoft/subcategorias?categoria=${id}`;
            const { data } = await axios(url);
            console.log(data);
            setSubCategorias(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getProductsBySubCategory = async (id = 1) => {        
        console.log(id);
        try {
            const url = `http://localhost/CODIGO/invensoft/compras?subcategoria=${id}`;
            const { data } = await axios(url);
            console.log(data);
            setProductsBySubCategory(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getProveedores = async () => {
        try {
            const url = "http://localhost/CODIGO/invensoft/proveedores";
            const { data } = await axios(url);
            console.log(data);
            setProovedores(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getStock = async (id = 1) => {
        try {
            const url = `http://localhost/CODIGO/invensoft/compras?producto=${id}`;
            const { data } = await axios(url);

            if(data && data[0] && data[0].stock){
            console.log('DATA EM GETSTOCK')
            console.log(data);
            console.log(data[0].stock);
            setProductosInStock(data[0].stock);
            }else{
                setProductosInStock(0);
            }
        } catch (error) {
            setProductosInStock(0);
            console.log(error);
        }
    }
 
    //GENERAR PDF
    const generarPDFCompras = () => {
        const doc = new jsPDF({ orientation: 'landscape' });

        // Logo
        const logoUrl = '/CODIGO/logo-circular.png'; // Replace with the path to your logo image
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
        const columns = ["#", "Fecha de Compra", "Categoria", "SubCategoria", "Nombre del Producto", "Cantidad", "Proveedor", "Precio de la Compra", "Precio Unitario", "Valor Venta"];

        // Data
        const data = [];
        compras.forEach((compra, index) => {
            data.push([
                index + 1, // Index + 1 to start the numbering from 1
                formatDateToYearMonthDay(compra.fecha_compra),
                compra.nom_cat,
                compra.nom_sub,
                compra.nombre,
                compra.cantidad_compra,
                compra.nom_prov,
                formatearCantidad(compra.valor_total),
                formatearCantidad(compra.valor_unit_prov),
                formatearCantidad(compra.valor_venta)
            ]);
        });

        
        // Generate table
        doc.autoTable({
            head: [columns],
            body: data,
            startY: 45 // Adjust startY based on your needs
        });

        // Save the PDF
        doc.save('compras_list.pdf');
    }

    const generarPDFComprasByDates = () => {
        const doc = new jsPDF({ orientation: 'landscape' });

        // Logo
        const logoUrl = '/CODIGO/logo-circular.png'; // Replace with the path to your logo image
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
        const columns = ["#", "Fecha de Compra", "Categoria", "SubCategoria", "Nombre del Producto", "Cantidad", "Proveedor", "Precio de la Compra", "Precio Unitario", "Precio Venta"];

        // Data
        const data = [];
        comprasByDates.forEach((compra, index) => {
            data.push([
                index + 1, // Index + 1 to start the numbering from 1
                formatDateToYearMonthDay(compra.fecha_compra),
                compra.nom_cat,
                compra.nom_sub,
                compra.nombre,
                compra.cantidad_compra,
                compra.nom_prov,
                formatearCantidad(compra.valor_total),
                formatearCantidad(compra.valor_unit_prov),
                formatearCantidad(compra.valor_venta)
            ]);
        });

        // Generate table
        doc.autoTable({
            head: [columns],
            body: data,
            startY: 45 // Adjust startY based on your needs
        });

        // Save the PDF
        doc.save('compras_list_byDates.pdf');
    }

    return (
        <ComprasContext.Provider
            value={{
                compras,
                categorias,
                subcategorias,
                productsBySubCategory,
                proovedores,
                setIdProductsSubcategory,
                setIdSubcategoria,
                createCompras,
                handleDeleteCompra,
                compra,
                setCompra,
                upadateCompra,
                setIdProducto,
                productosInStock,
                setProductosInStock,
                getComprasByDates,
                comprasByDates,
                setComprasByDates,
                inputSearch,
                setInputSearch,
                filteredCompras,
                generarPDFCompras,
                generarPDFComprasByDates,
                getStock
            }}
        >
            {children}
        </ComprasContext.Provider>
    )
}

export { 
    ComprasProvider
}

export default ComprasContext;
