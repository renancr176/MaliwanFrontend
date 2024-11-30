import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as yup from "yup";
import { Row, Col, Form, ButtonGroup, Button } from "react-bootstrap";
import { FaSpinner, FaPlus, FaRegEdit } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import useBrandService from "../../../services/brandService";
import useCategoryService from "../../../services/categoryService";
import useSubcategoryService from "../../../services/subcategoryService";
import useGenderService from "../../../services/genderService";

export default function AdminProductForm({
  onSubmit,
  data = {
    idBrand: 0,
    idCategory: 0,
    idSubcategory: 0,
    idGender: 0,
    name: "",
    unitPrice: 0.0,
    sku: "",
    active: true,
  },
}) {
  const { t } = useTranslation("adminProduct", { keyPrefix: "form" });
  const { getAllBrands } = useBrandService();
  const { getAllCategories } = useCategoryService();
  const { getAllSubcategorys } = useSubcategoryService();
  const { getAllGenders } = useGenderService();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [genders, setGenders] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getAllBrands()
      .then(({ data }) => {
        setBrands(data.filter((x) => x.active));
      })
      .catch((error) => console.error(error));

    getAllCategories()
      .then(({ data }) => {
        setCategories(data.filter((x) => x.active));
      })
      .catch((error) => console.error(error));

    if (data.idCategory > 0)
      getAllSubcategorysByCategory(data.idCategory);

    getAllGenders()
      .then(({ data }) => {
        setGenders(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const getAllSubcategorysByCategory = (idCategory) => {
    getAllSubcategorys(idCategory)
      .then(({ data }) => {
        setSubcategories(data.filter((x) => x.active));
      })
      .catch((error) => console.error(error));
  };

  const handleSubmitThis = (values) => {
    setSubmitting(true);
    let data = { ...values };
    onSubmit(data).finally(() => setSubmitting(false));
  };

  const schema = yup.object().shape({
    idBrand: yup
      .number()
      .min(1)
      .test("text-idBrand", t("errors.idBrand"), (value, contex) =>
        brands.find((x) => x.id == value)
      ),
    idSubcategory: yup
      .number()
      .min(1)
      .test("text-idSubcategory", t("errors.idSubcategory"), (value, contex) =>
        subcategories.find((x) => x.id == value)
      ),
    idGender: yup
      .number()
      .min(1)
      .test("text-idGender", t("errors.idGender"), (value, contex) =>
        genders.find((x) => x.id == value)
      ),
    name: yup.string().required().min(5).max(255),
    unitPrice: yup.number().min(0.01),
    sku: yup.string().required().min(1).max(5),
    active: yup.boolean(),
  });

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={schema}
      onSubmit={handleSubmitThis}
      initialValues={data}
    >
      {({ handleSubmit, handleChange, values, touched, errors, setValues }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} className="mb-2">
              <Form.Label>
                <span className="text-danger">*</span>
                {t("fieldLabelBrand")}
              </Form.Label>
              <Col>
                <Form.Select
                  name="idBrand"
                  value={values.idBrand}
                  onChange={handleChange}
                  isValid={touched.idBrand && !errors.idBrand}
                  isInvalid={touched.idBrand && errors.idBrand}
                >
                  {values.idBrand == 0 ? (<option value=""></option>) : null}
                  {brands.map((item, index) => (
                    <option
                      key={item.id}
                      value={item.id}
                      selected={item.id == values.idBrand}
                    >
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Col} className="mb-2">
              <Form.Label>
                <span className="text-danger">*</span>
                {t("fieldLabelGender")}
              </Form.Label>
              <Col>
                <Form.Select
                  name="idGender"
                  value={values.idGender}
                  onChange={handleChange}
                  isValid={touched.idGender && !errors.idGender}
                  isInvalid={touched.idGender && errors.idGender}
                >
                  {values.idGender == 0 ? (<option value=""></option>) : null}
                  {genders.map((item, index) => (
                    <option
                      key={item.id}
                      value={item.id}
                      selected={item.id == values.idGender}
                    >
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-2">
              <Form.Label>
                <span className="text-danger">*</span>
                {t("fieldLabelCategory")}
              </Form.Label>
              <Col>
                <Form.Select
                  name="idCategory"
                  value={values.idCategory}
                  onChange={(e) => {
                    if (e.target.value && e.target.value.length > 0) {
                      getAllSubcategorysByCategory(e.target.value);
                    } else {
                      setSubcategories([]);
                    }
                    setValues({
                      ...values,
                      idCategory:
                        e.target.value.length > 0 ? e.target.value : undefined,
                      idSubcategory: undefined,
                    });
                  }}
                  isValid={touched.idCategory && !errors.idCategory}
                  isInvalid={touched.idCategory && errors.idCategory}
                >
                  {values.idCategory == 0 ? (<option value=""></option>) : null}
                  {categories.map((item, index) => (
                    <option
                      key={item.id}
                      value={item.id}
                      selected={item.id == values.idCategory}
                    >
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Col} className="mb-2">
              <Form.Label>
                <span className="text-danger">*</span>
                {t("fieldLabelSubcategory")}
              </Form.Label>
              <Col>
                <Form.Select
                  name="idSubcategory"
                  value={values.idSubcategory}
                  onChange={handleChange}
                  isValid={touched.idSubcategory && !errors.idSubcategory}
                  isInvalid={touched.idSubcategory && errors.idSubcategory}
                >
                  {values.idSubcategory == 0 ? (<option value=""></option>) : null}
                  {subcategories.map((item, index) => (
                    <option
                      key={item.id}
                      value={item.id}
                      selected={item.id == values.idSubcategory}
                    >
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-2">
              <Form.Label>
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
              <Form.Label>
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
                  isValid={touched.sku && !errors.sku}
                  isInvalid={touched.sku && errors.sku}
                />
              </Col>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-2">
              <Form.Label>
                <span className="text-danger">*</span>
                {t("fieldUnitPriceLabel")}
              </Form.Label>
              <Col>
                <Form.Control
                  type="number"
                  name="unitPrice"
                  min={0}
                  step={0.01}
                  value={values.unitPrice}
                  onChange={handleChange}
                  isValid={touched.unitPrice && !errors.unitPrice}
                  isInvalid={touched.unitPrice && errors.unitPrice}
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
                isValid={touched.active && !errors.active}
                isInvalid={touched.active && errors.active}
              />
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
