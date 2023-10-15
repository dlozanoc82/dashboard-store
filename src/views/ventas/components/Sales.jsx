import { Route, Routes, useResolvedPath } from "react-router-dom";
import { TableList } from "../../../components/TableList/TableList";
import { PaginationProvider } from "../../../context/PaginationProvider";
import useVentas from "../../../hooks/useVentas";
import AddSale from "./AddSale";
import { SubMenu } from "./SubMenu";
import SearchSale from "./SearchSale";
import ProductosMasVendidos from "./ProductosMasVendidos";


const Sales = () => {

    const {ventas} = useVentas();
    const url = useResolvedPath("").pathname;

  return (
    <PaginationProvider data={ventas}>
        <div className="container-fluid px-4 mt-5">

            <div className="header__submenu">
                <h3 className="fs-4">Modulo Ventas</h3>
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
