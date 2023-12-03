import { Link } from "react-router-dom"
import useCompras from "../../../hooks/useCompras";
import { useLocation  } from "react-router-dom";



export const SubMenu = ({url}) => {
    const {setCompra, setComprasByDates, inputSearch, setInputSearch, setProductosInStock} = useCompras();

    const location = useLocation();
    console.log(location.pathname);
    const isSearchDisabled = location.pathname !== "/compras";

    const handleResetVariables = () => {
        setCompra({});
        setComprasByDates([]);
    }

  return (
    <ul className="submenu__list">
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
        <li className="submenu__item">
            <input hidden={isSearchDisabled} className="search_input" type="text" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} placeholder="BUSCAR POR NOMBRE DE PRODUCTO" />
        </li>
    </ul>
  )
}
