import axios from "axios";
import { createContext, useEffect, useState } from "react";


const ProductsContext = createContext();

const ProductsProvider = ({children}) => {

    const [idSubCategoria, setIdSubcategoria] = useState();
    const [products, setProducts] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubCategorias] = useState([]);

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


    useEffect(() => {
        getCategorias();
    }, [])

    useEffect(() => {
        getSubCategorias(idSubCategoria);
    }, [idSubCategoria])
   
    
    return (
        <ProductsContext.Provider
            value={{
                categorias,
                subcategorias,
                products, 
                setIdSubcategoria
            }}
        >
            {children}
        </ProductsContext.Provider>
    )
}

export {
    ProductsProvider
}

export default ProductsContext;
