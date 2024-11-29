import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAlert from "../../../hooks/alert";
import { Container } from "react-bootstrap";
import useProductColorService from "../../../services/productColorService";
import AdminCustomerForm from "./form";

export default function AdminAddProductColor() {
  const { fireSuccess, fireRequestError } = useAlert();
  const { createProductColor } = useProductColorService();
  const navigate = useNavigate();
  const { t } = useTranslation("adminProductColor", { keyPrefix: "add" });

  const handleSubmit = (values) => {
    return createProductColor(values)
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
