import { useState, useRef } from "react";
import useProducts from "../../../hooks/useProducts";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const AddProduct = () => {
    const { categorias, setIdSubcategoria, subcategorias, getProductosByModificar } = useProducts();
    const navigate = useNavigate();
    const texto_numeros = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüñÑ]+$/;

    const nombreCategoriaRef = useRef(null);
    const nombreSubcategoriaRef = useRef(null);
    const nombreProductoRef = useRef(null);
    const descripcionRef = useRef(null);
    const garantiaRef = useRef(null);
    const duracionGarantiaRef = useRef(null);
    const imagenRef = useRef(null);

    const [selectCategory, setSelectCategory] = useState(''); // Estado para mantener el valor seleccionado
    const [selectSubCategory, setSelectSubCategory] = useState(''); // Estado para mantener el valor seleccionado
    const [nombreProducto, setNombreProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [garantia, setGarantia] = useState('');
    const [duracionGarantia, setDuracionGarantia] = useState('');
    const [img2, setImage2] = useState(null);
    const [img, setImage] = useState(null);

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

        if (file) {
            setImage2(file);

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = () => {
                const base64data = reader.result;
                setImage(base64data);
            };
        } else {
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
            duracionGarantiaRef.current.style.borderColor = '';
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
            duracionGarantiaRef.current.style.borderColor = '';
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
            duracionGarantiaRef.current.style.borderColor = '';
            imagenRef.current.style.borderColor = '';
            nombreProductoRef.current.focus();
            nombreProductoRef.current.style.borderColor = 'red';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El nombre del producto es corto, tiene números y/o tiene caracteres especiales',
            })
            return;
        }

        /*if (!texto_numeros.test(descripcion)) {
            nombreCategoriaRef.current.style.borderColor = '';
            nombreSubcategoriaRef.current.style.borderColor = '';
            nombreProductoRef.current.style.borderColor = '';
            garantiaRef.current.style.borderColor = '';
            duracionGarantiaRef.current.style.borderColor = '';
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

        if (!garantia || (garantia !== '0' && garantia !== '1')) {
            nombreCategoriaRef.current.style.borderColor = '';
            nombreSubcategoriaRef.current.style.borderColor = '';
            nombreProductoRef.current.style.borderColor = '';
            descripcionRef.current.style.borderColor = '';
            duracionGarantiaRef.current.style.borderColor = '';
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
        if (!texto_numeros.test(duracionGarantia) && garantia == 1) {
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
            //console.log(img);

            const respuesta = await axios.post('http://localhost/invensoft/productos', { subcategoria, nom_pro, descripcion, img, garantia, duracion_garantia }, {

            });

            Swal.fire({
                icon: 'success',
                title: 'Producto creado correctamente',
                showConfirmButton: false,
                timer: 2000
            });

            //console.log(respuesta);
            getProductosByModificar();
            clearInputs();
            setTimeout(() => {
                navigate('/productos');
            }, 2000);
        } catch (error) {
            //console.log(error.response);
            nombreCategoriaRef.current.style.borderColor = '';
            nombreSubcategoriaRef.current.style.borderColor = '';
            nombreProductoRef.current.style.borderColor = '';
            garantiaRef.current.style.borderColor = '';
            descripcionRef.current.style.borderColor = '';
            duracionGarantiaRef.current.style.borderColor = '';
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
                <h2 className="form__title">Agregar Producto</h2>

                <div>
                    <div className="form__header">
                        <h3 className="form__subtitle">DETALLES DEL PRODUCTO</h3>
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
                                    <select className="form-select" value={selectSubCategory} onChange={handleChangeSubCategory} ref={nombreSubcategoriaRef}>
                                        <option value=''>Seleccione una opción</option>
                                        {subcategorias.map((subcategoria) =>
                                            <option key={subcategoria.cod_sub} value={subcategoria.cod_sub}>{subcategoria.nom_sub}</option>)
                                        }
                                    </select>
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Nombre del Producto *</label>
                                    <input type="text" value={nombreProducto} onChange={handleChangeNombre} className="form-control" ref={nombreProductoRef} required/>
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Descripcion del Producto</label>
                                    <input value={descripcion} onChange={handleChangeDescripcion} type="text" className="form-control" ref={descripcionRef} />
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Garantia *</label>
                                    <select className="form-select" value={garantia} onChange={handleChangeGarantia} ref={garantiaRef}>
                                        <option value=''>Seleccione una opción</option>
                                        <option value='1'>Si</option>
                                        <option value='0'>No</option>
                                    </select>
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Duracion de la Garantia</label>
                                    <input value={duracionGarantia} onChange={handleChangeDuracionGarantia} type="text" className="form-control" ref={duracionGarantiaRef} />
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Imagen</label>
                                    <input onChange={handleImagenChange} type="file" accept="image/*" className="form-control" ref={imagenRef} />
                                </div>


                                <div className="col-12 d-flex justify-content-center gap-3 mb-3">
                                    <p className="text-center">¿DESEA AGREGAR UNA COMPRA?
                                        {' '}
                                        <a href="/compras/agregar"><strong>DA CLICK AQUI</strong></a>
                                    </p>
                                </div>

                            </div>

                            <div className="col-12 d-flex justify-content-center gap-3">
                                {/* <button className="btn btn-secondary">Limpiar</button> */}
                                <button className="btn btn-primary" type="submit">Agregar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}