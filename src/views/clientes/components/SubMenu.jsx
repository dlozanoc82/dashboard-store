import { Link } from "react-router-dom"
import useClients from "../../../hooks/useClients";



export const SubMenu = ({url}) => {

    const { setCliente } = useClients();

  return (
    <ul className="submenu__list">
        <li className="submenu__item">
            <Link onClick={() => setCliente({})} className="submenu__link btn-success" to={`${url}`}>
                Listar Clientes
            </Link>
        </li>
        <li>
            <Link onClick={() => setCliente({})} className="submenu__link btn-success" to={`${url}/agregar`}>
                Añadir Cliente
            </Link>
        </li>
    </ul>
  )
}