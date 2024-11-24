import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useAuth() {
	const { user, signIn, signOut, isAuthenticated, isLoading, hasRoles } =
		useContext(AuthContext);

	return {
		user: user,
		signIn: signIn,
		signOut: signOut,
		isAuthenticated: isAuthenticated,
		isLoading: isLoading,
		hasRoles: hasRoles,
	};
}

export { useAuth };
