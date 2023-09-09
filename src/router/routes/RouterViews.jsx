import { BrowserRouter as Router, Route, Routes } from "react-router-dom"



export const RouterViews = () => {
  return (
    <Router>
            <Routes>
                <Route path="/" exact ={true} Component={l} />
                <Route path="/compras" exact ={true} Component={} />
                <Route path="/clientes" exact ={true} Component={} />
                <Route path="/productos" exact ={true} Component={} />
                <Route path="/ventas" exact ={true} Component={} />
                <Route path="/cotizacion" exact ={true} Component={} />
                <Route path="/reportes" exact ={true} Component={} />
                <Route path="*" Component={Page404} />
            </Routes>
        </Router>
  )
}
