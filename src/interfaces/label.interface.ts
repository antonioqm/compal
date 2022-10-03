import { ResponseList } from "./listResponse.interface";

export type LabelResponse =  ResponseList<LabelModel>
export interface LabelModel {
  id: number,
  quantity: number,
  startCode: string,
  endCode: string,
  printed: boolean,
  createDate: string,
  updateDate: string,
  user?: string | null;
}


export interface Label {
	quantity: number,
}