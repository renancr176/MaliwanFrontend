import React from "react";
import { useNavigate } from "react-router-dom";
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
  Button,
} from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { USER_ROLES } from "../../../utils/userRoles";
import { useAuth } from "../../../hooks/auth";
import { searchCategories } from "../../../services/categoryService";
import AdminFilterCategory from "./filter";

export default function AdminCategories() {
  const navigate = useNavigate();
  const { t } = useTranslation("adminCategory", { keyPrefix: "index" });
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

  const goToEdit = (id) => {
    navigate(`edit/${id}`);
  };

  return (
    <Container fluid>
      <Row>
        <AdminFilterCategory setFilter={setFilter} isLoading={isLoading}/>
      </Row>
      <hr/>
      <Row>
        <Col>
          <Table responsive="sm" striped>
            <thead>
              <tr>
                <th style={{ width: "10%" }}>#</th>
                <th>{t("table.header.name")}</th>
                <th style={{ width: "10%" }}>{t("table.header.active")}</th>
                <th style={{ width: "10%" }}>{t("table.header.edit")}</th>
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
                          <Button
                            onClick={() => goToEdit(item.id)}
                            variant="warning"
                            title={t("labelBtnEdit")}
                          >
                            <FaRegEdit />
                          </Button>
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
  )
}
