export type CSSUnit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%' | ''
export type CSSValue = `${number}${CSSUnit}` | string

export interface ThemeStyles {
  [key: `--${string}`]: string | number
}

export interface ThemeAnimation {
  transitions: {
    fade: string
    slide: string
    scale: string
    blur: string
  }
  timing: string
  duration: number
  motionPreferences: {
    reducedMotion: boolean
    prefersReducedMotion: boolean
  }
}