import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAlert from "../../../hooks/alert";
import { Container } from "react-bootstrap";
import useProductColorService from "../../../services/productColorService";
import AdminBrandForm from "./form";
import Spinner from "../../../components/elements/spinner";

export default function AdminEditProductColor() {
  const { id } = useParams();
  const { fireSuccess, fireRequestError, fireConfirm } = useAlert();
  const { getProductColorById, updateProductColor } = useProductColorService();
  const navigate = useNavigate();
  const { t } = useTranslation("adminProductColor", { keyPrefix: "edit" });
  const [data, setData] = useState();

  useEffect(() => {
		if (!id) return navigate("../");

		getProductColorById(id)
			.then(({ data }) => {
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

    return updateProductColor(values)
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
