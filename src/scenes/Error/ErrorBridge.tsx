import { useEffect } from "react"
import { useErrorBoundary } from "react-error-boundary"

import { actions } from "../../actions"



export function ErrorBridge() {
  const { showBoundary } = useErrorBoundary()
  useEffect(() => {
    const listener = (err: unknown) => showBoundary(err)
    actions.error.on("error", listener)

    return () => {
      actions.error.off("error", listener)
    }
  }, [showBoundary])

  return null
}
