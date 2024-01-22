import { useRef, useState } from 'react';
import useVentas from '../../../hooks/useVentas';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import useApartado from '../../../hooks/useApartado';
import useDashborad from '../../../hooks/useDashborad';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { formatearCantidad } from '../../../helpers/GeneralFunctions';

const AddApartado = () => {
  const solo_numeros = /^[0-9]*$/;
  const { handleActiveOption } = useDashborad();
  const documentoRef = useRef(null);
  const cod_proRef = useRef(null);
  const cant_prodRef = useRef(null);
  const navigate = useNavigate();

  const {
    getCliente,
    cliente,
    getProductAdd,
    producto,
    clienteId,
    getVentas,
    setProducto,
    setCliente,
    cod_detalle,
    allProducts,
    getProductosMasVendidos,
  } = useVentas();

  const {getApartados} = useApartado();

  const [documento, setDocumento] = useState('');
  const [codProducto, setCodProducto] = useState('');
  const [metodoPago, setMetodoPago] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [total, setTotal] = useState('');
  const [productosVentas, setProductosVenta] = useState([]);
  const [productosVentasMostrar, setProductosVentaMostrar] = useState([]);
  const [fechaLimitePago, setFechaLimitePago] = useState('');
  const [abono, setAbono] = useState('');

  const handleChangeMethodPay = (event) => {
    setMetodoPago(event.target.value);
  };

  const handleCodProducto = (e) => {
    setCodProducto(e.target.value);
  };

  const clearInputs = () => {
    // Limpiar los inputs según sea necesario
    setCodProducto('');
    setCantidad('');
    setTotal('');
  };

  const handleChangeCantidad = (e) => {
    const nuevaCantidad = e.target.value;
    setCantidad(nuevaCantidad);
    const nuevoPrecioTotal = nuevaCantidad * (producto.length === 0 ? 0 : producto[0].valor_venta);
    setTotal(nuevoPrecioTotal);
  };

  const handleDocumento = (e) => {
    setDocumento(e.target.value);
  };

  const handleSubmitCliente = (e) => {
    e.preventDefault();

    if (!solo_numeros.test(documento)) {
      documentoRef.current.focus();
      documentoRef.current.style.borderColor = 'red';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El campo documento debe ser numérico',
      });
      return;
    }

    setCliente('');
    getCliente(documento);
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();

    if (!solo_numeros.test(codProducto)) {
      cod_proRef.current.focus();
      cod_proRef.current.style.borderColor = 'red';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El campo código del producto debe ser numérico',
      });
      return;
    }

    getProductAdd(codProducto);
  };

  const addItem = (e) => {
    e.preventDefault();

    if (!solo_numeros.test(cantidad) || cantidad < 0) {
      cant_prodRef.current.focus();
      cant_prodRef.current.style.borderColor = 'red';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El campo cantidad debe ser un número positivo',
      });
      return;
    }

    if (isNaN(cantidad)) {
      cant_prodRef.current.focus();
      cant_prodRef.current.style.borderColor = 'red';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La cantidad es incorrecta',
      });
      return;
    }

    if (parseInt(producto[0].stock) < parseInt(cantidad)) {
      console.log("stock"+producto[0].stock);
      console.log("cantidad "+cantidad);
      cant_prodRef.current.focus();
      cant_prodRef.current.style.borderColor = 'red';
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La cantidad excede el stock disponible',
      });
      return;
    }
    

    const existingProductIndex = productosVentasMostrar.findIndex(
      (p) => p.cod_pro === producto[0].cod_pro
    );

    if (existingProductIndex !== -1) {
      // Si el producto ya existe, actualiza la cantidad en lugar de agregar uno nuevo
      const updatedProductosVentasMostrar = [...productosVentasMostrar];
      updatedProductosVentasMostrar[existingProductIndex].cantidad += parseInt(cantidad, 10);
      updatedProductosVentasMostrar[existingProductIndex].precio_total += parseInt(total, 10);
      setProductosVentaMostrar(updatedProductosVentasMostrar);

      // Actualiza productosVentas reflejando el cambio en productosVentasMostrar
      const updatedProductosVentas = [...productosVentas];
      updatedProductosVentas[existingProductIndex].cantidad += parseInt(cantidad, 10);
      updatedProductosVentas[existingProductIndex].precio_total += parseInt(total, 10);
      setProductosVenta(updatedProductosVentas);
    } else {
      // Si el producto no existe, agrega uno nuevo
      const newProductoMostrar = {
        cod_pro: producto[0].cod_pro,
        nombre: producto[0].nombre,
        cantidad: parseInt(cantidad, 10),
        precio_unitario: producto[0].valor_venta,
        precio_total: parseInt(total, 10),
      };
      setProductosVentaMostrar([...productosVentasMostrar, newProductoMostrar]);

      // Agrega el nuevo producto a productosVentas
      const newProductoVenta = {
        cod_pro: producto[0].cod_pro,
        cantidad: parseInt(cantidad, 10),
        precio_unitario: producto[0].valor_venta,
        precio_total: parseInt(total, 10),
        cod_detalle: producto[0].cod_detalle, // Agregado el código del detalle
      };
      setProductosVenta([...productosVentas, newProductoVenta]);
    }

    Swal.fire({
      title: 'Producto Agregado Correctamente',
      icon: 'success',
    });
    

    clearInputs();
  };

  const handleEliminarItem = (index) => {
    const nuevosProductos = [...productosVentas];
    nuevosProductos.splice(index, 1);
    setProductosVenta(nuevosProductos);

    const nuevosProductosMostrar = [...productosVentasMostrar];
    nuevosProductosMostrar.splice(index, 1);
    setProductosVentaMostrar(nuevosProductosMostrar);
  };

  // Calcula el precio total sumando los valores de producto.precio_total
  const precioTotal = productosVentasMostrar.reduce((total, producto) => {
    return total + producto.precio_total;
  }, 0);

  const renderProductos = () => (
    <div className="col-md-8 mb-md-4 m-auto pt-5">
      <div className='table__scroll mb-4'>
        <table className="table">
          <thead>
            <tr>
              <th>Código Detalle</th>
              <th>Nombre del Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Precio Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosVentasMostrar.map((producto, index) => (
              <tr key={index}>
                <td>{producto.cod_pro}</td>
                <td>{producto.nombre}</td>
                <td>{producto.cantidad}</td>
                <td>{formatearCantidad(producto.precio_unitario)}</td>
                <td>{formatearCantidad(producto.precio_total)}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEliminarItem(index)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            <tr>
          <td colSpan="4"></td>
          <td><b>Total Apartado:</b></td> 
          <td>{formatearCantidad(precioTotal)}</td>
        </tr>
          </tbody> 
        </table>
      </div>
      <form onSubmit={finalizarVenta}>
        <div className="row p-2 mb-3">
          <div className="col-md-4 mb-md-4">
            <label className="form-label">Tipo de Pago *</label>
            <select
              className="form-select"
              value={metodoPago}
              onChange={handleChangeMethodPay}
              required
            >
              <option value="3">Efectivo</option>
              <option value="1">Nequi</option>
              <option value="2">DaviPlata</option>
              
            </select>
          </div>
          <div className="col-md-4 mb-md-4">
            <label className="form-label">Fecha Limite de Pago *</label>
            <input
              value={fechaLimitePago}
              onChange={(e) => setFechaLimitePago(e.target.value)}
              type="date"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4 mb-md-4">
            <label className="form-label">Abono *</label>
            <input
              value={abono}
              onChange={(e) => setAbono(e.target.value)}
              type="number"
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="col-12 d-flex justify-content-center gap-3">
          <button className="btn btn-primary" type="submit">
            Terminar Apartado
          </button>
        </div>
      </form>
    </div>
  );

  const finalizarVenta = async (e) => {
    e.preventDefault();

    // Consolidar productosVentas antes de enviar la venta
    const consolidatedProductosVentas = [];

    console.log({productosVentas})
    console.log(productosVentas.length)

    productosVentas.forEach((producto) => {
      //Ciclo foreach, se tiene productosVentas y es renombrado a producto
      const existingProductIndex = consolidatedProductosVentas.findIndex(
        //Se construye una variable y se llama la variable arreglo consolidatedProductosVentas[] y se usa la funcion findIndex para buscar si ya esta agregado en el carrito el producto
        (p) => p.cod_pro === producto.cod_pro
        //Si este condicional no se cumple retorna un -1
      );

      if (existingProductIndex !== -1) {
        // Si el producto ya existe, actualiza la cantidad y precio_total en lugar de agregar uno nuevo
        consolidatedProductosVentas[existingProductIndex].cantidad += producto.cantidad;
        consolidatedProductosVentas[existingProductIndex].precio_total +=
          producto.cantidad * producto.precio_unitario;
      } else {
        // Si el producto no existe, agrega uno nuevo
        consolidatedProductosVentas.push({
          cod_pro: producto.cod_pro,
          cantidad: producto.cantidad,
          precio_unitario: producto.precio_unitario,
          precio_total: producto.precio_total,
        });
      }
    });

    console.log({ consolidatedProductosVentas });
    console.log({ productosVentasMostrar });
    // Crea el objeto JSON con la información consolidada de la venta
    const ventaJson = {
      apartado: {
        //abono_general: parseFloat(abono / productosVentas.length),
        abono_general: parseInt(abono),
        tipo_pago: parseInt(metodoPago),
        fecha_limite_pago: fechaLimitePago,
        total_a_pagar: productosVentas.reduce(
          (total, producto) => total + producto.precio_total,
          0
        ),
      },
      items: productosVentas.map((producto) => ({
        cod_detalle: producto.cod_detalle,
        cantidad: producto.cantidad,
        valor_unit: parseFloat(producto.precio_unitario),
      })),
    };

    console.log(`Tu texto aquí: ${ ventaJson }`);
    console.log({ ventaJson });

    try {
      // Realiza la solicitud POST al endpoint con el objeto JSON como datos
      const respuesta = await axios.post(
        `https://invensoftvargas.com/invensoft/apartados?cod_usu=${clienteId}`,
        ventaJson
      );
      console.log(respuesta);
      // Reinicia los estados después de completar la venta
      Swal.fire({
        title: 'Apartado Registrado',
        icon: 'success',
      });
      setProductosVentaMostrar([]);
      setProductosVenta([]);
      setMetodoPago('');
      getVentas();
      setCliente([]);
      setDocumento('');
      getProductosMasVendidos();
      getApartados();
      setTimeout(() => {
        navigate('/apartados');
      }, 2000);
      
      // Otros estados que necesites reiniciar...
    } catch (error) {
      console.error('Error al enviar la venta:', error);
      // Maneja el error según tus necesidades
    }
  };

    
  
    return (
      <div className="formulario bg-white rounded shadow-sm mb-5">
        <h2 className="form__title">Añadir Apartado</h2>
  
        {/* INFORMACION */}
        <div className="form__header">
          <h3 className="form__subtitle<">Información del Cliente</h3>
        </div>
  
        <div>
          <form onSubmit={handleSubmitCliente} className="mt-3">
            <div className="row p-2 mb-3">
              <div className="col-md-4 mb-md-4">
                <label className="form-label">Numero de Documento *</label>
                <input
                  value={documento}
                  onChange={handleDocumento}
                  type="number"
                  className="form-control"
                  ref={documentoRef}
                  required
                />
              </div>
              <div className="col-md-4 mb-md-4">
                <label className="form-label">Cliente</label>
                <input
                  value={
                    cliente.length === 0
                      ? 'Usuario no registrado'
                      : cliente[0].nombres + ' ' + cliente[0].apellidos
                  }
                  disabled
                  type="text"
                  className="form-control"
                  required
                />
                {cliente.length === 0 && (
                  <Link to="/clientes/agregar" onClick={() => handleActiveOption('Clientes', faUser)} className="ms-2">
                    Registrar Usuario
                  </Link>
                )}
              </div>
              <div className="col-md-4 d-flex justify-content-start align-items-center mt-2">
                <button className="btn btn-primary" type="submit">
                  Consultar
                </button>
              </div>
            </div>
          </form>
        </div>
  
        {/* INFORMACION PRODUCTO */}
        <div className="form__header">
          <h3 className="form__subtitle<">Buscar Producto</h3>
        </div>
  
        <div>
          <form onSubmit={handleSubmitProduct} className="mt-3">
            <div className="row p-2 mb-3">
            <div className="col-md-4 mb-md-4">
                <label className="form-label">Codigo del Producto *</label>
                <select
                      className="form-select"
                      value={codProducto}
                      onChange={handleCodProducto}
                  >
                      <option value="0">Seleccione una opción</option>
                      {allProducts.map((product) => (
                         product.stock !== 0 ? 
                          <option key={product.cod_pro} value={product.cod_pro}>Cod: {product.cod_pro} - {product.nombre}</option>
                          : <></>
                      ))}
                  </select>
              </div>
              <div hidden className="col-md-4 mb-md-4">
                <label className="form-label">Codigo del Producto *</label>
                <input
                  value={codProducto}
                  onChange={handleCodProducto}
                  type="number"
                  className="form-control"
                  ref={cod_proRef}
                  required
                />
              </div>
              <div className="col-md-4 d-flex justify-content-start align-items-center mt-2">
                <button className="btn btn-primary" type="submit">
                  Consultar
                </button>
              </div>
            </div>
          </form>
        </div>
  
        <div>
          <div className="form__header">
            <h3 className="form__subtitle<">Información del Apartado</h3>
          </div>
  
          <div>
            <form onSubmit={addItem} className="mt-3">
              <div className="row p-2 mb-3">
                <div className="col-md-4 mb-md-4">
                  <label className="form-label">Categoria </label>
                  <input
                    disabled
                    value={producto.length === 0 ? '' : producto[0].nom_cat}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
  
                <div className="col-md-4 mb-md-4">
                  <label className="form-label">Subcategoria </label>
                  <input
                    disabled
                    value={producto.length === 0 ? '' : producto[0].nom_sub}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
  
                <div className="col-md-4 mb-md-4">
                  <label className="form-label">Producto </label>
                  <input
                    disabled
                    value={producto.length === 0 ? '' : producto[0].nombre}
                    type="text"
                    className="form-control"
                    required
                  />
                </div>
  
                <div className="col-md-4 mb-md-4">
                  <label className="form-label">Stock</label>
                  <input
                    type="text"
                    value={producto.length === 0 ? '' : producto[0].stock}
                    disabled
                    className="form-control"
                    required
                  />
                </div>
  
                <div className="col-md-4 mb-md-4">
                  <label className="form-label">Cantidad de Productos *</label>
                  <input
                    type="number"
                    value={cantidad}
                    onChange={handleChangeCantidad}
                    className="form-control"
                    min={1}
                    ref={cant_prodRef}
                    required
                  />
                </div>
  
                <div className="col-md-4 mb-md-4">
                  <label className="form-label">Precio Unitario *</label>
                  <input
                    type="number"
                    value={producto.length === 0 ? '' : producto[0].valor_venta}
                    disabled
                    className="form-control"
                    required
                  />
                </div>
  
                <div className="col-md-4 mb-md-4">
                  <label className="form-label">Precio Total *</label>
                  <input
                    type="number"
                    value={total}
                    onChange={handleChangeCantidad}
                    disabled
                    className="form-control"
                    required
                  />
                </div>
              </div>
  
              <div className="col-12 d-flex justify-content-center gap-3 pb-5">
                <button className="btn btn-secondary" type="button" onClick={clearInputs}>
                  Limpiar
                </button>
                <button className="btn btn-primary" type="submit">
                  Agregar
                </button>
              </div>
            </form>
          </div>
  
          <div>{productosVentasMostrar.length !== 0 ? renderProductos() : null}</div>
        </div>
      </div>
    );
}

export default AddApartado
