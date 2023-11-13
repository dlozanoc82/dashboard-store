import { Link } from "react-router-dom"
import useCotizaciones from "../../../hooks/useCotizaciones";
import { useLocation  } from "react-router-dom";


export const SubMenu = ({url}) => {

    const {setCotizacionesByDates, inputSearch,
        setInputSearch} = useCotizaciones();

    const location = useLocation();
    console.log(location.pathname);
    const isSearchDisabled = location.pathname !== "/cotizacion";

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
            <input hidden={isSearchDisabled} className="search_input" type="number" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} placeholder="BUSCAR POR DOCUMENTO" />
        </li>
    </ul>
  )
}