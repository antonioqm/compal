export interface Level {
  id?: number | undefined;
  createDate?: string;
  updateDate?: string;
  backingRequired: boolean;
  levelName: string;
  maxTimeExposition: number;
  criticalExposureTime: number;
  user?: string | null;
}

