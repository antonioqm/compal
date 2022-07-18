import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { IconEye, IconEyeOff, IconKey } from "@tabler/icons";
import DomainLabel from "../../Helpers/DomainLalbel";

const TextfieldWrapper = ({ name, label, type, endAdornment, ...otherProps }: any) => {
  const [field, meta, form] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [showPassword, setShowPassword] = useState(false)
  const [showDomain, setShowDomain] = useState(true)

  const handleChange = (evt: any) => {
    const { value } = evt.target;
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
      <FormControl fullWidth variant="outlined">
        <InputLabel focused htmlFor={`outlined-adornment-${name}`}>
          {label}
        </InputLabel>
        <OutlinedInput
          {...configTextfield}
          id={`outlined-adornment-${name}`}
          type={showPassword || name !== 'password' ? type : "password"}
          // startAdornment={
          //   <InputAdornment position="start">
          //     <IconButton
          //       disabled
          //       aria-label="toggle password visibility"
          //       onClick={handleClickShowPassword}
          //       edge="start"

          //     >
          //       <IconKey color="#c1c1c1" />
          //     </IconButton>
          //   </InputAdornment>
          // }
          
          endAdornment={
            <>
              {endAdornment}
            {/* {name === 'password' && 
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </IconButton>
            </InputAdornment>}

            {showDomain && 
              <Slide
                direction="left"
                in={showDomain}
              >
                <InputAdornment position="end">
                  { <DomainLabel />}
                </InputAdornment>
              </Slide>} */}
            
            </>
          }
          label={label}
        />
        <FormHelperText sx={{ ml: 0 }} error={errorsField.error}>
          {errorsField.helperText}
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default TextfieldWrapper;
