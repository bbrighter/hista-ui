import useHista from "../store"

export const useIsAppReady = () => {
  const areInstancesLoaded = useHista(state => state.instancesAreLoaded)
  const isStatusLoaded = useHista(state => state.statusIsLoaded)

  return areInstancesLoaded && isStatusLoaded
}