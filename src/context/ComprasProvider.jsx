import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const ComprasContext = createContext();

const ComprasProvider = ({children}) => {

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
        getSubCategorias(idSubCategoria);
    }, [idSubCategoria])
  
    useEffect(() => {
      getProductsBySubCategory(idProductsSubcategory);
    }, [idProductsSubcategory])

    useEffect(() => {
        getStock(idProducto);
    }, [idProducto])
    


    // CRUD VISTA COMPRAS 
    const getCompras = async () => {        
        try {
            const url = "http://localhost/invensoft/compras?compras";
            const { data } = await axios(url);
            console.log(data);
            setCompras(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getComprasByDates = async (fechaInicial, fechaFinal) => {        
        try {
            const url = `http://localhost/invensoft/compras?fecha_ini=${fechaInicial}&fecha_fin=${fechaFinal}`;
            const { data } = await axios(url);
            console.log('compras por fecha')
            console.log(data);
            setComprasByDates(data);
        } catch (error) {
            console.log(error);
        }
    };

    const createCompras = async (cod_subcategoria,cod_producto,cod_proveedor,cantidad,precio_unit,precio_compra) => {
        //Crear el producto en la API
        try {
            const respuesta = await axios.post('http://localhost/invensoft/compras', {cod_subcategoria,cod_producto,cod_proveedor,cantidad,precio_unit,precio_compra});
            
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

    const upadateCompra = async (cod_compra, cod_producto, cod_proveedor, cantidad, precio_unit, precio_compra) => {
        //Crear el producto en la API
        try {
            const respuesta = await axios.put(`http://localhost/invensoft/compras?cod_compra=${cod_compra}`, {cod_compra, cod_producto, cod_proveedor, cantidad, precio_unit, precio_compra});
            
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
        try {
            console.log({cod_compra});
            const respuesta = await axios.delete(`http://localhost/invensoft/compras?cod_compra=${cod_compra}`);
            
            Swal.fire({
                icon: 'success',
                title: 'Registro Eliminado Correctamente',
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


    // FUNCIONES PARA OBTENER CATEGORIAS, SUBCATEGORIAS, PRODUCTOS Y PROVEEDORES
    const getCategorias = async () => {        
        try {
            const url = "http://localhost/invensoft/categorias";
            const { data } = await axios(url);
            console.log(data);
            setCategorias(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getSubCategorias = async (id = 1) => {        
        try {
            const url = `http://localhost/invensoft/subcategorias?categoria=${id}`;
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
            const url = `http://localhost/invensoft/compras?subcategoria=${id}`;
            const { data } = await axios(url);
            console.log(data);
            setProductsBySubCategory(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getProveedores = async () => {
        try {
            const url = "http://localhost/invensoft/proveedores";
            const { data } = await axios(url);
            console.log(data);
            setProovedores(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getStock = async (id = 1) => {
        try {
            const url = `http://localhost/invensoft/compras?producto=${id}`;
            const { data } = await axios(url);

            if(data && data[0] && data[0].stock){
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
                getComprasByDates,
                comprasByDates,
                setComprasByDates
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
