import {
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Slide,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { ReactNode, useContext } from "react";
import styles from "../../styles/Login.module.scss";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ptShort } from "yup-locale-pt";
import ButtonWrapper from "../../src/components/FormsUI/Button/ButtonWrapper";
import TextfieldWrapper from "../../src/components/FormsUI/TextField/TextFieldWrapper";
import ToggleBottonWrapper from "../../src/components/FormsUI/ToggleBotton/ToggleBottonWrapper";
import { IconKey, IconUser, IconUserX } from "@tabler/icons";
import { fontSize } from "@mui/system";
import DomainLabel from "../../src/components/Helpers/DomainLalbel";
import { AuthContext } from "../../src/contexts/AuthContext";
interface Login {
  email: string;
  password: string;
}
function index() {
  Yup.setLocale(ptShort);

  const containerRef = React.useRef(null);

  const INITIAL_FORM_STATE = {
    email: "admin@admin.com",
    password: "123456",
  };

  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(6),
  });

  const { isAuthenticaton, signIn } = useContext(AuthContext)
  
  async function handleSubmite({email, password}:Login){
    const data = {
      email,
      password
    }
    await signIn(data)
  }


  return (
    <>
      <Box
        ref={containerRef}
        minHeight={100 + "vh"}
        className={styles.container}
        component="main"
        sx={{ padding: 0, flexGrow: 1, p: 3 }}
      >
        <div className={styles.logoWrapper}>
          <Image
            src="/logo/compal-type.svg"
            alt="Compal Logo"
            width={106.79}
            height={20}
          ></Image>
        </div>
        <Box className={styles.formWrapper} minHeight={"100vh"}>
          <Image
            src="/logo/compal-symbol.svg"
            alt="Compal Logo"
            width={50}
            height={50}
          ></Image>
          <Paper elevation={10} className={styles.content}>
            <Typography
              color={"#424753"}
              variant="h4"
              sx={{
                my: 2,
                fontSize: 22,
                color: "#636B69",
                letterSpacing: 1,
                fontWeight: 700,
              }}
            >
              Admin MSD
            </Typography>
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE,
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={({password, email}, actions) => {
                handleSubmite({password, email})
              }}
            >
              <Form className={styles.formWrapper}>
                <TextfieldWrapper
                  startAdornment={
                    <InputAdornment position="start">
                      <IconUser color="#c1c1c1" />
                    </InputAdornment>
                  }
                  name={"email"}
                  label={"Email"}
                />
                <TextfieldWrapper
                  startAdornment={
                    <InputAdornment position="start">
                      <IconKey color="#c1c1c1" />
                    </InputAdornment>
                  }
                  name={"password"}
                  label={"Senha"}
                />
                <ButtonWrapper
                  disableElevation
                  sx={{ minHeight: 56, color: "white" }}
                >
                  enviar
                </ButtonWrapper>
              </Form>
            </Formik>
          </Paper>
        </Box>
        <Box className={styles.rightContainer} minHeight={"100vh"}></Box>
      </Box>
    </>
  );
}

export default index;
