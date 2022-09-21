
function isDate(value: any) {
 
  const regex = new RegExp(/^\d{4}-\d{2}-\d{2}/gm);
  return regex.test(value);

}


export const formatDate = (dateString: any) => {
  if (isDate(dateString)) {
    let date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' }).replace(' de ', '')
  }
  return dateString;

}