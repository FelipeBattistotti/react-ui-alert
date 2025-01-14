import React, { forwardRef, ForwardRefRenderFunction, PropsWithoutRef, RefAttributes } from 'react'
import DefaultContext from './Context'

const withAlert = (Context = DefaultContext) => <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAlert: ForwardRefRenderFunction<any, PropsWithoutRef<P>> = (props, ref) => (
    <Context.Consumer>
      {alert => (
        <WrappedComponent {...(props as P)} ref={ref} alert={alert.current} />
      )}
    </Context.Consumer>
  )

  WithAlert.displayName = `WithAlert(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`

  return forwardRef(WithAlert) as React.ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<any>>
}

export default withAlert