import { Link, useLocation } from "react-router-dom"
import useProducts from "../../../hooks/useProducts";


export const SubMenu = ({url}) => {

    const {setProduct, inputSearch, setInputSearch} = useProducts();

    const location = useLocation();
    console.log(location.pathname);
    const isSearchDisabled = location.pathname !== "/productos";

    const handleResetVariables = () => {
        setProduct({});
    }

  return (
    <ul className="submenu__list">
        <li className="submenu__item">
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-danger" to={`${url}`}>
                Listar Productos
            </Link>
        </li>
        <li>
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-danger" to={`${url}/agregar`}>
                Añadir Producto
            </Link>
        </li>
        <li className="submenu__item">
            <input hidden={isSearchDisabled} className="search_input" type="text" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} placeholder="BUSCAR POR NOMBRE DE PRODUCTO" />
        </li>
    </ul>
  )
}