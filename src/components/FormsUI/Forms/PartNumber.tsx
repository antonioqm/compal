import { Formik, Form } from "formik";
import ButtonWrapper from "src/components/FormsUI/Button/ButtonWrapper";
import TextfieldWrapper from "src/components/FormsUI/TextField/TextFieldWrapper";
import ToggleBottonWrapper from "src/components/FormsUI/ToggleBotton/ToggleBottonWrapper";
import { useState } from "react";
import { ptShort } from "yup-locale-pt";
import * as Yup from "yup";
import styles from "../../../../styles/Login.module.scss";


const REGEX = {
  PART_NUMBER: {
    REGEX: /([\w]{4}-[\d]{4})/,
    MESSAGE: `O pradrão 'AAAA-0000' é esperado.`,
  },
};
interface Prop {
  action?: 'create'| 'read'| 'update' |'delete';
}



export const FormPartNumber = ({action, ...props}:Prop) => {

  Yup.setLocale(ptShort);
  const INITIAL_FORM_STATE = {
    moistureSensitive: "no",
    partNumber: "AAAA-0000",
    level: "asasas",
    thickness: "2",
    temperature: "3",
    minimumTime: "2",
    maximumExposureTime: "2",
    maximumNumberOfBaking: "1",
  };

  const FORM_VALIDATION = Yup.object().shape({
    moistureSensitive: Yup.string().required(),
    level: Yup.string().required(),
    partNumber: Yup.string()
      .required()
      .min(3)
      .matches(REGEX.PART_NUMBER.REGEX, REGEX.PART_NUMBER.MESSAGE),
    thickness: Yup.number().positive().required(),
    temperature: Yup.number().positive().required(),
    minimumTime: Yup.number().positive().required(),
    maximumExposureTime: Yup.number().positive().required(),
    maximumNumberOfBaking: Yup.number().positive().required(),
  });


  return (
    <Formik
  initialValues={{
    ...INITIAL_FORM_STATE,
  }}
  validationSchema={FORM_VALIDATION}
  onSubmit={(values) => {
    console.log(values, "values print");
  }}
>
  <Form className={styles.formWrapper}>
    <TextfieldWrapper name={"partNumber"} label={"Part Number"} />
    <TextfieldWrapper name={"level"} label={"Nível"} />
    <ToggleBottonWrapper
      name="moistureSensitive"
      legend="Sensibilidade à umidade?"
      data={[
        { label: "Sim", value: "yes" },
        { label: "Não", value: "no" },
      ]}
    />
    <TextfieldWrapper
      type="number"
      name={"thickness"}
      label={"Espessura"}
    />
    <TextfieldWrapper
      type="number"
      name={"temperature"}
      label={"Temperatura"}
    />
    <TextfieldWrapper
      type="number"
      name={"minimumTime"}
      label={"Tempo mínimo"}
    />
    <TextfieldWrapper
      type="number"
      name={"maximumExposureTime"}
      label={"Tempo de exposição máximo"}
    />
    <TextfieldWrapper
      type="number"
      name={"maximumNumberOfBaking"}
      label={"Número máximo de baking"}
    />
    <ButtonWrapper fixed>{'enviar'}</ButtonWrapper>
  </Form>
</Formik> )
}