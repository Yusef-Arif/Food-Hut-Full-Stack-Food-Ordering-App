import { IFormField } from "@/interfaces/fields";
import { ValidationErrors } from "@/validations/auth";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface Props extends IFormField {
  error: ValidationErrors;
}

const PasswordField = ({
  label,
  name,
  type,
  placeholder,
  disabled,
  autoFocus,
  error,
  defaultValue,
  readOnly,
}: Props) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        readOnly={readOnly}
      />

      {error && error[name] && (
        <p className="text-sm text-destructive">{error[name]}</p>
      )}
    </div>
  );
};

export default PasswordField;
