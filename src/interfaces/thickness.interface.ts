export interface Thickness {
  id?: number | undefined;
  thicknessName: string;
  levelId: number;
  level?: {levelName: string};
  minTimeBaking40: number;
  minTimeBaking90: number;
  minTimeBaking125: number
}
