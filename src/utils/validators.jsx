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

  return {
    isCpf,
    isCnpj,
  };
}
