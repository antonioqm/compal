import React from "react";
import { IMaskInput } from "react-imask";


interface CustomProps {
  onChange: (event: { target: { name: string; value: string }}) => void;
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
        // definitions={{
        //   '#': /[1-9]/
        // }}
        inputRef={ref}
        onAccept={(value: any) => {
          console.log('no mask', props)
          return onChange({ target: { name, value }})
        }
        }
        overwrite
      />
    );
  }
);
