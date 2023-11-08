import { Link } from "react-router-dom"
import useCompras from "../../../hooks/useCompras";



export const SubMenu = ({url}) => {
    const {setCompra, setComprasByDates} = useCompras();

    const handleResetVariables = () => {
        setCompra({});
        setComprasByDates([]);
    }

  return (
    <ul className="submenu__list">
        <li className="submenu__item">
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-success" to={`${url}`}>
                Listar Compras
            </Link>
        </li>
        <li>
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-success" to={`${url}/agregar`}>
                Añadir Compras
            </Link>
        </li>
        <li>
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-success" to={`${url}/consultar`}>
                Consultar Compras
            </Link>
        </li>
    </ul>
  )
}
