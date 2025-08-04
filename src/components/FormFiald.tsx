import { IFormField } from "@/interfaces/fields";
import React from "react";
import TextField from "./TextField";
import PasswordField from "./PasswordField";
import { ValidationErrors } from "@/validations/auth";

interface Props extends IFormField {
  error: ValidationErrors;
}

function FormFiald(props: Props) {
  const { type } = props;

  switch (type) {
    case "email":
    case "text":
      return <TextField {...props} />;

    case "password":
      return <PasswordField {...props} />;

    default:
      return <TextField {...props} />;
  }
}

export default FormFiald;
