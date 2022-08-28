import { truncate } from "fs";
import { Level } from "pages/Interfaces/level.interface";
import { atom, selector, useRecoilState } from "recoil";
import { apiClient } from "src/api/api";

interface UpdatedModel<T> {
  payload: T & Payload;
  endpoint: string;
}
interface Payload {
  id: number;
}
interface ResponseError {
  status: number;
  statusText: string;
  data: string;
  hasError: boolean;
}

export const loadingState = atom<boolean>({
  key: 'loading',
  default: false
})
export const RquestState = atom<'success' | 'error' | false>({
  key: 'loading',
  default: false
})
export const ResponseState = atom<ResponseError>({
  key: 'responseError',
  default: {
    status: 200,
    statusText: '',
    data: '',
    hasError: false,
  }
})

export const levelsState = atom<any[]>({
  key: 'levels',
  default: selector({
    key: 'levelsLoader',
    get: async () => {
      const data = await apiClient.listAll('nivel')
      return data

    },
  }),
})

export function useLevelsMutations() {

  const [levels, setLevels] = useRecoilState(levelsState)
  const [loading, setLoading] = useRecoilState(loadingState)
  const [request, setRequest] = useRecoilState(RquestState)


  const createLevel = async (newLevel: any) => {
    const createdLevel = await apiClient.create(newLevel)
    setLevels([...levels, createdLevel])
  }

  const updateLevel = async function <Model>(updatedLevel: UpdatedModel<Model>) {
    try {
      const { payload, payload: { id }, endpoint } = updatedLevel
      setLoading(true)
      const newValue = await apiClient.update(`${endpoint}/${id}`, payload)
      setLoading(false)
      setRequest('success')
      const newLevels = levels.map((level) => {
        if (level.id !== newValue.id) {
          return level
        }
        return payload
      })
      setLevels(newLevels)
      
    } catch (error) {
      setLoading(false)
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