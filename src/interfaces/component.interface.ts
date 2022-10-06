import { ResponseList } from "./listResponse.interface";

export type ComponentResponse = ResponseList<ComponentModel>

export interface ComponentModel {
  id: number,
  moistureSensitive: boolean;
  codePartNumber: string,
  humiditySensitivity: boolean,
  thickness: { thicknessName: string, id: string },
  temperature: number,
  numberMaxBacking: number,
  minimumTime: number,
  maxTimeExposure: number,
  maximumExposureTime?: number
  createDate: string,
  updateDate: string,
  level?: { levelName: string, id: number },
  user: string
}
export interface ComponentRequest {
  id?: number;
  codePartNumber: string,
  humiditySensitivity: boolean | null,
  maxTimeExposure: number,
  minimumTime: number,
  numberMaxBacking: number,
  temperature: number,
  thicknessId: number
}

