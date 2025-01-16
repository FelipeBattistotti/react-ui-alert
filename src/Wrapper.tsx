import React, { useMemo } from 'react'
import { positions, Position } from './options'

const mobile = () => typeof window !== 'undefined' && window?.innerWidth <= 640

export const getStyles = (position: Position) => {
  const initialStyles: React.CSSProperties = {
    left: 0,
    position: mobile() ? 'fixed' : undefined,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    pointerEvents: 'none'
  }

  switch (position) {
    case positions.TOP_LEFT:
      return {
        ...initialStyles,
        top: 0,
        alignItems: 'flex-start'
      }
    case positions.TOP_CENTER:
      return {
        ...initialStyles,
        top: 0
      }
    case positions.TOP_RIGHT:
      return {
        ...initialStyles,
        top: 0,
        alignItems: 'flex-end'
      }
    case positions.MIDDLE_LEFT:
      return {
        ...initialStyles,
        top: '50%',
        alignItems: 'flex-start'
      }
    case positions.MIDDLE: {
      return {
        ...initialStyles,
        top: '50%'
      }
    }
    case positions.MIDDLE_RIGHT:
      return {
        ...initialStyles,
        top: '50%',
        alignItems: 'flex-end'
      }
    case positions.BOTTOM_LEFT:
      return {
        ...initialStyles,
        bottom: mobile() ? 0 : undefined,
        alignItems: 'flex-start'
      }
    case positions.BOTTOM_CENTER:
      return {
        ...initialStyles,
        bottom: mobile() ? 0 : undefined
      }
    case positions.BOTTOM_RIGHT:
      return {
        ...initialStyles,
        bottom: mobile() ? 0 : undefined,
        alignItems: 'flex-end'
      }
    default: {
      return initialStyles
    }
  }
}

interface WrapperProps {
  children: React.ReactNode
  options: {
    position: Position
    containerStyle?: React.CSSProperties
  }
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  options: { position, containerStyle },
  ...props
}) => {
  const styles = useMemo(() => getStyles(position), [position])

  return (
    React.Children.count(children) > 0 && (
      <div style={{ ...styles, ...containerStyle }} {...props}>
        {children}
      </div>
    )
  )
}

export default Wrapper