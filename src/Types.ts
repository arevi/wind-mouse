export interface Point {
  x: number;
  y: number;
}

export interface MouseSettings {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  gravity: number;
  wind: number;
  minWait: number;
  maxWait: number;
  maxStep: number;
  targetArea: number;
}
