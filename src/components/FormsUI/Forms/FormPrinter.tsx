import {
  Alert,
  AlertTitle,
  Box,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  Stack,
  Typography
} from "@mui/material";
import { IconPrinter, IconX } from "@tabler/icons";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import { ptShort } from "yup-locale-pt";
import styles from "../../../../styles/Login.module.scss";
import { apiClient } from "../../../api/api";
import { LabelModel } from "../../../interfaces/label.interface";
import { useModelMutations } from "../../../state/atom";
import ButtonWrapper from "../Button/ButtonWrapper";
import { TextfieldWrapper } from "../TextField/TextFieldWrapper";
import ToggleBottonWrapper from "../ToggleBotton/ToggleBottonWrapper";

interface PrintProps {
  etiqueta: LabelModel;
  updateDialog: () => void;
}

interface EtiquetaRequest {
  end: number | string;
  start: number | string;
  printerInterval: boolean;
}

export const FormPrinter = ({ etiqueta, updateDialog }: PrintProps) => {
  const router = useRouter()
  const { listAllModel, updateModel, createModel } = useModelMutations();
  const [disabledStart, setDisabledStart] = useState<boolean>(false);
  const [disabledEnd, setDisabledEnd] = useState<boolean>(false);
  const [showMessageSucess, setShowMessageSucess] = useState<boolean>(false);
  const [printedResponse, setPrintedResponse] = useState<string>("");
  const [awaitingPrinting, setAwaitingPrinting] = useState<boolean>(false);

  const [inventoryTenperatureList, setInventoryTenperatureList] = useState<
    any[]
  >([]);
  Yup.setLocale(ptShort);

  let INITIAL_FORM_STATE: EtiquetaRequest = {
    start: etiqueta ? 1 : '',
    end: etiqueta ? etiqueta.quantity : '',
    printerInterval: false,
  };

  const FORM_VALIDATION = Yup.object().shape({
    printerInterval: Yup.boolean().required(),
    start: Yup.number()
      .integer()
      .positive()
      .required()
      .max(Yup.ref('end'), 'Não pode ser maior que o campo "final"'),
    end: Yup.number()
      .integer()
      .positive()
      .required()
      .max(typeof INITIAL_FORM_STATE.end === 'number' ? INITIAL_FORM_STATE.end : 0, 'Não pode ser maior que o intervalo "final" pré-configurado.')
      .min(Yup.ref('start'), 'Não pode ser menor que o campo "inicial".'),
  });

  const validateStartEnd = (values: EtiquetaRequest) => {

    if (values.printerInterval as boolean) {
      values.start = '1';
      values.end = etiqueta.quantity;
      setDisabledStart(true);
      setDisabledEnd(true);
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
        onSubmit={async (etiquetaRequest: EtiquetaRequest, actions) => {
          
          try {
            setAwaitingPrinting(true);
            const printedResponse = await apiClient.get(
              `etiquetas/imprimir/${etiqueta.id}/${etiquetaRequest.start}/${etiquetaRequest.end}`
            );
            setAwaitingPrinting(false);
            setShowMessageSucess(true);
            setPrintedResponse(printedResponse.message);
          } catch (e: any) {
            setShowMessageSucess(false);
          }
          actions.resetForm()
        }}
      >
        {/* {showMessageSucess && <Typography>{printedResponse}</Typography>} */}
        {({
          values,
          errors,
          isSubmitting,
          isValid,
          setValues,
          setFieldValue,
          resetForm,
          initialValues,
          status,

        }) => (
          <>
            {!showMessageSucess && (
              <DialogTitle
                sx={{
                  display: "flex",
                  alignContent: "space-between",
                  justifyContent: "space-between",
                }}
                id="alert-dialog-title"
              >
                <Stack flexDirection={"row"}>
                  {" "}
                  <IconButton disableRipple>
                    <IconPrinter />
                  </IconButton>{" "}
                  {`Imprimir `}
                </Stack>
                <IconButton
                  onClick={() => {
                    updateDialog();
                    setShowMessageSucess(false);
                  }}
                >
                  <IconX />{" "}
                </IconButton>
              </DialogTitle>
            )}
            <DialogContent sx={{ p: 0 }}>
              <Box sx={{ px: 4, pt: 0, pb: showMessageSucess ? 0 : 4 }}>
                <Form className={styles.formWrapper}>
                  {/* <FormPrinter etiqueta={etiqueta}  /> */}

                  {showMessageSucess && !awaitingPrinting && (
                    <Alert closeText="fechar" sx={{ p: 5 }} severity="info">
                      <IconButton
                        onClick={() => {
                          updateDialog();
                          setShowMessageSucess(false);
                        }}
                        sx={{ position: "absolute", top: 16, right: 16 }}
                      >
                        {" "}
                        <IconX />{" "}
                      </IconButton>
                      <AlertTitle>Finalizado</AlertTitle>
                      {printedResponse}
                    </Alert>
                  )}

                  {!showMessageSucess && !awaitingPrinting && (
                    <>
                      <ToggleBottonWrapper
                        name="printerInterval"
                        legend="Quantidade de códigos"
                        data={[
                          { label: "Todas", value: true },
                          { label: "Intervalo", value: false },
                        ]}
                      />
                      <TextfieldWrapper
                        type="number"
                        inputProps={{ min: 1, step: 1, max: values.end }}
                        disabled={disabledStart}
                        name={"start"}
                        label={"Inicial"}
                      />
                      <TextfieldWrapper
                        type="number"
                        inputProps={{ min: 1, step: 1, max: values.end }}
                        disabled={disabledEnd}
                        name={"end"}
                        label={"Final"}
                      />
                      <ButtonWrapper disableElevation>Imprimir</ButtonWrapper>
                    </>
                  )}
                  {awaitingPrinting && (
                    <Box sx={{ width: "100%", p: 4 }}>
                      <Stack direction={"column"} spacing={2}>
                        <Typography variant="overline">Imprimindo</Typography>
                        <LinearProgress color="info" />
                      </Stack>
                    </Box>
                  )}
                </Form>
              </Box>
            </DialogContent>
            {/* <DialogActions sx={{}}></DialogActions> */}
          </>
        )}
      </Formik>
    </>
  );
};
