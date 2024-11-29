import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { Row, Col, Form, ButtonGroup, Button } from "react-bootstrap";
import { FaSpinner, FaPlus, FaRegEdit } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import useValidators from "../../../utils/validators";

export default function AdminProductColorForm({
  onSubmit,
  data = {
    name: "",
    sku: "",
    bgColor: "#000000",
    textColor: "#FFFFFF",
  },
}) {
  const { t } = useTranslation("adminProductColor", { keyPrefix: "form" });
  const [submitting, setSubmitting] = useState(false);
  const { isHexColor } = useValidators();

  const handleSubmitThis = (values) => {
    setSubmitting(true);
    let data = { ...values };
    onSubmit(data).finally(() => setSubmitting(false));
  };

  const schema = yup.object().shape({
    name: yup.string().required().min(5).max(255),
    sku: yup.string().required().min(1).max(5),
    bgColor: yup
      .string()
      .required()
      .test("test-bgColor", t("errors.invalidColor"), (value, context) =>
        isHexColor(value)
      ),
    textColor: yup
      .string()
      .required()
      .test("test-textColor", t("errors.invalidColor"), (value, context) =>
        isHexColor(value)
      ),
  });

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={schema}
      onSubmit={handleSubmitThis}
      initialValues={data}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
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
            <Form.Group as={Col} className="mb-2">
              <Form.Label column md={3}>
                <span className="text-danger">*</span>
                {t("fieldSkuLabel")}
              </Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  name="sku"
                  maxLength={5}
                  value={values.sku}
                  onChange={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    handleChange(e);
                  }}
                  isValid={touched.name && !errors.name}
                  isInvalid={touched.name && errors.name}
                />
              </Col>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-2">
              <Form.Label column md={3}>
                <span className="text-danger">*</span>
                {t("fieldBbgColor")}
              </Form.Label>
              <Col>
                <Form.Control
                  type="color"
                  name="bgColor"
                  maxLength={5}
                  value={values.bgColor}
                  onChange={handleChange}
                  isValid={touched.name && !errors.name}
                  isInvalid={touched.name && errors.name}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Col} className="mb-2">
              <Form.Label column md={3}>
                <span className="text-danger">*</span>
                {t("fieldtextColor")}
              </Form.Label>
              <Col>
                <Form.Control
                  type="color"
                  name="textColor"
                  maxLength={5}
                  value={values.textColor}
                  onChange={handleChange}
                  isValid={touched.name && !errors.name}
                  isInvalid={touched.name && errors.name}
                />
              </Col>
            </Form.Group>
            <Col md={2} className="pt-4">
              <h5
                className="p-2 d-inline-block rounded"
                style={{
                  backgroundColor: values.bgColor,
                  color: values.textColor,
                }}
              >
                {t("labelColor")}
              </h5>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="d-grid gap-2">
              <ButtonGroup>
                <Link className="btn btn-secondary" to={"../"}>
                  <IoReturnUpBackOutline /> {t(`labelBtnGoBack`)}
                </Link>
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
  );
}
