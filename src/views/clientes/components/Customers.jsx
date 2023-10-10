import { Route, Routes, useResolvedPath } from "react-router-dom";
import { PaginationProvider } from "../../../context/PaginationProvider";
import { SubMenu } from "./SubMenu";
import { TableList } from "../../../components/TableList/TableList";
import { AddClient } from "./AddClient";
import useClients from "../../../hooks/useClients";


export const Customers = () => {


    const {clients} = useClients();
    const url = useResolvedPath("").pathname;
    console.log({url});

    return (
        <PaginationProvider data={clients}>
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
  )
}
