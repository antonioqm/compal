import { Button, Chip, Stack, TextField } from "@mui/material";
import Menu from "@mui/material/Menu";
import { useFormik } from "formik";
import * as React from "react";
import * as yup from "yup";
import { ptShort } from "yup-locale-pt";
import Param from "../Param.interface";

interface InputProps {
  label?: string;
  name: string;
  defaultValue?: string | number;
  onUpdate: (e:Param) => void
}
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

  const handleClose = () => {
    setAnchorEl(null);
  };


  yup.setLocale(ptShort);

  const validationSchema = yup.object({
    termInput: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      termInput: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.termInput && values.termInput !== defaultValue) {
        setTerm(`${values.termInput}`);
        // formik.resetForm()
        const param: Param = { name: name, value: values.termInput }
        onUpdate(param)
      } else {
        setTerm(null);
        
      }
      handleClose()
    },
    onReset: () => {
      setTerm(null);
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
          label={term ? term : label}
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

        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
          onSubmit={formik.handleSubmit}
          onReset={formik.handleReset}
        >
          <TextField
            fullWidth
            sx={{
              maxHeight: 32,
              my: 1,
              "& .MuiOutlinedInput-input": { padding: 1.5 },
            }}
            id="termInput"
            name="termInput"
            label={label}
            value={formik.values.termInput}
            onChange={formik.handleChange}
            error={formik.touched.termInput && Boolean(formik.errors.termInput)}
            helperText={formik.touched.termInput && formik.errors.termInput}
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
