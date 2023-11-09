import { Link } from "react-router-dom"


export const SubMenu = ({url}) => {
  return (
    <ul className="submenu__list">
        <li className="submenu__item">
            <Link className="submenu__link btn-danger" to={`${url}`}>
                Listar Cotizaciones
            </Link>
        </li>
        <li>
            <Link className="submenu__link btn-danger" to={`${url}/consultar`}>
                Consultar Cotizaciones
            </Link>
        </li>
    </ul>
  )
}