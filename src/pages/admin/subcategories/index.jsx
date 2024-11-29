import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAlert from "../../../hooks/alert";
import Spinner from "../../../components/elements/spinner";
import PaginationMenu from "../../../components/paginationMenu";
import usePagination from "../../../hooks/pagination";
import {
  Container,
  Table,
  Col,
  Row,
  Badge,
  ButtonGroup,
} from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { USER_ROLES } from "../../../utils/userRoles";
import { useAuth } from "../../../hooks/auth";
import AdminFilterSubcategory from "./filter";
import LinkTooltip from "../../../components/linkTooltip";
import useCategoryService from "../../../services/categoryService";
import useSubcategoryService from "../../../services/subcategoryService";
import { IoReturnUpBackOutline } from "react-icons/io5";

export default function AdminSubcategories() {
  const { idCategory } = useParams();
  const { getCategoryById } = useCategoryService();
  const { searchSubcategorys } = useSubcategoryService();
  const { fireRequestError } = useAlert();
  const navigate = useNavigate();
  const { t } = useTranslation("adminSubCategory", { keyPrefix: "index" });
  const { hasRoles } = useAuth();
  const [category, setCategory] = useState();
  const {
    data: pageData,
    pageIndex,
    totalPages,
    nextPage,
    prevPage,
    setPage,
    isLoading,
    setFilter,
  } = usePagination(searchSubcategorys, process.env.REACT_APP_PAGE_SIZE, {
    idCategory,
  });

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

  return (
    <Container fluid>
      <Row>
        <Col className="text-center">
          <Link to={"../"} className="d-inline-block link-secondary link-underline-opacity-0">
            <h1><Badge bg="secondary"><IoReturnUpBackOutline /></Badge> {t("labelCategory")}: {category?.name}</h1>
          </Link>
        </Col>
      </Row>
      <hr/>
      <Row>
        <AdminFilterSubcategory setFilter={setFilter} isLoading={isLoading} />
      </Row>
      <hr />
      <Row>
        <Col>
          <Table responsive="sm" striped>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>#</th>
                <th>{t("table.header.name")}</th>
                <th style={{ width: "10%" }}>{t("table.header.sku")}</th>
                <th style={{ width: "10%" }}>{t("table.header.active")}</th>
                <th style={{ width: "10%" }}>{t("table.header.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Spinner />
              ) : (
                pageData?.map((item) => (
                  <tr key={item.id}>
                    <td className="fw-bold">{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.sku}</td>
                    <td>
                      <Badge bg={item.active ? "success" : "danger"}>
                        {t(`table.body.active.${item.active}`)}
                      </Badge>
                    </td>
                    <td>
                      {hasRoles([USER_ROLES.ADMIN]) && (
                        <ButtonGroup>
                          <LinkTooltip
                            variant="warning"
                            placement="left"
                            title={t("labelBtnEdit")}
                            to={`edit/${item.id}`}
                            className="btn btn-warning"
                          >
                            <FaRegEdit />
                          </LinkTooltip>
                        </ButtonGroup>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <PaginationMenu
            nPagesToShow={5}
            {...{ pageIndex, totalPages, nextPage, prevPage, setPage }}
          />
        </Col>
      </Row>
    </Container>
  );
}
