import React from "react";
import {
  FormControl,
  FormHelperText,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useField, useFormikContext } from "formik";

const ToggleBottonWrapper = ({  name, data, legend, ...otherProps }: any) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt: any) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const errorsField = {
    error: false,
    helperText: ''

  }
  
  if (meta && meta.touched && meta.error) {
    errorsField.error = true;
    errorsField.helperText = meta.error;
  }

  return (
    <FormControl fullWidth variant="outlined">
      <FormHelperText sx={{ mx: 0 }} id="filled-weight-helper-text">
        {legend}
      </FormHelperText>
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={field.value}
        onChange={handleChange}
        fullWidth
      >
        {
          data.map(({ value, label }:any) => {
            return (
              <ToggleButton key={label} value={value}>{label }</ToggleButton>
            )
          })
        }
        
      </ToggleButtonGroup>
      <FormHelperText sx={{ ml: 0 }} error={errorsField.error}>
          {errorsField.helperText}
        </FormHelperText>
    </FormControl>
  );
};

export default ToggleBottonWrapper;
