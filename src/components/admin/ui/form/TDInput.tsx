
import { Input } from "@nextui-org/input";
import React from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  required?: boolean;
  name: string;
  label: string;
  type?: string;
  defaultvalue?:string;
  variant?: "bordered" | "flat" | "faded" | "underlined";
}

const TDInput = ({
  name,
  label,
  type = "text",
  variant = "bordered",
  required = false,
  defaultvalue
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

// console.log(errors);

  return (
    <Input
      label={label}
      type={type}
      variant={variant}
      {...register(name)}
      defaultValue={defaultvalue}
      errorMessage={ errors[name]?.message as string | undefined }
      isInvalid={!!errors[name]}
      isRequired={required}
    />
  );
};

export default TDInput;