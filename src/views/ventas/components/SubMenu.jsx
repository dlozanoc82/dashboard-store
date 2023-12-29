import { Link, useLocation } from "react-router-dom"
import useVentas from "../../../hooks/useVentas";
import { useEffect } from "react"; // Asegúrate de importar useEffect desde react

export const SubMenu = ({url}) => {

    const {setVentasByDates, setInputSearch, inputSearch, setVentasOrganizadasDates} = useVentas();

    const location = useLocation();
    console.log(location.pathname);
    const isSearchDisabled = location.pathname !== "/ventas";

    // Almacena la ruta actual en el localStorage
  useEffect(() => {
    localStorage.setItem("ruta", location.pathname);
  }, [location.pathname]);

    const handleResetVariables = () => {
        setVentasByDates([]);
        setVentasOrganizadasDates([]);
    }

  return (
    <ul className="submenu__list">
        <li className="submenu__item">
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-danger" to={`${url}`}>
                Listar Ventas
            </Link>
        </li>
        <li>
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-danger" to={`${url}/agregar`}>
                Añadir Venta
            </Link>
        </li>
        <li>
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-danger" to={`${url}/consultar`}>
                Consultar Ventas
            </Link>
        </li>
        <li>
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-danger" to={`${url}/productos-mas-vendidos`}>
                Productos mas Vendidos
            </Link>
        </li>
        <li className="submenu__item">
            <input hidden={isSearchDisabled} className="search_input" type="text" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} placeholder="BUSCAR POR DOCUMENTO" />
        </li>
    </ul>
  )
}