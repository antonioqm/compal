import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import Select  from "@mui/material/Select";
import { useField, useFormikContext } from "formik";
import React, {useState } from "react";

// import { Container } from './styles';

export default ({
  name,
  label,
  type,
  items,
  endAdornment,
  ...otherProps
}: any) => {
  const [field, meta, form] = useField(name);
  const { setFieldValue  } = useFormikContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showDomain, setShowDomain] = useState(true);
  const [selected, setSelected] = useState(null)

  const handleChange = (evt: any) => {
    const { value } = evt.target;
    setSelected(value)
    console.log(value)
    setFieldValue(name, value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
    onChange: handleChange,
  };

  const errorsField = {
    error: false,
    helperText: "",
  };

  if (meta && meta.error) {
    errorsField.error = true;
    errorsField.helperText = meta.error;
  }


  return (
    <>
     <FormControl fullWidth variant="outlined">
        <InputLabel sx={{ background: '#fff', px: .5 }} focused htmlFor={`outlined-adornment-${name}`}>
          {label}
        </InputLabel>
       
        <Select
          {...otherProps}
          {...configSelect}>
          {
            items.map((value:any ) => {
              return <MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>
            })
          }
        </Select>
        <FormHelperText sx={{ ml: 0 }}
          error={errorsField.error}
        >
          {errorsField.helperText}
        </FormHelperText>
      </FormControl>
    </>
  );
};

