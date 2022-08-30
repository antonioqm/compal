import { Formik, Form, useFormikContext, FieldArray } from "formik";
import ButtonWrapper from "src/components/FormsUI/Button/ButtonWrapper";
import TextfieldWrapper from "src/components/FormsUI/TextField/TextFieldWrapper";
import ToggleBottonWrapper from "src/components/FormsUI/ToggleBotton/ToggleBottonWrapper";
import { useState } from "react";
import { ptShort } from "yup-locale-pt";
import * as Yup from "yup";
import styles from "../../styles/Login.module.scss";
import Select from "src/components/FormsUI/Select/SelectWrapper";
import { Typography } from "@mui/material";

interface Prop {
  action?: "create" | "read" | "update" | "delete";
}

export interface Inventory {
  type: string;
  code: string;
  line: string;
  discriminator: string;
  temperature: number | string;
}

export const FormInventory = ({ action, ...props }: Prop) => {
  const [disabledTemperature, setDisabledTemperature] = useState<boolean>(true);

  Yup.setLocale(ptShort);
  const INITIAL_FORM_STATE = {
    type: "",
    code: "code",
    line: "",
    discriminator: "discriminator",
    temperature: "",
    fields: [{ teste: "" }, { teste: "" }],
  };

  const typeTemperatues = [
    {
      id: 1,
      name: "40 ºC",
    },
    {
      id: 2,
      name: "90 ºC",
    },
    {
      id: 3,
      name: "125 ºC",
    },
  ];
  const typeItems = [
    {
      id: 1,
      name: "Dry Box",
    },
    {
      id: 2,
      name: "Dry Pack",
    },
    {
      id: 3,
      name: "Feeder Car",
    },
    {
      id: 4,
      name: "Forno",
    },
    {
      id: 5,
      name: "Máquina de Bandeja",
    },
  ];

  const FORM_VALIDATION = Yup.object().shape({
    type: Yup.number().required(),
    code: Yup.string().required(),
    line: Yup.string().required(),
    discriminator: Yup.string().required(),
    temperature: Yup.number(),
  });

  const validate = (values: Inventory) => {
    if (Number(values.type) === 4) {
      setDisabledTemperature(false);
    } else {
      setDisabledTemperature(true);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validate={validate}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          // console.log(values, "values print");
        }}
      >
        {({
          values,
          errors,
          isSubmitting,
          isValid,
          setValues,
          setFieldValue,
          resetForm
        }) => (
          <Form className={styles.formWrapper}>
            <Select
              disabled={false}
              items={typeItems}
              name={"type"}
              label={"Tipo"}
            />
           { Number(values.type) === 5 &&  <TextfieldWrapper  name={"line"} label={"Linha"} />}

            <TextfieldWrapper name={"code"} label={"Código"} />

            <TextfieldWrapper
              maxRows={6}
              minRows={3}
              multiline
              name={"discriminator"}
              label={"Descrição"}
            />

            <Select
              disabled={disabledTemperature}
              items={typeTemperatues}
              type="number"
              name={"temperature"}
              label={"Temperatura"}
            />

            <ButtonWrapper fixed>{"enviar"}</ButtonWrapper>
          </Form>
        )}
      </Formik>
    </>
  );
};
