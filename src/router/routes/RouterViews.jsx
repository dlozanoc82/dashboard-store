import {  Route, Routes } from "react-router-dom"
import {  ApartadoView, Home, KardexView, QuotationView, SalesView } from "../../views"
import CustomerView from "../../views/clientes/CustomerView"
import ProductsView from "../../views/productos/ProductsView"
import ShoppingView from "../../views/compras/ShoppingView"
import Admin from "../../views/administrador/Admin"
import { GarantiaView } from "../../views/garantia/GarantiaView"

export const RouterViews = () => {
  return (
    
    <Routes>
        <Route path="/" exact ={true} element={<Home />} />
        <Route path="/compras/*" exact ={true} element={<ShoppingView />} />
        <Route path="/clientes/*" exact ={true} element={<CustomerView />} />
        <Route path="/productos/*" exact ={true} element={<ProductsView />} />
        <Route path="/ventas/*" exact ={true} element={<SalesView />} />
        <Route path="/cotizacion/*" exact ={true} element={<QuotationView />} />
        <Route path="/garantia" exact ={true} element={<GarantiaView />} />
        <Route path="/apartados/*" exact ={true} element={<ApartadoView />} />
        <Route path="/kardex/*" exact ={true} element={<KardexView />} />
        <Route path="/mi-cuenta" exact ={true} element={<Admin />} />
        <Route path="*" element={<Home />} />
    </Routes>

  )
}
