import React, { useMemo } from 'react'
import { positions, Position } from './options'

export const getStyles = (position: Position, bottomOffset: string = '10px') => {
  const initialStyles: React.CSSProperties = {
    left: 0,
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
        bottom: bottomOffset,
        alignItems: 'flex-start'
      }
    case positions.BOTTOM_CENTER:
      return {
        ...initialStyles,
        bottom: bottomOffset
      }
    case positions.BOTTOM_RIGHT:
      return {
        ...initialStyles,
        bottom: bottomOffset,
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
    bottomOffset?: string
  }
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  options: { position, containerStyle, bottomOffset },
  ...props
}) => {
  const styles = useMemo(() => getStyles(position, bottomOffset), [position, bottomOffset])

  return (
    React.Children.count(children) > 0 && (
      <div style={{ ...styles, ...containerStyle }} {...props}>
        {children}
      </div>
    )
  )
}

export default Wrapper