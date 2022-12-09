import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { ptShort } from "yup-locale-pt";
import styles from "../../../../styles/Login.module.scss";
import { Label } from "../../../interfaces/label.interface";
import { useModelMutations } from "../../../state/atom";
import ButtonWrapper from "../Button/ButtonWrapper";
import { TextfieldWrapper } from "../TextField/TextFieldWrapper";
interface FormLabelPropProp {
  action?: "Create";
  data?: any;
}

export const FormLabel = ({ data }: FormLabelPropProp) => {

  const router = useRouter()

  const INITIAL_FORM_STATE = { ...data }
  Yup.setLocale(ptShort);
  const FORM_VALIDATION = Yup.object().shape({
    quantity: Yup
      .number()
      .positive()
      .min(1)
      .max(500)
      .required()
      .typeError("Informe uma quantidade válida"),
  });
  const { createModel } = useModelMutations();
  return (
    <>
      <Box sx={{ bgcolor: "orange", height: "100%", width: "100%" }}></Box>
      <Formik
        initialValues={INITIAL_FORM_STATE}
        validationSchema={FORM_VALIDATION}
        validateOnBlur={true}
        onSubmit={async (values: Label, actions ) => {
          await createModel<Label>({ endpoint: "etiquetas", payload: values });
          actions.resetForm()
          
        }}
      >
        <Form className={styles.formWrapper}>
          <TextfieldWrapper
            name={"quantity"}
            label={"Quantidade"}
            type={"number"}
          />
          <ButtonWrapper fixed>Criar</ButtonWrapper>
        </Form>
      </Formik>
    </>
  );
};
