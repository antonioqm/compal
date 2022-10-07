import { Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { ptShort } from "yup-locale-pt";
import styles from "../../../../styles/Login.module.scss";
import { apiClient } from "../../../api/api";
import { useLevelsMutations } from "../../../state/atom";
import ButtonWrapper from "../Button/ButtonWrapper";
import Select from "../Select/SelectWrapper";
import TextfieldWrapper from "../TextField/TextFieldWrapper";

export interface Inventory {
  id?: number;
  typeInventoryId: number | string;
  codeInventory: string;
  description: string;
  temperature: number | string;
}

export interface DataProp {
  id: number;
  typeInventory: InventorySelectList;
  codeInventory: string;
  description: string;
  temperature: number | string;
}
interface Prop {
  action?: "Create" | "Update";
  data?: DataProp;
}
export interface InventorySelectList {
  id: number;
  name: string;
}

export const FormInventory = ({ action, data, ...props }: Prop) => {
  const { listAllModel, updateModel, createModel } = useLevelsMutations();
  const [disabledTemperature, setDisabledTemperature] = useState<boolean>((false));
  const [inventorySelectList, setInventorySelectList] = useState<
    InventorySelectList[]
  >([]);
  const [inventoryTenperatureList, setInventoryTenperatureList] = useState<
    any[]
  >([]);
  const FORNO = 4;
  const selectRefTypeInventory = useRef(null);
  const selectRefTemperature = useRef(null);
  Yup.setLocale(ptShort);

  let INITIAL_FORM_STATE: Inventory = {
    codeInventory: "",
    description: "",
    temperature: "",
    typeInventoryId: "",
  };

  if (data) {
    const { typeInventory, ...dataLessTypeInventory } = data;
    INITIAL_FORM_STATE = { typeInventoryId: typeInventory.id, ...dataLessTypeInventory}
  }


  // console.log("data in form", data)
  useEffect(() => {
    apiClient.listAll<any[]>("inventario/tipos").then((result) => {
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
    apiClient
      .listAll<InventorySelectList[]>("inventario/temperaturas")
      .then((result) => {
        setInventoryTenperatureList(result);
      });
  }, []);

  const FORM_VALIDATION = Yup.object().shape({
    codeInventory: Yup.string().required(),
    description: Yup.string().required(),
    typeInventoryId: Yup.number(),
    temperature: Yup.number().when('typeInventoryId', (typeInventoryId, schema) => {
      return  typeInventoryId === 4 ? schema.required() : schema.notRequired()
    }),
  });

  const validateTemperature = (values: Inventory) => {
    if (values.typeInventoryId === FORNO) {
      setDisabledTemperature(false);
    } else {
      setDisabledTemperature(true);
      values.temperature = "";
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validate={validateTemperature}
        validationSchema={FORM_VALIDATION}
        onSubmit={async (values: Inventory ) => {
          
          const { id } = values;
          action === "Update" && id
            ? await updateModel<Inventory>({
                endpoint: "inventario",
                payload: { ...values, id },
              })
            : await createModel<Inventory>({ endpoint: "inventario", payload: values });
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
              ref={selectRefTypeInventory}
              items={inventorySelectList}
              name={"typeInventoryId"}
              label={"Tipo"}
            />
            {/* { Number(values.typeInventory.id) === 5 &&  <TextfieldWrapper  name={"line"} label={"Linha"} />} */}

            <TextfieldWrapper name={"codeInventory"} label={"Código"} />

            <TextfieldWrapper
              minRows={3}
              maxRows={6}
              multiline
              name={"description"}
              label={"Descrição"}
            />

            <Select
              ref={selectRefTemperature}
              disabled={disabledTemperature}
              items={inventoryTenperatureList}
              name={"temperature"}
              label={"Temperatura"}
            />

            <ButtonWrapper fixed>{`${
              action === "Create" ? "Criar" : "Atualizar"
            }`}</ButtonWrapper>
          </Form>
        )}
      </Formik>
    </>
  );
};
