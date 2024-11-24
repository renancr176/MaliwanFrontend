import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tippy";
import styles from "./item.module.css";
import SidebarSubItem from "./subItem";

export default function SidebarItem({
	icon,
	text,
	link,
	children,
	isSidebarOpenned,
	openSidebar,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const { t } = useTranslation("sidebar");

	const chevronIcon = isOpen ? <BsChevronDown /> : <BsChevronRight />;
	const hasChildren = children && children.length > 0;

	const handleClick = () => {
		if (hasChildren) {
			if (!isSidebarOpenned) {
				openSidebar();
			}
			setIsOpen((state) => !state);
		} else if (link) {
			navigate(link);
		}
	};

	useEffect(() => {
		if (!isSidebarOpenned && hasChildren) {
			setIsOpen(false);
		}
	}, [isSidebarOpenned, hasChildren]);

	return (
		<div className={styles.wrapper}>
			{isSidebarOpenned ? (
				<button className={styles.menuButton} onClick={handleClick}>
					<span>
						{icon} {t(text)}
					</span>
					{hasChildren && chevronIcon}
				</button>
			) : (
				<Tooltip title={t(text)} position="right">
					<button className={styles.menuButton} onClick={handleClick}>
						<span>{icon}</span>
						{hasChildren && chevronIcon}
					</button>
				</Tooltip>
			)}
			{isOpen && (
				<ul>
					{children.map((item, i) => (
						<SidebarSubItem key={`subItem-${i}`} {...item} />
					))}
				</ul>
			)}
		</div>
	);
}
