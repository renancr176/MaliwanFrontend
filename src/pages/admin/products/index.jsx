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
import { FaRegEdit } from "react-icons/fa";
import { USER_ROLES } from "../../../utils/userRoles";
import { useAuth } from "../../../hooks/auth";
import useProductService from "../../../services/productService";
import AdminProductFilters from "./filter";
import LinkTooltip from "../../../components/linkTooltip";
import { formatCurrency } from "../../../utils/helpers";

export default function AdminProducts() {
  const { t } = useTranslation("adminProduct", { keyPrefix: "index" });
  const { searchProducts } = useProductService();
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
  } = usePagination(searchProducts);

  return (
    <Container fluid>
      <Row>
        <AdminProductFilters setFilter={setFilter} isLoading={isLoading} />
      </Row>
      <hr />
      <Row>
        <Col>
          <Table responsive="sm" striped>
            <thead>
              <tr>
                <th>{t("table.header.name")}</th>
                <th style={{ width: "10%" }}>{t("table.header.sku")}</th>
                <th>{t("table.header.brand")}</th>
                <th>{t("table.header.category")}</th>
                <th>{t("table.header.subcategory")}</th>
                <th>{t("table.header.gender")}</th>
                <th>{t("table.header.unitPrice")}</th>
                <th>{t("table.header.quantity")}</th>
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
                    <td>{item.name}</td>
                    <td>{item.sku}</td>
                    <td>{item.brand.name}</td>
                    <td>{item.subcategory.category.name}</td>
                    <td>{item.subcategory.name}</td>
                    <td>{item.gender.name}</td>
                    <td>{formatCurrency(item.unitPrice)}</td>
                    <td>{item.quantity}</td>
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
