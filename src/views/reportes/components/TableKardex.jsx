import React, { useState } from 'react'
import useCompras from '../../../hooks/useCompras';
import { formatDateToYearMonthDay } from '../../../helpers/GeneralFunctions';
import Swal from 'sweetalert2';
import useKardex from '../../../hooks/useKardex';

const TableKardex = () => {

    const {
      categorias,
      productsBySubCategory,
      subcategorias,
      setIdSubcategoria,
      setIdProductsSubcategory,
    } = useCompras();

    const {getKardexByProducto, infoKardex, minimo, maximo} = useKardex()

    const [selectCategory, setSelectCategory] = useState(''); // Estado para mantener el valor seleccionado
    const [selectSubCategory, setSelectSubCategory] = useState(''); // Estado para mantener el valor seleccionado
    const [nombreProducto, setNombreProducto] = useState('');
    const [fechaInicial, setFechaInicial] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');

    const handleChangeCategory = (event) => {
      setSelectCategory(event.target.value);
      setSelectSubCategory('');
      setIdSubcategoria(event.target.value); // Se envia el id de la Categoria
    };

    const handleChangeSubCategory = (event) => {
        setSelectSubCategory(event.target.value);
        setNombreProducto('');
        setIdProductsSubcategory(event.target.value); // Actualiza el estado cuando se selecciona un nuevo valor
    };

    const handleChangeNombre = (event) => {
        setNombreProducto(event.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(fechaInicial>fechaFinal){
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'La fecha inicial no puede ser mayor a la fecha final',
          })
          return;
      }
      getKardexByProducto(fechaInicial, fechaFinal, nombreProducto);
      //setFechaInicial('');
      //setFechaFinal('');
    }

  return (
    <>
      <div className="container-fluid px-4 mt-5">
          <div className="formulario bg-white rounded shadow-sm">
              <h2 className="form__title">KARDEX POR PRODUCTO</h2>
          
              <div>
                <form  onSubmit={handleSubmit} className="mt-3">
                    <div className="row p-2 mb-3">

                      <div className="col-md-4 mb-md-4">
                          <label className="form-label">Categoria *</label>
                          <select required className="form-select" value={selectCategory} onChange={handleChangeCategory}>
                              <option value="">Seleccione una opción</option>
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
                              required
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
                          <label className="form-label">Producto *</label>
                          {selectSubCategory ? (
                              <select
                                  className="form-select"
                                  value={nombreProducto}
                                  onChange={handleChangeNombre}
                                  required
                              >
                                  <option value="0">Seleccione una opción</option>
                                  {productsBySubCategory.map((product) => (
                                      <option key={product.cod_pro} value={product.cod_pro}>{product.nombre}</option>
                                  ))}
                              </select>
                          ) : (
                              <select className="form-select" required>
                                  <option value='0'>Seleccione una opción</option>
                              </select>
                          )}
                      </div>

                      <div className="col-md-4 mb-md-4">
                          <label className="form-label">Fecha Inicial</label>
                          <input type="date" onChange={(e) => setFechaInicial(formatDateToYearMonthDay(e.target.value))} className="form-control" required />
                      </div>

                      <div className="col-md-4 mb-md-4">
                          <label className="form-label">Fecha Final</label>
                          <input type="date" onChange={(e) => setFechaFinal(formatDateToYearMonthDay(e.target.value))} className="form-control" required/>
                      </div>

                      <div className="col-md-4 mb-md-4">
                          <label className="form-label">Stock</label>
                          <input disabled value={minimo} type="number" className="form-control" />
                      </div>

                      <div className="col-md-4 mb-md-4">
                          <label className="form-label">Minimo</label>
                          <input disabled value={minimo} type="number" className="form-control" />
                      </div>

                      <div className="col-md-4 mb-md-4">
                          <label className="form-label">Maximo</label>
                          <input disabled value={maximo} type="number" className="form-control" />
                      </div>

                    </div>

                    <div className="col-12 d-flex justify-content-center gap-3">
                        <button  className="btn btn-primary" type="submit">Consultar</button>
                    </div>
                </form>
              </div>

          </div>
      </div>

      <div className="col table__scroll mt-4">
        <table className="table table-bordered bg-white rounded shadow-sm table-hover">
          <thead>
            <tr>
              <th rowSpan={2} className='align-middle'><center>Fecha</center></th>
              <th rowSpan={2} className='align-middle'><center>Detalles</center></th>
              <th rowSpan={2} className='align-middle'><center>Valor Unitario</center></th>
              <th colSpan={2} className='align-middle'><center>Entradas</center></th>
              <th colSpan={2}  className='align-middle'><center>Salidas</center></th>
              <th colSpan={2}  className='align-middle'><center>Saldo</center></th>
              <th rowSpan={2} className='align-middle'><center>Ganancias</center></th>
            </tr>
            <tr>
              <th className='align-middle'><center>Cantidad</center></th>
              <th className='align-middle'><center>Valor</center></th>
              <th className='align-middle'><center>Cantidad</center></th>
              <th className='align-middle'><center>Valor</center></th>
              <th className='align-middle'><center>Cantidad</center></th>
              <th className='align-middle'><center>Valor</center></th>
            </tr>
          </thead>
          <tbody>
            {infoKardex.map((info, index) =>(
              <tr key={index}>
                <td><center> {info.fecha_transaccion} </center></td>
                <td><center> {info.nombre} </center></td>
                <td><center> {info.entra_sale === 1 ? info.valor_pro : info.valor_venta} </center></td>
                <td><center> {info.entra_sale === 1 ? info.cantidad : ''} </center></td>
                <td><center> {info.entra_sale === 1 ? info.cantidad * info.valor_pro : ''} </center></td>
                <td><center> {info.entra_sale === 2 ? info.cantidad : ''} </center></td>
                <td><center> {info.entra_sale === 2 ? info.cantidad * info.valor_venta : ''} </center></td>
                <td><center> {''} </center></td>
                <td><center> {''} </center></td>
                <td><center> {info.ganancias} </center></td>
              </tr>
            ))}
          </tbody>
        </table> 
        <a className="submenu__link btn-danger mb-4">GENERAR PDF</a>
      </div>
    </>
  )
}

export default TableKardex
