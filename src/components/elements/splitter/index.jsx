import styles from "./index.module.css";

function Splitter( { className, ...rest } ) {
    return <div className={[styles.splitter, className].join(" ")} {...rest}/>;
}

export default Splitter;