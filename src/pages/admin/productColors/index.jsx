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
import useProductColorService from "../../../services/productColorService";
import AdminBrandFilters from "./filter";
import LinkTooltip from "../../../components/linkTooltip";

export default function AdminProductColors() {
  const { t } = useTranslation("adminProductColor", { keyPrefix: "index" });
  const { searchProductColors } = useProductColorService();
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
  } = usePagination(searchProductColors);

  return (
    <Container fluid>
      <Row>
        <AdminBrandFilters setFilter={setFilter} isLoading={isLoading} />
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
                    <td>
                      <h5
                        className="p-2 d-inline-block rounded"
                        style={{
                          backgroundColor: item.bgColor,
                          color: item.textColor,
                        }}
                      >
                        {item.name}
                      </h5>
                    </td>
                    <td>{item.sku}</td>
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
