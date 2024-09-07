import React, {useEffect, useState } from 'react';
import usePagination from "../../hooks/usePagination";
import useDashborad from "../../hooks/useDashborad";
import { useResolvedPath } from "react-router-dom";
import ClientsPDF from "./components/ClientsPDF";
import ComprasPDF from "./components/ComprasPDF";
import CotizacionesPDF from "./components/CotizacionesPDF";
import VentasPDF from "./components/VentasPDF";
import ProductosPDF from "./components/ProductosPDF";
import KardexPDF from './components/KardexPDF';

const Pagination = () => {
    const { titleUrl } = useDashborad();
    const url = useResolvedPath("").pathname;

    const { currentPage, numbers, prePage, changePage, nextPage, lastIndex, firstIndex, ndata } = usePagination();
    const [pageTitle, setPageTitle] = useState(titleUrl); //useState para recuperar el modulo en el que esta el usuario

  useEffect(() => {
    const storedTitle = localStorage.getItem("selectedOption");     //Se accede al almacenamiento local para recuperar el modulo en el que estamos
    if (storedTitle) {
      setPageTitle(storedTitle);
    } else {
      setPageTitle(titleUrl);
    }
  }, [titleUrl]);

    // Número máximo de botones de paginación a mostrar
    const maxButtonsToShow = 5;

    // Lógica para calcular los números de página que se mostrarán
    // Lógica para calcular los números de página que se mostrarán
    const calculateVisibleButtons = () => {
        const buttonsPerPage = 10;
        const totalPages = Math.ceil(ndata / buttonsPerPage);
        console.log("DATOS "+ndata);

        // Calcular la cantidad mínima de botones a mostrar
        const minButtonsToShow = Math.min(maxButtonsToShow, totalPages);

        // Mostrar al menos 5 botones o el número calculado
        const totalButtons = Math.max(minButtonsToShow, Math.min(totalPages, currentPage + 2) - Math.max(1, currentPage - 2) + 1);

        // Calcular el rango de botones para mostrar
        let startButton = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
        let endButton = Math.min(totalPages, startButton + totalButtons - 1);

        // Ajustar si el rango se desborda
        if (endButton - startButton + 1 < totalButtons) {
            startButton = Math.max(1, endButton - totalButtons + 1);
        }

        return Array.from({ length: totalButtons }, (_, index) => startButton + index);
    };


    const visibleButtons = calculateVisibleButtons();

    return (
        <>
            <div className="pagination">
                <div className="mb-2">
                    <span>
                        {pageTitle} del {firstIndex + 1} al {lastIndex} de un total de {ndata}
                    </span>
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={prePage}>
                                Anterior
                            </a>
                        </li>
                        {visibleButtons.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a className="page-link" onClick={() => changePage(n)}>
                                    {n}
                                </a>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === ndata ? 'disabled' : ''}`}>
                            <a className="page-link" onClick={nextPage}>
                                Siguiente
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div>
                {url === '/clientes' || url === '/clientes/consultar' ? <ClientsPDF /> : null}

                {url === '/compras' || url === '/compras/consultar' ? <ComprasPDF /> : null}

                {url === '/ventas' || url === '/ventas/consultar' ? <VentasPDF /> : null}

                {url === '/cotizacion' || url === '/cotizacion/consultar' ? <CotizacionesPDF /> : null}

                {url === '/kardex/libro-diario' ? <KardexPDF /> : null}

                {url === '/productos' ? <ProductosPDF /> : null}
            </div>
        </>
    );
}

export default Pagination;
