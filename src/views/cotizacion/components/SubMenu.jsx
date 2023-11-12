import { Link } from "react-router-dom"
import useCotizaciones from "../../../hooks/useCotizaciones";


export const SubMenu = ({url}) => {

    const {setCotizacionesByDates} = useCotizaciones();

    const handleResetVariables = () => {
        setCotizacionesByDates([]);
    }

  return (
    <ul className="submenu__list">
        <li className="submenu__item">
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-danger" to={`${url}`}>
                Listar Cotizaciones
            </Link>
        </li>
        <li>
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-danger" to={`${url}/consultar`}>
                Consultar Cotizaciones
            </Link>
        </li>
    </ul>
  )
}