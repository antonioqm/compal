import { LevelModel } from "./level.interface";
import { ResponseList } from "./listResponse.interface";
import { ConfigThickness } from './thickness.interface';

export type ComponentResponse = ResponseList<ComponentModel>

export interface ComponentModel {
  id: number,
  moistureSensitive: boolean;
  codePartNumber: string,
  humiditySensitivity: boolean,
  timeToleranceInBaking: number;
  configThickness: ConfigThickness,
  temperature: number,
  numberMaxBacking: number,
  thicknessId: number;
  minimumTime: number,
  maxTimeExposure: number,
  maximumExposureTime?: number
  createDate: string,
  updateDate: string,
  level?: LevelModel,
  user: string
}
// {
//   "id": 16,
//   "codePartNumber": "testeEDITADO",
//   "humiditySensitivity": false,
//   "temperature": 10,
//   "numberMaxBacking": 9,
//   "minimumTime": 10,
//   "maxTimeExposure": 10,
//   "timeToleranceInBaking": 0,
//   "createDate": "2022-10-18T13:32:44.6303301",
//   "updateDate": "2022-10-19T14:14:50.2694487",
//   "thickness": {
//       "id": 28,
//       "thicknessName": "50",
//       "level": null,
//       "minTimeBaking40": 5,
//       "minTimeBaking90": 7,
//       "minTimeBaking125": 4,
//       "createDate": "2022-10-06T20:31:11.6046724",
//       "updateDate": "2022-10-06T20:51:06.1990739",
//       "user": null
//   },
//   "thicknessId": 28,
//   "level": null,
//   "user": null
// }

export interface ComponentRequest {
  id: number;
  codePartNumber: string;
  numberMaxBacking: number;
  thickness: number;
  levelId: number;
  timeToleranceInBaking: number;
}

