import { createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useAlert from "../hooks/alert";
// import { getCatalog } from "../services/catalog";
// import { calculateCatalogPrice } from "../utils/catalog";
// import { getShippingRegionAndPriceByZipCode } from "../utils/shipping";

export const CartContext = createContext();

export function CartProvider({ children }) {
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingZipCode, setIsLoadingZipCode] = useState(false);
	const [alert, setAlert] = useState();
	const [items, setItems] = useState([]);
	const [subtotal, setSubtotal] = useState(0);
	const [total, setTotal] = useState(0);
	const [zipCode, setZipCode] = useState();
	const [shipping, setShipping] = useState(null);
	const [isValid, setIsValid] = useState(true);

	const { t } = useTranslation("cart");
	const { fireRequestError, fireError } = useAlert();

	useEffect(() => {
		const localStorageCart = getLocalStorageCart();
		// getCartCatalogs(localStorageCart)
		// 	.then((res) => {
		// 		setItems(res);
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 	})
		// 	.finally(() => {
		// 		setIsLoading(false);
		// 	});
	}, []);

	useEffect(() => {
		if (!isLoading) {
			saveLocalStorageCart(items);
			setSubtotal(items.reduce((sum, item) => sum + item.calculatedPrice, 0));
			const isValidItems = allItemsDDDsSelected(items);
			setIsValid(items.length > 0 && isValidItems);
		}
	}, [isLoading, items]);

	// useEffect(() => {
	// 	if (zipCode) {
	// 		setIsLoadingZipCode(true);
	// 		getShippingRegionAndPriceByZipCode(zipCode)
	// 			.then((res) => {
	// 				setShipping(res);
	// 				if (!res) {
	// 					fireError(t("error.notDeliverZipCode"));
	// 				}
	// 			})
	// 			.catch((err) => {
	// 				console.error(err);
	// 				fireRequestError(err);
	// 				setShipping(null);
	// 			})
	// 			.finally(() => setIsLoadingZipCode(false));
	// 	} else {
	// 		setShipping(null);
	// 	}
	// }, [zipCode]);

	useEffect(() => {
		const shippingPrice = shipping?.region?.product?.unitPrice || 0;
		const subtotalPrice = subtotal || 0;
		setTotal(shippingPrice + subtotalPrice);
	}, [subtotal, shipping]);

	function add(catalog, includeSms = false, quantity = 1) {
		const id = Date.now();
		const newCartItem = {
			id,
			catalogId: catalog.id,
			calculatedPrice: 0, //calculateCatalogPrice(catalog, includeSms, quantity),
			ddd: null,
			catalog,
			includeSms,
			quantity,
		};
		setItems((state) => [...state, newCartItem]);
		const alertMessage = `"${catalog.languages[0].name}" ${t(
			"alert.addCatalog"
		)}`;
		setAlert(alertMessage);
	}

	function remove({ id, catalog }) {
		setItems((state) => state.filter((item) => item.id !== id));
		const alertMessage = `"${catalog.languages[0].name}" ${t(
			"alert.removeCatalog"
		)}`;
		setAlert(alertMessage);
	}

	function clearAlert() {
		setAlert(null);
	}

	function setDDD(itemId, value) {
		const newItems = items.map((item) => {
			if (item.id === itemId) {
				return { ...item, ddd: value };
			}
			return item;
		});
		setItems(newItems);
	}

	function clearCart() {
		setItems([]);
	}

	return (
		<CartContext.Provider
			value={{
				alert,
				clearAlert,
				items,
				add,
				remove,
				subtotal,
				setDDD,
				zipCode,
				setZipCode,
				shipping,
				total,
				isLoadingZipCode,
				isValid,
				isLoading,
				clearCart
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

function getLocalStorageCart() {
	const cartJson = localStorage.getItem("cart");
	return cartJson ? JSON.parse(cartJson) : [];
}

function saveLocalStorageCart(items) {
	const localStorageCart = items.map(
		({ id, includeSms, quantity, catalogId, ddd }) => ({
			id,
			includeSms,
			quantity,
			catalogId,
			ddd,
		})
	);
	localStorage.setItem("cart", JSON.stringify(localStorageCart));
}

// async function getCartCatalogs(cart) {
// 	const catalogsRequest = await Promise.all(
// 		cart.map(async (item) => {
// 			try {
// 				const { data } = await getCatalog(item.catalogId, true);
// 				return data.active
// 					? {
// 							...item,
// 							catalog: data,
// 							calculatedPrice: calculateCatalogPrice(
// 								data,
// 								item.includeSms,
// 								item.quantity
// 							),
// 					  }
// 					: null;
// 			} catch (error) {
// 				console.error(error);
// 				return null;
// 			}
// 		})
// 	);
// 	return catalogsRequest.filter(Boolean);
// }

function allItemsDDDsSelected(items) {
	return items.every((item) =>
		item.catalog.requireMsisdn ? Boolean(item.ddd) : true
	);
}
