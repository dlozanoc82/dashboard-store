import { useResolvedPath } from "react-router-dom";
import TableItemClients from "./components/TableItemClients";
import TableItemCompras from "./components/TableItemCompras";
import TableItemCotizaciones from "./components/TableItemCotizaciones";
import TableItemProductos from "./components/TableItemProductos";
import TableItemVentas from "./components/TableItemVentas";
import TableItemApartados from "./components/TableItemApartados";

export const TableItem = ({info}) => {
    const url = useResolvedPath("").pathname;
    
    return (
        <tr>
            {url === '/clientes' ? <TableItemClients info={info} /> : <></> }
            {url === '/clientes/consultar' ? <TableItemClients info={info} /> : <></> }

            {url === '/compras' ? <TableItemCompras info={info}  /> : <></> }
            {url === '/compras/consultar' ? <TableItemCompras info={info} /> : <></> }

            {url === '/productos' ? <TableItemProductos info={info}  /> : <></> }
            {url === '/productos/modificar' ? <TableItemProductos info={info}  /> : <></> }

            {url === '/ventas' ? <TableItemVentas info={info} /> : <></> }
            {url === '/ventas/consultar' ? <TableItemVentas info={info} /> : <></> }

            {url === '/cotizacion' ? <TableItemCotizaciones info={info} /> : <></> }
            {url === '/cotizacion/consultar' ? <TableItemCotizaciones info={info} /> : <></> }

            {url === '/apartados' ? <TableItemApartados info={info} /> : <></> }
            {url === '/cotizacion/consultar' ? <TableItemCotizaciones info={info} /> : <></> }




        </tr>
    )
}
