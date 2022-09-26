export default interface ItemResponse {
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

interface Inventory {
  id: number;
  typeInventoryId: number;
  codeInventory: string;
  description: string;
  temperature: number
}