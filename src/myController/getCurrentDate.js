export const getCurrentDate = () =>{
  const d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth()+1;
  if (month < 9) {
    month = '0' + month;
  }
  let day = d.getDate();
  if (day < 9) {
    day = '0' + day;
  }
  let hour = d.getHours();
  if (hour < 9) {
    hour = '0' + hour;
  }
  let minutes = d.getMinutes();
  if (minutes < 9) {
    minutes = '0' + minutes;
  }

  let date = year + '-' + month + '-' + day + 'T' + hour + ':' + minutes;
  return date;
}