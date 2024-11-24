// import { Container } from "react-bootstrap";
// import { Link } from "react-router-dom";
import styles from './bottom.module.css';
import { useTranslation } from "react-i18next";

function FooterBottom() {
    const { t } = useTranslation('footer');
    
    return (
        <div className={styles.footerBottom}>
            <div className={styles.copyright}>{t("copyright")}</div>
        </div>
    );
}

export default FooterBottom;