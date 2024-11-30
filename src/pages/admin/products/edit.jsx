import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAlert from "../../../hooks/alert";
import { Container } from "react-bootstrap";
import useProductService from "../../../services/productService";
import AdminBrandForm from "./form";
import Spinner from "../../../components/elements/spinner";

export default function AdminEditProduct() {
  const { id } = useParams();
  const { fireSuccess, fireRequestError, fireConfirm } = useAlert();
  const { getProductById, updateProduct } = useProductService();
  const navigate = useNavigate();
  const { t } = useTranslation("adminProduct", { keyPrefix: "edit" });
  const [data, setData] = useState();

  useEffect(() => {
		if (!id) return navigate("../");

		getProductById(id)
			.then(({ data }) => {
        data.idCategory = data.subcategory.idCategory;
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

    return updateProduct(values)
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
      <h3>{t("title")}</h3>
      {data ? (
        <AdminBrandForm onSubmit={handleSubmit} data={data} />
      ): (
        <div style={{ width: "100%", textAlign: "center" }}>
					<Spinner />
				</div>
      )}
    </Container>
  )
}
