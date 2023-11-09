import { useState } from "react";
import useCompras from "../../../hooks/useCompras";

export const UpdateShop = ({compra}) => {

    const { 
        categorias,
        productsBySubCategory, 
        proovedores,
        subcategorias, 
        setIdSubcategoria, 
        setIdProductsSubcategory,
        upadateCompra,
        setIdProducto,
        productosInStock
    } = useCompras();    
    
    const [selectCategory, setSelectCategory] = useState(compra.cod_cat); // Estado para mantener el valor seleccionado
    const [selectSubCategory, setSelectSubCategory] = useState(compra.cod_sub); // Estado para mantener el valor seleccionado
    const [nombreProducto, setNombreProducto] = useState(compra.cod_pro);
    const [nombreProveedor, setNombreProveedor] = useState(compra.cod_prov);
    const [cantidad, setCantidad] = useState(compra.cantidad_compra);
    const [precioUnitario, setPrecioUnitario] = useState(compra.valor_unit_prov);
    const [precioCompra, setPrecioCompra] = useState(compra.valor_total);

    const handleChangeCategory = (event) => {
        setSelectCategory(event.target.value);
        setIdSubcategoria(event.target.value); // Se envia el id de la Categoria
    };

    const handleChangeSubCategory = (event) => {
        setSelectSubCategory(event.target.value);
        setIdProductsSubcategory(event.target.value); // Actualiza el estado cuando se selecciona un nuevo valor
    };

    const handleChangeNombre = (event) => {
        setNombreProducto(event.target.value);
        setIdProducto(event.target.value); // Actualiza el estado cuando se selecciona un nuevo valor
    };

    const handleChangeProveedor = (event) => {
        setNombreProveedor(event.target.value)
    }

    const handleChangeCantidad = (event) => {
        setCantidad(event.target.value)
    }

    const handleChangePrecioUnitario = (event) => {
        setPrecioUnitario(event.target.value)
    }

    const handleChangePrecioCompra = (event) => {
        setPrecioCompra(event.target.value)
    }

    const clearInputs = () => {
        selectCategory('');
        setSelectSubCategory('');
        setNombreProducto('');
        setNombreProveedor('');
        setCantidad('');
        setPrecioUnitario('');
        setPrecioCompra('');
        setProductoStock('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        upadateCompra( compra.cod_compra, nombreProducto, nombreProveedor, cantidad, precioUnitario, precioCompra);
        clearInputs();
    }


  return (
    <>
        <div className="formulario bg-white rounded shadow-sm">
            <h2 className="form__title">Editar Compra</h2>
            
            <div>
                <div className="form__header">
                    <h3 className="form__subtitle">Informacion de la compra</h3>
                </div>

                <div>
                    <form onSubmit={handleSubmit} className="mt-3">
                        <div className="row p-2 mb-3">

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Categoria *</label>
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
                                {productsBySubCategory.map((product) => 
                                    <option key={product.cod_pro} value={product.cod_pro}>{product.nombre}</option>)
                                }
                            </select>
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Proveedor *</label>
                            <select className="form-select" value={nombreProveedor} onChange={handleChangeProveedor}>
                                <option value="">Seleccione una opción</option>
                                {proovedores.map((proveedor) => 
                                    <option key={proveedor.cod_prov} value={proveedor.cod_prov}>{proveedor.nom_prov}</option>)
                                }
                            </select>
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Cantidad *</label>
                            <input value={cantidad} onChange={handleChangeCantidad} type="number" className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Precio Unitario *</label>
                            <input value={precioUnitario} onChange={handleChangePrecioUnitario} type="number" className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Precio de la Compra *</label>
                            <input value={precioCompra} onChange={handleChangePrecioCompra} type="number" className="form-control" required />
                        </div>

                        <div className="col-md-4 mb-md-4">
                            <label className="form-label">Stock</label>
                            <input type="text" value={productosInStock} disabled className="form-control" required />
                        </div>

                        </div>

                        <div className="col-12 d-flex justify-content-center gap-3">
                            <button className="btn btn-secondary" type="button" onClick={() => clearInputs()}>Limpiar</button>
                            <button className="btn btn-primary" type="submit">Editar Compra</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>  
    </>
  )
}
