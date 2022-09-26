import {
  Box, InputAdornment, Paper, Typography
} from "@mui/material";
import { IconKey, IconUser } from "@tabler/icons";
import { Form, Formik } from "formik";
import Image from "next/image";
import React, { useContext } from "react";
import * as Yup from "yup";
import { ptShort } from "yup-locale-pt";
import ButtonWrapper from "../src/components/FormsUI/Button/ButtonWrapper";
import TextfieldWrapper from "../src/components/FormsUI/TextField/TextFieldWrapper";
import { AuthContext } from "../src/contexts/AuthContext";
import { withSSRGuest } from "../src/utils/withSSRGuest";
import styles from "../styles/Login.module.scss";
interface Login {
  email: string;
  password: string;
}
export default () => {
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
          <Paper elevation={0} className={styles.content}>
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
                  entrar
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


export const getServerSideProps = withSSRGuest(async (ctx) => {
 
  return {
    props: {}
  }
})
