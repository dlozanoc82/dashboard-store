import { Route, Routes, useResolvedPath } from "react-router-dom";
import { TableList } from "../../../components/TableList/TableList";
import { PaginationProvider } from "../../../context/PaginationProvider";
import useVentas from "../../../hooks/useVentas";
import AddSale from "./AddSale";
import { SubMenu } from "./SubMenu";
import SearchSale from "./SearchSale";
import ProductosMasVendidos from "./ProductosMasVendidos";
import { obtenerTitulosPorRuta } from "../../../helpers/OptionsSidebar";
import useDashborad from "../../../hooks/useDashborad";
import { useEffect } from "react";


const Sales = () => {

    const {ventas,filteredVentas, ventasOrganizadas} = useVentas();
    const {setTableHeaders} = useDashborad();
    const url = useResolvedPath("").pathname;
    console.log({ventasOrganizadas})

    console.log({filteredVentas})

    useEffect(() => {
        const tableHeaders = obtenerTitulosPorRuta(url);
        setTableHeaders(tableHeaders);
    }, [])

  return (
    <PaginationProvider data={filteredVentas}>
        <div className="container-fluid px-4 mt-5">

            <div className="header__submenu">
                <h3 className="fs-4"></h3>
                <SubMenu url={url}/>
            </div>

            <Routes>
                <Route exact ={true} index element={<TableList />} />
                <Route exact ={true} path="/agregar" element={<AddSale />} />
                <Route exact ={true} path="/consultar" element={<SearchSale />} />
                <Route exact ={true} path="/productos-mas-vendidos" element={<ProductosMasVendidos />} />
            </Routes>

        </div>
    </PaginationProvider>
  )
}

export default Sales;
