import axios from "axios";
import jsPDF from "jspdf";
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { formatTime12Hours } from "../helpers/GeneralFunctions";
import { iniciarSesionAdmin } from "../helpers/Validacion_login";
import { botonAcessibilidad } from "../helpers/Acessibilidad";


const ProductsContext = createContext();

const ProductsProvider = ({children}) => {

    iniciarSesionAdmin();   //Ejecucion de validacion login
    botonAcessibilidad();

    const [idSubCategoria, setIdSubcategoria] = useState();
    const [product, setProduct] = useState({});

    const [productsModificar, setProductsModificar] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubCategorias] = useState([]);

    const [inputSearch, setInputSearch] = useState("");
    const [filteredProducto, setFilteredProducto] = useState([]);

    useEffect(() => {
        getCategorias();
    }, [])

    useEffect(() => {
        getProductosByModificar();
    }, [])

    useEffect(() => {
        getSubCategorias(idSubCategoria);
    }, [idSubCategoria])
   
    useEffect(() => {
        filterByNameProduct();
    }, [inputSearch])
    


    // FILTROS
    const filterByNameProduct = () => {
        const searchValue = inputSearch.toLowerCase();

        // Si no hay texto en el campo de búsqueda y el estado está vacío, mostramos todos los productos
        if (searchValue.trim() === "") {
            setFilteredProducto(productsModificar);
            return;
        }

        let filteredData = productsModificar;

        filteredData = filteredData.filter((producto) =>
            producto.nombre.toLowerCase().includes(searchValue)
        );

        setFilteredProducto(filteredData);
    }


    //CRUD PRODUCTOS
    const getProductosByModificar = async () => {        
        try {
            let timerInterval;
                    Swal.fire({
                        title: "Buscando productos...",
                        timer: 6000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading();
                            const timer = Swal.getPopup().querySelector("b");
                            timerInterval = setInterval(() => {
                                //timer.textContent = `${Swal.getTimerLeft()}`;
                            }, 100);
                        },
                        willClose: () => {
                            clearInterval(timerInterval);
                        }

                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            //console.log("I was closed by the timer");
                        }
                    });
                    
            const url = "http://localhost/CODIGO/invensoft/productos?productos";
            const { data } = await axios(url);
            //console.log('FUNCION BY MODIFICAR')
            
            setProductsModificar(data);
            setFilteredProducto(data);
            console.log(data);

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
            const respuesta = await axios.delete(`http://localhost/CODIGO/invensoft/productos?cod_pro=${cod_pro}`);
            getProductosByModificar();
            let timerInterval;
                    Swal.fire({
                        title: "Actualizando información...",
                        timer: 6000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading();
                            const timer = Swal.getPopup().querySelector("b");
                            timerInterval = setInterval(() => {
                                //timer.textContent = `${Swal.getTimerLeft()}`;
                            }, 100);
                        },
                        willClose: () => {
                            clearInterval(timerInterval);
                        }

                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            //console.log("I was closed by the timer");
                        }
                    });

        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Registro Eliminado Correctamente',
                showConfirmButton: false,
                timer: 5000
            })
        }, 6000);
        }else{
            Swal.fire("Operación detenida", "", "info");
        }

            //getProductos();
            //getProductosByModificar();
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
            const respuesta = await axios.put(`http://localhost/CODIGO/invensoft/productos?cod_pro=${cod_pro}`, {cod_sub,nom_pro,descripcion,estado,img,garantia,duracion_garantia});
            
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
            const url = "http://localhost/CODIGO/invensoft/categorias";
            const { data } = await axios(url);
            setCategorias(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getSubCategorias = async (id = 1) => {        
        try {
            const url = `http://localhost/CODIGO/invensoft/subcategorias?categoria=${id}`;
            const { data } = await axios(url);
            setSubCategorias(data);
        } catch (error) {
            console.log(error);
        }
    };


    //GENERAR PDF
    const generarPDFProductos = () => {
        const doc = new jsPDF('landscape');
    
        // Logo
        const logoUrl = '/CODIGO/logo-circular.png'; // Reemplaza con la ruta de tu imagen de logo
        doc.addImage(logoUrl, 'PNG', 10, 10, 30, 30); // Ajusta las coordenadas y dimensiones según sea necesario
    
        // Título
        const title = 'LISTADO DE PRODUCTOS';
        doc.text(title, doc.internal.pageSize.width / 2, 28, 'center');
    
        // Fecha y Hora
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = formatTime12Hours(currentDate);
        const dateTimeText = `Generado el ${formattedDate} a las ${formattedTime}`;
        doc.setFontSize(11);
        doc.setFont('arial', 'italic', 'normal');
        doc.text(dateTimeText, doc.internal.pageSize.width - 15, 43, 'right');
        doc.setFont('normal');
    
        // Tabla
        const columns = ["Codigo", "Categoria", "Subcategoria", "Producto", "Descripcion", "Estado", "Garantia", "Duracion Garantia", "Stock"];
    
        // Datos
        const data = [];
        productsModificar.forEach((product, index) => {
            // Suponiendo que product.imagen de la API ya está en formato base64
            data.push([
                index + 1, // Índice + 1 para comenzar la numeración desde 1
              /*  {
                    image: product.base64Image, // Suponiendo que product.imagen de la API ya está en formato base64
                    width: 30, // Ajusta el ancho según sea necesario
                    height: 30 // Ajusta la altura según sea necesario
                },*/
                product.nom_cat,
                product.nom_sub,
                product.nombre,
                product.descripcion,
                product.estado == 1 ? 'ACTIVO' : 'INACTIVO',
                product.garantia == 1 ? 'Si' : 'No',
                product.duracion_garantia,
                product.stock
            ]);
        });
    
        // Generar tabla
        doc.autoTable({
            head: [columns],
            body: data,
            startY: 45, // Ajusta startY según sea necesario
            /*columnStyles: {
                1: { // Suponiendo que "Imagen" está en la segunda columna (índice 1)
                    cellWidth: 30, // Ajusta el ancho según sea necesario
                    cellPadding: 1 // Ajusta el relleno según sea necesario
                }
            }*/
        });
    
        // Guardar el PDF
        doc.save('lista_de_productos.pdf');
    }
    

    return (
        <ProductsContext.Provider
            value={{
                categorias,
                subcategorias,
                setIdSubcategoria,
                setProduct,
                productsModificar,
                handleDeleteProductos,
                updateProducts,
                getProductosByModificar,
                product,
                getSubCategorias, 
                inputSearch, 
                setInputSearch,
                filteredProducto,
                generarPDFProductos
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
