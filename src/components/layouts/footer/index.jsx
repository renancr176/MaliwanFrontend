import { Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { scrollWithOffset } from "../../../utils/helpers";
import FooterBottom from "../footer/bottom";
import styles from './index.module.css';


function Footer() {
    const { t } = useTranslation('footer');

    return (
        <footer>
            <div className={styles.wrapper}>
                <div>
                    <Link to="/" className={styles.logoLink}>
                        <img src="/logo.png" alt="maliwan" />
                    </Link>
                </div>
                <div className={styles.linksSections}>
                    <div className={styles.footerLeft}>
                        <div>
                            <h3>{t("section1.title")}</h3>
                            <ul>
                                <li><Nav.Link as={HashLink} to="#">{t("section1.link1")}</Nav.Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className={styles.mySpace}>{t("section2.title")}</h3>
                            <ul>
                                <li><Nav.Link as={HashLink} to="#">{t("section2.link1")}</Nav.Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.footerRight}>
                        <div>
                            <h3>{t("section3.title")}</h3>
                            <ul>
                                <li><Nav.Link as={HashLink} to="#">{t("section3.link1")}</Nav.Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3>{t("section4.title")}</h3>
                            <ul>
                                <li><Nav.Link as={HashLink} to="#">{t("section4.link1")}</Nav.Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3>{t("section5.title")}</h3>
                            <ul>
                                <li><Nav.Link as={HashLink} to="#">{t("section5.link1")}</Nav.Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3>{t("section6.title")}</h3>
                            <ul>
                                <li><Nav.Link as={HashLink} to="#">{t("section6.link1")}</Nav.Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3>{t("section7.title")}</h3>
                            <ul>
                                <li><Nav.Link as={HashLink} to="#">{t("section7.link1")}</Nav.Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.socialMedias}>
                    <p>{t("socialMedias")}</p>
                    <a target="_blank" rel="noreferrer" href="#"><BsFacebook /></a>
                    <a target="_blank" rel="noreferrer" href="#"><BsInstagram /></a>
                    <a target="_blank" rel="noreferrer" href="#"><BsLinkedin /></a>
                </div>
            </div>
            <FooterBottom/>
        </footer>
    );
}
export default Footer;