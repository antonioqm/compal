import { Box } from "@mui/material";
import { Form, Formik, useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import { ptShort } from "yup-locale-pt";
import styles from "../../../../styles/Login.module.scss";
import { LevelModel } from "../../../interfaces/level.interface";
import { useModelMutations } from "../../../state/atom";
import ButtonWrapper from "../Button/ButtonWrapper";
import { TextfieldWrapper } from "../TextField/TextFieldWrapper";

interface LevelProp {
  levelName: string;
  maxTimeExposition: number;
  criticalExpositionTime: number;
  backingRequired: boolean;
}
interface FormLevelProp {
  action?: "Create" | "Update";
  data?: LevelProp;
  closeForm: () => void;
}

export const FormLevel = ({
  action,
  data,
  closeForm,
  ...props
}: FormLevelProp) => {
  const [maxTime, setMaxTime] = useState<string | number>(0);
  const [criticalExposition, setCriticalExposition] = useState<string | number>(
    0
  );
  const router = useRouter();
  const filedsClean = {
    levelName: "",
    maxTimeExposition: "",
    criticalExpositionTime: "",
    backingRequired: false,
  };

  Yup.setLocale(ptShort);
  const INITIAL_FORM_STATE = data ? data : filedsClean;

  const FORM_VALIDATION = Yup.object().shape({
    levelName: Yup.string().required(),
    maxTimeExposition: Yup.number()
      .integer()
      .required("Obrigatório: tipo inteiro.")
      .moreThan(0)
      .lessThan(10000)
      .test(
        "maxLenght",
        "Deve ser maior que Tempo Crítico de Exposição",
        (val) => {
          if (val) {
            return val > criticalExposition;
          }
          return false;
        }
      ),
    criticalExpositionTime: Yup.number()
      .integer()
      .required("Obrigatório: tipo inteiro.")
      .moreThan(0)
      .lessThan(1000)
      .test(
        "maxLenght",
        "Deve ser menor que Tempo Máximo de Exposição",
        (val) => {
          if (val) {
            return val < maxTime;
          }
          return false;
        }
      ),
    backingRequired: Yup.boolean().required(),
  });

  const formik = useFormik({
    initialValues: INITIAL_FORM_STATE,
    validationSchema: FORM_VALIDATION,
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { updateModel, createModel } = useModelMutations();

  return (
    <>
      <Box sx={{ bgcolor: "orange", height: "100%", width: "100%" }}></Box>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        validate={(values: LevelModel) => {
          setMaxTime(values.maxTimeExposition);
          setCriticalExposition(values.criticalExpositionTime);
        }}
        validateOnBlur={true}
        onSubmit={async (values: LevelModel, actions) => {
          const { id } = values;

          values.backingRequired = false;
          let response: any;
          action === "Update" && id
            ? (response = await updateModel<LevelModel>({
                endpoint: "nivel",
                payload: { ...values, id },
              }))
            : (response = await createModel<LevelModel>({
                endpoint: "nivel",
                payload: values,
              }));

          if (!response.error && response === "created") {
            actions.resetForm();
          }
        }}
      >
        <Form className={styles.formWrapper}>
          <TextfieldWrapper
            placeholder="1A"
            mask="[0a]"
            name={"levelName"}
            label={"Nível"}
          />
          <TextfieldWrapper
            inputProps={{
              min: 1,
              max: 999,
              pattern: "[0-9]*",
              inputMode: "numeric",
            }}
            type={"number"}
            name={"maxTimeExposition"}
            label={"Tempo Máximo de Exposição (Horas)"}
          />
          <TextfieldWrapper
            inputProps={{
              min: 1,
              max: 999,
              pattern: "[0-9]*",
              inputMode: "numeric",
            }}
            type={"number"}
            name={"criticalExpositionTime"}
            label={"Tempo Crítico de Exposição (Horas)"}
          />

          <ButtonWrapper fixed>{`${
            action === "Create" ? "Criar" : "Atualizar"
          }`}</ButtonWrapper>
        </Form>
      </Formik>
    </>
  );
};
