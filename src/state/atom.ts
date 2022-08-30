import { AxiosError, AxiosResponse } from "axios";
import { truncate } from "fs";
import { atom, selector, useRecoilState } from "recoil";
import { apiClient } from "../api/api";
import { Level } from "../interfaces/level.interface";

interface UpdatedModel<T> {
  payload: T & Payload;
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


export const levelsState = atom<any[]>({
  key: 'levels',
  default: []
})

export function useLevelsMutations() {

  const [levels, setLevels] = useRecoilState(levelsState)
  const [loading, setLoading] = useRecoilState(loadingState)
  const [request, setResponse] = useRecoilState(ResponseState)


  // const createLevel = async (newLevel: any) => {
  //   const createdLevel = await apiClient.create(newLevel)
  //   setLevels([...levels, createdLevel])
  // }

  const createLevel = async function <Model>(updatedLevel: UpdatedModel<Model>) {
    try {
      const { payload, endpoint } = updatedLevel
      setLoading(true)
      const createdLevel = await apiClient.create(`${endpoint}`, payload)
      setLoading(false)
      setLevels([createdLevel, ...levels])
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
  const updateLevel = async function <Model>(updatedLevel: UpdatedModel<Model>) {
    try {
      const { payload, payload: { id }, endpoint } = updatedLevel
      setLoading(true)
      const newValue = await apiClient.update(`${endpoint}/${id}`, payload)
      setLoading(false)
      const newLevels = levels.map((level) => {
        if (level.id !== newValue.id) {
          return level
        }
        return payload
      })
      setLevels(newLevels)
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

  const deleteLevel = async (endpoint: string, id: number) => {
    await apiClient.delete(id)
    const newLevels = levels.filter((level: Level) => level.id !== id)
    setLevels(newLevels)
  }


  return { createLevel, updateLevel, deleteLevel }
}