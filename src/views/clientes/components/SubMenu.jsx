import { Link } from "react-router-dom"
import useClients from "../../../hooks/useClients";
import { useLocation  } from "react-router-dom";
import { useEffect } from "react"; // Asegúrate de importar useEffect desde react


export const SubMenu = ({url}) => {

    const { setCliente, setClientesByDates, setInputSearch, inputSearch} = useClients();

    const location = useLocation();
    console.log(location.pathname);
    const isSearchDisabled = location.pathname !== "/clientes";

    // Almacena la ruta actual en el localStorage
  useEffect(() => {
    localStorage.setItem("ruta", location.pathname);
  }, [location.pathname]);

    const handleResetVariables = () => {
        setCliente({});
        setClientesByDates([]);
    }

  return (
    <ul className="submenu__list">
        <li className="submenu__item">
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-danger" to={`${url}`}>
                Listar Clientes
            </Link>
        </li>
        <li className="submenu__item">
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-danger" to={`${url}/agregar`}>
                Añadir Cliente
            </Link>
        </li>
        <li className="submenu__item">
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-danger" to={`${url}/consultar`}>
                Consultar Clientes
            </Link>
        </li>
        <li className="submenu__item">
            <input hidden={isSearchDisabled} className="search_input" type="number" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} placeholder="BUSCAR POR DOCUMENTO" />
        </li>
    </ul>
  )
}