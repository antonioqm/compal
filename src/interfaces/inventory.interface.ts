
import { ResponseList } from "./listResponse.interface";

export  type InventoryResponse =  ResponseList<InventoryModel>
export interface InventoryModel {
  id: number;
  codeInventory: string;
  description: string;
  temperature: number;
  typeInventory: TypeInventoryReponse;
  
}

export interface TypeInventoryReponse{
  id: number;
  name: string;
}
