import React from "react";
import { useTranslation } from "react-i18next";
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
import { FaRegEdit, FaEye } from "react-icons/fa";
import { USER_ROLES } from "../../../utils/userRoles";
import { useAuth } from "../../../hooks/auth";
import useCategoryService from "../../../services/categoryService";
import AdminFilterCategory from "./filter";
import LinkTooltip from "../../../components/linkTooltip";

export default function AdminCategories() {
  const { t } = useTranslation("adminCategory", { keyPrefix: "index" });
  const { searchCategories } = useCategoryService();
  const { hasRoles } = useAuth();
  const {
    data: pageData,
    pageIndex,
    totalPages,
    nextPage,
    prevPage,
    setPage,
    isLoading,
    setFilter,
  } = usePagination(searchCategories);

  return (
    <Container fluid>
      <Row>
        <AdminFilterCategory setFilter={setFilter} isLoading={isLoading} />
      </Row>
      <hr />
      <Row>
        <Col>
          <Table responsive="sm" striped>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>#</th>
                <th>{t("table.header.name")}</th>
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
                          <LinkTooltip
                            placement="left"
                            title={t("labelBtnSubcategory")}
                            to={`${item.id}/subcategories`}
                            className="btn btn-primary"
                          >
                            <FaEye />
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
