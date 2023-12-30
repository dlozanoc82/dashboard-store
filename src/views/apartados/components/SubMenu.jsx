import { Link, useLocation } from "react-router-dom";
import useApartado from "../../../hooks/useApartado"; 
import { useEffect } from "react"; // Asegúrate de importar useEffect desde react

export const SubMenu = ({url}) => {

  const { setInputSearch, inputSearch} = useApartado();

    const location = useLocation();
    console.log(location.pathname);
    const isSearchDisabled = location.pathname !== "/apartados";

    // Almacena la ruta actual en el localStorage
  useEffect(() => {
    localStorage.setItem("ruta", location.pathname);
  }, [location.pathname]);

  return (
    <ul className="submenu__list">
        <li className="submenu__item">
            <Link className="submenu__link btn-danger" to={`${url}`}>
                Listar Apartados
            </Link>
        </li>
        <li>
            <Link className="submenu__link btn-danger" to={`${url}/agregar`}>
                Añadir Apartado
            </Link>
        </li>
        <li className="submenu__item">
            <input hidden={isSearchDisabled} className="search_input" type="number" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} placeholder="BUSCAR POR DOCUMENTO" />
        </li>
    </ul>
  )
}