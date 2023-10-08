import { Route, Routes, useResolvedPath } from "react-router-dom";
import { TableList } from "../../components/TableList/TableList";
import { AddProduct } from "./components/AddProduct";
import { ClientsPrivider } from "../../context/ClientsPrivider";
import { PaginationProvider } from "../../context/PaginationProvider";
import { SubMenu } from "./components/SubMenu";

export const Products = () => {

  const url = useResolvedPath("").pathname;
  console.log({url});

  return (
    <ClientsPrivider>
        <PaginationProvider>
            <div className="container-fluid px-4 mt-5">

                <div className="header__submenu">
                    <h3 className="fs-4">Modulo Productos</h3>
                    <SubMenu url={url}/>
                </div>

                <Routes>
                    <Route exact ={true} index element={<TableList />} />
                    <Route exact ={true} path="/agregar" element={<AddProduct />} />
                </Routes>
                
            </div>
        </PaginationProvider>
    </ClientsPrivider>
  )
}
