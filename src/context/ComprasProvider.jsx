import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

const ComprasContext = createContext();

const ComprasProvider = ({children}) => {

  const [idSubCategoria, setIdSubcategoria] = useState();

  const [compras, setCompras] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubCategorias] = useState([]);
  const [productsBySubCategory, setProductsBySubCategory] = useState([]);

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
          setSubCategorias(data);
      } catch (error) {
          console.log(error);
      }
  };


  useEffect(() => {
      getCategorias();
  }, [])

  useEffect(() => {
      getSubCategorias(idSubCategoria);
  }, [idSubCategoria])

  useEffect(() => {
    getSubCategorias(idSubCategoria);
}, [idSubCategoria])

  return (
    <ComprasContext.Provider
        value={{
            compras,
            categorias,
            subcategorias,
            productsBySubCategory,
            setIdSubcategoria
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
