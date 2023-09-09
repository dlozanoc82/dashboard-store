import { ListOption } from "./ListOption"
import {  faFileLines, faUser } from "@fortawesome/free-regular-svg-icons"
import { faBasketShopping, faCashRegister, faHouse, faShoppingCart, faTags } from "@fortawesome/free-solid-svg-icons"

const listOptions = [
    {
        id: 1,
        title: "Panel", 
        url: '#',
        icon: faHouse
    },
    {
        id: 2,
        title: "Compras", 
        url: '#',
        icon: faShoppingCart
    },
    {
        id: 3,
        title: "Clientes", 
        url: '#',
        icon: faUser
    },
    {
        id: 4,
        title: "Productos", 
        url: '#',
        icon: faBasketShopping
    },
    {
        id: 5,
        title: "Ventas", 
        url: '#',
        icon: faTags
    },
    {
        id: 6,
        title: "Cotización", 
        url: '#',
        icon: faCashRegister
    },
    {
        id: 7,
        title: "Reportes", 
        url: '#',
        icon: faFileLines
    }


]

export const SidebarOptions = () => {
  return (
    <>

        <div className="list-group list-group-flush my-3">
            {listOptions.map( (option) => <ListOption key={option.id} {...option} />)}

            <a href="#" className="list-group-item list-group-item-action bg-transparent text-danger fw-bold">
                <i className="fas fa-power-off me-2"></i>Logout
            </a>
        </div>        
    </>
  )
}
