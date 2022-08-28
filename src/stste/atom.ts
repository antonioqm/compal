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

  const createLevel = async (newLevel: any) => {
    const createdLevel = await apiClient.create(newLevel)
    setLevels([...levels, createdLevel])
  } 

  const updateLevel = async function <Model>(updatedLevel: UpdatedModel<Model>) {

    const { payload, payload: { id }, endpoint } = updatedLevel
    const newValue = await apiClient.update(`${endpoint}/${id}`, payload)
    

    const newLevels = levels.map((level) => {
      if (level.id !== id) {
        return level
      }

      return payload
    })
    setLevels(newLevels)
  }

  const deleteLevel = async (endpoint: string, id: number) => {
    await apiClient.delete(id)
    const newLevels = levels.filter((level:Level) => level.id !== id)
    setLevels(newLevels)
  }

  return { createLevel, updateLevel, deleteLevel }
}