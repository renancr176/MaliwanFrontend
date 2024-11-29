import React, { useState, useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import InputMask from "react-input-mask";
import { onlyNumbers } from "../../utils/helpers";

export default function InputDocumentMask({
  label,
  name,
  value,
  required,
  onChange,
  touched,
  errors,
}) {
  const cpfMask = "999.999.999-99";
  const cnpjMask = "99.999.999/9999-99";
  const [innerValue, setInnerValue] = useState(value);
  const [mask, setMask] = useState(cpfMask);
  

//   useEffect(() => {
//     if (onlyNumbers(innerValue).length > 11 && mask != cnpjMask) {
//       setMask(cnpjMask);
//     } else if (onlyNumbers(innerValue).length <= 11 && mask != cpfMask) {
//       setMask(cpfMask);
//     }
//   }, [innerValue]);

  const inneOnChange = (e) => {
    setInnerValue(e.target.value);
    if (onChange) onChange(e);
  };

  const beforeMaskedValueChange = (newState, oldState, userInput) => {
    let { value, selection } = newState;

    if (userInput != null && !onlyNumbers(value).endsWith(userInput)) {
      value = `${value}${userInput}`;
      selection = { start: selection.start + 1, end: selection.end + 1 };
    }

    if (onlyNumbers(value).length > 11 && mask != cnpjMask) {
      setMask(cnpjMask);
    } else if (onlyNumbers(value).length <= 11 && mask != cpfMask) {
      setMask(cpfMask);
    }

    return {
      value,
      selection,
    };
  };

  return (
    <Form.Group as={Col} className="mb-2">
      <Form.Label column md={3}>
        {required ? (<span className="text-danger">*</span> ) : null}
        {label}
      </Form.Label>
      <Col>
        <InputMask
          className={`form-control 
            ${touched?.document && !errors?.document ? "is-valid" : ""}
            ${touched?.document && errors?.document ? "is-invalid" : ""}`}
          mask={mask}
          placeholder={mask.replaceAll("9", "0")}
          value={innerValue}
          onChange={inneOnChange}
          type="tel"
          name={name}
          beforeMaskedValueChange={beforeMaskedValueChange}
        />
      </Col>
    </Form.Group>
  );
}
