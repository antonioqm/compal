
function isDate(value: any) {
 
  const regex = new RegExp(/^\d{4}-\d{2}-\d{2}/gm);
  return regex.test(value);

}


export const formatDate = (dateString: any) => {
  
  if (isDate(dateString)) {
    let date = new Date(dateString)
    return date.toLocaleDateString('pt-BR',  { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'short', day: 'numeric',second:'2-digit', formatMatcher: 'basic', dayPeriod: 'narrow' },)
  } else {
    return dateString
  }

}
export const formatNumber = (number: any) => {
  return new Intl.NumberFormat('pt-BR', {  maximumSignificantDigits: 10  }).format(number);
}



export const formatHours = (value: number): string => {
  const hour = addZero(Math.floor(value / 60))
  const minutes = addZero(value % 60)
  return `${hour}:${minutes}`
}
function addZero(value: number): string {

  const valueWithZero = value >= 0 && value < 10 ? '0' + value : `${value}`
  return valueWithZero
}

