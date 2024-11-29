import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAlert from "../../../hooks/alert";
import { Container } from "react-bootstrap";
import usePaymentMethodService from "../../../services/paymentMethodService";
import AdminPaymentMethodForm from "./form";

export default function AdminAddPaymentMethod() {
  const { fireSuccess, fireRequestError } = useAlert();
  const { createPaymentMethod } = usePaymentMethodService();
  const navigate = useNavigate();
  const { t } = useTranslation("adminPaymentMethod", { keyPrefix: "add" });

  const handleSubmit = (values) => {
    return createPaymentMethod(values)
      .then(({ data }) => {
        fireSuccess(t("success")).then(() => {
          navigate(`../edit/${data.id}`);
        });
      })
      .catch((err) => {
        console.error(err);
        fireRequestError(err);
      });
  };

  return (
    <Container fluid>
      <h3>{t("title")}</h3>
      <AdminPaymentMethodForm onSubmit={handleSubmit} />
    </Container>
  );
}
