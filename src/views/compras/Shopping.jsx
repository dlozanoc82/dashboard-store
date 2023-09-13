import { Link, Route, Routes, useResolvedPath } from "react-router-dom"
import { TableList } from "../../components/TableList/TableList"
import { PaginationProvider } from "../../context/PaginationProvider"
import { Formulario } from "../../components/FormAdd/Formulario"

export const Shopping = () => {

    const url = useResolvedPath("").pathname;
    console.log({url});

  return (
    <PaginationProvider >
        <div className="container-fluid px-4">
            <h3 className="fs-4 mb-3">Recent Orders</h3>
            <ul>
                <li>
                    <Link to={`${url}`}>Listar Compras</Link>
                </li>
                <li>
                    <Link to={`${url}/form`}>Añadir Compras</Link>
                </li>
                <li>
                    <Link to={`${url}/search`}>Consultar Compras</Link>
                </li>
            </ul>
            <Routes>
                <Route index element={<TableList />} />
                <Route path="/form" element={<Formulario />} />
                <Route path="/search" element={<Formulario />} />
            </Routes>
        </div>
    </PaginationProvider>
  )
}
