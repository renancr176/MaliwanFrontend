import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAlert from "../../../hooks/alert";
import { Container } from "react-bootstrap";
import useCustomerService from "../../../services/customerService";
import AdminCustomerForm from "./form";

export default function AdminAddCustomer() {
  const { fireSuccess, fireRequestError } = useAlert();
  const { createCustomer } = useCustomerService();
  const navigate = useNavigate();
  const { t } = useTranslation("adminCustomer", { keyPrefix: "add" });

  const handleSubmit = (values) => {
    return createCustomer(values)
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
      <AdminCustomerForm onSubmit={handleSubmit} />
    </Container>
  );
}
