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
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "../../styles/Login.module.scss";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Teste = () => {
  return (
    <Chip
      sx={{ height: 30, width: "100%" }}
      label="@compal.com"
    />
  );
};

function index() {
  const theme = useTheme();

  interface LoginType {
    first: "local";
    second: "domain";
  }

  interface State {
    password: string;
    showPassword: boolean;
    identifier: string;
    loginType: "local" | "domain";
  }

  const [values, setValues] = React.useState<State>({
    password: "",
    showPassword: false,
    identifier: "",
    loginType: "local",
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;
      if (values.loginType === "local") {
        console.log("isLocal");
        newValue = newValue.replace(/@/g, "");
      }
      setValues({ ...values, [prop]: newValue });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    newLoginType: "local" | "domain"
  ) => {
    setValues({
      ...values,
      loginType: newLoginType,
    });
  };

  return (
    <Box
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
      <Box className={styles.formWrapper} bgcolor={"red"} minHeight={"100vh"}>
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

          <FormControl fullWidth variant="outlined">
            <FormHelperText sx={{ mx: 0 }} id="filled-weight-helper-text">
              Como você gostaria de se identificar?
            </FormHelperText>
            <ToggleButtonGroup
              color="primary"
              exclusive
              value={values.loginType}
              onChange={handleToggleChange}
              fullWidth
            >
              <ToggleButton value={"local"}>ID</ToggleButton>
              <ToggleButton value={"domain"}>Domínio</ToggleButton>
            </ToggleButtonGroup>
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-identifier">
              Identificador
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-identifier"
              type="text"
              value={values.identifier}
              onChange={handleChange("identifier")}
              endAdornment={
                <InputAdornment position="end">
                   { values.loginType === 'local' &&  <Teste />}
                </InputAdornment>
              }
              label="Identificador"
            />
          </FormControl>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Senha"
            />
          </FormControl>
          <Button
            sx={{ minHeight: 56, color: "white" }}
            size="large"
            disableElevation
            fullWidth
            color="primary"
            variant="contained"
          >
            Entrar
          </Button>
        </Paper>
      </Box>
      <Box
        className={styles.rightContainer}
        bgcolor={"red"}
        minHeight={"100vh"}
      ></Box>
      <div className={[styles.logoBG, styles.logoFloating].join(" ")}>
        <Image
          src="/logo/compal-symbol-green.svg"
          alt="Compal Logo"
          width={240}
          height={240}
        ></Image>
      </div>
    </Box>
  );
}

export default index;
