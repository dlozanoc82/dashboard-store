import {  Route, Routes } from "react-router-dom"
import {  Garantia, Home, Kardex, Quotation, Sales, Separado, Shopping } from "../../views"
import CustomerView from "../../views/clientes/CustomerView"
import ProductsView from "../../views/productos/ProductsView"

export const RouterViews = () => {
  return (
    
    <Routes>
        <Route path="/" exact ={true} Component={Home} />
        <Route path="/compras/*" exact ={true} Component={Shopping} />
        <Route path="/clientes/*" exact ={true} Component={CustomerView} />
        <Route path="/productos/*" exact ={true} Component={ProductsView} />
        <Route path="/ventas" exact ={true} Component={Sales} />
        <Route path="/cotizacion" exact ={true} Component={Quotation} />
        <Route path="/garantia" exact ={true} Component={Garantia} />
        <Route path="/separado" exact ={true} Component={Separado} />
        <Route path="/kardex" exact ={true} Component={Kardex} />
        <Route path="*" Component={Home} />
    </Routes>

  )
}
