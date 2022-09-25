import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { ptShort } from "yup-locale-pt";
import styles from "../../../../styles/Login.module.scss";
import { apiClient } from "../../../api/api";
import { useLevelsMutations } from "../../../state/atom";
import ButtonWrapper from "../Button/ButtonWrapper";
import Select from "../Select/SelectWrapper";
import TextfieldWrapper from "../TextField/TextFieldWrapper";

export interface Inventory {
  typeInventory: {
    id: number;
    name: string;
  };
  codeInventory: string;
  description: string;
  temperature: number | null;
}
interface Prop {
  action?: "create" | "read" | "update" | "delete";
  data?: Inventory;
}
export interface InventorySelectList {
  id: number;
  name: string;
}


export const FormInventory = ({ action, data, ...props }: Prop) => {
  const { listAllModel, updateModel, createModel } = useLevelsMutations();
  const [disabledTemperature, setDisabledTemperature] = useState<boolean>(true);
  const [inventorySelectList, setInventorySelectList] = useState<
    InventorySelectList[]
  >([]);
  const [inventoryTenperatureList, setInventoryTenperatureList] = useState<
    any[]
  >([]);
  const FORNO = 4
  Yup.setLocale(ptShort);

  const filedsClean: Inventory = {
    codeInventory: "",
    description: "",
    temperature: null,
    typeInventory: {
      id: 5,
      name: "Máquina de Bandeja",
    },
  };
  const INITIAL_FORM_STATE = data ? data : filedsClean;
  // console.log("data in form", data)
  useEffect(() => {
    apiClient.listAll<any[]>("inventario/tipos").then((result) => {
      console.log(result);
      const newInventorySelectlist = result.map((type) => {
        return {
          name: type.description,
          id: type.id,
        };
      });
      setInventorySelectList(newInventorySelectlist);
    });
  }, []);


  useEffect(() => {
    apiClient.listAll<InventorySelectList[]>("inventario/temperaturas").then((result) => {
      console.log("temperature", result);
      setInventoryTenperatureList(result);
    });
  }, []);

  const FORM_VALIDATION = Yup.object().shape({
    type: Yup.number().required(),
    codeInventory: Yup.string().required(),
    line: Yup.string().required(),
    description: Yup.string().required(),
    temperature: Yup.number(),
  });

  const validate = (values: any) => {
    console.log("mudou values", values)
    if (values.typeInventoryId === FORNO) {
      setDisabledTemperature(false);
    } else {
      setDisabledTemperature(true);
      values.temperature = 0
    }
  };
  console.log("data in form inventory", data);
  console.log("initial in form inventory", INITIAL_FORM_STATE);
  return (
    <>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validate={validate}
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
          resetForm,
        }) => (
          <Form className={styles.formWrapper}>
            <Select
              disabled={false}
              items={inventorySelectList}
              name={"typeInventoryId"}
              label={"Tipo"}
            />
            {/* { Number(values.typeInventory.id) === 5 &&  <TextfieldWrapper  name={"line"} label={"Linha"} />} */}

            <TextfieldWrapper name={"codeInventory"} label={"Código"} />

            <TextfieldWrapper name={"description"} label={"Descrição"} />

            <Select
              disabled={disabledTemperature}
              items={inventoryTenperatureList}
              name={"temperature"}
              label={"Temperatura"}
            />

            <ButtonWrapper fixed>{"enviar"}</ButtonWrapper>
          </Form>
        )}
      </Formik>
    </>
  );
};
