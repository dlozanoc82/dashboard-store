import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const ComprasContext = createContext();

const ComprasProvider = ({children}) => {

 

  const [compras, setCompras] = useState([]);
  const [categorias, setCategorias] = useState([]);  //Guarda las categorias
  const [subcategorias, setSubCategorias] = useState([]); // Guarda las subcategorias
  const [idSubCategoria, setIdSubcategoria] = useState(); // Resive el cambio del ID de la categoria
  const [idProductsSubcategory, setIdProductsSubcategory] = useState(); // Resive el Cambio del ID de la subcategoria
  const [productsBySubCategory, setProductsBySubCategory] = useState([]); // Guarda los productos por subcategoria
  const [proovedores, setProovedores] = useState([]);


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
 

  //FUNCION PARA CREAR UNA COMPRA
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

    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Algo salió mal!',
        })
    }
}



  //SE ENCARGA DE EJECUTAR LAS FUNCIONES CADA VEZ QUE DETECTA UN CAMBIO
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
            createCompras
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
