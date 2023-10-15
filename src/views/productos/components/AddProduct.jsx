import { useState } from "react";
import useProducts from "../../../hooks/useProducts";
import axios from "axios";

export const AddProduct = () => {

    const {categorias, setIdSubcategoria, subcategorias} = useProducts();

    const [selectCategory, setSelectCategory] = useState(''); // Estado para mantener el valor seleccionado
    const [selectSubCategory, setSelectSubCategory] = useState(''); // Estado para mantener el valor seleccionado
    const [nombreProducto, setNombreProducto] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Crear el producto en la API
        try {
            const subcategoria = selectSubCategory;
            const nom_pro = nombreProducto;
            const respuesta = await axios.post('http://localhost/invensoft/productos', {subcategoria, nom_pro});
            console.log(respuesta);
        } catch (error) {
            console.log(error.response);
        }
        
    }

    return (
        <>
            <div className="formulario bg-white rounded shadow-sm">
                <h2 className="form__title">Agregar Producto</h2>
                
                <div>
                    <div className="form__header">
                        <h3 className="form__subtitle">Proveedor y Categoria</h3>
                    </div>

                    <div>
                        <form onSubmit={handleSubmit} className="mt-3">
                            <div className="row p-2 mb-3">

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Categotia *</label>
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
