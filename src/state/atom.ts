import { atom, selector, useRecoilState } from "recoil";
import { apiClient } from "../api/api";
import { Level } from "../interfaces/level.interface";

interface PaylodModel<T> {
  payload: T;
  endpoint: string;
}

interface User {

  id: number;
  name: string;
  email: string;
  password: string;
  status: boolean;
  roles: any[];

}

interface CreateTokenResponse {
  user: User;
  token: string;
}
interface CreateTokenRequest {
  email: string;
  password: string;
}

interface Payload {
  id: number;
}
interface ResponseError {
  type: 'success' | 'error';
  status: number;
  statusText: string;
  data?: string;
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

  const getSignIn = async (payload:CreateTokenRequest):Promise<CreateTokenResponse> => {
    try {
      setLoading(true)
      const userWithToken = await apiClient.create<CreateTokenResponse>('account/login', payload)
      setLoading(false)
      return userWithToken;
      
    } catch (error:any) {
      
      console.log('LOgin error', error)
      return error
    }

  }
  const listAllModel = async  <Model>(endpoint:string):Promise<Model> => {
    try {
      setLoading(true)
      const modelList = await apiClient.listAll<Model>(endpoint)
      setLoading(false)
      return modelList;
      
    } catch (error:any) {
      setLoading(false)
      setResponse({type: 'error',
      status: error?.response?.status,
      statusText: error?.response?.status,
      // data: error?.response?.data,
      message: error?.message,
  })
      console.log('Model error', error)
      return error
    }

  }

  const createModel = async function <Model>(updatedLevel: PaylodModel<Model>) {
    try {
      const { payload, endpoint } = updatedLevel
      setLoading(true)
      const createdLevel:(Model & Payload) = await apiClient.create<Model & Payload>(`${endpoint}`, payload)
      setLoading(false)
      setModels([createdLevel, ...models])
      setResponse({type: 'success',
        status: 200,
        statusText: '',
        data: `Criamos o '${createdLevel.id}'!`,
        message: '',
    })
      
    } catch (error) {
      setLoading(false)
      setResponse(undefined)
      console.log('Model error' ,error)
      
    }

  }
  const updateModel = async function <Model>(updatedLevel: PaylodModel<Model & Payload>) {
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
      
      setResponse({type: 'error',
        status: error.response.status,
        statusText: error.response.status,
        data: error.response.data,
        message: error.message,
    })
      console.log('Model error' ,error)
      
    }

  }

  const deleteModel = async function <Model>(deleteModel: PaylodModel<Model & Payload>) {
    try {
      const { payload, payload: { id }, endpoint } = deleteModel
      setLoading(true)
      await apiClient.delete(`${endpoint}/${id}`)
      setLoading(false)
      const removedItem:(Model & Payload)[] = models.filter((level: Model & Payload) => payload.id !== level.id)
      setModels(removedItem)

    //   setResponse({type: 'success',
    //     status: 200,
    //     statusText: '',
    //     data: `${payload.id} foi removido`,
    //     message: '',
    // })
      
    } catch (error: any) {
      setLoading(false)
      console.log('errroooooo', error)
      setResponse({type: 'error',
        status: error.response?.status ?  error.response?.status : error.code,
        statusText: error.response?.status,
        data: error.response?.data,
        message: error.message,
    })
      
    }
  }
  

 


  return { createModel, updateModel, deleteModel, listAllModel, getSignIn }
}