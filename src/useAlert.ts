import { useContext, useMemo } from 'react'
import DefaultContext from './Context'

const useAlert = (Context = DefaultContext) => {
  const alertContext = useContext(Context)
  const alert = useMemo(() => {
    return alertContext.current
  }, [alertContext])
  return alert
}

export default useAlert