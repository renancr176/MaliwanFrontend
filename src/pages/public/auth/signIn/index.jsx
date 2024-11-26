import { Formik } from "formik";
import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaSignInAlt, FaSpinner } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AuthContext } from "../../../../context/AuthContext";
import useAlert from "../../../../hooks/alert";
import { useCart } from "../../../../hooks/cart";
import { signInRequest } from "../../../../services/userService";
import { USER_ROLES, verifyRoles } from "../../../../utils/userRoles";
import styles from "./index.module.css";

export default function SignIn() {
  const [submiting, setSubmiting] = useState(false);

  const navigate = useNavigate();
  const { signIn, getUserAreaPath, signOut } = useContext(AuthContext);
  const cart = useCart();
  const { state } = useLocation();
  const { t } = useTranslation("signIn");
  const alert = useAlert();

  const form = {
    userName: "",
    password: "",
  };

  const handleSubmitThis = (values) => {
    setSubmiting(true);

    signInRequest(values)
      .then(({ data }) => {
        const user = signIn(
          data.user,
          data.accessToken,
          data.expiresInSeconds,
          data.refreshToken,
          data.refreshTokenExpiresInSeconds
        );
        setSubmiting(false);
        redirect(user);
      })
      .catch((error) => {
        setSubmiting(false);
        console.error(error);
        alert.fireRequestError(error);
      });
  };

  function redirect(user) {
    // const isCustomer = verifyRoles([USER_ROLES.CUSTOMER], user?.roles ?? "");
    // const hasValidCheckout = cart?.items?.length > 0 && cart?.isValid;
    // if (isCustomer && hasValidCheckout) {
    // 	alert.fireInfo(t("pendingCheckout"));
    // 	navigate("/checkout");
    // 	return;
    // }
    if (state && state.from) {
      navigate(state.from);
      return;
    }
    navigate(getUserAreaPath());
  }

  const schema = yup.object().shape({
    userName: yup.string().email().required(),
    password: yup.string().required().min(8),
  });

  return (
    <div className={`${styles.loginContainer} position-relative`}>
      <div className={`${styles.leftBar}`}>
        <div className={`${styles.ball}`}></div>
        <img src="/logo.png" alt="maliwan" />
      </div>

      <div className="position-absolute top-50 start-50 translate-middle">
        <h3 className={`${styles.title} mb-3`}>{t("title")}</h3>
        <Formik
          enableReinitialize={true}
          validationSchema={schema}
          onSubmit={handleSubmitThis}
          initialValues={form}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form
              className={`${styles.formContainer} mb-0`}
              onSubmit={handleSubmit}
            >
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>{t("labelEmail")}</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder={t("phEmail")}
                      name="userName"
                      value={values.userName}
                      onChange={handleChange}
                      autoFocus
                      isValid={touched.userName && !errors.userName}
                      isInvalid={touched.userName && errors.userName}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>{t("labelPassword")}</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder={t("phPassword")}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isValid={touched.password && !errors.password}
                      isInvalid={touched.password && errors.password}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {/* <Row className="mb-4">
								<Col>
									<Link
										to={`/auth/passwordreset`}
										className={`text-uppercase ${styles.link}`}
									>
										{t("passwordReset")}
									</Link>
								</Col>
							</Row> */}
              <Row>
                <Col>
                  <Button
                    type="submit"
                    variant="danger"
                    className="btn-mw-blue"
                  >
                    {t("labelBtnSubmit")}{" "}
                    {submiting ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <FaSignInAlt />
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
