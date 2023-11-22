import usePagination from "../../hooks/usePagination";
import useDashborad from "../../hooks/useDashborad";
import { useResolvedPath } from "react-router-dom";
import ClientsPDF from "./components/ClientsPDF";
import ComprasPDF from "./components/ComprasPDF";
import CotizacionesPDF from "./components/CotizacionesPDF";
import VentasPDF from "./components/VentasPDF";

 
export const Pagination = () => {
    const {titleUrl} = useDashborad();
    const url = useResolvedPath("").pathname;


    const generarPDF = () => {console.log('Generar PDF')}

    const {
        currentPage, 
        numbers, 
        prePage, 
        changePage, 
        nextPage,  
        lastIndex,   
        firstIndex,
        ndata} =usePagination();

    return (
        <>
            <div className="pagination">
                <div className="mb-2">
                    <span>
                        {titleUrl} del {firstIndex +1} al {lastIndex} de un total de {ndata}
                    </span>
                </div>
                <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li className="page-item disabled">
                        <a className="page-link" onClick={prePage}>Previous</a>
                    </li>
                    { numbers.map((n,i) => (
                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                            <a 
                                className="page-link"
                                onClick={() => changePage(n)}
                            >{n}</a>
                        </li>
                    )) }

                    <li className="page-item">
                        <a className="page-link" onClick={nextPage}>Next</a>
                    </li>
                </ul>
                </nav>
            </div>
            <div>
                {url === '/clientes' ?  <ClientsPDF /> : <></> }
                {url === '/clientes/consultar' ?  <ClientsPDF /> : <></> }
                
                {url === '/compras' ?  <ComprasPDF /> : <></> }
                {url === '/compras/consultar' ?  <ComprasPDF /> : <></> }

                {url === '/ventas' ?  <VentasPDF /> : <></> }
                {url === '/ventas/consultar' ?  <VentasPDF /> : <></> }

                {url === '/cotizacion' ?  <CotizacionesPDF /> : <></> }
                {url === '/cotizacion/consultar' ?  <CotizacionesPDF /> : <></> }

            </div>
        </>
    )
}
