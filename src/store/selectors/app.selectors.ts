import useHista from "../store"

export const useIsAppReady = () => {
  const areInstancesLoaded = useHista(state => state.instancesAreLoaded)
  const isStatusLoaded = useHista(state => state.loaded["statuses"])

  console.log(`Loading state: Instances: ${areInstancesLoaded}, status: ${isStatusLoaded}`)

  return areInstancesLoaded && isStatusLoaded
}