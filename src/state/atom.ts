import { AxiosError, AxiosResponse } from "axios";
import { truncate } from "fs";
import { atom, selector, useRecoilState } from "recoil";
import { apiClient } from "../api/api";
import { Level } from "../interfaces/level.interface";

interface UpdatedModel<T> {
  payload: T;
  endpoint: string;
}
interface Payload {
  id: number;
}
interface ResponseError {
  type: 'success' | 'error';
  status: number;
  statusText: string;
  data: string;
  message: string;
}

export const loadingState = atom<boolean>({
  key: 'loading',
  default: false
})
export const ResponseState = atom<ResponseError | undefined>({
  key: 'response',
  default: undefined
})


export const modelState = atom<any[]>({
  key: 'model',
  default: []
})

export const filterProductsValue = atom({
  key: "filterProductsValue",
  default: "",
});

export const filterModel = selector({
  key: "filterModel",
  get: ({ get }) => {
    const modelsState = get(modelState);
    const filterProductsValueState = get(filterProductsValue);

    if (filterProductsValueState.length) {
      return modelsState.filter(
        (item) => item.levelName.includes(filterProductsValueState.trim()) && item
      );
    }
    return modelState;
  },
});

export function useLevelsMutations() {

  const [models, setModels] = useRecoilState(modelState)
  const [loading, setLoading] = useRecoilState(loadingState)
  const [request, setResponse] = useRecoilState(ResponseState)


  // const createModel = async (newLevel: any) => {
  //   const createdLevel = await apiClient.create(newLevel)
  //   setLevels([...levels, createdLevel])
  // }

  const createModel = async function <Model>(updatedLevel: UpdatedModel<Model>) {
    try {
      const { payload, endpoint } = updatedLevel
      setLoading(true)
      const createdLevel = await apiClient.create(`${endpoint}`, payload)
      setLoading(false)
      setModels([createdLevel, ...models])
      setResponse({type: 'success',
        status: 200,
        statusText: '',
        data: `Criamos o '${createdLevel.levelName}'!`,
        message: '',
    })
      
    } catch (error) {
      setLoading(false)
      setResponse(undefined)
      console.log('Model error' ,error)
      
    }

  }
  const updateModel = async function <Model>(updatedLevel: UpdatedModel<Model & Payload>) {
    try {
      const { payload, payload: { id }, endpoint } = updatedLevel
      setLoading(true)
      const newValue:(Level & Payload) = await apiClient.update(`${endpoint}/${id}`, payload)
      setLoading(false)
      const newModels = models.map((model) => {
        if (model.id !== newValue.id) {
          return model
        }
        return payload
      })
      setModels(newModels)
      setResponse({type: 'success',
        status: 200,
        statusText: '',
        data: `Editamos '${newValue.levelName}' com sucesso!`,
        message: '',
    })
      
    } catch (error: any) {
      setLoading(false)
      setResponse({type: 'error',
        status: error.response.status,
        statusText: error.response.status,
        data: error.response.data,
        message: error.message,
    })
      console.log('Model error' ,error)
      
    }

  }

  const deleteModel = async (endpoint: string, id: number) => {
    await apiClient.delete(id)
    const newLevels = models.filter((level: Level) => level.id !== id)
    setModels(newLevels)
  }
  

 


  return { createModel, updateModel, deleteModel }
}