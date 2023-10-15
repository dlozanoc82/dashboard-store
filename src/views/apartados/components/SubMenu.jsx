import { Link } from "react-router-dom"


export const SubMenu = ({url}) => {
  return (
    <ul className="submenu__list">
        <li className="submenu__item">
            <Link className="submenu__link btn-success" to={`${url}`}>
                Listado de Apartados
            </Link>
        </li>
        <li>
            <Link className="submenu__link btn-success" to={`${url}/agregar`}>
                Agregar Apartado
            </Link>
        </li>
    </ul>
  )
}