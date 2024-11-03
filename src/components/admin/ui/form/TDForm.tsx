import React, { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";


interface IFormConfig{
  resolver?:any

}

interface IProps extends IFormConfig{
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
}

const TDForm = ({ children, onSubmit,resolver }: IProps) => {
 const formConfig  : IFormConfig = {}


if (!!resolver) {
  formConfig['resolver']=resolver
  // console.log(formConfig['resolver']);
}
  const methods = useForm(formConfig);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default TDForm;