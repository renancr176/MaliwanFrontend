import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAlert from "../../../hooks/alert";
import { Container } from "react-bootstrap";
import useProductService from "../../../services/productService";
import AdminProductForm from "./form";

export default function AdminAddProduct() {
  const { fireSuccess, fireRequestError } = useAlert();
  const { createProduct } = useProductService();
  const navigate = useNavigate();
  const { t } = useTranslation("adminProduct", { keyPrefix: "add" });

  const handleSubmit = (values) => {
    return createProduct(values)
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
      <AdminProductForm onSubmit={handleSubmit} />
    </Container>
  );
}
