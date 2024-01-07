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
    }
]


const columnasPorRuta = {
    "/compras": ["#", "Fecha de Compra", "Categoria", "SubCategoria", "Nombre del Producto", "Cantidad", "Proveedor", "Precio de la Compra", "Precio Unitario", "Precio Venta","Acciones"],
    "/clientes": ["#", "Fecha de Registro", "Nombre Completo", "Apellido Completo", "Numero de Documento", "Correo", "Telefono", "Estado", "Acciones"],
    "/productos": ["Codigo","Imagen", "Categoria", "Subcategoria", "Producto", "Descripcion", "Estado", "Garantia", "Duracion Garantia", "Stock", "Acciones"],
    "/ventas": ["#", "Fecha de Venta","Cliente", "No. Documento", "Tipo de Pago", "Total Venta", "Ganancias", "Detalle Venta"],
    "/apartados": ["#", "Fecha del Apartado", "Cliente", "No. Documento",  "Tipo de Pago","Total Abonado", "Restante", "Total a Pagar", "Opciones", "Acciones"],
    "/garantia": ["ColumnaA", "ColumnaB", "ColumnaC"],
    "/cotizacion": ["#", "Fecha de Cotizacion", "No. Documento", "Nombre del Cliente", "Apellidos del Cliente", "Correo", "Productos", "Cantidad", "Precio Unitario", "Total"],
    "/kardex/libro-diario": ["#", "Fecha y Hora", "Movimientos(Entrada/Salida)", "Producto", "Valor Unitario", "Cantidad", "Total"],
};



export function obtenerTitulosPorRuta(ruta) {
    if (columnasPorRuta.hasOwnProperty(ruta)) {
      return columnasPorRuta[ruta];
    } else {
      return []; // Devuelve un arreglo vacío si la ruta no está en el objeto
    }
}


  