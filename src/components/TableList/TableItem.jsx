import { useResolvedPath } from "react-router-dom";
import TableItemClients from "./components/TableItemClients";
import TableItemCompras from "./components/TableItemCompras";

export const TableItem = ({info, numero}) => {
    const url = useResolvedPath("").pathname;
    console.log({url});
    
    return (
        <tr>
            {url === '/clientes' ? <TableItemClients info={info} numero={numero} /> : <></> }
            {url === '/compras' ? <TableItemCompras info={info} numero={numero} /> : <></> }
            {url === '/compras/consultar' ? <TableItemCompras info={info} numero={numero} /> : <></> }
        </tr>
    )
}
