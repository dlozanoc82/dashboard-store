import { Link } from "react-router-dom"


export const SubMenu = ({url}) => {
  return (
    <ul className="submenu__list">
        <li className="submenu__item">
            <Link className="submenu__link btn-success" to={`${url}`}>
                Listar Ventas
            </Link>
        </li>
        <li>
            <Link className="submenu__link btn-success" to={`${url}/agregar`}>
                Agregar Venta
            </Link>
        </li>
        <li>
            <Link className="submenu__link btn-success" to={`${url}/consultar`}>
                Consultar Ventas
            </Link>
        </li>
        <li>
            <Link className="submenu__link btn-success" to={`${url}/productos-mas-vendidos`}>
                Productos mas Vendidos
            </Link>
        </li>
    </ul>
  )
}