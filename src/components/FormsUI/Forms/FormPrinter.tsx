import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { ptShort } from "yup-locale-pt";
import styles from "../../../../styles/Login.module.scss";
import { apiClient } from "../../../api/api";
import { LabelModel } from "../../../interfaces/label.interface";
import { useLevelsMutations } from "../../../state/atom";
import ButtonWrapper from "../Button/ButtonWrapper";
import TextfieldWrapper from "../TextField/TextFieldWrapper";
import ToggleBottonWrapper from "../ToggleBotton/ToggleBottonWrapper";

interface PrintProps {
  etiqueta: LabelModel;
}

interface EtiquetaRequest {
  end: number | string;
  start: number | string;
  printerInterval: boolean;
}

export const FormPrinter = ({etiqueta}:PrintProps) => {
  const { listAllModel, updateModel, createModel } = useLevelsMutations();
  const [disabledStart, setDisabledStart] =
    useState<boolean>(false);
  const [disabledEnd, setDisabledEnd] =
    useState<boolean>(false);

  const [inventoryTenperatureList, setInventoryTenperatureList] = useState<
    any[]
  >([]);
  Yup.setLocale(ptShort);

  let INITIAL_FORM_STATE: EtiquetaRequest = {
    start:  etiqueta ? 1 : "",  
    end: etiqueta ? etiqueta.quantity : "",
    printerInterval: false
  };

  const FORM_VALIDATION = Yup.object().shape({
    printerInterval: Yup.string().required(),
    start: Yup.number(),
    end: Yup.number().required(),
  });

  const validateStartEnd = (values: EtiquetaRequest) => {
    if (values.printerInterval as boolean) {
      setDisabledStart(true);
      setDisabledEnd(true);
      values.end = etiqueta.quantity;
    } else {
      setDisabledStart(false);
      setDisabledEnd(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validate={validateStartEnd}
        validationSchema={FORM_VALIDATION}
        onSubmit={async (etiquetaRequest: EtiquetaRequest) => {
          console.log("values", etiquetaRequest);
          const printedResponse = await apiClient.get(`etiquetas/imprimir/${etiqueta.id}/${etiquetaRequest.start}/${etiquetaRequest.end}`)
          console.log(printedResponse);
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
            <ToggleBottonWrapper
              name="printerInterval"
              legend="Quantidade de códigos"
              data={[
                { label: "Todas", value: true },
                { label: "Intervalo", value: false },
              ]}
            />
            <TextfieldWrapper type="number"  inputProps={{ min: 1, step: 1, max: values.end }} disabled={disabledStart} name={"start"} label={"Inicial"} />
            <TextfieldWrapper type="number"  inputProps={{ min: 1, step: 1, max: values.end }} disabled={disabledEnd} name={"end"}  label={"Final"} />
            <ButtonWrapper fixed>Imprimir</ButtonWrapper>
          </Form>
        )}
      </Formik>
    </>
  );
};
