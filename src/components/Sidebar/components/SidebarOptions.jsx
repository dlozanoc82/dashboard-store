import { ListOption } from "./ListOption"
import {  faFileLines, faUser } from "@fortawesome/free-regular-svg-icons"
import { faBasketShopping, faCashRegister, faHouse, faShoppingCart, faTags } from "@fortawesome/free-solid-svg-icons"

const listOptions = [
    {
        id: 1,
        title: "Panel", 
        url: '/',
        icon: faHouse
    },
    {
        id: 2,
        title: "Compras", 
        url: '/compras',
        icon: faShoppingCart
    },
    {
        id: 3,
        title: "Clientes", 
        url: '/clientes',
        icon: faUser
    },
    {
        id: 4,
        title: "Productos", 
        url: '/productos',
        icon: faBasketShopping
    },
    {
        id: 5,
        title: "Ventas", 
        url: '/ventas',
        icon: faTags
    },
    {
        id: 6,
        title: "Cotización", 
        url: '/cotizacion',
        icon: faCashRegister
    },
    {
        id: 7,
        title: "Reportes", 
        url: '/reportes',
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

            <div className="accordion" id="accordionExample">

            <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed bg-transparent second-text fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Accordion Item #2
                </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <ul className="accordion-body accordion__body">
                   <li>Option 1</li> 
                </ul>
                </div>
            </div>

            </div>

        </div>
    </>
  )
}
