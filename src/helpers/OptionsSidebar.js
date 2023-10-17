import { faUser } from "@fortawesome/free-regular-svg-icons"
import { faCartPlus, faCashRegister, faCity, faFileClipboard, faHandHoldingDollar, faHouse, faScrewdriverWrench, faShoppingCart, faTags } from "@fortawesome/free-solid-svg-icons"

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
        title: "Apartados", 
        url: '/apartados',
        icon: faHandHoldingDollar
    },
    {
        id: 7,
        title: "Garantia", 
        url: '/garantia',
        icon: faScrewdriverWrench
    },
    {
        id: 8,
        title: "Cotización", 
        url: '/cotizacion',
        icon: faCashRegister
    },
    {
        id: 9,
        title: "Kardex", 
        url: '/kardex',
        icon: faFileClipboard
    },
    {
        id: 10,
        title: "Informacion de la Empresa", 
        url: '/info-empresa',
        icon: faCity
    }
]


const columnasPorRuta = {
    "/compras": ["#", "Fecha de Compra", "Categoria", "SubCategoria", "Nombre del Producto", "Cantidad", "Proovedor", "Precio de la Compra", "Precio Unitario", "Precio de Venta", "Total", "Acciones"],
    "/clientes": ["#", "Fecha de Registro", "Nombre Completo", "Apellido Completo", "Numero de Documento", "Correo", "Telefono", "Estado", "Acciones"],
    "/productos": ["ColumnaA", "ColumnaB", "ColumnaC"],
    "/ventas": ["#", "Cliente", "No. Documento", "Categoria", "SubCategoria", "Producto", "Cantidad", "Precio Unitario", "Tipo de Pago", "Total", "Ganancias"],
    "/apartados": ["#", "Fecha del Apartado", "Cliente", "No. Documento", "Cantridad", "Precio Unitario", "Tipo de Pago", "Fecha de Abono", "Total", "Restante", "Opciones"],
    "/garantia": ["ColumnaA", "ColumnaB", "ColumnaC"],
    "/cotizacion": ["#", "Fecha de Cotizacion", "No. Documento", "Nombre del Cliente", "Apellidos del Cliente", "Correo", "Productos", "Cantidad", "Precio Unitario", "Total"],
    "/kardex": ["ColumnaA", "ColumnaB", "ColumnaC"],
};

export function obtenerTitulosPorRuta(ruta) {
    if (columnasPorRuta.hasOwnProperty(ruta)) {
      return columnasPorRuta[ruta];
    } else {
      return []; // Devuelve un arreglo vacío si la ruta no está en el objeto
    }
}


  