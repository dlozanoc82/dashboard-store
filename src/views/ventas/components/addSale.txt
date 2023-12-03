import { useState, useRef } from 'react';
import useVentas from '../../../hooks/useVentas';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddSale = () => {
  const solo_numeros = /^[0-9]*$/;

  const documentoRef = useRef(null);
  const cod_proRef = useRef(null);
  const cant_prodRef = useRef(null);

  const {
    getCliente,
    cliente,
    getProductAdd,
    producto,
    clienteId,
    getVentas,
    setProducto,
    setCliente,
    getProductosMasVendidos,
  } = useVentas();

  const [documento, setDocumento] = useState('');
  const [codProducto, setCodProducto] = useState('');
  const [metodoPago, setMetodoPago] = useState(''); 
  const [cantidad, setCantidad] = useState('');
  const [total, setTotal] = useState('');
  const [productosVentas, setProductosVenta] = useState([]);
  const [productosVentasMostrar, setProductosVentaMostrar] = useState([]);

  const handleChangeMethodPay = (event) => {
    setMetodoPago(event.target.value);
  };

  const handleCodProducto =(e) => {
    setCodProducto(e.target.value)
  }

  const clearInputs = () => {}

  const handleChangeCantidad = (e) => {
    const nuevaCantidad = e.target.value;
    setCantidad(nuevaCantidad);
    const nuevoPrecioTotal = nuevaCantidad * (producto.length === 0 ? 0 : producto[0].valor_venta);
    setTotal(nuevoPrecioTotal);
  };
  const handleDocumento = (e) => {
    setDocumento(e.target.value);
  }

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
  
    if (producto[0].stock < cantidad) {
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
        };
        setProductosVenta([...productosVentas, newProductoVenta]);
      }
    
      Swal.fire({
        title: 'Producto Agregado Correctamente',
        icon: 'success',
      });
    
      setCodProducto('');
      setCantidad('');
      setProducto([]);
      setTotal('');
    };
  

  const handleEliminarItem = (index) => {
    const nuevosProductos = [...productosVentas];
    nuevosProductos.splice(index, 1);
    setProductosVenta(nuevosProductos);

    const nuevosProductosMostrar = [...productosVentasMostrar];
    nuevosProductosMostrar.splice(index, 1);
    setProductosVentaMostrar(nuevosProductosMostrar);
  };

  const renderProductos = () => (
    <div className="col-md-8 mb-md-4 m-auto pt-5">
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
              <td>{producto.precio_unitario}</td>
              <td>{producto.precio_total}</td>
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
        </tbody>
      </table>

      <form onSubmit={finalizarVenta}>
        <div className="col-md-4 mb-md-4">
          <label className="form-label">Tipo de Pago *</label>
          <select
            className="form-select"
            value={metodoPago}
            onChange={handleChangeMethodPay}
            required
          >
            <option value="0">Seleccione una opción</option>
            <option value="1">Nequi</option>
            <option value="2">DaviPlata</option>
            <option value="3">Efectivo</option>
          </select>
        </div>
        <div className="col-12 d-flex justify-content-center gap-3">
          <button className="btn btn-primary" type="submit">
            Terminar Venta
          </button>
        </div>
      </form>
    </div>
  );

  const finalizarVenta = async (e) => {
    e.preventDefault();
  
    // Consolidar productosVentas antes de enviar la venta
    const consolidatedProductosVentas = [];
    
    productosVentas.forEach((producto) => {
      const existingProductIndex = consolidatedProductosVentas.findIndex(
        (p) => p.cod_pro === producto.cod_pro
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
  
    console.log({consolidatedProductosVentas})
    console.log({productosVentasMostrar})
    // Crea el objeto JSON con la información consolidada de la venta
    const ventaJson = {
      ventas: [
        {
          cod_pago: metodoPago,
          precio_total: consolidatedProductosVentas.reduce(
            (total, producto) => total + producto.precio_total,
            0
          ),
        },
      ],
      items: consolidatedProductosVentas,
    };

    console.log({ventaJson})
  
    try {
      // Realiza la solicitud POST al endpoint con el objeto JSON como datos
      const respuesta = await axios.post(
        `http://localhost/invensoft/ventas?cod_usu=${clienteId}`,
        ventaJson
      );
      console.log(respuesta);
      // Reinicia los estados después de completar la venta
      Swal.fire({
        title: 'Venta Registrada',
        icon: 'success',
      });
      setProductosVentaMostrar([]);
      setProductosVenta([]);
      setMetodoPago('');
      getVentas();
      setCliente([]);
      setDocumento('');
      getProductosMasVendidos();
      // Otros estados que necesites reiniciar...
    } catch (error) {
      console.error('Error al enviar la venta:', error);
      // Maneja el error según tus necesidades
    }
  };
  

  return (
    <div className="formulario bg-white rounded shadow-sm mb-5">
      <h2 className="form__title">Añadir Venta</h2>

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
                <a href="/clientes/agregar" className="ms-2">
                  Registrar Usuario
                </a>
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
          <h3 className="form__subtitle<">Información de la Venta</h3>
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
};

export default AddSale;
