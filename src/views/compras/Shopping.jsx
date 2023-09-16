import { Route, Routes, useResolvedPath } from "react-router-dom"
import { TableList } from "../../components/TableList/TableList"
import { PaginationProvider } from "../../context/PaginationProvider"
import { SubMenu } from "../../components/SubMenu/SubMenu"
import { AddShop } from "./components/AddShop"
import { SearchShop } from "./components/SearchShop"

export const Shopping = () => {

    const url = useResolvedPath("").pathname;
    console.log({url});

  return (
    <PaginationProvider >
        <div className="container-fluid px-4 mt-5">

            <div className="header__submenu">
                <h3 className="fs-4">Recent Orders</h3>
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
