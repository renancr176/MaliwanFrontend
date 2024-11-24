import styles from "./index.module.css";

function Alert({ children, className, style="default", ...rest }) {
    const classStyle = styles.hasOwnProperty(style) ? styles[style] : styles.default;

    return ( 
        <div className={[classStyle, className].join(' ')} {...rest}>
                {children}
        </div>
     );
}

export default Alert;