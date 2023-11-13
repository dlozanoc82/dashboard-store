import { Link } from "react-router-dom"
import useCompras from "../../../hooks/useCompras";



export const SubMenu = ({url}) => {
    const {setCompra, setComprasByDates, inputSearch, setInputSearch} = useCompras();

    const handleResetVariables = () => {
        setCompra({});
        setComprasByDates([]);
    }

  return (
    <ul className="submenu__list">

        <li className="submenu__item">
            <input type="text" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} placeholder="BUSCAR POR NOMBRE DE PRODUCTO" />
        </li>

        <li className="submenu__item">
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-danger" to={`${url}`}>
                Listar Compras
            </Link>
        </li>
        <li>
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-danger" to={`${url}/agregar`}>
                Añadir Compra
            </Link>
        </li>
        <li>
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-danger" to={`${url}/consultar`}>
                Consultar Compras
            </Link>
        </li>
    </ul>
  )
}
