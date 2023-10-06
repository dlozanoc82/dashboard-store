import { Link } from "react-router-dom"


export const SubMenu = ({url}) => {
  return (
    <ul className="submenu__list">
        <li className="submenu__item">
            <Link className="submenu__link btn-success" to={`${url}`}>
                Listar Clientes
            </Link>
        </li>
        <li>
            <Link className="submenu__link btn-success" to={`${url}/agregar`}>
                Añadir Cliente
            </Link>
        </li>
        <li>
            <Link className="submenu__link btn-success" to={`${url}/consultar`}>
                Consultar Clientes
            </Link>
        </li>
    </ul>
  )
}