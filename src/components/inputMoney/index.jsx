import React, { useState } from "react";
import { Col, Form, InputGroup } from "react-bootstrap";
import InputMask from "react-input-mask";
import { onlyNumbers } from "../../utils/helpers";
import { useTranslation } from "react-i18next";

export default function InputMoney({
  label,
  name,
  value = 0.00,
  required,
  onChange,
  isValid,
  isInvalid,
}) {
  const formatValue = (value) => {
    if (value.length > 3)
      value = parseInt(value).toString();
    value = value.padStart(onlyNumbers(defaultMask).length, '0').split('');
    value.splice((value.length - 2), 0, i18n.language.startsWith("pt") ? ',' : '.');
    value = value.join('');
    return value;
  }

  const { i18n } = useTranslation();
  const [innerValue, setInnerValue] = useState(`${parseFloat(value).toFixed(2)}`);
  const defaultMask = i18n.language.startsWith("pt") ? "9,99" : "9.99";
  const [mask, setMask] = useState(`${parseFloat(value).toFixed(2)}`.length <= defaultMask.length ? defaultMask : formatValue(''.padStart(onlyNumbers(`${parseFloat(value).toFixed(2)}`).length, '9')));

  const innerOnChange = (e) => {
    setInnerValue(e.target.value);
    if (onChange) {
      e.target.value = parseFloat(e.target.value.replace(',', '.'));
      onChange(e)
    };
  };

  const beforeMaskedValueChange = (newState, oldState, userInput) => {
    let { value, selection } = newState;

    if (newState.value != oldState.value.replace(i18n.language.startsWith("pt") ? '.' : ',', i18n.language.startsWith("pt") ? ',' : '.') || userInput != null) {
      let newMask = `${mask}`;
      const newValue = formatValue(`${(userInput != null ? onlyNumbers(oldState.value) : onlyNumbers(oldState.value).substring(0, (onlyNumbers(oldState.value).length - 1)))}${(userInput != null ? userInput : '')}`);

      if (userInput != null && onlyNumbers(newValue).length > onlyNumbers(newMask).length) { //Added
          newMask = `9${newMask}`;
          setMask(newMask);
      } else if (userInput == null 
        && newValue != oldState.value.replace(i18n.language.startsWith("pt") ? '.' : ',', i18n.language.startsWith("pt") ? ',' : '.')
        && onlyNumbers(newValue).length < onlyNumbers(newMask).length
      ) { //Removes
        newMask = newMask.substring(1, newMask.length);
        setMask(newMask);
      }
      
      selection = {
        start: newMask.length,
        end: newMask.length,
      };

      return {
        value: newValue,
        selection,
      };
    }

    return {
      value, 
      selection
    }
  };

  return (
    <Form.Group as={Col} className="mb-2">
      <Form.Label column md={3}>
        {required ? <span className="text-danger">*</span> : null}
        {label}
      </Form.Label>
      <Col>
        <InputGroup>
          <InputGroup.Text className={`${isValid ? "border-success" : ""}
              ${isInvalid ? "border-danger" : ""}`}>R$</InputGroup.Text>
          <InputMask
            className={`form-control 
              ${isValid ? "is-valid" : ""}
              ${isInvalid ? "is-invalid" : ""}`}
            mask={mask}
            alwaysShowMask={true}
            value={innerValue}
            onChange={(e) => innerOnChange(e)}
            type="tel"
            name={name}
            beforeMaskedValueChange={beforeMaskedValueChange}
          />
        </InputGroup>
      </Col>
    </Form.Group>
  );
}
