import {
	AuthProvider,
	type AuthStateAdapter,
	ProductKeys,
} from "@bbrighter/auth-module/auth";
import {
	type Location,
	type NavigateFunction,
	useLocation,
} from "react-router-dom";
import { authApi } from "@/api/api";
import useHista from "@/store/store";

export const Auth = ({
	navigate,
	children,
}: {
	navigate: NavigateFunction;
	children: React.ReactNode;
}) => {
	const location = useLocation();
	const adapter = useAuthStateAdapter(navigate, location);
	return <AuthProvider adapter={adapter}>{children}</AuthProvider>;
};

const useAuthStateAdapter = (
	navigate: NavigateFunction,
	location: Location,
): AuthStateAdapter => {
	const instances = useHista((state) => state.instances);
	const setInstances = useHista((state) => state.setInstances);
	const token = useHista((state) => state.token);
	const setToken = useHista((state) => state.setToken);
	const userName = useHista((state) => state.userName);
	const setUserName = useHista((state) => state.setUserName);
	const isLoaded = useHista((state) => state.instancesAreLoaded);
	const setIsLoaded = useHista((state) => state.setInstancesLoaded);

	const useAuthApi = () => authApi;
	const useLocation = () => ({
		location: location.pathname + location.search,
		navigate,
	});
	const useProductInstances = () => ({
		instances,
		setInstances,
		isLoaded,
		setIsLoaded,
	});
	const useProductKey = () => ProductKeys.HistaComplete;
	const useToken = () => ({ token, setToken });
	const useUserName = () => ({ userName, setUserName });

	return {
		useAuthApi,
		useLocation,
		useProductInstances,
		useProductKey,
		useToken,
		useUserName,
	};
};
