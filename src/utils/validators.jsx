import React from "react";
import { onlyNumbers } from "./helpers";
import { cpf, cnpj } from 'cpf-cnpj-validator'; 

export default function useValidators() {
  const isCpf = (num) => {
    num = onlyNumbers(num);
    return cpf.isValid(num);
  };

  const isCnpj = (num) => {
    num = onlyNumbers(num);
    return cnpj.isValid(num);
  };

  const isHexColor = (color) => {
    return /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i.test(color);
  };

  return {
    isCpf,
    isCnpj,
    isHexColor,
  };
}
