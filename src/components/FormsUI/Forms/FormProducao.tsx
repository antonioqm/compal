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
import Producao from "../../../interfaces/producao.interface";
import ToggleBottonWrapper from "../ToggleBotton/ToggleBottonWrapper";
export interface ProducaoProp {
  id?: number,
  lineName: string,
  createDate: string,
  updateDate: string
}
interface FormProducaoPropProp {
  action?: "Create" | "Update";
  data?: ProducaoProp;
}


export const FormProducao = ({ action, data, ...props }: FormProducaoPropProp) => {
  const filedsClean = {
    lineName: "",
  };
 
  Yup.setLocale(ptShort);

  const INITIAL_FORM_STATE = data ? data : filedsClean;

  const FORM_VALIDATION = Yup.object().shape({
    lineName: Yup.string().required().min(2),
  });

  const formik = useFormik({
    initialValues: INITIAL_FORM_STATE,
    validationSchema: FORM_VALIDATION,
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  // console.log("data in form", data)
  
  const { updateModel, createModel } = useLevelsMutations();
  
  return (
    <>
      <Box sx={{ bgcolor: "orange", height: "100%", width: "100%" }}></Box>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        validate={(values: any) => {}}
        onSubmit={async (values: Producao ) => {
          const { id } = values;
          action === "Update" && id
            ? await updateModel<Producao>({
                endpoint: "linhaProducao",
                payload: { ...values, id },
              })
            : await createModel<Producao>({ endpoint: "linhaProducao", payload: values });
        }}
      >
        <Form className={styles.formWrapper}>
          <TextfieldWrapper  name={"lineName"} label={"Nome"} />
          
          {/* <TextfieldWrapper type='number' inputProps={{  min: 0.00, step: .05  }} name={"criticalExposureTime"} label={"Tempo Crítico de Exposição (Horas)"} /> */}
          
          <ButtonWrapper fixed>{`${
            action === "Create" ? "Criar" : "Atualizar"
          }`}</ButtonWrapper>
        </Form>
      </Formik>
    </>
  );
};
