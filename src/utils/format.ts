
function isDate(value: any) {
 
  const regex = new RegExp(/^\d{4}-\d{2}-\d{2}/gm);
  return regex.test(value);

}


export const formatDate = (dateString: any) => {
  console.log(dateString)
  if (isDate(dateString)) {
    let date = new Date(dateString)
    return date.toLocaleDateString('pt-BR',  { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'short', day: 'numeric',second:'2-digit', formatMatcher: 'basic', dayPeriod: 'narrow' },)
  } else {
    return dateString
  }

}
export const formatNumber = (number: any) => {
  return new Intl.NumberFormat('pt-BR', { maximumSignificantDigits: 2 }).format(number);
}

export const orderDate = (date: {occurrencyDate:string}[], field: string) => {
  return date.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.occurrencyDate) - new Date(a.occurrencyDate);
  });
}