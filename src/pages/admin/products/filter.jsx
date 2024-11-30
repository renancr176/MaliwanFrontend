import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { USER_ROLES } from "../../../utils/userRoles";
import { useAuth } from "../../../hooks/auth";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import { FaSpinner, FaFilter, FaPlus } from "react-icons/fa";
import ActiveFilterSelect from "../../../components/activeFilterSelect";
import FilterControlCleanable from "../../../components/filterControlCleanable";
import useBrandService from "../../../services/brandService";
import useCategoryService from "../../../services/categoryService";
import useSubcategoryService from "../../../services/subcategoryService";
import useGenderService from "../../../services/genderService";

export default function AdminProductFilters({ setFilter, isLoading }) {
  const { t } = useTranslation("adminProduct", { keyPrefix: "filter" });
  const { getAllBrands } = useBrandService();
  const { getAllCategories } = useCategoryService();
  const { getAllSubcategorys } = useSubcategoryService();
  const { getAllGenders } = useGenderService();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [genders, setGenders] = useState([]);

  const { hasRoles } = useAuth();
  const form = {
    idBrand: undefined,
    idCategory: undefined,
    idSubcategory: undefined,
    idGender: undefined,
    name: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    sku: undefined,
    active: undefined,
  };

  useEffect(() => {
    getAllBrands()
      .then(({ data }) => {
        setBrands(data);
      })
      .catch((error) => console.error(error));

    getAllCategories()
      .then(({ data }) => {
        setCategories(data);
      })
      .catch((error) => console.error(error));

    getAllGenders()
      .then(({ data }) => {
        setGenders(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const getAllSubcategorysByCategory = (idCategory) => {
    getAllSubcategorys(idCategory)
      .then(({ data }) => {
        setSubcategories(data);
      })
      .catch((error) => console.error(error));
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
            <Form.Group as={Col} className="mb-2">
              <Form.Label>{t("fieldLabelBrand")}</Form.Label>
              <Col>
                <Form.Select
                  name="idBrand"
                  value={values.idBrand}
                  onChange={handleChange}
                >
                  <option value={undefined}>{t("labelOptNoFilter")}</option>
                  {brands.map((item, index) => (
                    <option
                      key={item.id}
                      value={item.id}
                      selected={item.id == values.idBrand}
                    >
                      {item.sku} - {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Col} className="mb-2">
              <Form.Label>{t("fieldLabelCategory")}</Form.Label>
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
                        idCategory: e.target.value.length > 0 ? e.target.value : undefined,
                        idSubcategory: undefined,
                      });
                  }}
                >
                  <option value="">{t("labelOptNoFilter")}</option>
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
              <Form.Label>{t("fieldLabelSubcategory")}</Form.Label>
              <Col>
                <Form.Select
                  name="idSubcategory"
                  value={values.idSubcategory}
                  onChange={handleChange}
                >
                  <option value={undefined}>{t("labelOptNoFilter")}</option>
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
            <FilterControlCleanable
              label={t("fieldLabelName")}
              type="text"
              name="name"
              value={values.name}
              onChange={(e) => handleChange(e)}
              onClear={() => setValues({ ...values, name: undefined })}
            />
            <FilterControlCleanable
              label={t("fieldLabelSku")}
              type="text"
              name="sku"
              value={values.sku}
              onChange={(e) => handleChange(e)}
              onClear={() => setValues({ ...values, sku: undefined })}
            />
            <ActiveFilterSelect value={values.active} onChange={handleChange} />
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-2">
              <Form.Label>{t("fieldLabelGender")}</Form.Label>
              <Col>
                <Form.Select
                  name="idGender"
                  value={values.idGender}
                  onChange={handleChange}
                >
                  <option value={undefined}>{t("labelOptNoFilter")}</option>
                  {genders.map((item, index) => (
                    <option
                      key={item.id}
                      value={item.id}
                      selected={item.id == values.idGender}
                    >
                      {item.sku} - {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
            <FilterControlCleanable
              label={t("fieldLabelMinPrice")}
              type="number"
              name="minPrice"
              max={9998.99}
              step={0.01}
              value={values.minPrice}
              onChange={(e) => handleChange(e)}
              onClear={() => setValues({ ...values, minPrice: undefined })}
            />
            <FilterControlCleanable
              label={t("fieldLabelMaxPrice")}
              type="number"
              name="maxPrice"
              max={9999.99}
              step={0.01}
              value={values.maxPrice}
              onChange={(e) => handleChange(e)}
              onClear={() => setValues({ ...values, maxPrice: undefined })}
            />
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
                <Link to="add" className="btn btn-success ms-4">
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
  );
}
