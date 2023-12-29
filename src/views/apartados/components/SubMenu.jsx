import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react"; // Asegúrate de importar useEffect desde react

export const SubMenu = ({url}) => {

    const location = useLocation();
    console.log(location.pathname);

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
    </ul>
  )
}