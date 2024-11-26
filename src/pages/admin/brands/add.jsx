import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAlert from "../../../hooks/alert";
import { Container } from "react-bootstrap";
import { createBrand } from "../../../services/brandService";
import AdminBrandForm from "./form";

export default function AdminAddBrand() {
  const { fireSuccess, fireRequestError } = useAlert();
  const navigate = useNavigate();
  const { t } = useTranslation("adminBrand", { keyPrefix: "add" });

  const handleSubmit = (values) => {
    return createBrand(values)
      .then(({ data }) => {
        fireSuccess(t("success"))
        .then(() => {
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
      <AdminBrandForm onSubmit={handleSubmit} />
    </Container>
  );
}
