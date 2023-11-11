import dayjs from "dayjs";

export const namePathWeb = (url) => {
    const partesURL = url.split('/');
    return partesURL[partesURL.length - 1];
}


export const formatDateToYearMonthDay = (date) => {
    // Usa Day.js para formatear la fecha
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    return formattedDate;
}

export const formatDateAndTime = (fecha) => {
    // Asegúrate de que 'fecha' sea un objeto dayjs

  
    // Formatea la fecha y hora
    const resultado = dayjs(fecha).format('DD/MM/YYYY h:mm A');
  
    return resultado;
  };

export const formatearCantidad = (cantidad) =>{
    const amount = Number(cantidad);
    return amount.toLocaleString('es-CO',{
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })
}
  