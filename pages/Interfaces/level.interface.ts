export interface Level {
  backingRequired: boolean;
  createDate: string;
  id: number;
  levelName: string;
  maxTimeExposition: number;
  updateDate: string;
  user?: string | null;
}