import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAlert from "../../../hooks/alert";
import { Container } from "react-bootstrap";
import useProductSizeService from "../../../services/productSizeService";
import AdminProductSizeForm from "./form";

export default function AdminAddProductSize() {
  const { fireSuccess, fireRequestError } = useAlert();
  const { createProductSize } = useProductSizeService();
  const navigate = useNavigate();
  const { t } = useTranslation("adminProductSize", { keyPrefix: "add" });

  const handleSubmit = (values) => {
    return createProductSize(values)
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
      <AdminProductSizeForm onSubmit={handleSubmit} />
    </Container>
  );
}
