import styles from "./index.module.css";

function ButtonIcon( { children, className, ...rest } ) {
    return (
        <button className={[styles.btnIcon, className].join(' ')} {...rest}>
            {children}
        </button>
 );
}

export default ButtonIcon;

