import { LevelModel } from "./level.interface";
import { ResponseList } from "./listResponse.interface";
import { ThicknessModel } from './thickness.interface';

export type ComponentResponse = ResponseList<ComponentModel>

export interface ComponentModel {
  id: number,
  moistureSensitive: boolean;
  codePartNumber: string,
  humiditySensitivity: boolean,
  thickness: ThicknessModel,
  temperature: number,
  numberMaxBacking: number,
  minimumTime: number,
  maxTimeExposure: number,
  maximumExposureTime?: number
  createDate: string,
  updateDate: string,
  level?: LevelModel,
  user: string
}
export interface ComponentRequest {
  id: number;
  codePartNumber: string,
  humiditySensitivity?: boolean | null,
  maxTimeExposure: number,
  minimumTime: number,
  numberMaxBacking: number,
  temperature: number,
  thicknessId: number
}

