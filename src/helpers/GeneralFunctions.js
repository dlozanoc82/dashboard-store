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
  