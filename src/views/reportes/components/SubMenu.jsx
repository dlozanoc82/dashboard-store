import { Link, useLocation } from "react-router-dom"
import { formatDateToYearMonthDay } from "../../../helpers/GeneralFunctions";
import useKardex from "../../../hooks/useKardex";
import { useEffect } from "react"; // Asegúrate de importar useEffect desde react

export const SubMenu = ({url}) => {

    const {getLibroDiario, handleResetVariables} = useKardex();
    const fechaActual = new Date();

    const location = useLocation();
    console.log(location.pathname);

    // Almacena la ruta actual en el localStorage
  useEffect(() => {
    localStorage.setItem("ruta", location.pathname);
  }, [location.pathname]);


  return (
    <ul className="submenu__list">
        <li className="submenu__item">
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-danger" to={`${url}`}>
                Kardex por Producto
            </Link>
        </li>
        <li>
            <Link onClick={() => getLibroDiario(formatDateToYearMonthDay(fechaActual))} className="submenu__link btn-danger" to={`${url}/libro-diario`}>
                Libro Diario
            </Link>
        </li>
    </ul>
  )
}