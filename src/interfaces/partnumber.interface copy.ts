export default interface PartNumberResponse {
  id: number,
  codePartNumber: string,
  humiditySensitivity: boolean,
  thickness: string,
  temperature: number,
  numberMaxBacking: number,
  minimumTime: number,
  maxTimeExposure: number,
  createDate: string,
  updateDate: string,
  level: string,
  user: string
}
