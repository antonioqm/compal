import { Formik, Form, useFormik } from "formik";
import ButtonWrapper from "src/components/FormsUI/Button/ButtonWrapper";
import TextfieldWrapper from "src/components/FormsUI/TextField/TextFieldWrapper";
import ToggleBottonWrapper from "src/components/FormsUI/ToggleBotton/ToggleBottonWrapper";
import { JSXElementConstructor, useState } from "react";
import { ptShort } from "yup-locale-pt";
import * as Yup from "yup";
import styles from "../../styles/Login.module.scss";
import Select from "src/components/FormsUI/Select/SelectWrapper";
import { useLevelsMutations } from "src/state/atom";
import { Level } from "pages/Interfaces/level.interface";
import {  Alert, Box, Button, LinearProgress, Snackbar } from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";

interface LevelProp {
  id?: number;
  levelName: string;
  maxTimeExposition: number;
  backingRequired: boolean;
}
interface FormLevelProp {
  action?: "create" | "read" | "update" | "delete";
  formLevel?: LevelProp;
}



export const FormLevel = ({ action, formLevel, ...props }: FormLevelProp) => {
  const filedsClean = {
    levelName: "",
    maxTimeExposition: 0,
    backingRequired: true,
  };

  Yup.setLocale(ptShort);
  const INITIAL_FORM_STATE = formLevel ? formLevel : filedsClean;

  const FORM_VALIDATION = Yup.object().shape({
    levelName: Yup.string().required(),
    maxTimeExposition: Yup.number().required(),
    // criticalExposureTime: Yup.number(),
    backingRequired: Yup.boolean().required(),
  });

  const formik = useFormik({
    initialValues: INITIAL_FORM_STATE,
    validationSchema: FORM_VALIDATION,
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { updateLevel, createLevel } = useLevelsMutations();
  
  return (
    <>
      <Box sx={{ bgcolor: "orange", height: "100%", width: "100%" }}></Box>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        validate={(values: any) => {}}
        onSubmit={async (values: Level) => {
          await createLevel<Level>({ endpoint: "nivel", payload: values });
          
        }}
      >
        <Form className={styles.formWrapper}>
          <TextfieldWrapper name={"levelName"} label={"Nível"} />
          <TextfieldWrapper
            type="number"
            inputProps={{ min: 0, step: 1 }}
            name={"maxTimeExposition"}
            label={"Tempo Máximo de Exposição (Horas)"}
          />
          {/* <TextfieldWrapper type='number' inputProps={{  min: 0.00, step: .05  }} name={"criticalExposureTime"} label={"Tempo Crítico de Exposição (Horas)"} /> */}
          <ToggleBottonWrapper
            name={"backingRequired"}
            legend={"Baking Obrigatório"}
          />

          <ButtonWrapper fixed>{`${action === 'create' ? 'Criar' : 'Salvar'}`}</ButtonWrapper>
        </Form>
      </Formik>
    </>
  );
};
