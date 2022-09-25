export default interface InventoryResponse {
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
