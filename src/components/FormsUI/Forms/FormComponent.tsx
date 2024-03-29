import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import * as Yup from "yup";
import { ptShort } from "yup-locale-pt";
import styles from "../../../../styles/Login.module.scss";
import { apiClient } from "../../../api/api";
import { ComponentRequest } from "../../../interfaces/component.interface";
import { LevelModel } from "../../../interfaces/level.interface";
import { ThicknessModel } from "../../../interfaces/thickness.interface";
import { useModelMutations } from "../../../state/atom";
import ButtonWrapper from "../Button/ButtonWrapper";
import Select from "../Select/SelectWrapper";
import { TextfieldWrapper } from "../TextField/TextFieldWrapper";

const REGEX = {
  PART_NUMBER: {
    REGEX: /([\w]{4}-[\d]{4})/,
    MESSAGE: `O pradrão 'AAAA-0000' é esperado.`,
  },
};
interface Prop {
  action?: "Create" | "Update";
  data?: ComponentRequest;
}

interface SelectItem {
  id: number;
  name: string;
}

export const FormComponent = ({ action, data, ...props }: Prop) => {
  const router = useRouter()

  

  Yup.setLocale(ptShort);
  
  const filedsClean = {
    id: "",
    codePartNumber: "",
    levelId: "",
    numberMaxBacking: "",
    espessura: "",
    timeToleranceInBaking: "",
  };
  
  const INITIAL_FORM_STATE = data ?
    {
      id: data.id,
      codePartNumber: data.codePartNumber,
        levelId: data.levelId,
        numberMaxBacking: data.numberMaxBacking,
        espessura: data.espessura,
        timeToleranceInBaking: data.timeToleranceInBaking

    } : filedsClean;

  const FORM_VALIDATION = Yup.object().shape({
    codePartNumber: Yup.string().required(),
    levelId:Yup.number().integer().required(),
    numberMaxBacking: Yup.number().integer().moreThan(0).lessThan(6).required(),
    espessura: Yup.number().moreThan(0).lessThan(20.01).required(),
    timeToleranceInBaking: Yup.number().integer().required()

  });

  const { createModel, updateModel } = useModelMutations();

  const [listLevel, setListLevel] = useState<SelectItem[]>([]);
  const [listThickness, setListThickness] = useState<SelectItem[]>([]);


  useLayoutEffect(() => {
    apiClient
      .listAll<{ result: LevelModel[] }>("nivel/?orderBy=levelName&size=1000")
      .then(({ result }) => {
        const levelItems = result.map((item: LevelModel) => {
          return { id: item.id!, name: item.levelName };
        });
        setListLevel(levelItems);
      });
  }, []);

  useLayoutEffect(() => {
    apiClient
      .listAll<{ result: ThicknessModel[] }>("espessura/?orderBy=thicknessName")
      .then(({ result }) => {
        const thicknessItems = result.map((item: ThicknessModel) => {
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
      //   
      //   const { id } = values;
      //   action === "Update" && id
      //     ? await updateModel<Thickness>({
      //         endpoint: "espessura",
      //         payload: { ...values, id },
      //       })
      //     : await createModel<Thickness>({ endpoint: "espessura", payload: values });
      // }}
      validateOnBlur={true}
      onSubmit={async (values:any, actions) => {
        
        let response: any;
        if (action === "Update") {
          const { id } = values ;
          response = await updateModel<ComponentRequest>({
            endpoint: "partNumber",
            payload: { ...values, id },
          });
        }
        
        if (action === "Create") {
          response = await createModel<ComponentRequest>({
            endpoint: "partNumber",
            payload: values,
          });
        }

        if (!response.error && response === "created") {
          actions.resetForm();
        }

        
      }}
    >
      <Form className={styles.formWrapper}>
        <TextfieldWrapper
          name={"codePartNumber"}
          label={"Partnumber"}
          mask={/^[\d|\w|\-|\.]{1,16}$/}
        />

        <Select  items={listLevel} name={"levelId"} label={"Nível"} />

        <TextfieldWrapper
          inputProps={{ 
                    min: 0, max: 400, step: .1
          }}
          type="number"
          name={"espessura"}
          label={"Espessura (mm)"}
 
        />
        <TextfieldWrapper
          inputProps={{ min: 0, step: 1, max:1000 }}
          type="number"
          name={"timeToleranceInBaking"}
          label={"Tempo de tolerância de baking (minutos)"}
        />
        <TextfieldWrapper
          inputProps={{ min: 0, step: 1, max: 1000 }}
          type="number"
          name={"numberMaxBacking"}
          label={"Número máximo de baking"}
        />
        <ButtonWrapper fixed>{"enviar"}</ButtonWrapper>
      </Form>
    </Formik>
  );
};
