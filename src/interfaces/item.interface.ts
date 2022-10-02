import { ResponseList } from "./listResponse.interface";

export  type ItemResponse =  ResponseList<ItemModel>
export interface ItemModel {
  id: number;
  codeLabel: number;
  createdDate: string;
  feederCar: string;
  responsibleForExposition: string;
  expositionInMinutes: number;
  maxExpositionTime: number;
  percentExposition: number;
  used: boolean;
  inventory: Inventory
}

// "msdCode": "000053",
// "partNumber": "PN111122223333",
// "qtyBakingRealized": 1,
// "lastMovimentationUser": "admin",
// "maxTimeInBaking": 80,
// "timeInBaking": 7089,
// "codeInventory": "POSBAKING02",
// "description": "dfasdfdfdfasdf",
// "temperature": 40,
// "type": "Forno",
// "level": null

interface Inventory {
  id: number;
  typeInventoryId: number;
  codeInventory: string;
  description: string;
  temperature: number
}