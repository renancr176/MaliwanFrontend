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
                        <img src="/imgs/logo192.png" alt="Maliwan" />
                    </Link>
                </div>
                <div className={styles.linksSections}>
                    <div className={styles.footerLeft}>
                        <div>
                            <h3>{t("section1.title")}</h3>
                            <ul>
                                {/* <li><Nav.Link href="https://www.maliwan.com/institucional">{t("section1.link1")}</Nav.Link></li> */}
                            </ul>
                        </div>

                        <div>
                            <h6 className={styles.mySpace}>{t("section2.title")}</h6>
                            <ul>
                                <li><Nav.Link href="https://www.maliwan.com/media/docs/maliwan%20-%20Contrato%20de%20prestação%20do%20serviço%20móvel%20pessoal.pdf">{t("section2.link1")}</Nav.Link></li>
                                <li><Nav.Link href="https://www.maliwan.com/media/docs/Lista%20de%20Munic%C3%ADpios%20por%20Estado%20Atendidos%20por%20SMP%20pela%20maliwan.pdf">{t("section2.link2")}</Nav.Link></li>
                                <li><Nav.Link as={HashLink} to="/privacyPolicy/#privacyPolicy">{t("section2.link4")}</Nav.Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.footerRight}>
                        <div>
                            <h3>{t("section3.title")}</h3>
                            <ul>
                                <li><Nav.Link href="https://www.maliwan.com/internet/internet-dedicada">{t("section3.link1")}</Nav.Link></li>
                                <li><Nav.Link href="https://www.maliwan.com/internet/banda-larga">{t("section3.link2")}</Nav.Link></li>
                                <li><Nav.Link href="https://www.maliwan.com/internet/wi-fi">{t("section3.link3")}</Nav.Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3>{t("section4.title")}</h3>
                            <ul>
                                <li><Nav.Link href="https://www.maliwan.com/pabx-ip">{t("section4.link1")}</Nav.Link></li>
                                <li><Nav.Link href="https://www.maliwan.com/telefonia/e1">{t("section4.link2")}</Nav.Link></li>
                                <li><Nav.Link href="https://www.maliwan.com/telefonia/sip-trunk">{t("section4.link3")}</Nav.Link></li>
                                <li><Nav.Link href="https://conteudo.maliwan.com/lp0800-40xx">{t("section4.link4")}</Nav.Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3>{t("section5.title")}</h3>
                            <ul>
                                <li><Nav.Link href="https://www.maliwan.com/rede-e-infraestrutura/callnet-ponto-a-ponto">{t("section5.link1")}</Nav.Link></li>
                                <li><Nav.Link href="https://www.maliwan.com/rede-e-infraestrutura/mpls">{t("section5.link2")}</Nav.Link></li>
                                <li><Nav.Link href="https://www.maliwan.com/rede-e-infraestrutura/fibra-apagada-e-dutos">{t("section5.link3")}</Nav.Link></li>
                                <li><Nav.Link href="https://www.maliwan.com/rede-e-infraestrutura/co-location">{t("section5.link4")}</Nav.Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3>{t("section6.title")}</h3>
                            <ul>
                                <li><Nav.Link href="https://www.maliwan.com/servicos-para-eventos">{t("section6.link1")}</Nav.Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3>{t("section7.title")}</h3>
                            <ul>
                                <li><Nav.Link as={HashLink} to="/#offers" scroll={el => scrollWithOffset(el)}>{t("section7.link2")}</Nav.Link></li>
                                <li><Nav.Link href="https://www.maliwan.com/mobilidade/mvna-e">{t("section7.link1")}</Nav.Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.socialMedias}>
                    <p>{t("socialMedias")}</p>
                    <a target="_blank" rel="noreferrer" href="https://www.facebook.com/maliwanBr"><BsFacebook /></a>
                    <a target="_blank" rel="noreferrer" href="https://www.instagram.com/maliwanbr/"><BsInstagram /></a>
                    <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/maliwan/"><BsLinkedin /></a>
                </div>
            </div>
            <FooterBottom/>
        </footer>
    );
}
export default Footer;