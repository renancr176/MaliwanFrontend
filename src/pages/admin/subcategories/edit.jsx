import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAlert from "../../../hooks/alert";
import { Container, Row, Col } from "react-bootstrap";
import useCategoryService from "../../../services/categoryService";
import useSubcategoryService from "../../../services/subcategoryService";
import AdminSubcategoryForm from "./form";
import Spinner from "../../../components/elements/spinner";

export default function AdminEditSubcategory() {
  const { idCategory, id } = useParams();
  const { fireSuccess, fireRequestError, fireConfirm } = useAlert();
  const { getCategoryById } = useCategoryService();
  const { getSubcategoryById, updateSubcategory } = useSubcategoryService();
  const navigate = useNavigate();
  const { t } = useTranslation("adminSubCategory", { keyPrefix: "edit" });
  const [category, setCategory] = useState();
  const [data, setData] = useState();

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

  useEffect(() => {
		if (!id) return navigate("../");

		getSubcategoryById(id)
			.then(({ data }) => {
        if (data.idCategory != idCategory)
          navigate("../");
        setData(data);
			})
			.catch((err) => {
				console.error(err);
				fireRequestError(err)
        .then(() => {
          navigate("../");
        });
			});
	}, [id]);

  const handleSubmit = async (values) => {
    if (!await fireConfirm(t('confirm')))
      return;

    return updateSubcategory(values)
      .then(({ data }) => {
        fireSuccess(t("success"));
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
      {data ? (
        <AdminSubcategoryForm onSubmit={handleSubmit} data={data} />
      ): (
        <div style={{ width: "100%", textAlign: "center" }}>
					<Spinner />
				</div>
      )}
    </Container>
  )
}
