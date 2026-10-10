import {
	UserManagementProvider,
	type UserStateAdapter,
} from "@bbrighter/auth-module/users";
import { authApi } from "@/api/api";
import useHista from "@/store/store";

export const UserManagement = ({ children }: { children: React.ReactNode }) => {
	const adapter = useUserManagementAdapter();
	return (
		<UserManagementProvider adapter={adapter}>
			{children}
		</UserManagementProvider>
	);
};

const useUserManagementAdapter = (): UserStateAdapter => {
	const users = useHista((state) => state.users);
	const setUsers = useHista((state) => state.setUsers);
	const piid = useHista((state) => state.piid);

	const useUsers = () => ({ users, setUsers });
	const useApi = () => authApi;
	const usePiid = () => piid ?? "";

	return {
		useUsers,
		useApi,
		usePiid,
	};
};
