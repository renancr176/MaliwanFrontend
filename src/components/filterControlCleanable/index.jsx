import React, { useState, useEffect } from "react";
import { Form, Col, InputGroup } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

export default function FilterControlCleanable({
  label,
  type,
  name,
  value,
  min,
  max,
  step,
  onChange,
  onClear
}) {
  const [innerValue, setInnerValue] = useState('');

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const innerOnChange = (e) => {
    setInnerValue(e.target.value);
    if (onChange) onChange(e);
  };

  const clear = () => {
    setInnerValue('');
    if (onClear) onClear();
  };

  return (
    <Form.Group as={Col} className="mb-2">
      <Form.Label>
        {label}
      </Form.Label>
      <Col>
        <InputGroup className="mb-3">
          <Form.Control
            type={type}
            name={name}
            value={innerValue}
            min={min}
            max={max}
            step={step}
            onChange={innerOnChange}
          />
          <InputGroup.Text
            className={
              (`${innerValue ?? ""}`?.length ?? 0) > 0
                ? "text-primary"
                : "text-secondary"
            }
            role={(`${innerValue ?? ""}`?.length ?? 0) > 0 ? "button" : ""}
            onClick={clear}
          >
            <FaTimes />
          </InputGroup.Text>
        </InputGroup>
      </Col>
    </Form.Group>
  );
}
