import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { Row, Col, Form, ButtonGroup, Button } from "react-bootstrap";
import { FaSpinner, FaPlus, FaRegEdit } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import useValidators from "../../../utils/validators";
import InputDocumentMask from "../../../components/inputDocumentMask";

export default function AdminCustomerForm({
  onSubmit,
  data = {
    name: "",
    document: "",
  },
}) {
  const { t } = useTranslation("adminCustomer", { keyPrefix: "form" });
  const [submitting, setSubmitting] = useState(false);
  const { isCpf, isCnpj } = useValidators();

  const handleSubmitThis = (values) => {
    setSubmitting(true);
    let data = { ...values };
    onSubmit(data).finally(() => setSubmitting(false));
  };

  const schema = yup.object().shape({
    name: yup.string().required().min(5).max(255),
    document: yup
      .string()
      .required()
      .test(
        "test-document",
        t("errors.invalidDocument"),
        (value, context) => isCpf(value) || isCnpj(value)
      ),
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
            <InputDocumentMask
              label={t("fieldDocumentLabel")}
              name="document"
              required
              value={values.document}
              onChange={handleChange}
              touched={touched}
              errors={errors}
            />
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
