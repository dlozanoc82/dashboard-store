import { Route, Routes, useResolvedPath } from "react-router-dom";
import useApartado from "../../../hooks/useApartado";
import { TableList } from "../../../components/TableList/TableList";
import { SubMenu } from "./SubMenu";
import { PaginationProvider } from "../../../context/PaginationProvider";
import AddApartado from "./AddApartado";
import useDashborad from "../../../hooks/useDashborad";
import { obtenerTitulosPorRuta } from "../../../helpers/OptionsSidebar";
import { useEffect } from "react";

const Apartado = () => {
    const {apartados, organizarApartados, filteredApartados} = useApartado();
    const {setTableHeaders} = useDashborad();
    const url = useResolvedPath("").pathname;

    useEffect(() => {
        const tableHeaders = obtenerTitulosPorRuta(url);
        setTableHeaders(tableHeaders);
    }, [])


  return (
    <PaginationProvider data={filteredApartados}>
        <div className="container-fluid px-4 mt-5">

            <div className="header__submenu">
                <h3 className="fs-4"></h3>
                <SubMenu url={url}/>
            </div>

            <Routes>
                <Route exact ={true} index element={<TableList />} />
                <Route exact ={true} path="/agregar" element={<AddApartado />} />
            </Routes>

        </div>
    </PaginationProvider>
  )
}

export default Apartado
