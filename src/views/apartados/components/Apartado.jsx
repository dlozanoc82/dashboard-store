import { Route, Routes, useResolvedPath } from "react-router-dom";
import useApartado from "../../../hooks/useApartado";
import { TableList } from "../../../components/TableList/TableList";
import { SubMenu } from "./SubMenu";
import { PaginationProvider } from "../../../context/PaginationProvider";
import AddApartado from "./AddApartado";

const Apartado = () => {
    const {apartados} = useApartado();
    const url = useResolvedPath("").pathname;

  return (
    <PaginationProvider data={apartados}>
        <div className="container-fluid px-4 mt-5">

            <div className="header__submenu">
                <h3 className="fs-4">Modulo Cotizaciones</h3>
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
