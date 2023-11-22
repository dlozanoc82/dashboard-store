import useVentas from "../../../hooks/useVentas"
import Producto from "./Producto";


const ProductosMasVendidos = () => {

  const {productosVendidos} = useVentas();

  return (
    <>
      <div className="formulario bg-white rounded shadow-sm">
        <h2 className="form__title">Productos mas Vendidos</h2>

        {productosVendidos.map((product, index) => <Producto key={index} product={product} />)}

        

        

      </div>
    </>
  )
}

export default ProductosMasVendidos
