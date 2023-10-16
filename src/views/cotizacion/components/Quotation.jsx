import { Route, Routes, useResolvedPath } from 'react-router-dom';
import useCotizaciones from '../../../hooks/useCotizaciones'
import { SubMenu } from './SubMenu';
import SearchQuotation from './SearchQuotation';
import { PaginationProvider } from '../../../context/PaginationProvider';
import { TableList } from '../../../components/TableList/TableList';
import useDashborad from '../../../hooks/useDashborad';
import { obtenerTitulosPorRuta } from '../../../helpers/OptionsSidebar';
import { useEffect } from 'react';

const Quotation = () => {

    const {cotizaciones} = useCotizaciones();
    const {setTableHeaders} = useDashborad();
    const url = useResolvedPath("").pathname;

    useEffect(() => {
        const tableHeaders = obtenerTitulosPorRuta(url);
        setTableHeaders(tableHeaders);
    }, [])

  return (
    <PaginationProvider data={cotizaciones}>
        <div className="container-fluid px-4 mt-5">

            <div className="header__submenu">
                <h3 className="fs-4">Modulo Cotizaciones</h3>
                <SubMenu url={url}/>
            </div>

            <Routes>
                <Route exact ={true} index element={<TableList />} />
                <Route exact ={true} path="/consultar" element={<SearchQuotation />} />
            </Routes>

        </div>
    </PaginationProvider>
  )
}

export default Quotation
