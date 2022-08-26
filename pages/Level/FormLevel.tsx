import { Formik, Form, useFormik} from "formik";
import ButtonWrapper from "src/components/FormsUI/Button/ButtonWrapper";
import TextfieldWrapper from "src/components/FormsUI/TextField/TextFieldWrapper";
import ToggleBottonWrapper from "src/components/FormsUI/ToggleBotton/ToggleBottonWrapper";
import { JSXElementConstructor, useState } from "react";
import { ptShort } from "yup-locale-pt";
import * as Yup from "yup";
import styles from "../../styles/Login.module.scss";
import Select from "src/components/FormsUI/Select/SelectWrapper";
import { apiClient } from "src/api/api";
import { useLevelsMutations } from "src/state/atom";
import { Level } from "pages/Interfaces/level.interface";
import { Box, LinearProgress } from "@mui/material";


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

enum METHODS {
  'create' =  'post',
  'read' = 'get',
  'update' = 'get',
  'delete' = 'delete'
} 



export const FormLevel = ({ action, formLevel, ...props }: FormLevelProp) => {

  console.log('testando action', action)
  const filedsClean = {
    levelName: "",
    maxTimeExposition: 0,
    backingRequired: true
  }
  
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
    onSubmit: (values:any) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const {updateLevel} = useLevelsMutations()
  return (
    <>
       <Box sx={{ bgcolor: 'orange', height: '100%', width: '100%' }}>
          
          </Box>
    <Formik
      initialValues={{
        ...INITIAL_FORM_STATE,
      }}
      validationSchema={FORM_VALIDATION}
      validate= {(values:any) => console.log("level is", values)}
        onSubmit={(values) => {
        
          updateLevel<Level>({endpoint: 'nivel', payload: values})
        
        // apiClient['put'](`nivel/${values.id}`, values).then((res:any) => {
        //   console.log(res)
        // }).catch((res:any) => {
        //   console.log(res)
        // })
      }}
      >
       
        <Form className={styles.formWrapper}>
        
        <TextfieldWrapper name={"levelName"} label={"Nível"} />
        <TextfieldWrapper type='number' inputProps={{  min: 0, step: 1 }}  name={"maxTimeExposition"} label={"Tempo Máximo de Exposição (Horas)"} />
        {/* <TextfieldWrapper type='number' inputProps={{  min: 0.00, step: .05  }} name={"criticalExposureTime"} label={"Tempo Crítico de Exposição (Horas)"} /> */}
          <ToggleBottonWrapper name={"backingRequired"} legend={"Baking Obrigatório"} />
          
        <ButtonWrapper fixed>{"enviar"}</ButtonWrapper>
      </Form>
    </Formik>
    </>
  );
};


