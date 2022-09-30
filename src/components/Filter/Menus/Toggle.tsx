import {
  Button,
  Chip,
  FormHelperText,
  Stack,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import Menu from "@mui/material/Menu";
import * as React from "react";
import * as yup from "yup";
import { ptShort } from "yup-locale-pt";
import Param from "../Param.interface";

interface BooleanProps {
  label?: string;
  name: string;
  defaultValue?: string | number;
  onUpdate: (e: Param) => void;
}
export default function ({
  label = "BAKING OBRIGATÓRIO",
  defaultValue = "defaultValue",
  onUpdate,
  name
}: BooleanProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [term, setTerm] = React.useState<string | null>("");
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setTerm(newValue);
    handleClose();
    newValue !== '' && newValue != null && onUpdate({name, value:newValue}) 
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  yup.setLocale(ptShort);

  const validationSchema = yup.object({
    termInput: yup.string().required(),
  });

  return (
    <div>
      <Stack direction="row" spacing={1}>
        <Chip
          size="small"
          clickable
          sx={{ fontSize: 10, textTransform: 'uppercase', color: typeof term === "string" || term === null   ? "#000" :  "#fff" }}
          color={typeof term === "string" || term === null   ? "default" :  "primary"}
          label={ typeof term === "string" || term === null  ? label :  (term ? ` Sim` : ` Não`) }
          onClick={handleClickListItem}
        />
      </Stack>
      <Menu
        elevation={0}
        id={`button-menu-${label}`}

        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiMenu-list": { padding: 0 },
          "& .MuiPaper-root": {
            boxShadow:
              "0px 7px 14px 1px rgb(0 0 0 / 8%), 0px 4px 16px 0px rgb(0 0 0 / 5%), 1px 1px 20px 0px rgb(0 0 0 / 5%);",
            padding: 3,
            borderRadius: 2.5,
            paddingBottom: 0,
            border: "1px solid #e7edf1",
          },
        }}
      >


        <FormHelperText>
          {label}
        </FormHelperText>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >


          <ToggleButtonGroup
            color="primary"
            exclusive
            sx={{ minWidth: 180 }}
            onChange={handleChange}
            aria-label="Platform"
            value={term}
          >
            <ToggleButton sx={{ width: '100%' }} value={true}>Sim</ToggleButton>
            <ToggleButton sx={{ width: '100%' }} value={false}>Não</ToggleButton>
          </ToggleButtonGroup>
          <Stack
            sx={{ marginTop: .5 }}
            width={"100%"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Button
              onClick={(e) => {
                handleChange(e, '');
              }}
              color="inherit"
              sx={{ fontSize: 12, maxHeight: 32, my: 2 }}
            >
              Limpar
            </Button>
          </Stack>
        </div>
      </Menu>
    </div>
  );
}
