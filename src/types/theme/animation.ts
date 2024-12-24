export type TransitionType = 'fade' | 'slide' | 'scale' | 'blur';
export type AnimationTiming = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';

export interface MotionPreference {
  reducedMotion: boolean;
  prefersReducedMotion: boolean;
}

export interface ThemeAnimation {
  transitions: Record<TransitionType, string>;
  timing: AnimationTiming;
  duration: number;
  motionPreferences: MotionPreference;
}

export interface AnimationState {
  isAnimating: boolean;
  currentAnimation: string | null;
  queue: string[];
}