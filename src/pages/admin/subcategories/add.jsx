import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAlert from "../../../hooks/alert";
import { Container, Row, Col } from "react-bootstrap";
import useCategoryService from "../../../services/categoryService";
import useSubcategoryService from "../../../services/subcategoryService";
import AdminSubcategoryForm from "./form";

export default function AdminAddSubcategory() {
  const { idCategory } = useParams();
  const { fireSuccess, fireRequestError } = useAlert();
  const { getCategoryById } = useCategoryService();
  const { createSubcategory } = useSubcategoryService();
  const navigate = useNavigate();
  const { t } = useTranslation("adminSubCategory", { keyPrefix: "add" });
  const [category, setCategory] = useState();

  useEffect(() => {
    if (!idCategory) return navigate("../");

    getCategoryById(idCategory)
      .then(({ data }) => {
        setCategory(data);
      })
      .catch((err) => {
        console.error(err);
        fireRequestError(err).then(() => {
          navigate("../");
        });
      });
  }, [idCategory]);

  const handleSubmit = (values) => {
    values.idCategory = idCategory;
    return createSubcategory(values)
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
      <Row>
        <Col>
          <h1 className="text-center">{category?.name}</h1>
        </Col>
      </Row>
      <hr/>
      <AdminSubcategoryForm onSubmit={handleSubmit} />
    </Container>
  )
}
