export type FeedbackTone = 'good' | 'try' | 'neutral';

export interface MatchProgress {
  matched: number;
  total: number;
  complete: boolean;
  status: string;
}

export interface MatchFeedback {
  tone: FeedbackTone;
  text: string;
}

export interface PlayInfo {
  number: number;
  hint: string;
  total: number;
}

export interface MapInfo {
  readyLevel: number;
  clearedCount: number;
  builtCount: number;
}

export interface MatchHooks {
  onProgress: (progress: MatchProgress) => void;
  onFeedback: (feedback: MatchFeedback) => void;
  onPlay: (info: PlayInfo) => void;
  onMap: (info: MapInfo) => void;
}
