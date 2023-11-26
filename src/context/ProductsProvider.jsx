import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";


const ProductsContext = createContext();

const ProductsProvider = ({children}) => {

    const [idSubCategoria, setIdSubcategoria] = useState();
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});

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

    const updateProducts = async (cod_pro) => {
        try {
            const estado = status === 'INACTIVO' ? 0 : 1;
            console.log({estado, status});
            const respuesta = await axios.put(`http://localhost/invensoft/productos?cod_pro=${cod_pro}`, {cod_sub,nom_pro,descripcion,estado,img,garantia,duracion_garantia});
            
            Swal.fire({
                icon: 'success',
                title: 'Información Actualizada Correctamente',
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


    //OBTENER CATEGORIAS Y SUBCATEGORIAS
    const getCategorias = async () => {        
        try {
            const url = "http://localhost/invensoft/categorias";
            const { data } = await axios(url);
            setCategorias(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getSubCategorias = async (id = 1) => {        
        try {
            const url = `http://localhost/invensoft/subcategorias?categoria=${id}`;
            const { data } = await axios(url);
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
                setProduct,
                productsModificar,
                handleDeleteProductos,
                updateProducts
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
