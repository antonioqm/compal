import { Formik, Form, useFormik} from "formik";
import ButtonWrapper from "src/components/FormsUI/Button/ButtonWrapper";
import TextfieldWrapper from "src/components/FormsUI/TextField/TextFieldWrapper";
import ToggleBottonWrapper from "src/components/FormsUI/ToggleBotton/ToggleBottonWrapper";
import { JSXElementConstructor, useState } from "react";
import { ptShort } from "yup-locale-pt";
import * as Yup from "yup";
import styles from "../../styles/Login.module.scss";
import Select from "src/components/FormsUI/Select/SelectWrapper";

interface Prop {
  action?: "create" | "read" | "update" | "delete";
}

export const FormLevel = ({ action, ...props }: Prop) => {

  
  Yup.setLocale(ptShort);
  const INITIAL_FORM_STATE = {
    level: "",
    maxExposureTime: "",
    criticalExposureTime: "",
    mandatoryBaking: ""
  };


  const FORM_VALIDATION = Yup.object().shape({
    level: Yup.string().required(),
    maxExposureTime: Yup.number().required(),
    criticalExposureTime: Yup.number().required(),
    mandatoryBaking: Yup.string().required(),

  });

  const formik = useFormik({
    initialValues: INITIAL_FORM_STATE,
    validationSchema: FORM_VALIDATION,
    onSubmit: (values:any) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
console.log(formik.values)
  return (
    <>
    <Formik
      initialValues={{
        ...INITIAL_FORM_STATE,
      }}
      validationSchema={FORM_VALIDATION}
      validate= {(values:any) => console.log("level is", values.level)}
      onSubmit={(values) => {
        
        console.log(values, "values print");
      }}
      >
      <Form className={styles.formWrapper}>
        
        <TextfieldWrapper name={"level"} label={"Nível"} />
        <TextfieldWrapper type='number' inputProps={{  min: 0.00, step: .05 }}  name={"maxExposureTime"} label={"Tempo Máximo de Exposição (Horas)"} />
        <TextfieldWrapper type='number' inputProps={{  min: 0.00, step: .05  }} name={"criticalExposureTime"} label={"Tempo Crítico de Exposição (Horas)"} />
        <ToggleBottonWrapper  name={"mandatoryBaking"} legend={"Baking Obrigatório"} />
        <ButtonWrapper fixed>{"enviar"}</ButtonWrapper>
      </Form>
    </Formik>
    </>
  );
};
