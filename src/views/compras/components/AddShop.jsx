import { useState, useRef } from "react";
import useCompras from "../../../hooks/useCompras";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import '../../../index.css';

export const AddShop = () => {

    const navigate = useNavigate();

    const {
        categorias,
        productsBySubCategory,
        proovedores,
        subcategorias,
        setIdSubcategoria,
        setIdProductsSubcategory,
        createCompras,
        setIdProducto,
        productosInStock,
        setProductosInStock
    } = useCompras();

    const nombreSubcategoriaRef = useRef(null);
    const nombreProductoRef = useRef(null);
    const nombreProveedorRef = useRef(null);
    const cantidadRef = useRef(null);
    const precioUnitarioRef = useRef(null);
    const precioCompraRef = useRef(null);
    const buttonAgregar = useRef(null);

    const [selectCategory, setSelectCategory] = useState(''); // Estado para mantener el valor seleccionado
    const [selectSubCategory, setSelectSubCategory] = useState(''); // Estado para mantener el valor seleccionado
    const [nombreProducto, setNombreProducto] = useState('');
    const [nombreProveedor, setNombreProveedor] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precioUnitario, setPrecioUnitario] = useState('');
    const [precioCompra, setPrecioCompra] = useState('');

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
        const cantidad = event.target.value;
        setCantidad(cantidad);

        // Calcular PrecioCompra después de que PrecioUnitario se haya actualizado
        setPrecioCompra((prevPrecioCompra) => {
            // Utilizar el nuevo valor de PrecioUnitario para el cálculo
            return precioUnitario * cantidad;
        });
    }

    //const handleChangePrecioUnitario = (event) => {
    //  setPrecioUnitario(event.target.value)
    //setPrecioCompra(precioUnitario*cantidad)
    //}

    const handleChangePrecioUnitario = (event) => {
        const nuevoPrecioUnitario = event.target.value;
        setPrecioUnitario(nuevoPrecioUnitario);

        // Calcular PrecioCompra después de que PrecioUnitario se haya actualizado
        setPrecioCompra((prevPrecioCompra) => {
            // Utilizar el nuevo valor de PrecioUnitario para el cálculo
            return nuevoPrecioUnitario * cantidad;
        });
    }



    const handleChangePrecioCompra = (event) => {
        setPrecioCompra(event.target.value)
    }

    const clearInputs = () => {
        setSelectCategory('');
        setSelectSubCategory('');
        setNombreProducto('');
        setNombreProveedor('');
        setCantidad('');
        setPrecioUnitario('');
        setPrecioCompra('');
        setProductosInStock('');

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que los campos obligatorios no estén vacíos
        if (!selectSubCategory || selectSubCategory === '0') {

            nombreProductoRef.current.style.borderColor = '';
            nombreProveedorRef.current.style.borderColor = '';
            cantidadRef.current.style.borderColor = '';
            precioUnitarioRef.current.style.borderColor = '';
            precioCompraRef.current.style.borderColor = '';
            nombreSubcategoriaRef.current.focus();
            nombreSubcategoriaRef.current.style.borderColor = 'red';
            //nombreSubcategoriaRef.current.classList.add('custom-focus');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No ha seleccionado la subcategoría',
            })
            //nombreSubcategoriaRef.current.focus();
            //nombreSubcategoriaRef.current.classList.add('custom-focus');

            return;
        }

        if (!nombreProducto || nombreProducto === '0') {
            nombreSubcategoriaRef.current.style.borderColor = '';
            nombreProveedorRef.current.style.borderColor = '';
            cantidadRef.current.style.borderColor = '';
            precioUnitarioRef.current.style.borderColor = '';
            precioCompraRef.current.style.borderColor = '';
            nombreProductoRef.current.focus();
            nombreProductoRef.current.style.borderColor = 'red';
            //nombreProductoRef.current.classList.add('custom-focus');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No ha seleccionado el producto',
            })

            return;
        }

        if (!nombreProveedor || nombreProveedor === '0') {
            nombreSubcategoriaRef.current.style.borderColor = '';
            nombreProductoRef.current.style.borderColor = '';
            cantidadRef.current.style.borderColor = '';
            precioUnitarioRef.current.style.borderColor = '';
            precioCompraRef.current.style.borderColor = '';
            nombreProveedorRef.current.focus();
            nombreProveedorRef.current.style.borderColor = 'red';
            //nombreProductoRef.current.classList.add('custom-focus');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No ha seleccionado el proveedor',
            });
            return;
        }

        if (!cantidad) {
            nombreSubcategoriaRef.current.style.borderColor = '';
            nombreProductoRef.current.style.borderColor = '';
            nombreProveedorRef.current.style.borderColor = '';
            precioUnitarioRef.current.style.borderColor = '';
            precioCompraRef.current.style.borderColor = '';
            cantidadRef.current.focus();
            cantidadRef.current.style.borderColor = 'red';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La cantidad no puede estar vacía',
            });
            return;
        }

        if (!precioUnitario) {
            nombreSubcategoriaRef.current.style.borderColor = '';
            nombreProductoRef.current.style.borderColor = '';
            nombreProveedorRef.current.style.borderColor = '';
            cantidadRef.current.style.borderColor = '';
            precioCompraRef.current.style.borderColor = '';
            precioUnitarioRef.current.focus();
            precioUnitarioRef.current.style.borderColor = 'red';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El precio unitario no puede estar vacío',
            });
            return;
        }

        if (!precioCompra) {
            nombreSubcategoriaRef.current.style.borderColor = '';
            nombreProductoRef.current.style.borderColor = '';
            nombreProveedorRef.current.style.borderColor = '';
            cantidadRef.current.style.borderColor = '';
            precioUnitarioRef.current.style.borderColor = '';
            precioCompraRef.current.focus();
            precioCompraRef.current.style.borderColor = 'red';
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El precio de la compra no puede estar vacío',
            });
            return;
        }
        createCompras(selectSubCategory, nombreProducto, nombreProveedor, cantidad, precioUnitario, precioCompra);
        clearInputs();
        setTimeout(() => {
            navigate('/compras');
        }, 2000);


    }


    return (
        <>
            <div className="formulario bg-white rounded shadow-sm">
                <h2 className="form__title">Añadir Compra</h2>

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
                                    {selectCategory ? (
                                        <select
                                            className="form-select"
                                            value={selectSubCategory}
                                            onChange={handleChangeSubCategory}
                                            ref={nombreSubcategoriaRef}
                                        >
                                            <option value='0'>Seleccione una opción</option>
                                            {subcategorias.map((subcategoria) => (
                                                <option key={subcategoria.cod_sub} value={subcategoria.cod_sub}>{subcategoria.nom_sub}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <select className="form-select" ref={nombreSubcategoriaRef}>
                                            <option value='0'>Seleccione una opción</option>
                                        </select>
                                    )}
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Producto *</label>
                                    {selectSubCategory ? (
                                        <select 
                                            className="form-select" 
                                            value={nombreProducto} 
                                            onChange={handleChangeNombre} 
                                            ref={nombreProductoRef}
                                        >
                                            <option value="0">Seleccione una opción</option>
                                            {productsBySubCategory.map((product) => (
                                                <option key={product.cod_pro} value={product.cod_pro}>{product.nombre}</option>
                                                ))}
                                        </select>
                                    ) : (
                                        <select className="form-select" ref={nombreProductoRef}>
                                            <option value='0'>Seleccione una opción</option>
                                        </select>
                                    )}
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Proveedor *</label>
                                    <select className="form-select" value={nombreProveedor} onChange={handleChangeProveedor} ref={nombreProveedorRef}>
                                        <option value="0">Seleccione una opción</option>
                                        {proovedores.map((proveedor) =>
                                            <option key={proveedor.cod_prov} value={proveedor.cod_prov}>{proveedor.nom_prov}</option>)
                                        }
                                    </select>
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Cantidad *</label>
                                    <input value={cantidad} onChange={handleChangeCantidad} type="number" className="form-control" ref={cantidadRef} />
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Precio Unitario *</label>
                                    <input value={precioUnitario} onChange={handleChangePrecioUnitario} type="number" className="form-control" ref={precioUnitarioRef} />
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Precio de la Compra *</label>
                                    <input value={precioCompra} onChange={handleChangePrecioCompra} type="number" className="form-control" ref={precioCompraRef} />
                                </div>

                                <div className="col-md-4 mb-md-4">
                                    <label className="form-label">Stock</label>
                                    <input type="text" value={productosInStock} disabled className="form-control" />
                                </div>

                            </div>

                            <div className="col-12 d-flex justify-content-center gap-3 mb-3">
                                <p className="text-center">NOTA: RECUERDA QUE DEBES AÑADIR EL PRODUCTO Y DESPUES HACER LA COMPRA DA CLICK AQUI SI NO LO HAS AGREGADO</p>
                            </div>

                            <div className="col-12 d-flex justify-content-center gap-3">
                                <button className="btn btn-secondary" type="button" onClick={() => clearInputs()}>Limpiar</button>
                                <button ref={buttonAgregar} className="btn btn-primary" type="submit">Agregar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
