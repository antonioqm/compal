import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { ptShort } from "yup-locale-pt";
import styles from "../../../../styles/Login.module.scss";
import { apiClient } from "../../../api/api";
import { useModelMutations } from "../../../state/atom";
import ButtonWrapper from "../Button/ButtonWrapper";
import Select from "../Select/SelectWrapper";
import { TextfieldWrapper } from "../TextField/TextFieldWrapper";

export interface Inventory {
  id?: number;
  typeInventoryId: number;
  codeInventory: string;
  description: string;
  temperature?: number;
}

export interface DataProp {
  id: number;
  typeInventory: InventorySelectList;
  codeInventory: string;
  description: string;
  temperature: number;
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
  const router = useRouter()
  const { listAllModel, updateModel, createModel } = useModelMutations();
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
    typeInventoryId: 0,
    temperature: 0

  };

  if (data) {
    const { typeInventory, ...dataLessTypeInventory } = data;
    INITIAL_FORM_STATE = { typeInventoryId: typeInventory.id, ...dataLessTypeInventory }
  }


  // 
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
      return typeInventoryId === FORNO ? schema.required() : schema.notRequired()
    }),
  });

  const validateTemperature = (values: Inventory) => {
    if (values.typeInventoryId === FORNO) {
      setDisabledTemperature(false);
    } else {
      setDisabledTemperature(true);
      values.temperature = 0
      const { temperature, ...restValues } = values
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validateOnBlur={true}
        validate={validateTemperature}
        validationSchema={FORM_VALIDATION}
        onSubmit={async (values: Inventory, actions) => {

          const { id } = values;
          let response: any;
          if (action === "Update" && id) {
            const { temperature, ...rest } = values
            values = values.typeInventoryId !== FORNO ? { ...rest } : values;
            response = await updateModel<Inventory & { itemInventory: null, id: number }>({ endpoint: "inventario", payload: { ...values, itemInventory: null, id } });
          }

          if (action === "Create") {
            response = await createModel<Inventory & { itemInventory: null }>({ endpoint: "inventario", payload: { ...values, itemInventory: null } });
              
          }

          if (!response.error && response === "created") {
            actions.resetForm();
          }

            
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
              disabled={action === 'Update' ? true : false}
              ref={selectRefTypeInventory}
              items={inventorySelectList}
              name={"typeInventoryId"}
              label={"Tipo"}
            />
            {/* { Number(values.typeInventory.id) === 5 &&  <TextfieldWrapper  name={"line"} label={"Linha"} />} */}

            <TextfieldWrapper name={"codeInventory"} label={"Código"}
              disabled={action === 'Update' ? true : false}
            />

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

            <ButtonWrapper fixed>{`${action === "Create" ? "Criar" : "Atualizar"
              }`}</ButtonWrapper>
          </Form>
        )}
      </Formik>
    </>
  );
};
