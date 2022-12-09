import {
  Dialog, IconButton
} from "@mui/material";
import { IconPrinter, IconPrinterOff } from "@tabler/icons";
import React, { useState } from "react";
import { LabelModel } from "../../interfaces/label.interface";
import { useModelMutations } from "../../state/atom";
import { FormPrinter } from "../FormsUI/Forms/FormPrinter";

interface DialogPrintergProp {
  reloadDataLabel: () => void;
  id: number;
  etiqueta: LabelModel;
}
export default ({id, etiqueta, reloadDataLabel}:DialogPrintergProp) => {
  const [openDialogTrash, setOpenDialogTrash] = React.useState(false);
  const { deleteModel } = useModelMutations();

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpenDialogTrash(false);
  };

  const updateDialog = () => {
    setOpen(false);
    reloadDataLabel()
  }

  // const handleAction = async (value: Level) => {
  //   if (value) {
  //     await deleteModel<Level>({endpoint:'/nivel', payload: value})
  //   }
  //   setOpenDialogTrash(false);
  // };

  return (
    <>
      <IconButton disabled={etiqueta.printed} onClick={onOpen} sx={{ width: 42, color: etiqueta.printed ? '#5d5d5d' : "#3779FA" }}>
        { etiqueta.printed ? <IconPrinterOff/> : <IconPrinter />}
      </IconButton>

      <Dialog
        disableEscapeKeyDown
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
        sx={{
          p: 0,
          "& .MuiPaper-root": { borderRadius: 4, width: 360,},
        }}
      >
        <FormPrinter updateDialog={updateDialog} etiqueta={etiqueta}  />
        
      </Dialog>
    </>
  );
};
