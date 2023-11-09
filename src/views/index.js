export * from './clientes/components/Customers'
export * from './compras/ShoppingView'
export * from './cotizacion/QuotationView'
export * from './reportes/Kardex'
export * from './ventas/SalesView'
export * from './home/Home'
export * from './garantia/Garantia'
export * from './apartados/ApartadoView'

document.addEventListener("userway:render_completed", function(event) {
	var userway = document.querySelector('div.uai');
    if (userway) {
        userway.classList.add('custom-icon-class');
    }
});