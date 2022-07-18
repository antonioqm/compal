import React from "react";
import { useFormikContext } from "formik";
import { Button, Fade, FormControl, Typography } from "@mui/material";

interface Prop {
  fixed?: boolean,
  children?: React.ReactElement | string;
}
const ButtonWrapper = ({fixed, children, ...otherProps }: Prop) => {
  const { submitForm, isValid, dirty } = useFormikContext();

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
    <Fade in={(isValid && dirty)}>
    <FormControl fullWidth  sx={fixed ? { zIndex:1, borderTop: '1px solid rgba(0,0,0,.1)', background: 'white', position: 'absolute', bottom: 0, px: 6, py:3  } : {}}>
      <Button
        disabled={!(isValid && dirty)}
        sx={{ minHeight: 56, color: "white" }}
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
