import { useState } from "react";
import useCompras from "../../../hooks/useCompras";

export const AddShop = () => {

    const {categorias, setIdSubcategoria, subcategorias} = useCompras();

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


  return (
    <>
        <div className="formulario bg-white rounded shadow-sm">
            <h2 className="form__title">Agregar Compra</h2>
            
            <div>
                <div className="form__header">
                    <h3 className="form__subtitle">Informacion de la compra</h3>
                </div>

                <div>
                    <form className="mt-3">
                        <div className="row p-2 mb-3">

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Categotia *</label>
                            <select className="form-select" value={selectCategory} onChange={handleChangeCategory}>
                                <option value="">Seleccione una opción</option>
                                {categorias.map((categoria) => 
                                    <option key={categoria.cod_cat} value={categoria.cod_cat}>{categoria.nom_cat}</option>)
                                }
                            </select>
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Subcategoria *</label>
                            <select className="form-select" value={selectSubCategory} onChange={handleChangeSubCategory}>
                                <option value="">Seleccione una opción</option>
                                {subcategorias.map((subcategoria) => 
                                    <option key={subcategoria.cod_sub} value={subcategoria.cod_sub}>{subcategoria.nom_sub}</option>)
                                }
                            </select>
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Producto *</label>
                            <select className="form-select" value={nombreProducto} onChange={handleChangeNombre}>
                                <option value="">Seleccione una opción</option>
                                <option value="opcion1">Opción 1</option>
                                <option value="opcion2">Opción 2</option>
                                <option value="opcion3">Opción 3</option>
                            </select>
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Proveedor *</label>
                            <select className="form-select" value={nombreProducto} onChange={handleChangeNombre}>
                                <option value="">Seleccione una opción</option>
                                <option value="opcion1">Opción 1</option>
                                <option value="opcion2">Opción 2</option>
                                <option value="opcion3">Opción 3</option>
                            </select>
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Cantidad *</label>
                            <input type="number" className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Precio Unitario *</label>
                            <input type="number" className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Precio de la Compra *</label>
                            <input type="number" className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Precio de Venta *</label>
                            <input type="number" className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Stock</label>
                            <input type="text" disabled className="form-control" required />
                        </div>

                        </div>

                        <div className="col-12 d-flex justify-content-center gap-3">
                            <button className="btn btn-secondary" type="submit">Limpiar</button>
                            <button className="btn btn-primary" type="submit">Agregar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}
