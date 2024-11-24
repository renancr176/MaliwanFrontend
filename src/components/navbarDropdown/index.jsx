import React, { useState } from "react";
import { NavDropdown } from "react-bootstrap";
import styles from "./index.module.css";

export default function CategoryDropdown({title, children}) {
    const [show, setShow] = useState(false);
    const showDropdown = (e) => { setShow(!show); }
    const hideDropdown = e => { setShow(false); }

    return (
        <>
            <NavDropdown
                className= {styles.navDropdownMenu}
                href="#link"
                title ={title}
                id="navbarScrollingDropdown"
                show={show}
                onMouseEnter={showDropdown}
                onMouseLeave={hideDropdown}
                onClick={() => {
                    hideDropdown(true);
                    showDropdown(true);
                }}>
                <NavDropdown.Item 
                className={styles.navDropdownTitle}>{title}</NavDropdown.Item>
                <NavDropdown.Divider className={styles.navDropdownDivider}/>
                { children }
            </NavDropdown>
        </>
    );

}