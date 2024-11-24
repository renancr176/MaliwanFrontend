import styles from "./index.module.css";

function CardShadow({ children, className, ...rest }) {
    return ( 
        <div className={[styles.card, className].join(' ')} {...rest}>
                {children}
        </div>
     );
}

export default CardShadow;