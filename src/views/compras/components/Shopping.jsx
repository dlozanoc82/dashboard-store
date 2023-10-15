import { Route, Routes, useResolvedPath } from "react-router-dom"
import { TableList } from "../../../components/TableList/TableList"
import { PaginationProvider } from "../../../context/PaginationProvider"
import { SubMenu } from "../../../components/SubMenu/SubMenu"
import { AddShop } from "./AddShop"
import { SearchShop } from "./SearchShop"
import useCompras from "../../../hooks/useCompras"

export const Shopping = () => {


    const {compras} = useCompras();

    const url = useResolvedPath("").pathname;
    console.log({url});

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
