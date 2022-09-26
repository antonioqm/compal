export default interface EtiquetaResponse {
  id: number,
  quantity: number,
  startCode: string,
  endCode: string,
  printed: boolean,
  createDate: string,
  updateDate: string,
  user?: string | null;
}
