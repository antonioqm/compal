import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React from "react";
import styles from "../../styles/Login.module.scss";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function index() {
  const theme = useTheme();

  interface LoginType {
    first: 'local';
    second: 'domain';
};
  
  interface State {
    password: string;
    showPassword: boolean;
    identifier: string;
    loginType: 'local' | 'domain';
  }

  const [values, setValues] = React.useState<State>({
    password: "",
    showPassword: false,
    identifier: "",
    loginType: 'local'
  });
  

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
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
  const [loginType, setLoginType] = React.useState('local');

  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    newLoginType:'local' | 'domain'
  ) => {
    setValues({
      ...values,
      loginType: newLoginType
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
        <div className={styles.content}>
          <ToggleButtonGroup
            color="primary"
            exclusive
            value={values.loginType}
            onChange={handleToggleChange}
            fullWidth
          >
            <ToggleButton value={"domain"}>Domínio</ToggleButton>
            <ToggleButton value={"local"}>Local</ToggleButton>
          </ToggleButtonGroup>
          <TextField
            value={values.identifier}
            onChange={handleChange('identifier')}
            fullWidth
            label="Identificador"
            type="text"
            color="primary"
          />
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
        </div>
      </Box>

      <Box
        className={styles.rightContainer}
        bgcolor={"red"}
        minHeight={"100vh"}
      >
        as
      </Box>
    </Box>
  );
}

export default index;
