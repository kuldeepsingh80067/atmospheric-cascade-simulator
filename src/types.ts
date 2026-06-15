export interface Particle {
  id: string;
  type: 'snowflake' | 'balloon';
  left: number; // percentage horizontally (0 - 100)
  size: number; // diameter/width in pixels (24 - 36px represents 'medium' size)
  speed: number; // fall/rise speed multiplier or absolute duration
  swayDistance: number; // horizontal sway distance in pixels
  swayDuration: number; // seconds for one full sway oscillation
  opacity: number; // custom base opacity
  color?: string; // used for balloons (e.g., jewel/metallic hues)
  createdAt: number; // timestamp
}

export type ActiveEffect = 'none' | 'snowflakes' | 'balloons';
