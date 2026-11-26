import useHista from "../store";

export const useIsAppReady = () => {
	const areInstancesLoaded = useHista((state) => state.instancesAreLoaded);
	const isMetaLoaded = useHista((state) => state.loaded.meta);

	return areInstancesLoaded && isMetaLoaded;
};
