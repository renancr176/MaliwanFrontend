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
  touched,
  errors,
}) {
  const { i18n } = useTranslation();
  const [innerValue, setInnerValue] = useState(`${parseFloat(value).toFixed(2)}`);
  const defaultMask = i18n.language.startsWith("pt") ? "9,99" : "9.99";
  const [mask, setMask] = useState(defaultMask);

  const innerOnChange = (e) => {
    setInnerValue(e.target.value);
    if (onChange) onChange(e);
  };

  const beforeMaskedValueChange = (newState, oldState, userInput) => {
    let { value, selection } = newState;

    if (newState.value != oldState.value.replace(i18n.language.startsWith("pt") ? '.' : ',', i18n.language.startsWith("pt") ? ',' : '.') || userInput != null) {
      let newMask = `${mask}`;

      let newValue = `${(userInput != null ? onlyNumbers(oldState.value) : onlyNumbers(oldState.value).substring(0, (onlyNumbers(oldState.value).length - 1)))}${(userInput != null ? userInput : '')}`
      if (newValue.length > 3)
        newValue = parseInt(newValue).toString();
      newValue = newValue.padStart(onlyNumbers(defaultMask).length, '0').split('');
      newValue.splice((newValue.length - 2), 0, i18n.language.startsWith("pt") ? ',' : '.');
      newValue = newValue.join('');

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
          <InputGroup.Text id="basic-addon1">R$</InputGroup.Text>
          <InputMask
            className={`form-control 
              ${touched?.document && !errors?.document ? "is-valid" : ""}
              ${touched?.document && errors?.document ? "is-invalid" : ""}`}
            mask={mask}
            alwaysShowMask={true}
            value={innerValue}
            onChange={innerOnChange}
            type="tel"
            name={name}
            beforeMaskedValueChange={beforeMaskedValueChange}
          />
        </InputGroup>
      </Col>
    </Form.Group>
  );
}
