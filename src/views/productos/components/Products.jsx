import { Route, Routes, useResolvedPath } from "react-router-dom";
import { AddProduct } from "./AddProduct";
import { PaginationProvider } from "../../../context/PaginationProvider";
import { SubMenu } from "./SubMenu";
import useProducts from "../../../hooks/useProducts";
import ProductsList from "./ProductsList";

export const Products = () => {

  const {products} = useProducts();

  const url = useResolvedPath("").pathname;
  console.log({url});

  return (
    <PaginationProvider data={products}>
        <div className="container-fluid px-4 mt-5">

            <div className="header__submenu">
                <h3 className="fs-4">Modulo Productos</h3>
                <SubMenu url={url}/>
            </div>

            <Routes>
                <Route exact ={true} index element={<ProductsList />} />
                <Route exact ={true} path="/agregar" element={<AddProduct />} />
            </Routes>
            
        </div>
    </PaginationProvider>

  )
}
