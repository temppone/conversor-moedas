export function getCurrentDate(separator = '') {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();

    return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year} ${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`
}