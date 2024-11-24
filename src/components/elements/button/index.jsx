import styles from "./index.module.css";

function Button({ children, variant, className, ...rest }) {
    const variantStyle = styles.hasOwnProperty(variant) ? styles[variant] : null;
    return (
    <button className={[styles.button, variantStyle, className].join(" ")} {...rest}>
        {children}
    </button>
    );
}

export default Button;