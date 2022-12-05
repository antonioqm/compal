import Param from "../interfaces/Param.interface"

export function createUrlParams(params: Param[]): Promise<string>{
  console.log('----', params)
  return new Promise((resolve, reject) => {
    try {
      const newUrlParams = params.reduce((acc, currentItem, index) => {
        const notLast:boolean = index < params.length - 1
        return acc += typeof currentItem.value === 'boolean' || currentItem.value  ? `q_${currentItem.name}__eq=${currentItem.value}${ notLast && currentItem.value !== '' ? '&' : ''}` : ''
      }, '')  

      resolve(newUrlParams)
    } catch (e: any) {
      reject(e)
    }
  })
}