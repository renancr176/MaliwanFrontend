import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAlert from "../../../hooks/alert";
import { Container } from "react-bootstrap";
import useCategoryService from "../../../services/categoryService";
import AdminCategoryForm from "./form";

export default function AdminAddCategory() {
  const { fireSuccess, fireRequestError } = useAlert();
  const { createCategory } = useCategoryService();
  const navigate = useNavigate();
  const { t } = useTranslation("adminCategory", { keyPrefix: "add" });

  const handleSubmit = (values) => {
    return createCategory(values)
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
      <AdminCategoryForm onSubmit={handleSubmit} />
    </Container>
  );
}
