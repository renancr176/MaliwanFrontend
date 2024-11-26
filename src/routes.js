import { Routes, Route } from "react-router-dom";

import { USER_ROLES, requireAll } from "./utils/userRoles";
import RequiredAuth from "./utils/requiredAuth";

//#region Admin Pages
import AdminPage from "./pages/admin";

import AdminBrands from './pages/admin/brands';
import AdminAddBrand from './pages/admin/brands/add';
import AdminEditBrand from './pages/admin/brands/edit';

import AdminCategories from './pages/admin/categories';
import AdminAddCategory from './pages/admin/categories/add';
import AdminEditCategory from './pages/admin/categories/edit';

import AdminCustomers from './pages/admin/customers';
import AdminAddCustomer from './pages/admin/customers/add';
import AdminEditCustomer from './pages/admin/customers/edit';

import AdminGenders from './pages/admin/genders';
import AdminAddGender from './pages/admin/genders/add';
import AdminEditGender from './pages/admin/genders/edit';

import AdminOrdes from './pages/admin/orders';
import AdminAddOrder from './pages/admin/orders/add';
import AdminEditOrder from './pages/admin/orders/edit';

import AdminPaymentMethods from './pages/admin/paymentMethods';
import AdminAddPaymentMethod from './pages/admin/paymentMethods/add';
import AdminEditPaymentMethod from './pages/admin/paymentMethods/edit';

import AdminProducts from './pages/admin/products';
import AdminAddProduct from './pages/admin/products/add';
import AdminEditProduct from './pages/admin/products/edit';

import AdminProductColors from './pages/admin/productColors';
import AdminAddProductColor from './pages/admin/productColors/add';
import AdminEditProductColor from './pages/admin/productColors/edit';

import AdminProductSizes from './pages/admin/productSizes';
import AdminAddProductSize from './pages/admin/productSizes/add';
import AdminEditProductSize from './pages/admin/productSizes/edit';

import AdminStocks from './pages/admin/stocks';
import AdminAddStock from './pages/admin/stocks/add';
import AdminEditStock from './pages/admin/stocks/edit';

import AdminSubcategories from './pages/admin/subcategories';
import AdminAddSubcategory from './pages/admin/subcategories/add';
import AdminEditSubcategory from './pages/admin/subcategories/edit';

//#endregion

//#region Customer Pages
//#endregion

//#region Public Pages
import Home from "./pages/public/home";
import NotFound from "./pages/public/errors/notFound";
import AccessDenied from "./pages/public/errors/accessDenied";
import SignIn from "./pages/public/auth/signIn";
// import PasswordReset from "./pages/public/auth/passwordReset";
// import ResetPassword from "./pages/public/auth/resetPassword";
// import ConfirmEmail from "./pages/public/auth/confirmEmail";
//#endregion

//#region Remover - Templates Exemplo
import RouteElement from "./components/routeElement";
//#endregion

const PageRoutes = [
	{
		path: "/health/live",
		name: "health-check",
		pageSettings: {
			header: false,
			footer: false,
			breadcrumb: false,
			sidebar: false,
			title: "Health",
		},
		element: <span>It is Healthy!</span>,
	},
	{
		path: "",
		name: "home",
		pageSettings: {
			header: true,
			footer: true,
			breadcrumb: true,
			sidebar: false,
			title: "Maliwan",
		},
		element: <Home />,
		children: [
			{
				path: "auth",
				name: "auth",
				pageSettings: {
					header: false,
					footer: false,
					breadcrumb: false,
					sidebar: false,
					title: "Autenticação",
				},
				children: [
					{
						path: "signin",
						name: "signin",
						element: <SignIn />,
					},
					// {
					// 	path: "passwordreset",
					// 	name: "passwordreset",
					// 	element: <PasswordReset />,
					// },
					// {
					// 	path: "resetpassword/:token",
					// 	name: "resetpassword",
					// 	element: <ResetPassword />,
					// },
					// {
					// 	path: "confirmemail/:token",
					// 	name: "confirmemail",
					// 	element: <ConfirmEmail />,
					// },
				],
			},
			
			//#region Admin Pages
			{
				roles: [USER_ROLES.ADMIN],
				path: "admin",
				name: "admin.index",
				pageSettings: {
					sidebar: true,
				},
				element: <AdminPage />,
				children: [
					{
						// roles: [USER_ROLES.ADMIN],
						path: "brands",
						name: "admin.brands.index",
						element: <AdminBrands />,
						children: [
							{
								// roles: [USER_ROLES.ADMIN],
								path: "add",
								name: "admin.brands.add",
								element: <AdminAddBrand />
							},
							{
								// roles: [USER_ROLES.ADMIN],
								path: "edit/:id",
								name: "admin.brands.edit",
								element: <AdminEditBrand />
							},
						]
					},
					{
						// roles: [USER_ROLES.ADMIN],
						path: "categories",
						name: "admin.categories.index",
						element: <AdminCategories />,
						children: [
							{
								// roles: [USER_ROLES.ADMIN],
								path: "add",
								name: "admin.categories.add",
								element: <AdminAddCategory />
							},
							{
								// roles: [USER_ROLES.ADMIN],
								path: "edit/:id",
								name: "admin.categories.edit",
								element: <AdminEditCategory />
							},
						]
					},
					{
						// roles: [USER_ROLES.ADMIN],
						path: "customers",
						name: "admin.customers.index",
						element: <AdminCustomers />,
						children: [
							{
								// roles: [USER_ROLES.ADMIN],
								path: "add",
								name: "admin.customers.add",
								element: <AdminAddCustomer />
							},
							{
								// roles: [USER_ROLES.ADMIN],
								path: "edit/:id",
								name: "admin.customers.edit",
								element: <AdminEditCustomer />
							},
						]
					},
					{
						// roles: [USER_ROLES.ADMIN],
						path: "genders",
						name: "admin.genders.index",
						element: <AdminGenders />,
						children: [
							{
								// roles: [USER_ROLES.ADMIN],
								path: "add",
								name: "admin.genders.add",
								element: <AdminAddGender />
							},
							{
								// roles: [USER_ROLES.ADMIN],
								path: "edit/:id",
								name: "admin.genders.edit",
								element: <AdminEditGender />
							},
						]
					},
					{
						// roles: [USER_ROLES.ADMIN],
						path: "orders",
						name: "admin.orders.index",
						element: <AdminOrdes />,
						children: [
							{
								// roles: [USER_ROLES.ADMIN],
								path: "add",
								name: "admin.orders.add",
								element: <AdminAddOrder />
							},
							{
								// roles: [USER_ROLES.ADMIN],
								path: "edit/:id",
								name: "admin.orders.edit",
								element: <AdminEditOrder />
							},
						]
					},
					{
						roles: [USER_ROLES.ADMIN],
						path: "payment-methods",
						name: "admin.paymentMethods.index",
						element: <AdminPaymentMethods />,
						children: [
							{
								roles: [USER_ROLES.ADMIN],
								path: "add",
								name: "admin.paymentMethods.add",
								element: <AdminAddPaymentMethod />
							},
							{
								roles: [USER_ROLES.ADMIN],
								path: "edit/:id",
								name: "admin.paymentMethods.edit",
								element: <AdminEditPaymentMethod />
							},
						]
					},
					{
						// roles: [USER_ROLES.ADMIN],
						path: "products",
						name: "admin.products.index",
						element: <AdminProducts />,
						children: [
							{
								// roles: [USER_ROLES.ADMIN],
								path: "add",
								name: "admin.products.add",
								element: <AdminAddProduct />
							},
							{
								// roles: [USER_ROLES.ADMIN],
								path: "edit/:id",
								name: "admin.products.edit",
								element: <AdminEditProduct />
							},
						]
					},
					{
						// roles: [USER_ROLES.ADMIN],
						path: "productColors",
						name: "admin.productColors.index",
						element: <AdminProductColors />,
						children: [
							{
								// roles: [USER_ROLES.ADMIN],
								path: "add",
								name: "admin.productColors.add",
								element: <AdminAddProductColor />
							},
							{
								// roles: [USER_ROLES.ADMIN],
								path: "edit/:id",
								name: "admin.productColors.edit",
								element: <AdminEditProductColor />
							},
						]
					},
					{
						// roles: [USER_ROLES.ADMIN],
						path: "productSizes",
						name: "admin.productSizes.index",
						element: <AdminProductSizes />,
						children: [
							{
								// roles: [USER_ROLES.ADMIN],
								path: "add",
								name: "admin.productSizes.add",
								element: <AdminAddProductSize />
							},
							{
								// roles: [USER_ROLES.ADMIN],
								path: "edit/:id",
								name: "admin.productSizes.edit",
								element: <AdminEditProductSize />
							},
						]
					},
					{
						// roles: [USER_ROLES.ADMIN],
						path: "stocks",
						name: "admin.stocks.index",
						element: <AdminStocks />,
						children: [
							{
								// roles: [USER_ROLES.ADMIN],
								path: "add",
								name: "admin.stocks.add",
								element: <AdminAddStock />
							},
							{
								// roles: [USER_ROLES.ADMIN],
								path: "edit/:id",
								name: "admin.stocks.edit",
								element: <AdminEditStock />
							},
						]
					},
					{
						// roles: [USER_ROLES.ADMIN],
						path: "categories/:idCategory/subcategories",
						name: "admin.subcategories.index",
						element: <AdminSubcategories />,
						children: [
							{
								// roles: [USER_ROLES.ADMIN],
								path: "add",
								name: "admin.subcategories.add",
								element: <AdminAddSubcategory />
							},
							{
								// roles: [USER_ROLES.ADMIN],
								path: "edit/:id",
								name: "admin.subcategories.edit",
								element: <AdminEditSubcategory />
							},
						]
					},
				],
			},
			//#endregion
			
			//#region Customer Pages
			// {
			// 	roles: [USER_ROLES.CUSTOMER],
			// 	path: "account",
			// 	name: "account.index",
			// 	pageSettings: {
			// 		sidebar: true,
			// 	},
			// 	element: <NotFound />,
			// 	children: [
			// 		{
			// 			path: "edit",
			// 			name: "account.edit",
			// 			element: <AccountEdit />,
			// 		},
			// 		{
			// 			path: "orders",
			// 			name: "account.orders",
			// 			element: <CustomerOrders />,
			// 			children: [
			// 				{
			// 					path: ":id",
			// 					name: "account.orderDetail",
			// 					children: [
			// 						{
			// 							path: "invoice",
			// 							name: "accountOrderInvoice",
			// 							pageSettings: {
			// 								sidebar: false,
			// 								header: false,
			// 								footer: false,
			// 								breadcrumb: false,
			// 								title: "nf - Maliwan",
			// 							},
			// 							element: <InvoicePage />
			// 						}
			// 					]
			// 				}
			// 			]
			// 		},
			// 		{
			// 			path: "consumption",
			// 			name: "account.consumption",
			// 			element: <ConsumptionHistory />,
			// 		},

			// 	],
			// },
			//#endregion

			// TODO: Remover Exemplo =====>
			// {
			// 	path: "MultipleRoles",
			// 	roles: [requireAll([USER_ROLES.ADMIN, USER_ROLES.CUSTOMER])],
			// 	element: <div>MultipleRoles</div>,
			// },
			// <===== TODO: Remover Exemplo
			{
				path: "AccessDenied",
				element: <AccessDenied />,
			},
		],
	},
];

export default function AppRoutes() {
	function mountRoute(
		{ path, element, name, roles, children, pageSettings },
		fatherRouteItems = [],
		fatherPageSettings = {}
	) {
		const settings = { ...fatherPageSettings, ...pageSettings };

		const routeItem = { path, name };
		const routeItems = name
			? [...fatherRouteItems, routeItem]
			: fatherRouteItems;

		const routePath = routeItems.map((x) => x.path).join("/");

		const hasRoles = roles && roles.length > 0;

		if (children) {
			return (
				<Route
					key={routePath}
					path={path}
					element={hasRoles && <RequiredAuth requiredRoles={roles} />}
				>
					{element && (
						<Route
							key={routePath + "/"}
							path=""
							element={
								<RouteElement
									element={element}
									routeItems={routeItems}
									pageSettings={settings}
								/>
							}
						/>
					)}
					{children.map((route) => mountRoute(route, routeItems, settings))}
					<Route key={routePath + "/*"} path="*" element={<NotFound />} />
				</Route>
			);
		}

		if (hasRoles) {
			return (
				<Route key={routePath} element={<RequiredAuth requiredRoles={roles} />}>
					<Route
						path={path}
						element={
							<RouteElement
								element={element}
								routeItems={routeItems}
								pageSettings={settings}
							/>
						}
					/>
				</Route>
			);
		}

		return (
			<Route
				key={routePath}
				path={path}
				element={
					<RouteElement
						element={element}
						routeItems={routeItems}
						pageSettings={settings}
					/>
				}
			/>
		);
	}

	return (
		<Routes>
			{PageRoutes.map((route) => mountRoute(route))}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
