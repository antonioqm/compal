import Param from "../Param.interface";

export const updateParams = (newParam: Param, params: Param[]):Promise<Param[]> => {
  
  return new Promise((resolve, reject) => {
    try {
      const index = params.findIndex((item: Param, i: number) => {
        if(newParam)
        return item.name === newParam.name;
      });
      if (index >= 0) {
        params[index] = { value: newParam.value, name: newParam.name };
        if (newParam.value === '') {
          params.splice(index, 1);
        }
      } else {
        params.push({ value: newParam.value, name: newParam.name });
         if (newParam.value === '') {
          params.splice(index, 1);
        }
      }
      resolve(params)
      
    } catch (e:any) {
      reject(e)
    }
    
  })
};