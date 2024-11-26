import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAlert from "../../../hooks/alert";
import { Container } from "react-bootstrap";
import { getBrandById, updateBrand } from "../../../services/brandService";
import AdminBrandForm from "./form";
import Spinner from "../../../components/elements/spinner";

export default function AdminEditBrand() {
  const { id } = useParams();
  const { fireSuccess, fireRequestError } = useAlert();
  const navigate = useNavigate();
  const { t } = useTranslation("adminBrand", { keyPrefix: "edit" });
  const [data, setData] = useState();

  useEffect(() => {
		if (!id) return navigate("../");

		getBrandById(id)
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

  const handleSubmit = (values) => {
    return updateBrand(values)
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
