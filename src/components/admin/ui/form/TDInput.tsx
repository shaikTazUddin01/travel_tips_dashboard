
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
  // width:string;
}

const TDInput = ({
  name,
  label,
  type = "text",
  variant = "bordered",
  required = false,
  defaultvalue,
 
}: IProps) => {
  const {
    register,
    reset,
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
      // className={`lg:min-w-[${width}px] xl:min-w-[330px]`}
    />
  );
};

export default TDInput;