import { useResolvedPath } from "react-router-dom";
import TableItemClients from "./components/TableItemClients";
import TableItemCompras from "./components/TableItemCompras";

export const TableItem = ({info}) => {
    const url = useResolvedPath("").pathname;
    console.log({url});
    
    return (
        <tr>
            {url === '/clientes' ? <TableItemClients info={info} /> : <></> }
            {url === '/compras' ? <TableItemCompras info={info} /> : <></> }
            {url === '/compras/consultar' ? <TableItemCompras info={info} /> : <></> }
        </tr>
    )
}
