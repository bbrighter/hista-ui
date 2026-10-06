import { CustomAppBar } from "@bbrighter/auth-module/app-bar";
import {
	AuthProvider,
	useAuth,
	useHandleUnauthorized,
} from "@bbrighter/auth-module/auth";
import { SettingsProvider } from "@bbrighter/auth-module/settings";
import { UserManagementProvider } from "@bbrighter/auth-module/users";
import { useEffect } from "react";
import {
	type NavigateFunction,
	Outlet,
	useLocation,
	useNavigate,
} from "react-router-dom";

import {
	useAuthStateAdapter,
	useSettingsAdapter,
	useUserManagementAdapter,
} from "./adapter";
import useHista from "./store/store";

export default function AppProvider() {
	const navigate = useNavigate();
	const location = useLocation();
	const authAdapter = useAuthStateAdapter(navigate, location);
	const userAdapter = useUserManagementAdapter();
	const settingsAdapter = useSettingsAdapter();

	return (
		<SettingsProvider adapter={settingsAdapter}>
			<UserManagementProvider adapter={userAdapter}>
				<AuthProvider adapter={authAdapter}>
					<AppEffects navigate={navigate} />
					<CustomAppBar />
					<Outlet />
				</AuthProvider>
			</UserManagementProvider>
		</SettingsProvider>
	);
}

const AppEffects = ({ navigate }: { navigate: NavigateFunction }) => {
	useSetPermissions();
	usePiidLocation();
	useHandleUnauthorized(navigate);
	return null;
};

const useSetPermissions = () => {
	const { setPermissions, token } = useAuth();

	// biome-ignore lint/correctness/useExhaustiveDependencies: Permissions may need to update if the token changes
	useEffect(() => {
		setPermissions();
	}, [token]);
};

const usePiidLocation = () => {
	const { piid } = useAuth();
	const setPiid = useHista((state) => state.setPiid);
	const navigate = useNavigate();

	// biome-ignore lint/correctness/useExhaustiveDependencies: Retriggers always if functions are included
	useEffect(() => {
		if (piid) {
			setPiid(piid);
			navigate(`/${piid}`, {
				replace: true,
			});
		}
	}, [piid]);
};
