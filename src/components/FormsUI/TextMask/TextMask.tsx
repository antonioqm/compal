import React from "react";
import { IMaskInput } from "react-imask";


interface CustomProps {
  onChange: (event:any) => void;
  name: string;
  mask: any;
  type?: any;
}

export const TextMask = React.forwardRef<HTMLElement, CustomProps>(
  function TextMask(props, ref:any) {
    const { onChange, mask, name, ...other } = props;
    return (
      <IMaskInput
        mask={mask}
        {...other}
        definitions={{
          '#': /[1-9]/
        }}
        // prepare={(value: any) => {
        //   value =  typeof value ===  'number' ? value.toString() : value
        //    return typeof mask === 'function' ? parseFloat(value.replace(',', '.')) : value
        // }}
        inputRef={ref}
        onChange={(value: any) => {
          return onChange(value)
        }
        }
        overwrite
      />
    );
  }
);
