import { Route, Routes, useBeforeUnload, useResolvedPath } from "react-router-dom"
import { TableList } from "../../../components/TableList/TableList"
import { PaginationProvider } from "../../../context/PaginationProvider"
import { SearchShop } from "./SearchShop"
import useCompras from "../../../hooks/useCompras"
import { obtenerTitulosPorRuta } from "../../../helpers/OptionsSidebar"
import useDashborad from "../../../hooks/useDashborad"
import { useEffect } from "react"
import FormShop from "./FormShop"
import { SubMenu } from "./SubMenu"

export const Shopping = () => {

    const {filteredCompras} = useCompras();
    const {setTableHeaders} = useDashborad();

    const url = useResolvedPath("").pathname;

    useEffect(() => {
        const tableHeaders = obtenerTitulosPorRuta(url);
        setTableHeaders(tableHeaders);
    }, [])

  return (
    <PaginationProvider data={filteredCompras} >
        <div className="container-fluid px-4 mt-5">

            <div className="header__submenu">
                <h3 className="fs-4"></h3>
                <SubMenu url={url}/>
            </div>

            <Routes>
                <Route exact ={true} index element={<TableList />} />
                <Route exact ={true} path="/agregar" element={<FormShop />} />
                <Route exact ={true} path="/editar/:id" element={<FormShop />} />
                <Route exact ={true} path="/consultar" element={<SearchShop />} />
            </Routes>
            
        </div>
    </PaginationProvider>
  )
}
