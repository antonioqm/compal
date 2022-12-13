import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem
} from "@mui/material";
import Select from "@mui/material/Select";
import { useField, useFormikContext } from "formik";
import { useState } from "react";

// import { Container } from './styles';

export default ({
  name,
  label,
  type,
  items,
  defaultValue,
  value,
  endAdornment,
  ...otherProps
}: any) => {
  const [field, meta, form] = useField(name);
  const { setFieldValue  } = useFormikContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showDomain, setShowDomain] = useState(true);
  const [selected, setSelected] = useState("")

  const handleChange = (evt: any) => {
    const { value } = evt.target;
    setSelected(value)
    setFieldValue(name, value);
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
        <InputLabel 
       sx={{ background: '#fff', px: .5, }} htmlFor={`outlined-adornment-${name}`}>
          {label}
        </InputLabel>
       
        <Select
          value={selected}
          {...otherProps}
          {...configSelect}>
          {
            items.map((value:{id:number, name:string} ) => {
              return <MenuItem key={value.id+value.name} value={value.id}>{value.name}</MenuItem>
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

