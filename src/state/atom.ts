import { atom, selector, useRecoilState } from "recoil";
import { apiClient } from "../api/api";
import { ThicknessModel } from "../interfaces/thickness.interface";

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

interface CurrentUser {
  currentUser: string;
  id: string;
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
  messages?: string[];
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

export const currentUser = atom<CurrentUser | undefined>({
  key: 'currentUser',
  default: undefined
})

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

function getNameToSnackbar(endpoint: string) {
  switch (endpoint) {
    case 'espessura': return 'thicknessName';
    case 'nivel': return 'levelName';
    case 'partNumber': return 'codePartNumber';
    case 'inventory': return 'codeInventory';
    default: return  'id'
  }
}

export function useModelMutations() {

  const [models, setModels] = useRecoilState(modelState)
  const [loading, setLoading] = useRecoilState(loadingState)
  const [request, setResponse] = useRecoilState(ResponseState)

  const transformThickness = (thickness: ThicknessModel): any => {
      return {...thickness, level: thickness.level?.levelName,  levelId: thickness.level?.id}
  }

  const getSignIn = async (payload:CreateTokenRequest):Promise<CreateTokenResponse> => {
    try {
      setLoading(true)
      const userWithToken = await apiClient.create<CreateTokenResponse>('account/login', payload)
      setLoading(false)
      return userWithToken;
      
    } catch (error:any) {
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
      setResponse({
      type: 'error',
      status: error?.response?.status,
      statusText: error?.response?.status,
      // data: error?.response?.data,
      message: error?.message,
  })
      return error
    }

  }

  const createModel = async function <Model>(createModel: PaylodModel<Model>) {
    try {
      const { payload, endpoint } = createModel
      setLoading(true)
      const createdModel: Model = await apiClient.create <Model>(`${endpoint}`, payload)
      setLoading(false)
      setModels([createdModel, ...models])

      if (endpoint === 'espessura') {
        const espessura:any  = createdModel;
        setModels([{...createdModel, level: espessura.level?.levelName,  levelId: espessura.level?.id},...models])
      } else {
        setModels([createdModel, ...models])
      }

      const keyModel = getNameToSnackbar(endpoint)

      setResponse({type: 'success',
        status: 200,
        statusText: '',
        data: '',
        message: `Criamos '${endpoint.toUpperCase()}: ${createdModel[keyModel]}' com sucesso!`,
      })
      
      return 'created'
      
    } catch (error:any) {
      setLoading(false)
      let message: string = '';
      let messages: string[] = [];

      if (error.response.data.message) {
        message = error.response.data.message
      } else if (error.response.data.title && error.response.data.errors) {
        
        const errors = Object.entries(error.response.data.errors).reduce((acc: any[], curr: any[]) => {
         return acc = [...acc, ...curr[1] ]
        }, [])
        messages = errors
      } else {
        message =  error.message
      }
        setResponse({type: 'error',
        status: error.response.status,
        statusText: error.response.status,
          message: message,
          messages: messages
      })     
      setModels(models)

      return {error: true}
      
    }

  }
  
  const updateModel = async function <Model>(updatedLevel: PaylodModel<Model & Payload>) {
    try {
      const { payload, payload: { id }, endpoint } = updatedLevel
      setLoading(true)
      const newValue:(Model & Payload) = await apiClient.update(`${endpoint}/${id}`, payload)
      setLoading(false)

      const newModels = models.map((model) => {
        if (model.id !== newValue.id) {
          return model
        }

        if (endpoint === 'espessura') {
          return transformThickness(newValue) 
        } else {
          return newValue
        }
        
      })
      
      setModels(newModels)
      const keyModel = getNameToSnackbar(endpoint)
      setResponse({type: 'success',
        status: 200,
        statusText: '',
        data: '',
        message: `Editamos '${endpoint.toUpperCase()}: ${newValue[keyModel]}' com sucesso!`,
      })
      
      return 'updated'
      
    } catch (error: any) {
      setLoading(false)
      let message: string;
      
      if (error.response.data.message) {
        message = error.response.data.message
      } else if(error.response.data.title) {
        message = error.response.data.title
      } else {
        message = error.message      
      }
      //  error.response.data.message : error.message;
      setResponse({type: 'error',
        status: error.response.status,
        statusText: error.response.status,
        message: message,
      })     
      setModels(models)
      return {error: true}
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
      
    } catch (error: any) {
      setLoading(false)
      let message: string;
      
      if (error.response.data.message) {
        message = error.response.data.message
      } else if(error.response.data.title) {
        message = error.response.data.title
      } else {
        message = error.message      
      }
      //  error.response.data.message : error.message;
      setResponse({type: 'error',
        status: error.response.status,
        statusText: error.response.status,
        message: message,
      })     
      setModels(models)
      
    }
  }
  

 


  return { createModel, updateModel, deleteModel, listAllModel, getSignIn }
}