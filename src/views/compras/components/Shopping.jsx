import { Route, Routes, useBeforeUnload, useResolvedPath } from "react-router-dom"
import { TableList } from "../../../components/TableList/TableList"
import { PaginationProvider } from "../../../context/PaginationProvider"
import { SubMenu } from "../../../components/SubMenu/SubMenu"
import { AddShop } from "./AddShop"
import { SearchShop } from "./SearchShop"
import useCompras from "../../../hooks/useCompras"
import { obtenerTitulosPorRuta } from "../../../helpers/OptionsSidebar"
import useDashborad from "../../../hooks/useDashborad"
import { useEffect } from "react"

export const Shopping = () => {

    const {compras} = useCompras();
    const {setTableHeaders} = useDashborad();

    const url = useResolvedPath("").pathname;

    useEffect(() => {
        const tableHeaders = obtenerTitulosPorRuta(url);
        setTableHeaders(tableHeaders);
    }, [])

  return (
    <PaginationProvider data={compras} >
        <div className="container-fluid px-4 mt-5">

            <div className="header__submenu">
                <h3 className="fs-4">Modulo de Compras</h3>
                <SubMenu url={url}/>
            </div>

            <Routes>
                <Route exact ={true} index element={<TableList />} />
                <Route exact ={true} path="/agregar" element={<AddShop />} />
                <Route exact ={true} path="/consultar" element={<SearchShop />} />
            </Routes>
            
        </div>
    </PaginationProvider>
  )
}
