import { Form, Formik, useFormik } from "formik";
import { Box } from "@mui/material";
import * as Yup from "yup";
import { ptShort } from "yup-locale-pt";
import styles from "../../../../styles/Login.module.scss";
import { apiClient } from "../../../api/api";
import { useLevelsMutations } from "../../../state/atom";
import ButtonWrapper from "../Button/ButtonWrapper";
import Select from "../Select/SelectWrapper";
import TextfieldWrapper from "../TextField/TextFieldWrapper";
import Label from "../../../interfaces/etiqueta.interface";
import ToggleBottonWrapper from "../ToggleBotton/ToggleBottonWrapper";
export interface LabelProp {
  id?: number,
  etiquetas: number,
}
interface FormLabelPropProp {
  action?: "Create";
  data?: LabelProp;
}

export const FormLabel = ({data}: FormLabelPropProp) => {

  Yup.setLocale(ptShort);
  const INITIAL_FORM_STATE = data;
  const FORM_VALIDATION = Yup.object().shape({
    etiquetas: Yup.number().positive().required(),
  });
  const { createModel } = useLevelsMutations();
  return (
    <>
      <Box sx={{ bgcolor: "orange", height: "100%", width: "100%" }}></Box>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        // validationSchema={FORM_VALIDATION}
        
        onSubmit={async (values: Label ) => {
          await createModel<Label>({ endpoint: "etiquetas", payload: values });
        }}
      >
        <Form className={styles.formWrapper}>
          <TextfieldWrapper  name={"quantity"} label={"Quantidade"} />
          <ButtonWrapper fixed>Criar</ButtonWrapper>
        </Form>
      </Formik>
    </>
  );
};
