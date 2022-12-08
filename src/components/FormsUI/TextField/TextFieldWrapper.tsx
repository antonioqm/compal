import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel, OutlinedInput
} from "@mui/material";
import { IconEye, IconEyeOff } from "@tabler/icons";
import { useField, useFormikContext } from "formik";
import { createRef, useState } from "react";
import { TextMask } from "../TextMask/TextMask";


export const TextfieldWrapper = ({ name, label, type, mask, min, max, endAdornment, inputProps = {}, ...otherProps }: any) => {
  const [field, meta, form] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [showPassword, setShowPassword] = useState(false)
  const [showDomain, setShowDomain] = useState(true)
  const ref = createRef();
 
  
  const handleChange = (event: any) => {
    const { value } = event.target;
    setFieldValue(name, value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
    onChange:handleChange
  };
  
  const errorsField = {
    error: false,
    helperText: ''

  }
  
  if (meta && meta.error) {
    errorsField.error = true;
    errorsField.helperText = meta.error;
  }
  


  return (
    <>
      <FormControl   fullWidth variant="outlined">
        <InputLabel sx={{ '&.MuiFormLabel-root-MuiInputLabel-root.Mui-disabled': {color: 'red'} }} focused htmlFor={`outlined-adornment-${name}`}>
          {label}
        </InputLabel>
        {
          <OutlinedInput
            inputComponent={ mask ? TextMask : null}
            inputProps={{ mask: mask ? mask : '', ...inputProps, type }}
          sx={{
            "&.Mui-disabled": { color: '#c0c0c0'},
          }}
          {...configTextfield}
          id={`outlined-adornment-${name}`}
          type={showPassword || name !== 'password' ? type : "password"}
                    
          endAdornment={
            <>
            {name === 'password' && 
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </IconButton>
            </InputAdornment>}
            
            </>
          }
          label={label}
        />
        }
        <FormHelperText sx={{ ml: 0 }} error={errorsField.error}>
          {errorsField.helperText}
        </FormHelperText>
      </FormControl>
    </>
  );
};

