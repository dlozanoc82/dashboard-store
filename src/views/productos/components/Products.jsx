import { Route, Routes, useLocation, useResolvedPath } from "react-router-dom";
import { AddProduct } from "./AddProduct";
import { PaginationProvider } from "../../../context/PaginationProvider";
import { SubMenu } from "./SubMenu";
import useProducts from "../../../hooks/useProducts";
import { TableList } from "../../../components/TableList/TableList";
import useDashborad from "../../../hooks/useDashborad";
import { obtenerTitulosPorRuta } from "../../../helpers/OptionsSidebar";
import { useEffect } from "react";
import FormProducto from "./FormProducto";

export const Products = () => {

  const {filteredProducto} = useProducts();
  const {setTableHeaders} = useDashborad();

  const url = useResolvedPath("").pathname;
  console.log({url});

  const location = useLocation();
  console.log(location.pathname);
  const isListarProductos = location.pathname === "/productos";

  // Almacena la ruta actual en el localStorage
  useEffect(() => {
    localStorage.setItem("ruta", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const tableHeaders = obtenerTitulosPorRuta(url);
    setTableHeaders(tableHeaders);
}, [])

  return (
    <PaginationProvider data={filteredProducto}>
        <div className="container-fluid px-4 mt-5">

            <div className="header__submenu">
                <h3 className="fs-4"></h3>
                <SubMenu url={url}/>
            </div>

            <Routes>
                <Route exact ={true} index element={<TableList />} />
                <Route exact ={true} path="/agregar" element={<FormProducto />} />
                <Route exact ={true} path="/editar/:id" element={<FormProducto />} />
            </Routes>

        </div>
    </PaginationProvider>

  )
}
