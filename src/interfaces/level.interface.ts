import { ResponseList } from "./listResponse.interface";

export  type LevelResponse =  ResponseList<LevelModel>
export interface LevelModel {
  id?: number | undefined;
  createDate?: string;
  updateDate?: string;
  backingRequired?: boolean;
  levelName: string;
  maxTimeExposition: number | string;
  criticalExpositionTime: number | string;
  user?: string | null;
}

