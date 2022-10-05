
export const getStatusItem = (exposurePercentage: number, criticalTime: number = 0): string => {

    if (exposurePercentage > 100) {
        return 'Exposto Excedente'
    }
      
    else if (exposurePercentage < 100 && exposurePercentage > criticalTime) {
        return 'Exposto (tempo crítico)'
    }
  return ''
}
