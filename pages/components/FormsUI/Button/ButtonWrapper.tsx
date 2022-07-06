import React from 'react';
import { useFormikContext } from 'formik';
import { Button } from '@mui/material';

const ButtonWrapper = ({
  children,
  ...otherProps
}:any) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  }

  const configButton = {
    variant: 'contained',
    color: 'primary',
    fullWidth: true,
    onClick: handleSubmit
  }

  return (
    <Button
      sx={{ minHeight: 56, color: "white" }}
      variant='contained'
      fullWidth
      color='primary'
      onClick={handleSubmit}
    >
      {children}
    </Button>
  );
};

export default ButtonWrapper;