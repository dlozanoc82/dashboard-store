import React, { useEffect, useState, useRef } from 'react'
import useProducts from '../../../hooks/useProducts';
import Swal from 'sweetalert2';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import useDashborad from '../../../hooks/useDashborad';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const UpdateProduct = ({ product }) => {
    const { categorias, setIdSubcategoria, subcategorias, getSubCategorias, getProductosByModificar } = useProducts();
    const navigate = useNavigate();
    const { handleActiveOption } = useDashborad();
    const texto_numeros = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüñÑ]+$/;

    const nombreCategoriaRef = useRef(null);
    const nombreSubcategoriaRef = useRef(null);
    const nombreProductoRef = useRef(null);
    const descripcionRef = useRef(null);
    const garantiaRef = useRef(null);
    const duracionGarantiaRef = useRef(null);
    const imagenRef = useRef(null);
    let archivo_erroneo = false;

    const [selectCategory, setSelectCategory] = useState(product.cod_cat); // Estado para mantener el valor seleccionado
    const [selectSubCategory, setSelectSubCategory] = useState(product.cod_sub); // Estado para mantener el valor seleccionado
    const [nombreProducto, setNombreProducto] = useState(product.nombre);
    const [descripcion, setDescripcion] = useState(product.descripcion);
    const [garantia, setGarantia] = useState(product.garantia);
    const [duracionGarantia, setDuracionGarantia] = useState(product.duracion_garantia);
    const [img2, setImage2] = useState(null);
    const [img, setImage] = useState(null);

    useEffect(() => {
        getSubCategorias(product.cod_cat)
    }, [])


    const handleChangeCategory = (event) => {
        setSelectCategory(event.target.value);
        setIdSubcategoria(event.target.value); // Actualiza el estado cuando se selecciona un nuevo valor
    };

    const handleChangeSubCategory = (event) => {
        setSelectSubCategory(event.target.value); // Actualiza el estado cuando se selecciona un nuevo valor
    };

    const handleChangeNombre = (event) => {
        setNombreProducto(event.target.value); // Actualiza el estado cuando se selecciona un nuevo valor
    };

    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
    };

    const handleChangeGarantia = (event) => {
        setGarantia(event.target.value);
    };

    const handleChangeDuracionGarantia = (event) => {
        setDuracionGarantia(event.target.value);
    };

    //const handleImagenChange = (e) => {
    //  const file = e.target.files[0];
    //setImage2(file);
    //};

    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff', 'image/webp'];

        if (file) { //Si el usuario ha cargado una imagen se procede a convertirse a base64
            if (allowedMimeTypes.includes(file.type)) {
                setImage2(file);

                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onloadend = () => {
                    const base64data = reader.result;
                    setImage(base64data);
                };
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error el archivo seleccionado no es una imagen',
                });
                nombreCategoriaRef.current.style.borderColor = '';
                nombreSubcategoriaRef.current.style.borderColor = '';
                nombreProductoRef.current.style.borderColor = '';
                garantiaRef.current.style.borderColor = '';
                descripcionRef.current.style.borderColor = '';
                //duracionGarantiaRef.current.style.borderColor = '';
                imagenRef.current.focus();
                imagenRef.current.style.borderColor = 'red';
                archivo_erroneo = true;
                setImage(null);
                setImage2(null);
            }
        } else {    //Si el usuario no ha cargado imagenes se envia una cadena vacia
            setImage('');
        }
    };

    const clearInputs = () => {
        setSelectCategory('');
        setSelectSubCategory('');
        setNombreProducto('');
        setImage(null);
        setImage2(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Validacion de campos:
        // Validar que los campos obligatorios no estén vacíos
        if (!selectCategory || selectCategory === '0') {

            nombreSubcategoriaRef.current.style.borderColor = '';
            nombreProductoRef.current.style.borderColor = '';
            descripcionRef.current.style.borderColor = '';
            garantiaRef.current.style.borderColor = '';
            //duracionGarantiaRef.current.style.borderColor = '';
            imagenRef.current.style.borderColor = '';
            nombreCategoriaRef.current.focus();
            nombreCategoriaRef.current.style.borderColor = 'red';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No ha seleccionado la Categoría',
            })

            return;
        }

        if (!selectSubCategory || selectSubCategory === '0') {

            nombreCategoriaRef.current.style.borderColor = '';
            nombreProductoRef.current.style.borderColor = '';
            descripcionRef.current.style.borderColor = '';
            garantiaRef.current.style.borderColor = '';
            //duracionGarantiaRef.current.style.borderColor = '';
            imagenRef.current.style.borderColor = '';
            nombreSubcategoriaRef.current.focus();
            nombreSubcategoriaRef.current.style.borderColor = 'red';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No ha seleccionado la subcategoría',
            })

            return;
        }

        if (!texto_numeros.test(nombreProducto) || nombreProducto.length < 6) {
            nombreCategoriaRef.current.style.borderColor = '';
            nombreSubcategoriaRef.current.style.borderColor = '';
            descripcionRef.current.style.borderColor = '';
            garantiaRef.current.style.borderColor = '';
            //duracionGarantiaRef.current.style.borderColor = '';
            imagenRef.current.style.borderColor = '';
            nombreProductoRef.current.focus();
            nombreProductoRef.current.style.borderColor = 'red';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El nombre del producto es corto y/o tiene caracteres especiales',
            })
            return;
        }

        /*  if (descripcion.length < 8) {
              nombreCategoriaRef.current.style.borderColor = '';
              nombreSubcategoriaRef.current.style.borderColor = '';
              nombreProductoRef.current.style.borderColor = '';
              garantiaRef.current.style.borderColor = '';
              //duracionGarantiaRef.current.style.borderColor = '';
              imagenRef.current.style.borderColor = '';
              descripcionRef.current.focus();
              descripcionRef.current.style.borderColor = 'red';
              Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'La descripción esta muy corta o tiene caracteres no válidos',
              });
              return;
          }*/
        /*
                if (!garantia) {
                    nombreCategoriaRef.current.style.borderColor = '';
                    nombreSubcategoriaRef.current.style.borderColor = '';
                    nombreProductoRef.current.style.borderColor = '';
                    descripcionRef.current.style.borderColor = '';
                    //duracionGarantiaRef.current.style.borderColor = '';
                    imagenRef.current.style.borderColor = '';
                    garantiaRef.current.focus();
                    garantiaRef.current.style.borderColor = 'red';
                    //console.log(nombreProducto);
                    //nombreProductoRef.current.classList.add('custom-focus');
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No ha seleccionado la garantía',
                    });
                    return;
                }
                */
        if ((!texto_numeros.test(duracionGarantia) && garantia == 1 && duracionGarantia.length < 3)) {
            nombreCategoriaRef.current.style.borderColor = '';
            nombreSubcategoriaRef.current.style.borderColor = '';
            nombreProductoRef.current.style.borderColor = '';
            garantiaRef.current.style.borderColor = '';
            descripcionRef.current.style.borderColor = '';
            imagenRef.current.style.borderColor = '';
            duracionGarantiaRef.current.focus();
            duracionGarantiaRef.current.style.borderColor = 'red';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La duración de la garantía es muy corta o lleva caracteres especiales',
            });
            return;
        }

        // Crear el producto en la API
        try {
            const subcategoria = selectSubCategory;
            const nom_pro = nombreProducto;
            const duracion_garantia = duracionGarantia;
            const estado = '1';
            //console.log(img);
            //console.log(product.cod_pro)

            if (archivo_erroneo == false) {
                let confirmado = await Swal.fire({
                    title: "¿Esta seguro de actualizar este producto?",
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: "Si",
                    denyButtonText: `No`
                });

                if (confirmado.isConfirmed) {
                    const respuesta = await axios.put(`http://localhost/CODIGO/invensoft/productos?cod_pro=${product.cod_pro}`, { subcategoria, nom_pro, descripcion, estado, img, garantia, duracion_garantia }, {
                    });
                    getProductosByModificar();
                    //console.log({ respuesta });
                    //Ventana emergente para cargar imagen al servidor
                    let timerInterval;
                    Swal.fire({
                        title: "Guardando información",
                        timer: 5000,
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
                    //console.log(respuesta);
                    //getProductosByModificar();
                    clearInputs();
                    setTimeout(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'El Producto fue actualizado correctamente',
                            showConfirmButton: false,
                            timer: 5000
                        });
                        navigate('/productos');
                    }, 6500);
                } else {
                    Swal.fire("Operación detenida", "", "info");
                    nombreCategoriaRef.current.style.borderColor = '';
                    nombreSubcategoriaRef.current.style.borderColor = '';
                    nombreProductoRef.current.style.borderColor = '';
                    garantiaRef.current.style.borderColor = '';
                    descripcionRef.current.style.borderColor = '';
                    imagenRef.current.style.borderColor = '';
                    //nombreProveedorRef.current.style.borderColor = '';
                    //cantidadRef.current.style.borderColor = '';
                    //precioUnitarioRef.current.style.borderColor = '';
                    //precioCompraRef.current.style.borderColor = '';
                    //precioCompraVenta.current.style.borderColor = '';
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Archivo incorrecto',
                    text: 'Solo se permite imagenes',
                });
            }
        } catch (error) {
            console.log(error);
            nombreCategoriaRef.current.style.borderColor = '';
            nombreSubcategoriaRef.current.style.borderColor = '';
            nombreProductoRef.current.style.borderColor = '';
            garantiaRef.current.style.borderColor = '';
            descripcionRef.current.style.borderColor = '';
            //duracionGarantiaRef.current.style.borderColor = '';
            imagenRef.current.focus();
            imagenRef.current.style.borderColor = 'red';
            Swal.fire({
                icon: 'error',
                title: 'Archivo incorrecto',
                text: 'Solo se permite imagenes',
            });
        }
    };

    return (
        <>
            <div className="formulario bg-white rounded shadow-sm">
                <h2 className="form__title">Editar Producto</h2>

                <div>
                    <div className="form__header">
                        <h3 className="form__subtitle">Detalles del producto</h3>
                    </div>

                    <div>
                        <form onSubmit={handleSubmit} className="mt-3">
                            <div className="row p-2 mb-3">

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Categoria *</label>
                                    <select className="form-select" value={selectCategory} onChange={handleChangeCategory} ref={nombreCategoriaRef}>
                                        <option value='0'>Seleccione una opción</option>
                                        {categorias.map((categoria) =>
                                            <option key={categoria.cod_cat} value={categoria.cod_cat}>{categoria.nom_cat}</option>)
                                        }
                                    </select>
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Subcategoria *</label>
                                    <select
                                        className="form-select"
                                        value={selectSubCategory}
                                        onChange={handleChangeSubCategory}
                                        ref={nombreSubcategoriaRef}
                                    >
                                        {selectCategory ? (
                                            <>
                                                <option value='0'>Seleccione una opción</option>
                                                {subcategorias.map((subcategoria) => (
                                                    <option key={subcategoria.cod_sub} value={subcategoria.cod_sub}>
                                                        {subcategoria.nom_sub}
                                                    </option>
                                                ))}
                                            </>
                                        ) : (
                                            <option value='0'>Seleccione una opción</option>
                                        )}
                                    </select>
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Nombre del Producto *</label>
                                    <input type="text" value={nombreProducto} onChange={handleChangeNombre} className="form-control" ref={nombreProductoRef} required />
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Descripcion del Producto</label>
                                    <input value={descripcion} onChange={handleChangeDescripcion} type="text" className="form-control" ref={descripcionRef} required />
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Garantia *</label>
                                    <select className="form-select" value={garantia} onChange={handleChangeGarantia} ref={garantiaRef}>
                                        <option value='0'>No</option>
                                        <option value='1'>Si</option>
                                    </select>
                                </div>

                                {
                                    garantia == 1 ?
                                        <div className="col-md-4 mb-md-4">
                                            <label className="form-label">Duracion de la Garantia</label>
                                            <input value={duracionGarantia} onChange={handleChangeDuracionGarantia} type="text" className="form-control" ref={duracionGarantiaRef} />
                                        </div>
                                        : <></>
                                }


                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Imagen</label>
                                    <input onChange={handleImagenChange} type="file" accept="image/*" className="form-control" ref={imagenRef} />
                                </div>


                                <div className="col-12 d-flex justify-content-center gap-3 mb-3">
                                    <p className="text-center">¿DESEA AGREGAR UNA COMPRA?
                                        {' '}
                                        <Link to="/compras/agregar" onClick={() => handleActiveOption('Compras', faShoppingCart)}><strong>DA CLICK AQUI</strong></Link>
                                    </p>
                                </div>

                            </div>

                            <div className="col-12 d-flex justify-content-center gap-3">
                                {/* <button className="btn btn-secondary">Limpiar</button> */}
                                <button className="btn btn-primary" type="submit">Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct
