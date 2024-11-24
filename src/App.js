import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PageSettingsProvider } from "./context/PageContext";
import useTheme from "./hooks/theme";
import { CartProvider } from "./context/CartContext";

function App() {
  useTheme("default");
	return (
		<BrowserRouter>
			<AuthProvider>
				<PageSettingsProvider>
					<CartProvider>
						<AppRoutes />
					</CartProvider>
				</PageSettingsProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
