import * as React from "react";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import {
  AppBar,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
import ButtonWrapper from "../FormsUI/Button/ButtonWrapper";
import TextfieldWrapper from "../FormsUI/TextField/TextFieldWrapper";
import ToggleBottonWrapper from "../FormsUI/ToggleBotton/ToggleBottonWrapper";
import styles from "../../../styles/Login.module.scss";
import { ptShort } from "yup-locale-pt";
import { useState } from "react";
import ElevationScroll from "../ElevationScroll";
import { IconArrowLeft } from "@tabler/icons";

export default function Swipeable() {
  const [scrollTarget, setScrollTarget] = useState<any>();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  Yup.setLocale(ptShort);
  const INITIAL_FORM_STATE = {
    moistureSensitive: "no",
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
    partNumber: Yup.string().required().min(3).matches(/([\w]{4}-[\d]{4})/, `O pradrão 'AAAA-0000' é esperado.`),
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

      setIsOpenDrawer(open);
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
        open={isOpenDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          ref={(node) => {
            if (node) {
              setScrollTarget(node ? node : undefined);
            }
          }}
          sx={{
            flexGrow: 1,
            width: 512,
            fontSize: 22,
            overflowY: "scroll",
          }}
        >
          <CssBaseline />
          <ElevationScroll window={scrollTarget}>
            <AppBar
              elevation={20}
              position="fixed"
              sx={{
                position: "absolute",
                minHeight: 80,
                background: "white",
                right: "auto",
                px: 0,
              }}
            >
              <Toolbar
                sx={{ px: 0, height: 80, "&.MuiToolbar-root": { p: 2 } }}
              >
                <IconButton onClick={toggleDrawer(false)} sx={{ mr: 2 }}>
                  <IconArrowLeft></IconArrowLeft>
                </IconButton>
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

          <Divider sx={{ mt: 10, }} variant="fullWidth"></Divider>
          <Box sx={{ p: 6, mb: 14 }}>
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
                <TextfieldWrapper
                  type="number"
                  name={"thickness"}
                  label={"Espessura"}
                />
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
                  name={"maximumExposureTime"}
                  label={"Tempo de exposição máximo"}
                />
                <TextfieldWrapper
                  type="number"
                  name={"maximumNumberOfBaking"}
                  label={"Número máximo de baking"}
                />
                <ButtonWrapper fixed>enviar</ButtonWrapper>
              </Form>
            </Formik>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
