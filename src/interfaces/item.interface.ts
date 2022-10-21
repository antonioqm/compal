import { LevelModel } from "./level.interface";
import { ResponseList } from "./listResponse.interface";
import { ThicknessModel } from "./thickness.interface";


export  type ItemResponse =  ResponseList<ItemModel>
export interface ItemModel {
  id: number;
  inventoryTypeName?: string;
  occurrencyDate: string;
  codeLabel: string;
  partNumber: string
  createdDate: string;
  feederCar: string;
  responsibleForExposition: string;
  expositionInMinutes: number;
  maxExpositionTime: number;
  percentExposition: number;
  used: boolean;
  inventory: Inventory;
  level?: LevelModel;
  thickness: ThicknessModel;
  timeToleranceInBaking: number;
  numberMaxBaking: number;

//   {
//     msdCode: 000014,
//     partNumber: PN111122223333,
//     qtyBakingRealized: 1,
//     lastMovimentationUser: admin,
//     maxTimeInBaking: 80,
//     timeInBaking: 8579,
//     codeInventory: POSBAKING02,
//     description: Inventario Pos-Baking,
//     temperature: 0,
//     type: PosBaking,
//     level: null
// }
}

// msdCode: 000053,
// partNumber: PN111122223333,
// qtyBakingRealized: 1,
// lastMovimentationUser: admin,
// maxTimeInBaking: 80,
// timeInBaking: 7089,
// codeInventory: POSBAKING02,
// description: dfasdfdfdfasdf,
// temperature: 40,
// type: Forno,
// level: null

interface Inventory {
  id: number;
  typeInventoryId: number;
  codeInventory: string;
  description: string;
  temperature: number
}