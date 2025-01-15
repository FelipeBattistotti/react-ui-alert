import React, { useMemo } from 'react'
import { positions, Position } from './options'

export const getStyles = (
  position: Position,
  useFixedPosition: boolean = true,
  customStyle: React.CSSProperties = {}
): React.CSSProperties => {
  const initialStyles: React.CSSProperties = {
    position: useFixedPosition ? 'fixed' : 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    pointerEvents: 'none',
    maxWidth: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    width: '100%'
  }

  const positionStyles: Record<Position, React.CSSProperties> = {
    [positions.TOP_LEFT]: { top: '10px', left: '10px', alignItems: 'flex-start' },
    [positions.TOP_CENTER]: { top: '10px', left: '50%', transform: 'translateX(-50%)' },
    [positions.TOP_RIGHT]: { top: '10px', right: '10px', alignItems: 'flex-end' },
    [positions.MIDDLE_LEFT]: { top: '50%', left: '10px', transform: 'translateY(-50%)', alignItems: 'flex-start' },
    [positions.MIDDLE]: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    [positions.MIDDLE_RIGHT]: { top: '50%', right: '10px', transform: 'translateY(-50%)', alignItems: 'flex-end' },
    [positions.BOTTOM_LEFT]: { bottom: '10px', left: '10px', alignItems: 'flex-start' },
    [positions.BOTTOM_CENTER]: { bottom: '10px', left: '50%', transform: 'translateX(-50%)' },
    [positions.BOTTOM_RIGHT]: { bottom: '10px', right: '10px', alignItems: 'flex-end' }
  }

  return {
    ...initialStyles,
    ...positionStyles[position],
    ...customStyle
  }
}

interface WrapperProps {
  children: React.ReactNode
  options: {
    position: Position
    containerStyle?: React.CSSProperties
    useFixedPosition?: boolean
  }
}

const Wrapper: React.FC<WrapperProps> = ({
  children,
  options: { position, containerStyle = {}, useFixedPosition = true },
  ...props
}) => {
  const styles = useMemo(
    () => getStyles(position, useFixedPosition, containerStyle),
    [position, useFixedPosition, containerStyle]
  )

  return (
    React.Children.count(children) > 0 && (
      <div style={styles} {...props}>
        {children}
      </div>
    )
  )
}

export default Wrapper