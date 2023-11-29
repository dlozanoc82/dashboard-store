import { Link } from "react-router-dom"
import { formatDateToYearMonthDay } from "../../../helpers/GeneralFunctions";
import useKardex from "../../../hooks/useKardex";


export const SubMenu = ({url}) => {

    const {getLibroDiario, handleResetVariables} = useKardex();
    // const fechaActual = new Date();


  return (
    <ul className="submenu__list">
        <li className="submenu__item">
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-danger" to={`${url}`}>
                Kardex por Producto
            </Link>
        </li>
        <li>
            <Link onClick={() => getLibroDiario("2023-11-19")} className="submenu__link btn-danger" to={`${url}/libro-diario`}>
                Libro Diario
            </Link>
        </li>
    </ul>
  )
}