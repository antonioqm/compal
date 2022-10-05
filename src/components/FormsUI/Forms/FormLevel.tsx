import { Box } from "@mui/material";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { ptShort } from "yup-locale-pt";
import styles from "../../../../styles/Login.module.scss";
import { LevelModel } from "../../../interfaces/level.interface";
import { useLevelsMutations } from "../../../state/atom";
import ButtonWrapper from "../Button/ButtonWrapper";
import TextfieldWrapper from "../TextField/TextFieldWrapper";
import ToggleBottonWrapper from "../ToggleBotton/ToggleBottonWrapper";

interface LevelProp {
  levelName: string;
  maxTimeExposition: number;
  criticalExposureTime: number;
  backingRequired: boolean;

}
interface FormLevelProp {
  action?: "Create" | "Update";
  data?: LevelProp;
}

export const FormLevel = ({ action, data, ...props }: FormLevelProp) => {
  const filedsClean = {
    levelName: "",
    maxTimeExposition: 0,
    criticalExposureTime: 0,
    backingRequired: true,
  };

  Yup.setLocale(ptShort);
  const INITIAL_FORM_STATE = data ? data : filedsClean;

  const FORM_VALIDATION = Yup.object().shape({
    levelName: Yup.string().required(),
    maxTimeExposition: Yup.number().required().moreThan(0),
    criticalExposureTime: Yup.number().required().moreThan(0),
    backingRequired: Yup.boolean().required(),
  });

  const formik = useFormik({
    initialValues: INITIAL_FORM_STATE,
    validationSchema: FORM_VALIDATION,
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
        onSubmit={async (values: LevelModel ) => {
          const { id } = values;
          action === "Update" && id
            ? await updateModel<LevelModel>({
                endpoint: "nivel",
                payload: { ...values, id },
              })
            : await createModel<LevelModel>({ endpoint: "nivel", payload: values });
        }}
      >
        <Form className={styles.formWrapper}>
          <TextfieldWrapper  name={"levelName"} label={"Nível"} />
          <TextfieldWrapper
            
            type="number"
            inputProps={{ min: 0, step: 1 }}
            name={"maxTimeExposition"}
            label={"Tempo Máximo de Exposição (Horas)"}
          />
          <TextfieldWrapper
            
            type="number"
            inputProps={{ min: 0, step: 1 }}
            name={"criticalExposureTime"}
            label={"Tempo Crítico de Exposição (Horas)"}
          />
          {/* <TextfieldWrapper type='number' inputProps={{  min: 0.00, step: .05  }} name={"criticalExposureTime"} label={"Tempo Crítico de Exposição (Horas)"} /> */}
          <ToggleBottonWrapper
            name={"backingRequired"}
            legend={"Baking Obrigatório"}
          />

          <ButtonWrapper fixed>{`${
            action === "Create" ? "Criar" : "Atualizar"
          }`}</ButtonWrapper>
        </Form>
      </Formik>
    </>
  );
};
