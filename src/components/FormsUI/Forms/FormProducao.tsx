import { Formik, Form, useFormikContext, FieldArray } from "formik";
import ButtonWrapper from "../../../components/FormsUI/Button/ButtonWrapper";
import TextfieldWrapper from "../../../components/FormsUI/TextField/TextFieldWrapper";
import ToggleBottonWrapper from "../../../components/FormsUI/ToggleBotton/ToggleBottonWrapper";
import { useEffect, useState } from "react";
import { ptShort } from "yup-locale-pt";
import * as Yup from "yup";
import styles from "../../../../styles/Login.module.scss";
import Select from "../../../components/FormsUI/Select/SelectWrapper";
import { Typography } from "@mui/material";
import { useLevelsMutations } from "../../../state/atom";

interface Prop {
  action?: "create" | "read" | "update" | "delete";
}

export interface Producao {
  typeProducaoId: number;
  codeProducao: string;
  description: string;
  temperature: number;
}

export interface ProducaoTypes{
    id: number,
		description: string,
		temperatureAllowed: boolean,
		temperatureRequired: boolean,
}

export interface ProducaoTypesList{
  id: number,
  name: string
}


export const FormProducao = ({ action, ...props }: Prop) => {
  const {listAllModel } = useLevelsMutations();
  const [disabledTemperature, setDisabledTemperature] = useState<boolean>(true);
  const [ProducaoTypesList, setProducaoTypesList] = useState<ProducaoTypesList[]>([]);
   
  Yup.setLocale(ptShort);
  const INITIAL_FORM_STATE = {
    typeProducaoId: "",
    codeProducao: "",
    description: "",
    temperature: "",
  };

  
  const FORM_VALIDATION = Yup.object().shape({

  });

  // const validate = (values: Producao) => {
  //   if (Number(values.type) === 4) {
  //     setDisabledTemperature(false);
  //   } else {
  //     setDisabledTemperature(true);
  //   }
  // };

  useEffect(() => {
    listAllModel<ProducaoTypes[]>('inventario/tipos').then((result) => {
      console.log(result);
      const newProducaotypeslist = result.map(type => {
        return {
          name: type.description,
          id: type.id
        }
      })
      setProducaoTypesList(newProducaotypeslist);

     })

  }, [])
  return (
    <>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validate={(values: any) => {}}
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
              items={ProducaoTypesList}
              name={"typeProducaoId"}
              label={"Tipo"}
            />
           

            <TextfieldWrapper name={"codeProducao"} label={"Código"} />
            <TextfieldWrapper name={"description"} label={"Descrição"} />
            <TextfieldWrapper name={"temperature"} label={"Temperatura"} type="number" />

          

            <ButtonWrapper fixed>{"enviar"}</ButtonWrapper>
          </Form>
        )}
      </Formik>
    </>
  );
};
