import React from "react";
import { useTranslation } from "react-i18next";
import { Form, Col } from "react-bootstrap";

export default function ActiveFilterSelect({
  name = "active",
  value,
  onChange,
}) {
  const { t } = useTranslation("activeFilterSelect");

  const values = [undefined, true, false];

  return (
    <Form.Group as={Col} className="mb-2">
      <Form.Label>
        {t("label")}
      </Form.Label>
      <Col>
        <Form.Select name={name} value={value} onChange={onChange}>
          {values.map((val, index) => (
            <option key={index} value={val} selected={val == value}>
              {t(`values.${val}`)}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Form.Group>
  );
}
