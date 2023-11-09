import { Link } from "react-router-dom"
import useCompras from "../../hooks/useCompras";


export const SubMenu = ({url}) => {
    const {setCompra} = useComprasseCompras();
  return (
    <ul className="submenu__list">
        <li className="submenu__item">
            <Link onClick={() => setCompra({})} className="submenu__link btn-danger" to={`${url}`}>
                Listar Compras
            </Link>
        </li>
        <li>
            <Link onClick={() => setCompra({})} className="submenu__link btn-danger" to={`${url}/agregar`}>
                Añadir Compras
            </Link>
        </li>
        <li>
            <Link onClick={() => setCompra({})} className="submenu__link btn-danger" to={`${url}/consultar`}>
                Consultar Compras
            </Link>
        </li>
    </ul>
  )
}
