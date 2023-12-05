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
    // Formatea la fecha y hora
    const resultado = dayjs(fecha).format('DD/MM/YYYY h:mm A');
    return resultado;
};

export const formatTime12Hours = (timeString) => {
    const formattedTime = dayjs(timeString, 'HH:mm:ss').format('h:mm A');
    return formattedTime;
};

export const formatearCantidad = (cantidad) =>{
    const amount = Number(cantidad);
    return amount.toLocaleString('es-CO',{
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })
}

export function aproximarPrecio(precio) {
    return Math.floor(precio / 100) * 100;
}


export const obtenerHoraEnFormatoDoceHoras = (fecha) => {
    const horaEnFormatoDoceHoras = dayjs(fecha, { format: 'HH:mm:ss' }).format('h:mm A');
    return horaEnFormatoDoceHoras;
  }