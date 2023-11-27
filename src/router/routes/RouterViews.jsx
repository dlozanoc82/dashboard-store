import {  Route, Routes } from "react-router-dom"
import {  ApartadoView, Home, Kardex, QuotationView, SalesView } from "../../views"
import CustomerView from "../../views/clientes/CustomerView"
import ProductsView from "../../views/productos/ProductsView"
import ShoppingView from "../../views/compras/ShoppingView"
import InfoEmpresaView from "../../views/empresa/InfoEmpresaView"
import Admin from "../../views/administrador/Admin"
import { GarantiaView } from "../../views/garantia/GarantiaView"

export const RouterViews = () => {
  return (
    
    <Routes>
        <Route path="/" exact ={true} Component={Home} />
        <Route path="/compras/*" exact ={true} Component={ShoppingView} />
        <Route path="/clientes/*" exact ={true} Component={CustomerView} />
        <Route path="/productos/*" exact ={true} Component={ProductsView} />
        <Route path="/ventas/*" exact ={true} Component={SalesView} />
        <Route path="/cotizacion/*" exact ={true} Component={QuotationView} />
        <Route path="/garantia" exact ={true} Component={GarantiaView} />
        <Route path="/apartados/*" exact ={true} Component={ApartadoView} />
        <Route path="/kardex" exact ={true} Component={Kardex} />
        <Route path="/info-empresa" exact ={true} Component={InfoEmpresaView} />
        <Route path="/mi-cuenta" exact ={true} Component={Admin} />
        <Route path="*" Component={Home} />
    </Routes>

  )
}
