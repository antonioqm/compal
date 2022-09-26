import React from "react";
import { useFormikContext } from "formik";
import {
  Button,
  Fade,
  FormControl,
  Typography,
  ButtonProps,
} from "@mui/material";

interface Prop extends ButtonProps {
  fixed?: boolean;
  children?: React.ReactElement | string;
}
const ButtonWrapper = ({ fixed, children, ...otherProps }: Prop) => {
  const { submitForm, isValid } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    variant: "contained",
    color: "primary",
    fullWidth: true,
    onClick: handleSubmit,
  };

  return (
    <Fade in={isValid}>
      <FormControl
        fullWidth
        sx={
          fixed
            ? {
                zIndex: 1,
                borderTop: "1px solid rgba(0,0,0,.1)",
                background: "white",
                position: "absolute",
                bottom: 0,
                px: 6,
                py: 3,
              }
            : {}
        }
      >
        <Button
          {...otherProps}
          sx={{height: 56, color: 'white'}}
          disabled={!isValid}
          variant="contained"
          fullWidth
          color="primary"
          onClick={handleSubmit}
        >
          {children}
        </Button>
      </FormControl>
    </Fade>
  );
};

export default ButtonWrapper;
