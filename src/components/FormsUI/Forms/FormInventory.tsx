import { Formik, Form, useFormikContext, FieldArray } from "formik";
import ButtonWrapper from "../../../components/FormsUI/Button/ButtonWrapper";
import TextfieldWrapper from "../../../components/FormsUI/TextField/TextFieldWrapper";
import ToggleBottonWrapper from "../../../components/FormsUI/ToggleBotton/ToggleBottonWrapper";
import { useEffect, useState } from "react";
import { ptShort } from "yup-locale-pt";
import * as Yup from "yup";
import styles from "../../../../styles/Login.module.scss";
import Select from "../../../components/FormsUI/Select/SelectWrapper";
import { Typography } from "@mui/material";
import { useLevelsMutations } from "../../../state/atom";

interface Prop {
  action?: "create" | "read" | "update" | "delete";
}

export interface Inventory {
  typeInventoryId: number;
  codeInventory: string;
  description: string;
  temperature: number;
}

export interface InventoryTypes{
    id: number,
		description: string,
		temperatureAllowed: boolean,
		temperatureRequired: boolean
}


export const FormInventory = ({ action, ...props }: Prop) => {
  const {listAllModel } = useLevelsMutations();
  const [disabledTemperature, setDisabledTemperature] = useState<boolean>(true);
  const [inventoryTypes, setInventoryTypes] = useState<InventoryTypes[]>([]);
   
  Yup.setLocale(ptShort);
  const INITIAL_FORM_STATE = {
    typeInventoryId: "",
    codeInventory: "",
    description: "",
    temperature: "",
  };

  const typeTemperatues = [
    {
      id: 1,
      name: "40 ºC",
    },
    {
      id: 2,
      name: "90 ºC",
    },
    {
      id: 3,
      name: "125 ºC",
    },
  ];
  const typeItems = [
    {
      id: 1,
      name: "Dry Box",
    },
    {
      id: 2,
      name: "Dry Pack",
    },
    {
      id: 3,
      name: "Feeder Car",
    },
    {
      id: 4,
      name: "Forno",
    },
    {
      id: 5,
      name: "Máquina de Bandeja",
    },
  ];

  const FORM_VALIDATION = Yup.object().shape({

  });

  // const validate = (values: Inventory) => {
  //   if (Number(values.type) === 4) {
  //     setDisabledTemperature(false);
  //   } else {
  //     setDisabledTemperature(true);
  //   }
  // };

  useEffect(() => {
    listAllModel<{ result: InventoryTypes[] }>('inventario/tipos').then(({ result }) => {
      setInventoryTypes(result);
     })

  }, [])
  return (
    <>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validate={(values: any) => {}}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          // console.log(values, "values print");
        }}
      >
        {({
          values,
          errors,
          isSubmitting,
          isValid,
          setValues,
          setFieldValue,
          resetForm
        }) => (
          <Form className={styles.formWrapper}>
            <Select
              disabled={false}
              items={inventoryTypes}
              name={"typeInventoryId"}
              label={"Tipo"}
            />
           

            <TextfieldWrapper name={"codeInventory"} label={"Código"} />
            <TextfieldWrapper name={"description"} label={"Descrição"} />
            <TextfieldWrapper name={"temperature"} label={"Temperatura"} type="number" />

          

            <ButtonWrapper fixed>{"enviar"}</ButtonWrapper>
          </Form>
        )}
      </Formik>
    </>
  );
};
