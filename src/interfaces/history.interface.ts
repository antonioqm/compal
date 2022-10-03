export default interface HistoryResponse {
  id: number,
  quantity: number,
  startCode: string,
  endCode: string,
  printed: boolean,
  createDate: string,
  updateDate: string,
  user?: string | null;
}


export interface History {
  partNumber: string,
  codeLabel: string
}