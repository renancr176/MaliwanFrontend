import {
	FaAngleDoubleRight,
	FaBarcode,
	FaCoins,
	FaHome,
	FaRegAddressCard,
	FaRegListAlt,
	FaSearch,
	FaUsers,
	FaBook
} from "react-icons/fa";
import { USER_ROLES as UR } from "../../../utils/userRoles";
// You can use roles in all component levels.
// Icons can be used only in first level.
// You can pass a translation key on text parameter. The translation must be defined in file `locales/<lang>/sidebar.json`.
// Links will only work on items with no children.

const Menu = [
	/*{
      roles: [UR.CUSTOMER, UR.ADMIN, UR.SELLER],
      children: [
        {link: "/teste", icon: <FaAngleDoubleRight />, text: "Customer Admin Seller Menu", 
          children: [
            {link: "#", text: "All"},
            {link: "#", text: "All", children: [
              {link: "#", text: "Admin / Seller", roles: [UR.ADMIN, UR.SELLER]},
              {link: "#", text: "All"},
              {link: "#", text: "All"},
            ]},
            {link: "#", text: "All"},
            {link: "#", text: "Home 10", roles: [UR.ADMIN, UR.SELLER]},
          ],
        },
        {link: "#", icon: <FaAngleDoubleRight />, text: "myArea"},
        {link: "#", icon: <FaAngleDoubleRight />, text: "Action 2"},
      ]
    },
    {
      roles: [UR.ADMIN],
      children: [
        {link: "#", icon: <FaAngleDoubleRight />, text: "Admin 1"},
        {link: "#", icon: <FaAngleDoubleRight />, text: "Admin 2"},
        {link: "#", icon: <FaAngleDoubleRight />, text: "Admin 3"},
      ]
    },
    {
      roles: [requireAll(UR.CUSTOMER, UR.ADMIN)],
      children: [
        {link: "#", icon: <FaAngleDoubleRight />, text: "Customer / Admin 1"},
        {link: "#", icon: <FaAngleDoubleRight />, text: "Customer / Admin 2"},
        {link: "#", icon: <FaAngleDoubleRight />, text: "Customer / Admin 3"},
      ]
    },
    {
      children: [
        {link: "#", icon: <FaAngleDoubleRight />, text: "Customer", roles: [UR.CUSTOMER]},
        {link: "#", icon: <FaAngleDoubleRight />, text: "Seller", roles: [UR.SELLER]},
        {link: "#", icon: <FaAngleDoubleRight />, text: "Admin", roles: [UR.ADMIN]},
      ]
    }*/
	//#region Customer Area
	{
		roles: [UR.CUSTOMER],
		children: [
			{
				link: "/account/edit",
				icon: <FaAngleDoubleRight />,
				text: "account.editAccount",
			},
			{
				link: "/account/orders",
				icon: <FaAngleDoubleRight />,
				text: "account.orders",
			},
			{
				link: "/account/consumption",
				icon: <FaAngleDoubleRight />,
				text: "account.consumption",
			},
		],
	},
	//#endregion
	//#region Admin Area
	{
		roles: [UR.ADMIN, UR.SELLER],
		children: [
			{
				link: "/admin",
				icon: <FaHome />,
				text: "admin.main",
			},
			{
				link: "/admin/orders",
				icon: <FaRegListAlt />,
				text: "admin.orders",
			},
			{
				link: "/admin/products",
				icon: <FaBarcode />,
				text: "admin.products",
			},
			{
				link: "/admin/catalogs",
				icon: <FaBook />,
				text: "admin.catalogs",
			},
			{
				roles: [UR.ADMIN],
				link: "/admin/payments",
				icon: <FaCoins />,
				text: "admin.paymentMethods",
			},
			{
				link: "/admin/customers",
				icon: <FaRegAddressCard />,
				text: "admin.customers",
			},
			{
				roles: [UR.ADMIN],
				icon: <FaUsers />,
				text: "admin.users.title",
				children: [
					{
						link: "/admin/users",
						text: "admin.users.admin",
					},
				],
			},
			{
				icon: <FaSearch />,
				text: "admin.queries.title",
				children: [
					{
						link: "/admin/reports/invoices",
						text: "admin.queries.invoiceReport",
					},
				],
			},
		],
	},
	//#endregion
];

export default Menu;
