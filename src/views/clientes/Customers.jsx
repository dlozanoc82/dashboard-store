import { Route, Routes, useResolvedPath } from "react-router-dom";
import { ClientsPrivider } from "../../context/ClientsPrivider"
import { PaginationProvider } from "../../context/PaginationProvider";
import { SubMenu } from "./components/SubMenu";
import { TableList } from "../../components/TableList/TableList";
import { AddClient } from "./components/AddClient";


export const Customers = () => {

    const url = useResolvedPath("").pathname;
    console.log({url});

  return (
    <ClientsPrivider>
        <PaginationProvider>
            <div className="container-fluid px-4 mt-5">
                <div className="header__submenu">
                    <h3 className="fs-4">Modulo de Clientes</h3>
                    <SubMenu url={url}/>
                </div>

                <Routes>
                    <Route exact ={true} index element={<TableList />} />
                    <Route exact ={true} path="/agregar" element={<AddClient />} />
                     {/*
                    <Route exact ={true} path="/consultar" element={<SearchShop />} /> */}
                </Routes>

            </div>
        </PaginationProvider>
    </ClientsPrivider>
  )
}
