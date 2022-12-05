import { Stack } from "@mui/material";
import { useState } from "react";
import { createUrlParams } from "./helpes/createUrlParams";
import { updateParams } from "./helpes/updateParams";
import { ItemFilter } from "./interfaces/Item.interface";
import Param from "./interfaces/Param.interface";
import Input from "./Menus/InputText";
import Temperature from "./Menus/Temperature";
import Toggle from "./Menus/Toggle";


interface FilterProps {
  endpoint: string;
  items: ItemFilter[];
  onChangeFilter: (url: string) => void
}

const Filter = ({ onChangeFilter, endpoint, items }: FilterProps) => {
  const [params, setParams] = useState<Param[]>([]);
  const [urlParams, setUrlParams] = useState<string>("");

  const changeParams = async (param: Param) => {
    const updatedParams = await updateParams(param, params);
    const newUrlParams = await createUrlParams(updatedParams);
    onChangeFilter(newUrlParams)

    setUrlParams(newUrlParams);
    setParams(updatedParams);

  };

  return (
    <>
      <Stack direction={"row"} spacing={2}>
        {items.map((item, index) => {
          if ((item.type === "text")) {
            return (
              <Input
               key={`Input-${item.name}-${index}`}
                label={item.label}
                name={item.name}
                onUpdate={changeParams}
              />
            );
          }
          if (item.type === "radio") {
            return (
              <Toggle
                key={`Toggle-${item.name}-${index}`}
                label={item.label}
                name={item.name}
                onUpdate={changeParams}
              />
            );
          }
          if (item.type === "slider") {
            return (
              <Temperature
                key={`Slider-${item.name}-${index}`}
                label={item.label}
                name={item.name}
                onUpdate={changeParams}
              />
            );
          }
        })}
      </Stack>
    </>
  );
};

export default Filter;
