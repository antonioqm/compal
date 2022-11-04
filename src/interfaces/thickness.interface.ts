import { LevelModel } from "./level.interface";
import { ResponseList } from "./listResponse.interface";

export type ThicknessResponse =  ResponseList<ThicknessModel>
export interface ThicknessModel {
  id?: number | undefined;
  thicknessName: string;
  levelId: number;
  level?: {levelName: string};
  minTimeBaking40: number;
  minTimeBaking90: number;
  minTimeBaking125: number
}

export interface ConfigThickness {
  id: number;
  thicknessName: number;
  minTimeBaking40: number;
  minTimeBaking90: number;
  minTimeBaking125: number;
  createDate: string;
  updateDate: string;
  level: LevelModel;
  user: any
}
