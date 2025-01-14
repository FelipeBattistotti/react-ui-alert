import React, { useRef } from 'react'
import { Transition as AlertTransition } from 'react-transition-group'
import { transitions, TransitionType } from './options'

const duration = 250

const defaultStyle = {
  [transitions.FADE]: {
    transition: `opacity ${duration}ms ease`,
    opacity: 0
  },
  [transitions.SCALE]: {
    transform: 'scale(1)',
    transition: `all ${duration}ms ease-in-out`
  }
}

const transitionStyles = {
  [transitions.FADE]: {
    entering: { opacity: 0 },
    entered: { opacity: 1 }
  },
  [transitions.SCALE]: {
    entering: { transform: 'scale(0)' },
    entered: { transform: 'scale(1)' },
    exiting: { transform: 'scale(0)' },
    exited: { transform: 'scale(1)' }
  }
}

interface TransitionProps {
  children: React.ReactNode
  type?: TransitionType
}

const Transition = ({ children, type = transitions.FADE, ...props }: TransitionProps): React.ReactElement => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <AlertTransition nodeRef={ref} {...props} timeout={duration}>
      {state => (
        <div
          ref={ref}
          style={{
            ...defaultStyle[type],
            ...transitionStyles[type][state as keyof typeof transitionStyles[typeof type]]
          }}
        >
          {children}
        </div>
      )}
    </AlertTransition>
  )
}

export default Transition