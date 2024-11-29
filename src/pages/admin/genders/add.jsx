import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAlert from "../../../hooks/alert";
import { Container } from "react-bootstrap";
import useGenderService from "../../../services/genderService";
import AdminGenderForm from "./form";

export default function AdminAddGender() {
  const { fireSuccess, fireRequestError } = useAlert();
  const { createGender } = useGenderService();
  const navigate = useNavigate();
  const { t } = useTranslation("adminGender", { keyPrefix: "add" });

  const handleSubmit = (values) => {
    return createGender(values)
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
      <AdminGenderForm onSubmit={handleSubmit} />
    </Container>
  );
}
