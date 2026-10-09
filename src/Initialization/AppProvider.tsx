import { CustomAppBar } from "@bbrighter/auth-module/app-bar";
import { useAuth, useHandleUnauthorized } from "@bbrighter/auth-module/auth";
import { useEffect } from "react";
import { type NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import useHista from "@/store/store";
import { Auth } from "./Auth";
import { InternationalizationProvider } from "./Localization";
import { Settings } from "./Settings";
import { UserManagement } from "./UserManagament";

export default function AppProvider() {
	const navigate = useNavigate();

	return (
		<Settings>
			<InternationalizationProvider>
				<UserManagement>
					<Auth navigate={navigate}>
						<AppEffects navigate={navigate} />
						<CustomAppBar />
						<Outlet />
					</Auth>
				</UserManagement>
			</InternationalizationProvider>
		</Settings>
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
