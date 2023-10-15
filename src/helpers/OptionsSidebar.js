import { faClipboard, faFileLines, faUser } from "@fortawesome/free-regular-svg-icons"
import { faBasketShopping, faCartPlus, faCashRegister, faCheckToSlot, faFileClipboard, faHandHoldingDollar, faHouse, faScrewdriverWrench, faShoppingCart, faStore, faTags } from "@fortawesome/free-solid-svg-icons"

export const listOptions = [
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
        icon: faCartPlus
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
        title: "Garantia", 
        url: '/garantia',
        icon: faScrewdriverWrench
    },
    {
        id: 8,
        title: "Separado", 
        url: '/separado',
        icon: faHandHoldingDollar
    },
    {
        id: 9,
        title: "Kardex", 
        url: '/kardex',
        icon: faFileClipboard
    }
]