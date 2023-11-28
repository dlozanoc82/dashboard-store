import React, { useEffect, useState } from 'react'
import useProducts from '../../../hooks/useProducts';
import Swal from 'sweetalert2';

const UpdateProduct = ({product}) => {
    const { categorias, setIdSubcategoria, subcategorias, getSubCategorias } = useProducts();
   
    

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

        setImage2(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            const base64data = reader.result;
            setImage(base64data);
        };

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

        // Crear el producto en la API
        try {
            const subcategoria = selectSubCategory;
            const nom_pro = nombreProducto;
            const duracion_garantia = duracionGarantia;
            console.log(img);

            const respuesta = await axios.post(`http://localhost/invensoft/productos?cod_pro=${product.cod_pro}`, { subcategoria, nom_pro, descripcion, img, garantia, duracion_garantia }, {

            });

            Swal.fire({
                icon: 'success',
                title: 'Producto creado correctamente',
                showConfirmButton: false,
                timer: 2000
            });

            //console.log(respuesta);
            clearInputs();
        } catch (error) {
            //console.log(error.response);
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
                        <h3 className="form__subtitle">Proveedor y Categoria</h3>
                    </div>

                    <div>
                        <form onSubmit={handleSubmit} className="mt-3">
                            <div className="row p-2 mb-3">

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Categoria *</label>
                                    <select className="form-select" value={selectCategory} onChange={handleChangeCategory}>
                                        <option value='0'>Seleccione una opción</option>
                                        {categorias.map((categoria) =>
                                            <option key={categoria.cod_cat} value={categoria.cod_cat}>{categoria.nom_cat}</option>)
                                        }
                                    </select>
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Subcategoria *</label>
                                    <select className="form-select" value={selectSubCategory} onChange={handleChangeSubCategory}>
                                        <option value=''>Seleccione una opción</option>
                                        {subcategorias.map((subcategoria) =>
                                            <option key={subcategoria.cod_sub} value={subcategoria.cod_sub}>{subcategoria.nom_sub}</option>)
                                        }
                                    </select>
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Nombre del Producto *</label>
                                    <input type="text" value={nombreProducto} onChange={handleChangeNombre} className="form-control" required />
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Descripcion del Producto</label>
                                    <input value={descripcion} onChange={handleChangeDescripcion} type="text" className="form-control" />
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Garantia</label>
                                    <input value={garantia} onChange={handleChangeGarantia} type="text" className="form-control" />
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Duracion de la Garantia</label>
                                    <input value={duracionGarantia} onChange={handleChangeDuracionGarantia} type="text" className="form-control" />
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Imagen</label>
                                    <input onChange={handleImagenChange} type="file" accept="image/*" className="form-control" />
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

export default UpdateProduct
