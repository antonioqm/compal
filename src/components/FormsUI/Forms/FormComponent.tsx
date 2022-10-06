import { Form, Formik } from "formik";
import { useLayoutEffect, useState } from "react";
import * as Yup from "yup";
import { ptShort } from "yup-locale-pt";
import styles from "../../../../styles/Login.module.scss";
import { apiClient } from "../../../api/api";
import { ComponentModel, ComponentRequest } from "../../../interfaces/component.interface";
import { Thickness } from "../../../interfaces/thickness.interface";
import { useLevelsMutations } from "../../../state/atom";
import ButtonWrapper from "../Button/ButtonWrapper";
import Select from "../Select/SelectWrapper";
import TextfieldWrapper from "../TextField/TextFieldWrapper";
import ToggleBottonWrapper from "../ToggleBotton/ToggleBottonWrapper";

const REGEX = {
  PART_NUMBER: {
    REGEX: /([\w]{4}-[\d]{4})/,
    MESSAGE: `O pradrão 'AAAA-0000' é esperado.`,
  },
};
interface Prop {
  action?: "Create" | "Update";
  data?: ComponentModel;
}

interface SelectItem {
  id: number;
  name: string;
}

export const FormComponent = ({ action, data, ...props }: Prop) => {

  Yup.setLocale(ptShort);
  
  const filedsClean: ComponentRequest = {
    id: 0,
    codePartNumber: "",
    humiditySensitivity: null,
    maxTimeExposure: 0,
    minimumTime: 0,
    numberMaxBacking: 0,
    temperature: 0,
    thicknessId: 0,
  };
  

  
  console.log('chegou aqui---->', data)
  
  const INITIAL_FORM_STATE = data ?
    {
      id: data.id,
      codePartNumber: data.codePartNumber,
      humiditySensitivity: data.humiditySensitivity,
      maxTimeExposure: data.maxTimeExposure,
      minimumTime: data.minimumTime,
      numberMaxBacking: data.numberMaxBacking,
      temperature: data.temperature,
      thicknessId: data.thickness.id,
    } : filedsClean;

    console.log('TRANSFORMOU INITIAL_FORM_STATE---->', INITIAL_FORM_STATE)
  const FORM_VALIDATION = Yup.object().shape({
    codePartNumber: Yup.string().required().min(14),
    // .matches(REGEX.PART_NUMBER.REGEX, REGEX.PART_NUMBER.MESSAGE),
    humiditySensitivity: Yup.boolean().required(),
    maxTimeExposure: Yup.number().positive().required(),
    minimumTime: Yup.number().positive().required(),
    numberMaxBacking: Yup.number().positive().required(),
    temperature: Yup.number().positive().required(),
    thicknessId: Yup.number().positive().required()
  });

  const { createModel, updateModel } = useLevelsMutations();

  // const [listLevel, setListLevel] = useState<SelectItem[]>([]);
  const [listThickness, setListThickness] = useState<SelectItem[]>([]);

  // useLayoutEffect(() => {
  //   apiClient
  //     .listAll<{ result: LevelModel[] }>("nivel/?orderBy=levelName")
  //     .then(({ result }) => {
  //       const levelItems = result.map((item: LevelModel) => {
  //         return { id: item.id!, name: item.levelName };
  //       });
  //       setListLevel(levelItems);
  //     });
  // }, []);

  useLayoutEffect(() => {
    apiClient
      .listAll<{ result: Thickness[] }>("espessura/?orderBy=thicknessName")
      .then(({ result }) => {
        const thicknessItems = result.map((item: Thickness) => {
          return { id: item.id!, name: item.thicknessName };
        });
        setListThickness(thicknessItems);
      });
  }, []);
  

  return (
    <Formik
      initialValues={
        INITIAL_FORM_STATE
      }
      validationSchema={FORM_VALIDATION}
      // onSubmit={async (values: Thickness) => {
      //   console.log("action type ", action)
      //   const { id } = values;
      //   action === "Update" && id
      //     ? await updateModel<Thickness>({
      //         endpoint: "espessura",
      //         payload: { ...values, id },
      //       })
      //     : await createModel<Thickness>({ endpoint: "espessura", payload: values });
      // }}

      onSubmit={async (values:any) => {
        console.log("ComponentRequest", values);

        if (action === "Update") {
          const { id } = values ;
          await updateModel<ComponentRequest>({
            endpoint: "partNumber",
            payload: { ...values, id },
          });
        }
        if (action === "Create") {
          await createModel<ComponentRequest>({
            endpoint: "partNumber",
            payload: values,
          });
        }
      }}
    >
      <Form className={styles.formWrapper}>
        {/* <TextfieldWrapper name={"level"} label={"Nível"} />
         */}
        <TextfieldWrapper
          name={"codePartNumber"}
          label={"Partnumber"}
        />
        <ToggleBottonWrapper
          name="humiditySensitivity"
          legend="Sensibilidade à umidade?"
          data={[
            { label: "Sim", value: true },
            { label: "Não", value: false },
          ]}
        />

        <Select items={listThickness} name={"thicknessId"} label={"Espessura"} />

        <TextfieldWrapper
          type="number"
          name={"temperature"}
          label={"Temperatura"}
        />
        <TextfieldWrapper
          type="number"
          name={"minimumTime"}
          label={"Tempo mínimo"}
        />
        <TextfieldWrapper
          type="number"
          name={"maxTimeExposure"}
          label={"Tempo de exposição máximo"}
        />
        <TextfieldWrapper
          type="number"
          name={"numberMaxBacking"}
          label={"Número máximo de baking"}
        />
        <ButtonWrapper fixed>{"enviar"}</ButtonWrapper>
      </Form>
    </Formik>
  );
};
