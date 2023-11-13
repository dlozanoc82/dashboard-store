import { Link } from "react-router-dom"
import useCotizaciones from "../../../hooks/useCotizaciones";


export const SubMenu = ({url}) => {

    const {setCotizacionesByDates, inputSearch,
        setInputSearch} = useCotizaciones();

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
        <li className="submenu__item">
            <input className="search_input" type="number" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} placeholder="BUSCAR POR DOCUMENTO" />
        </li>
    </ul>
  )
}