import { Box } from "@mui/material";
import { Form, Formik, useFormik } from "formik";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import * as Yup from "yup";
import { ptShort } from "yup-locale-pt";
import styles from "../../../../styles/Login.module.scss";
import { apiClient } from "../../../api/api";
import Select from "../../../components/FormsUI/Select/SelectWrapper";
import { LevelModel } from "../../../interfaces/level.interface";
import { ThicknessModel } from "../../../interfaces/thickness.interface";
import { useLevelsMutations } from "../../../state/atom";
import ButtonWrapper from "../Button/ButtonWrapper";
import { TextfieldWrapper } from "../TextField/TextFieldWrapper";

interface FormThicknessProp {
  action?: "Create" | "Update";
  data?: ThicknessModel;
}

interface levelItemSelect {
  id: number;
  name: string;
}

export function FormThickness({ action, data, ...props }: FormThicknessProp) {
  const router = useRouter();
  const filedsClean = {
    thicknessName: "",
    levelId: 0,
    minTimeBaking40: "",
    minTimeBaking90: "",
    minTimeBaking125: "",
  };

  Yup.setLocale(ptShort);
  const INITIAL_FORM_STATE = data ? data : filedsClean;

  const FORM_VALIDATION = Yup.object().shape({
    thicknessName: Yup.number().required().lessThan(1000).moreThan(0),
    minTimeBaking40: Yup.number()
      .integer()
      .required()
      .lessThan(1000)
      .moreThan(0),
    minTimeBaking90: Yup.number()
      .integer()
      .required()
      .lessThan(1000)
      .moreThan(0),
    minTimeBaking125: Yup.number()
      .integer()
      .required()
      .lessThan(1000)
      .moreThan(0),
    // levelId: Yup.number().required(),
  });

  const formik = useFormik({
    initialValues: INITIAL_FORM_STATE,
    validationSchema: FORM_VALIDATION,
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { updateModel, createModel, listAllModel } = useLevelsMutations();

  const [listLevel, setListLevel] = useState<levelItemSelect[]>([]);

  useLayoutEffect(() => {
    apiClient
      .listAll<{ result: LevelModel[] }>(
        "nivel/?size=1000&orderBy=levelName&orderByDesc=false"
      )
      .then(({ result }) => {
        const itemSelect = result.map((item: LevelModel) => {
          return { id: item.id!, name: item.levelName };
        });
        setListLevel(itemSelect);
      });
  }, []);

  return (
    <>
      <Box sx={{ bgcolor: "orange", height: "100%", width: "100%" }}></Box>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        validateOnBlur={true}
        validate={(values: any) => {}}
        onSubmit={async (values: any, actions) => {
          // values.thicknessName = values.thicknessName.replace(',', '.')
          let response: any;
          const { id } = values;
          action === "Update" && id
            ? (response = await updateModel<ThicknessModel>({
                endpoint: "espessura",
                payload: { ...values, id },
              }))
            : (response = await createModel<ThicknessModel>({
                endpoint: "espessura",
                payload: values,
              }));

          if (!response.error && response === "created") {
            actions.resetForm();
          }
        }}
      >
        <Form className={styles.formWrapper}>
          {/* <TextfieldWrapper
            name={"thicknessName"}
            label={"Título"}
          /> */}
          <TextfieldWrapper
            inputProps={{ min: 1, max: 999, step: 0.1 }}
            type={"number"}
            name={"thicknessName"}
            label={"Espessura (mm)"}
          />
          <Select
            items={listLevel}
            name={"levelId"}
            label={"Nível"}
            id={"nivel-thickeness"}
          />
          <TextfieldWrapper
            inputProps={{ min: 1, max: 999, step: 1 }}
            type={"number"}
            name={"minTimeBaking40"}
            label={"Tempo mínimo de Baking 40º (Horas)*"}
          />
          <TextfieldWrapper
            inputProps={{ min: 1, max: 999, step: 1 }}
            type={"number"}
            name={"minTimeBaking90"}
            label={"Tempo mínimo de Baking 90º (Horas)*"}
          />
          <TextfieldWrapper
            inputProps={{ min: 1, max: 999, step: 1 }}
            type={"number"}
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
}
