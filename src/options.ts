export const positions = {
  TOP_LEFT: 'top left',
  TOP_CENTER: 'top center',
  TOP_RIGHT: 'top right',
  MIDDLE_LEFT: 'middle left',
  MIDDLE: 'middle',
  MIDDLE_RIGHT: 'middle right',
  BOTTOM_LEFT: 'bottom left',
  BOTTOM_CENTER: 'bottom center',
  BOTTOM_RIGHT: 'bottom right'
} as const

export const types = {
  INFO: 'info',
  SUCCESS: 'success',
  ERROR: 'error'
} as const

export const transitions = {
  FADE: 'fade',
  SCALE: 'scale'
} as const

export type AlertPosition = typeof positions[keyof typeof positions]
export type AlertType = typeof types[keyof typeof types]
export type AlertTransitionType = typeof transitions[keyof typeof transitions]