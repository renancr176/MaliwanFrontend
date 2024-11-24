import { useState } from 'react';
import styles from './subItem.module.css';
import { BsChevronDown, BsChevronRight, BsDashLg } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function SidebarSubItem({ link, text, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const { t } = useTranslation("sidebar")

    const chevronIcon = isOpen ? <BsChevronDown /> : <BsChevronRight />;
    const hasChildren = children && children.length > 0;

    const handleClick = () => {
        if (children && children.length > 0) {
            setIsOpen(!isOpen);
        } else {
            navigate(link);
        }
    }
    return (
        <li className={styles.wrapper}>
            <button onClick={handleClick}>
                <span>{t(text)}</span>
                { hasChildren && chevronIcon }
            </button>
            { isOpen && (
                <ul>
                    {children.map((item, i) => (
                        <SidebarSubItem key={`subItem-${i}`} {...item}/>
                    ))}
                </ul>
            )}
        </li>
    )
}
