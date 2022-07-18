import * as React from "react";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  useScrollTrigger
} from "@mui/material";
import { Formik, Form } from "formik";
import ButtonWrapper from "../FormsUI/Button/ButtonWrapper";
import TextfieldWrapper from "../FormsUI/TextField/TextFieldWrapper";
import ToggleBottonWrapper from "../FormsUI/ToggleBotton/ToggleBottonWrapper";
import styles from "../../../styles/Login.module.scss";
import { ptShort } from "yup-locale-pt";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;

  console.log('children', children)
  console.log('window', window)
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Swipeable({ ...props }: Props) {
  
  const [state, setState] = React.useState(false);
  Yup.setLocale(ptShort);
  const INITIAL_FORM_STATE = {
    moistureSensitive: 'no',
    partNumber: "sasasa",
    level: "asasas",
    thickness: "2",
    temperature: "3",
    minimumTime: "2",
    maximumExposureTime: "2",
    maximumNumberOfBaking: "0",
  };
  const FORM_VALIDATION = Yup.object().shape({
    moistureSensitive: Yup.string().required(),
    level: Yup.string().required(),
    partNumber: Yup.string().required().min(3),
    thickness: Yup.number().positive().required(),
    temperature: Yup.number().positive().required(),
    minimumTime: Yup.number().positive().required(),
    maximumExposureTime: Yup.number().positive().required(),
    maximumNumberOfBaking: Yup.number().positive().required(),
  });

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  return (
    <>
      <Button onClick={toggleDrawer(true)}>Abrir</Button>
      <SwipeableDrawer
        anchor={"right"}
        sx={{
          "& .MuiDrawer-paper": {
            minHeight: "100vh",
            // top: 20,
            // bottom: 20,
            borderRadius: "8px 0 0 8px",
            overflow: "hidden",
          },
          display: "flex",
          zIndex: 9999,
        }}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{
            background: "#F5F7FB",
            flexGrow: 1,
            width: 512,
            fontSize: 22,
            overflowY: "scroll",
          }}
        >
          <CssBaseline />
          <ElevationScroll >
            <AppBar
              elevation={20}
              position="fixed" 
              sx={{
                position: "absolute",
                minHeight: 80,
                background: "white",
                right: "auto",
              }}
            >
              <Toolbar sx={{ height: 80 }}>
                <Typography
                  fontWeight={800}
                  color={"#64A70B"}
                  textTransform={"uppercase"}
                  variant="h6"
                  component="h6"
                >
                  Component "modal"
                </Typography>
              </Toolbar>
            </AppBar>
          </ElevationScroll>

          <Box sx={{ p: 6, pt: 15 }}>
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE,
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                console.log(values, "values print");
              }}
            >
              <Form className={styles.formWrapper}>
                <TextfieldWrapper name={"partNumber"} label={"Part Number"} />
                <TextfieldWrapper name={"level"} label={"Nível"} />
                <ToggleBottonWrapper
                  name="moistureSensitive"
                  legend="Sensibilidade à umidade?"
                  data={[
                    { label: "Sim", value: "yes" },
                    { label: "Não", value: "no" },
                  ]}
                />
                <TextfieldWrapper type='number' name={"thickness"} label={"Espessura"} />
                <TextfieldWrapper type='number' name={"temperature"} label={"Temperatura"} />
                <TextfieldWrapper type='number' name={"minimumTime"} label={"Tempo mínimo"} />
                <TextfieldWrapper type='number' name={"maximumExposureTime"} label={"Tempo de exposição máximo"} />
                <TextfieldWrapper type='number' name={"maximumNumberOfBaking"} label={"Número máximo de baking"} />
                <ButtonWrapper>enviar</ButtonWrapper>
              </Form>
            </Formik>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
