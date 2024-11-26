import {
  FaHome,
  FaUsers,
  FaTransgenderAlt,
  FaShoppingCart,
  FaWarehouse,
} from "react-icons/fa";
import { FaHandHoldingDollar, FaRulerCombined } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { TbBrandFramerMotion, TbPackages } from "react-icons/tb";
import { IoColorPalette } from "react-icons/io5";
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
  // {
  // 	roles: [UR.CUSTOMER],
  // 	children: [
  // 		{
  // 			link: "/account/edit",
  // 			icon: <FaAngleDoubleRight />,
  // 			text: "account.editAccount",
  // 		},
  // 		{
  // 			link: "/account/orders",
  // 			icon: <FaAngleDoubleRight />,
  // 			text: "account.orders",
  // 		},
  // 		{
  // 			link: "/account/consumption",
  // 			icon: <FaAngleDoubleRight />,
  // 			text: "account.consumption",
  // 		},
  // 	],
  // },
  //#endregion
  //#region Admin Area
  {
    roles: [UR.ADMIN],
    children: [
      {
        link: "/admin",
        icon: <FaHome />,
        text: "admin.main",
      },
      {
        // roles: [UR.ADMIN],
        link: "/admin/brands",
        icon: <TbBrandFramerMotion />,
        text: "admin.brands",
      },
      {
        // roles: [UR.ADMIN],
        link: "/admin/categories",
        icon: <MdCategory />,
        text: "admin.categories",
      },
      {
        // roles: [UR.ADMIN],
        link: "/admin/customers",
        icon: <FaUsers />,
        text: "admin.customers",
      },
      {
        // roles: [UR.ADMIN],
        link: "/admin/genders",
        icon: <FaTransgenderAlt />,
        text: "admin.genders",
      },
      {
        // roles: [UR.ADMIN],
        link: "/admin/orders",
        icon: <FaShoppingCart />,
        text: "admin.orders",
      },
      {
        // roles: [UR.ADMIN],
        link: "/admin/payment-methods",
        icon: <FaHandHoldingDollar />,
        text: "admin.paymentMethods",
      },
      {
        // roles: [UR.ADMIN],
        link: "/admin/products",
        icon: <TbPackages />,
        text: "admin.products",
      },
      {
        // roles: [UR.ADMIN],
        link: "/admin/productColors",
        icon: <IoColorPalette />,
        text: "admin.productColors",
      },
      {
        // roles: [UR.ADMIN],
        link: "/admin/productSizes",
        icon: <FaRulerCombined />,
        text: "admin.productSizes",
      },
      {
        // roles: [UR.ADMIN],
        link: "/admin/stocks",
        icon: <FaWarehouse />,
        text: "admin.stocks",
      },
      // {
      // 	roles: [UR.ADMIN],
      // 	icon: <FaUsers />,
      // 	text: "admin.users.title",
      // 	children: [
      // 		{
      // 			link: "/admin/users",
      // 			text: "admin.users.admin",
      // 		},
      // 	],
      // },
    ],
  },
  //#endregion
];

export default Menu;
