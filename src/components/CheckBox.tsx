import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export const CheckBox = ({
  name,
  onClick,
  title,
  checked,
}: {
  name: string;
  onClick: () => void;
  title: string;
  checked: boolean;
}) => {
  return (
    <div className="space-x-2 flex">
      <Checkbox id={name} onClick={onClick} checked={checked} />
      <Label htmlFor={name}>{title}</Label>
    </div>
  );
};
