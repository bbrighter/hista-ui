import { useEffect } from 'react'
import { useErrorBoundary } from 'react-error-boundary'

import { errorBus } from './errorBus'

export function ErrorBridge() {
  const { showBoundary } = useErrorBoundary()
  useEffect(() => {
    const listener = (err: Error) => showBoundary(err)
    errorBus.on('error', listener)

    return () => {
      errorBus.off('error', listener)
    }
  }, [showBoundary])

  return null
}
