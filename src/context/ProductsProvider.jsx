import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";


const ProductsContext = createContext();

const ProductsProvider = ({children}) => {

    const [idSubCategoria, setIdSubcategoria] = useState();
    const [products, setProducts] = useState([]);
    const [productsModificar, setProductsModificar] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubCategorias] = useState([]);

    useEffect(() => {
        getCategorias();
    }, [])

    useEffect(() => {
        getProductosByModificar();
    }, [])

    useEffect(() => {
        getProductos();
    }, [])

    useEffect(() => {
        getSubCategorias(idSubCategoria);
    }, [idSubCategoria])
   

    //CRUD PRODUCTOS
    const getProductosByModificar = async () => {        
        try {
            const url = "http://localhost/invensoft/productos?productos";
            const { data } = await axios(url);
            console.log(data);
            setProductsModificar(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getProductos = async () => {        
        try {
            const url = "http://localhost/invensoft/productos?lista_productos";
            const { data } = await axios(url);
            console.log(data);
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteProductos = async (cod_pro) => {
        let confirmado = await Swal.fire({
            title: "¿Esta seguro de eliminar este producto?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Si",
            denyButtonText: `No`
          });

        try {
            
            if(confirmado.isConfirmed){
            const respuesta = await axios.delete(`http://localhost/invensoft/productos?cod_pro=${cod_pro}`);
            
            Swal.fire({
                icon: 'success',
                title: 'Registro Eliminado Correctamente',
                showConfirmButton: false,
                timer: 2000
            })
        }else{
            Swal.fire("Operación detenida", "", "info");
        }

            getProductos();
            getProductosByModificar();
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Algo salió mal!',
            })
        }
    }

    //OBTENER CATEGORIAS Y SUBCATEGORIAS
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


    return (
        <ProductsContext.Provider
            value={{
                categorias,
                subcategorias,
                products, 
                setIdSubcategoria,
                productsModificar,
                handleDeleteProductos
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
