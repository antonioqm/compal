import { Box } from "@mui/material";
import { Form, Formik, useFormik } from "formik";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import * as Yup from "yup";
import { ptShort } from "yup-locale-pt";
import styles from "../../../../styles/Login.module.scss";
import { apiClient } from "../../../api/api";
import Select from "../../../components/FormsUI/Select/SelectWrapper";
import { Level } from "../../../interfaces/level.interface";
import { Thickness } from "../../../interfaces/thickness.interface";
import { useLevelsMutations } from "../../../state/atom";
import ButtonWrapper from "../Button/ButtonWrapper";
import TextfieldWrapper from "../TextField/TextFieldWrapper";

// interface ThicknessProp {
//   levelName: string;
//   maxTimeExposition: number;
//   backingRequired: boolean;
// }
  
interface FormThicknessProp {
  action?: "Create" | "Update";
  data?: Thickness;
}

interface levelItemSelect {
  id: number;
  name: string;
}


export function FormThickness({ action, data, ...props }: FormThicknessProp) {
  const router = useRouter()
  const filedsClean = {
    thicknessName: '',
    levelId: 4,
    minTimeBaking40: 0,
    minTimeBaking90: 0,
    minTimeBaking125: 0
  };

  Yup.setLocale(ptShort);
  const INITIAL_FORM_STATE = data ? data : filedsClean;

  const FORM_VALIDATION = Yup.object().shape({
    // levelName: Yup.string().required(),
    // maxTimeExposition: Yup.number().required(),
    // // criticalExpositionTime: Yup.number(),
    // backingRequired: Yup.boolean().required(),
  });

  const formik = useFormik({
    initialValues: INITIAL_FORM_STATE,
    validationSchema: FORM_VALIDATION,
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { updateModel, createModel, listAllModel } = useLevelsMutations();

  const [listLevel, setListLevel] = useState<levelItemSelect[]>([])

  useLayoutEffect(() => {
    apiClient.listAll<{ result: Level[] }>("nivel/?orderBy=levelName").then(
      ({ result }) => {
        const itemSelect = result.map((item:Level) => {
          return { id: item.id!, name: item.levelName}
        })
        setListLevel(itemSelect)
      }
      );
  }, []);
  
console.log('formThickness', data)
  return (
    <>
      <Box sx={{ bgcolor: "orange", height: "100%", width: "100%" }}></Box>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        validate={(values: any) => {}}
        onSubmit={async (values: Thickness) => {
          console.log("action type ", action)
          const { id } = values;
          action === "Update" && id
            ? await updateModel<Thickness>({
                endpoint: "espessura",
                payload: { ...values, id },
              })
            : await createModel<Thickness>({ endpoint: "espessura", payload: values });
            router.reload()
        }}
      >
        <Form className={styles.formWrapper}>
          <TextfieldWrapper
            name={"thicknessName"}
            label={"Título"}
          />
          <Select
              items={listLevel}
              type="number"
              name={"levelId"}
              label={"Nível"}
            />
          <TextfieldWrapper name={"thicknessName"} label={"Espessura (≤)"} />
          <TextfieldWrapper
            type="number"
            inputProps={{ min: 0, step: 1 }}
            name={"minTimeBaking40"}
            label={"Tempo mínimo de Baking 40º (Horas)*"}
          />
          <TextfieldWrapper
            type="number"
            inputProps={{ min: 0, step: 1 }}
            name={"minTimeBaking90"}
            label={"Tempo mínimo de Baking 90º (Horas)*"}
          />
          <TextfieldWrapper
            type="number"
            inputProps={{ min: 0, step: 1 }}
            name={"minTimeBaking125"}
            label={"Tempo mínimo de Baking 125º (Horas)*"}
          />
          <ButtonWrapper fixed>{`${
            action === "Create" ? "Criar" : "Atualizar"
          }`}</ButtonWrapper>
        </Form>
      </Formik>
    </>
  );
};
