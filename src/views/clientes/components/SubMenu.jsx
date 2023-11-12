import { Link } from "react-router-dom"
import useClients from "../../../hooks/useClients";



export const SubMenu = ({url}) => {

    const { setCliente, setClientesByDates } = useClients();

    const handleResetVariables = () => {
        setCliente({});
        setClientesByDates([]);
    }

  return (
    <ul className="submenu__list">
        <li className="submenu__item">
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-danger" to={`${url}`}>
                Listar Clientes
            </Link>
        </li>
        <li>
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-danger" to={`${url}/agregar`}>
                Añadir Cliente
            </Link>
        </li>
        <li>
            <Link onClick={() => handleResetVariables()} className="submenu__link btn-danger" to={`${url}/consultar`}>
                Consultar Clientes
            </Link>
        </li>
    </ul>
  )
}