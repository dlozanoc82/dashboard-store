import {  Route, Routes } from "react-router-dom"
import { Customers, Home, Products, Quotation, Reports, Sales, Shopping } from "../../views"

export const RouterViews = () => {
  return (
    
    <Routes>
        <Route path="/" exact ={true} Component={Home} />
        <Route path="/compras/*" exact ={true} Component={Shopping} />
        <Route path="/clientes/*" exact ={true} Component={Customers} />
        <Route path="/productos" exact ={true} Component={Products} />
        <Route path="/ventas" exact ={true} Component={Sales} />
        <Route path="/cotizacion" exact ={true} Component={Quotation} />
        <Route path="/reportes" exact ={true} Component={Reports} />
        <Route path="*" Component={Home} />
    </Routes>

  )
}
