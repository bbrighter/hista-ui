import { useEffect } from "react"

import useHista from "../store/store"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePiidEffect = (fn: () => void, inputs: Array<any>) => {
  const piid = useHista(state => state.piid)

  useEffect(() => {
    if (piid) {
      fn()
    }
  }, [piid, ...inputs])
}