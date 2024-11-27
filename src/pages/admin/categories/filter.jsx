import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { USER_ROLES } from "../../../utils/userRoles";
import { useAuth } from "../../../hooks/auth";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { FaSpinner, FaFilter, FaPlus } from "react-icons/fa";
import ActiveFilterSelect from "../../../components/activeFilterSelect";
import FilterControlCleanable from "../../../components/filterControlCleanable";

export default function AdminFilterCategory({ setFilter, isLoading }) {
  const { t } = useTranslation("adminCategory", { keyPrefix: "filter" });

  const { hasRoles } = useAuth();
  const form = {
    name: undefined,
    active: undefined,
  };
  const handleSubmitThis = (values) => {
    console.log(values);
    setFilter({
      ...values,
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      onSubmit={handleSubmitThis}
      initialValues={form}
    >
      {({ handleSubmit, handleChange, values, setValues }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <FilterControlCleanable
              label={t("fieldLabelName")}
              type="text"
              name="name"
              value={values.name}
              onChange={(e) => handleChange(e)}
              onClear={() => setValues({...values, name: undefined})}
            />
            <ActiveFilterSelect value={values.active} onChange={handleChange} />
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button type="submit" variant="primary">
                {isLoading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaFilter />
                )}
                {"  "}
                {t("submitLabel")}
              </Button>
              {hasRoles([USER_ROLES.ADMIN]) ? (
                <Link
                  to="add"
                  className="btn btn-success ms-3"
                >
                  <FaPlus />
                  {"  "}
                  {t("labelBtnAdd")}
                </Link>
              ) : null}
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}
