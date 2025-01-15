import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  ReactNode,
  MutableRefObject
} from 'react'
import { TransitionGroup } from 'react-transition-group'
import { createPortal } from 'react-dom'
import DefaultContext from './Context'
import Wrapper from './Wrapper'
import Transition from './Transition'
import { positions, transitions, types, Position, AlertType, TransitionType } from './options'
import { groupBy } from './helpers'

interface AlertOptions {
  position?: Position
  timeout?: number
  type?: AlertType
  onOpen?: () => void
  onClose?: () => void
}

interface Alert {
  id: string
  message: ReactNode
  options: AlertOptions
  close: () => void
}

interface ProviderProps {
  children: ReactNode
  offset?: string
  position?: Position
  timeout?: number
  type?: AlertType
  transition?: TransitionType
  containerStyle?: React.CSSProperties
  template: React.ComponentType<any>
  context?: React.Context<any>
  bottomOffset?: string
}

interface ProviderRef {
  alerts: Alert[]
  show: (message: ReactNode, options?: AlertOptions) => Alert
  remove: (alert: Alert) => void
  removeAll: () => void
  success: (message: ReactNode, options?: AlertOptions) => Alert
  error: (message: ReactNode, options?: AlertOptions) => Alert
  info: (message: ReactNode, options?: AlertOptions) => Alert
}

const Provider = forwardRef<ProviderRef, ProviderProps>(({
  children,
  offset = '10px',
  position = positions.BOTTOM_CENTER,
  timeout = 0,
  type = types.INFO,
  transition = transitions.SCALE,
  containerStyle = { zIndex: 100 },
  template: AlertComponent,
  context: Context = DefaultContext,
  bottomOffset = '10px',
  ...props
}, ref) => {
  const root = useRef<HTMLDivElement | null>(null)
  const alertContext = useRef<ProviderRef>({} as ProviderRef)
  const timersId = useRef<number[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    root.current = document.createElement('div')
    root.current.id = '__react-alert__'
    document.body.appendChild(root.current)
    const timersIdRef = timersId.current

    return () => {
      timersIdRef.forEach(clearTimeout)
      if (root.current) document.body.removeChild(root.current)
    }
  }, [])

  const remove = useCallback((alert: Alert) => {
    setAlerts(currentAlerts => {
      const lengthBeforeRemove = currentAlerts.length
      const filteredAlerts = currentAlerts.filter(a => a.id !== alert.id)

      if (lengthBeforeRemove > filteredAlerts.length && alert.options.onClose) {
        alert.options.onClose()
      }

      return filteredAlerts
    })
  }, [])

  const removeAll = useCallback(() => {
    alerts.forEach(remove)
  }, [alerts, remove])

  const show = useCallback(
    (message: ReactNode = '', options: AlertOptions = {}) => {
      const id = Math.random().toString(36).substr(2, 9)

      const alertOptions = {
        position: options.position || position,
        timeout,
        type,
        ...options
      }

      const alert: Alert = {
        id,
        message,
        options: alertOptions,
        close: () => remove(alert)
      }

      if (alert.options.timeout) {
        const timerId = window.setTimeout(() => {
          remove(alert)

          timersId.current = timersId.current.filter(id => id !== timerId)
        }, alert.options.timeout)

        timersId.current.push(timerId)
      }

      setAlerts(state => state.concat(alert))
      if (alert.options.onOpen) alert.options.onOpen()

      return alert
    },
    [position, remove, timeout, type]
  )

  const success = useCallback(
    (message: ReactNode = '', options: AlertOptions = {}) => {
      options.type = types.SUCCESS
      return show(message, options)
    },
    [show]
  )

  const error = useCallback(
    (message: ReactNode = '', options: AlertOptions = {}) => {
      options.type = types.ERROR
      return show(message, options)
    },
    [show]
  )

  const info = useCallback(
    (message: ReactNode = '', options: AlertOptions = {}) => {
      options.type = types.INFO
      return show(message, options)
    },
    [show]
  )

  alertContext.current = {
    alerts,
    show,
    remove,
    removeAll,
    success,
    error,
    info
  }

  if (ref) {
    (ref as MutableRefObject<ProviderRef>).current = alertContext.current
  }

  const alertsByPosition = groupBy(alerts, alert => alert.options.position || position)

  return (
    <Context.Provider value={alertContext}>
      {children}
      {root.current &&
        createPortal(
          <Fragment>
            {Object.keys(positions).map(key => {
              const positionKey = positions[key as keyof typeof positions]

              return (
                <TransitionGroup
                  appear
                  key={positionKey}
                  childFactory={child => React.cloneElement(child, { type: transition })}
                >
                  {alertsByPosition[positionKey]
                    ? alertsByPosition[positionKey].map(alert => (
                        <Transition key={alert.id} type={transition}>
                          <Wrapper 
                            options={{ 
                              position: positionKey, 
                              containerStyle,
                              bottomOffset: positionKey.includes('bottom') ? bottomOffset : undefined
                            }} 
                            {...props}
                          >
                            <AlertComponent
                              style={{ margin: offset, pointerEvents: 'all' }}
                              {...alert}
                            />
                          </Wrapper>
                        </Transition>
                      ))
                    : null}
                </TransitionGroup>
              )
            })}
          </Fragment>,
          root.current
        )}
    </Context.Provider>
  )
})

export default Provider