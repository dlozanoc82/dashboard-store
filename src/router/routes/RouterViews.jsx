import {  Route, Routes } from "react-router-dom"
import { Customers, Garantia, Home, Kardex, Products, Quotation, Sales, Separado, Shopping } from "../../views"

export const RouterViews = () => {
  return (
    
    <Routes>
        <Route path="/" exact ={true} Component={Home} />
        <Route path="/compras/*" exact ={true} Component={Shopping} />
        <Route path="/clientes/*" exact ={true} Component={Customers} />
        <Route path="/productos/*" exact ={true} Component={Products} />
        <Route path="/ventas" exact ={true} Component={Sales} />
        <Route path="/cotizacion" exact ={true} Component={Quotation} />
        <Route path="/garantia" exact ={true} Component={Garantia} />
        <Route path="/separado" exact ={true} Component={Separado} />
        <Route path="/kardex" exact ={true} Component={Kardex} />
        <Route path="*" Component={Home} />
    </Routes>

  )
}
