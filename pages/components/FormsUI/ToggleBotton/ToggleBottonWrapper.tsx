import React from "react";
import {
  FormControl,
  FormHelperText,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useField, useFormikContext } from "formik";

const ToggleBottonWrapper = ({ name, label, legend, ...otherProps }: any) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const handleChange = (evt: any) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };
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
        <ToggleButton value="local">ID</ToggleButton>
        <ToggleButton value="domain">Domínio</ToggleButton>
      </ToggleButtonGroup>
    </FormControl>
  );
};

export default ToggleBottonWrapper;
