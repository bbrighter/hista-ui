import useHista from "../store";

export const useIsAppReady = () => {
	const areInstancesLoaded = useHista((state) => state.instancesAreLoaded);
	const isAppInfoLoaded = useHista((state) => state.loaded.appInfo);

	return areInstancesLoaded && isAppInfoLoaded;
};
