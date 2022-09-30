import Param from "../Param.interface"

export function createUrlParams(params: Param[]):Promise<string>{
  return new Promise((resolve, reject) => {
    try {
      const newUrlParams = params.reduce((acc, currentItem, index) => {
        const notLast:boolean = index < params.length - 1
        return acc += typeof currentItem.value === 'boolean' || currentItem.value  ? `${currentItem.name}=${currentItem.value}${ notLast && currentItem.value !== '' ? '&' : ''}` : ''
      }, '')  

      resolve(newUrlParams)
    } catch (e: any) {
      reject(e)
    }
  })
}