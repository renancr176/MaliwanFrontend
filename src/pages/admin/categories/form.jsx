import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { Row, Col, Form, ButtonGroup, Button } from "react-bootstrap";
import { FaSpinner, FaPlus, FaRegEdit } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";

export default function AdminCategoryForm({
  onSubmit,
  data = {
    name: "",
    active: true,
  },
}) {
  const navigate = useNavigate();
  const { t } = useTranslation("adminCategory", { keyPrefix: "form" });
  const [submitting, setSubmitting] = useState(false);

  const goBack = () => {
    navigate("../");
  }

  const handleSubmitThis = (values) => {
    setSubmitting(true);
    let data = { ...values };
    onSubmit(data).finally(() => setSubmitting(false));
  };

  const schema = yup.object().shape({
    name: yup.string().required().min(5).max(255),
    active: yup.boolean(),
  });

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={schema}
      onSubmit={handleSubmitThis}
      initialValues={data}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
        setFieldValue,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} className="mb-2">
              <Form.Label column md={3}>
                <span className="text-danger">*</span>
                {t("fieldNameLabel")}
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  name="name"
                  maxLength={255}
                  value={values.name}
                  onChange={handleChange}
                  isValid={touched.name && !errors.name}
                  isInvalid={touched.name && errors.name}
                />
              </Col>
            </Form.Group>
            <Col className="mt-5">
              <Form.Check
                type="switch"
                id="custom-switch"
                label={t("fieldActiveLabel")}
                name="active"
                checked={values.active}
                onChange={handleChange}
                isValid={touched.name && !errors.name}
                isInvalid={touched.name && errors.name}
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="d-grid gap-2">
              <ButtonGroup>
                <Button 
                  type="button"
                  variant="secondary"
                  onClick={goBack}>
                  <IoReturnUpBackOutline />
                  {" "}{t(`labelBtnGoBack`)}
                </Button> 
                <Button
                  type="submit"
                  variant={!data?.id ? "success" : "warning"}
                >
                  {submitting ? (
                    <FaSpinner className="animate-spin" />
                  ) : !data?.id ? (
                    <FaPlus />
                  ) : (
                    <FaRegEdit />
                  )}{" "}
                  {t(`labelBtnSubmit.${!data?.id ? "add" : "edit"}`)}
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  )
}
