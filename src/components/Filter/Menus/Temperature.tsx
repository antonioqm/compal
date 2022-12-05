



import { Button, Chip, FormHelperText, Slider, Stack } from "@mui/material";
import Menu from "@mui/material/Menu";
import { useFormik } from "formik";
import * as React from "react";
import * as yup from "yup";
import { ptShort } from "yup-locale-pt";
import Param from "../interfaces/Param.interface";


interface InputProps {
  label?: string;
  name: string;
  defaultValue?: string | number;
  onUpdate: (e:Param) => void
}

const marks = [
  {
    value: 40,
    label: "40°C",
  },
  {
    value: 90,
    label: "90°C",
  },
  {
    value: 125,
    label: "125°C",
  },
];


export default function ({
  label = "Nome do campo",
  defaultValue = "defaultValue",
  name,
  onUpdate
}: InputProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [term, setTerm] = React.useState<string | null>(null);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function valuetext(value: number) {
    return `${value}°C`;
  }  

  const handleClose = () => {
    setAnchorEl(null);
  };


  yup.setLocale(ptShort);

  const validationSchema = yup.object({
    temperature: yup.number().required(),
  });

  const formik = useFormik({
    initialValues: {
      temperature: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.temperature && values.temperature !== defaultValue) {
        setTerm(`${values.temperature}ºC`);
        // formik.resetForm()
        const param: Param = { name: name, value: values.temperature }
        onUpdate(param)
      } else {
        setTerm('');
        
      }
      handleClose()
    },
    onReset: () => {
      setTerm('');
      const param: Param = { name: name, value: "" }
      onUpdate(param)
      handleClose()

    },
  });

  return (
    <div>

      <Stack direction="row" spacing={1}>
        <Chip
          size="small"
          clickable
          sx={{ fontSize: 10, textTransform: 'uppercase',  color: term ? "#fff" : "#000",
           }}
          color={term ? "primary" : "default"}
          label={term ? `${label}: ${term}` : label}
          onClick={handleClickListItem}
        />
      </Stack>
      <Menu
        elevation={0}
        id={`button-menu-${label}`}
        // aria-controls={open ? "menu" : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? "true" : undefined}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiMenu-list": {padding: 0},
          "& .MuiPaper-root": {
            boxShadow: '0px 7px 14px 1px rgb(0 0 0 / 8%), 0px 4px 16px 0px rgb(0 0 0 / 5%), 1px 1px 20px 0px rgb(0 0 0 / 5%);',
            padding: 3,
            borderRadius: 2.5,
            paddingBottom: 0,
            border: "1px solid #e7edf1",
          },
        }}
        // MenuListProps={{
        //   "aria-labelledby": "lock-button",
        //   role: "listbox",
        // }}
      >
        {/* <Typography variant="overline">Digite o termo</Typography> */}
        <FormHelperText>
          {label}
        </FormHelperText>
        
        
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
        >
          <Slider
              sx={{
                minWidth: 180,
                "& .MuiSlider-colorPrimary": { height: 16 },
                "& .MuiSlider-track": {
                  height: 16,
                  background: "#fff",
                  border: "2px solid rgba(255,166,0,1)",
                },
                "& .MuiSlider-rail": {
                  height: 16,
                  opacity: 1,
                  background:
                    "linear-gradient(90deg, rgba(255,166,0,1) 20%, rgba(252,0,0,1) 100%)",
                },
                "& .MuiSlider-thumb:before": {
                  background: "#fff",
                  border: "4px solid #e7c4c4",
                },
                "& .MuiSlider-mark": {
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "rgba(255,166,0,1)",
                },
                "& .MuiSlider-markActive": {
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "rgba(255,166,0,1)",
                },
                "& .MuiSlider-markLabel": { fontSize: 10 },
                "& .MuiSlider-valueLabelOpen": {
                  borderRadius: 2,
                  background: "#e7edf1",
                  color: "#000",
                },
            }}
              // value={Number(formik.values.temperature)}
              aria-label="Custom marks"
              defaultValue={40}
              getAriaValueText={valuetext}
              step={null}
              valueLabelDisplay="off"
              max={200}
              min={0}
              name={name}
              marks={marks}
              onChange={formik.handleChange}
              // error={formik.touched.temperature && Boolean(formik.errors.temperature)}
              // helperText={formik.touched.temperature && formik.errors.temperature}
          />
         
          <Stack
            sx={{ marginTop: 2 }}
            width={"100%"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Button color="inherit" sx={{ fontSize: 12, maxHeight: 32, my: 2 }} type="reset">
              Limpar
            </Button>
            <Button sx={{ fontSize: 12, maxHeight: 32, my: 2 }} color="primary" type="submit">
              Aplicar
            </Button>
          </Stack>
        </form>
      </Menu>
    </div>
  );
}
