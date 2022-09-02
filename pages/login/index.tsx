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
import React, { ReactNode } from "react";
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
import { IconUser } from "@tabler/icons";
import { fontSize } from "@mui/system";
import DomainLabel from "../../src/components/Helpers/DomainLalbel";

function index() {
  Yup.setLocale(ptShort);

  const theme = useTheme();
  interface State {
    password: string;
    showPassword: boolean;
    identifier: string;
    loginType: "local" | "domain";
    showDomain: boolean;
  }

  const [values, setValues] = React.useState<State>({
    password: "",
    showPassword: false,
    identifier: "antonio",
    loginType: "domain",
    showDomain: true,
  });
  const containerRef = React.useRef(null);

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;
      if (values.loginType === "domain") {
        newValue = newValue.replace(/@$/g, "");
      }
      setValues({ ...values, [prop]: newValue });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    newLoginType: "local" | "domain" | null
  ) => {
    if (newLoginType === "domain" && newLoginType !== null) {
      setValues({
        ...values,
        identifier: values.identifier.replace(/@.+$/g, ""),
        loginType: newLoginType,
        showDomain: true,
      });
    } else if (newLoginType === "local" && newLoginType !== null) {
      setValues({
        ...values,
        loginType: newLoginType,
        showDomain: false,
      });
    }
  };

  const INITIAL_FORM_STATE = {
    loginType: "domain",
    identifier: "",
    password: "as",
    showDomain: false
  };
  const FORM_VALIDATION = Yup.object().shape({
    loginType: Yup.string().required(),
    identifier: Yup.string().required().min(3),
    password: Yup.string().required().min(8)
  });
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
              onSubmit={(values) => {
              }}
            >
              <Form className={styles.formWrapper}>
                <ToggleBottonWrapper
                  name="loginType"
                  legend="Como você gostaria de se identificar?"
                  data={[{label:'Domínio', value: 'domain'}, {label: 'Local', value: 'local'}]}
                />
                <TextfieldWrapper
                  name={"identifier"}
                  endAdornment={
                      <DomainLabel showDomain={values.showDomain}  />
                    // <>

                    // <Slide
                    //   direction="left"
                    //   in={values.showDomain}
                    //   container={containerRef.current}
                    // >
                    //   <InputAdornment position="end">
                    //     {values.loginType === "domain" && <DomainLabel />}
                    //   </InputAdornment>
                    // </Slide>
                    // </>
                  }
                  label={"Identificador"}
                />
                <TextfieldWrapper name={"password"} label={"Senha"} />
                {/* <TextfieldWrapper name={"password"} />
                <ButtonWrapper>enviar</ButtonWrapper> */}

                {/* <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-identifier">
                    Identificador
                  </InputLabel>
                  <OutlinedInput
                    sx={{ pr: 1, overflow: "hidden" }}
                    id="outlined-adornment-identifier"
                    type="text"
                    value={values.identifier}
                    onChange={handleChange("identifier")}
                    startAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          disabled
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="start"
                        >
                          <IconUser color="#c1c1c1" />
                        </IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      values.showDomain && (
                        <Slide
                          direction="left"
                          in={values.showDomain}
                          container={containerRef.current}
                        >
                          <InputAdornment position="end">
                            {values.loginType === "domain" && <DomainLabel />}
                          </InputAdornment>
                        </Slide>
                      )
                    }
                    label="Identificador"
                  />
                </FormControl> */}
                {/* <FormControl fullWidth variant="outlined">
                  <InputLabel focused htmlFor="outlined-adornment-password">
                    Senha
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    startAdornment={
                      <InputAdornment position="start">
                        <IconButton
                          disabled
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="start"
                        >
                          <IconKey color="#c1c1c1" />
                        </IconButton>
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {values.showPassword ? <IconEyeOff /> : <IconEye />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Senha"
                  />
                </FormControl> */}
                {/* <Button
              sx={{ minHeight: 56, color: "white" }}
              size="large"
              disableElevation
              fullWidth
              color="primary"
              variant="contained"
            >
              Entrar
                </Button> */}
                <ButtonWrapper>enviar</ButtonWrapper>
              </Form>
            </Formik>
          </Paper>
        </Box>
        <Box className={styles.rightContainer} minHeight={"100vh"}></Box>
        {/* <div className={[styles.logoBG, styles.logoFloating].join(" ")}>
        <Image
          src="/logo/compal-symbol-green.svg"
          alt="Compal Logo"
          width={240}
          height={240}
        ></Image>
      </div> */}
      </Box>
    </>
  );
}

export default index;
