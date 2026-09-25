export const GAME_STATUS = {
  START: "start",
  PLAYING: "playing",
  FINISH: "finish",
} as const;

export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];
