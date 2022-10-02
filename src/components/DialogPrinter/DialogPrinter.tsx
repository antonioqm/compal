import {
  Dialog, DialogActions, DialogContent, DialogTitle, IconButton
} from "@mui/material";
import { IconPrinter } from "@tabler/icons";
import React, { useState } from "react";
import { LabelModel } from "../../interfaces/label.interface";
import { useLevelsMutations } from "../../state/atom";
import { FormPrinter } from "../FormsUI/Forms/FormPrinter";

interface DialogPrintergProp {
  onAction: () => void;
  id: number;
  etiqueta: LabelModel;
}
export default ({id, etiqueta, onAction}:DialogPrintergProp) => {
  const [openDialogTrash, setOpenDialogTrash] = React.useState(false);
  const { deleteModel } = useLevelsMutations();

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

  // const handleAction = async (value: Level) => {
  //   if (value) {
  //     await deleteModel<Level>({endpoint:'/nivel', payload: value})
  //   }
  //   setOpenDialogTrash(false);
  // };

  return (
    <>
      <IconButton onClick={onOpen} sx={{ width: 42, color: "#3779FA" }}>
        <IconPrinter />
      </IconButton>

      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
        sx={{
          p: 10,
          "& .MuiPaper-root": { borderRadius: 4, p: 2, width: 360,},
        }}
      >
        <DialogTitle id="alert-dialog-title"> <IconButton disableRipple><IconPrinter /></IconButton> {`Imprimir `}</DialogTitle>
        <DialogContent>
          <FormPrinter etiqueta={etiqueta}  />
        </DialogContent>
        <DialogActions sx={{ height: 120 }}>
          {/* <Button  sx={{ height: 56 }} color={"inherit"} onClick={onClose}>
            sair
          </Button>
          <Button
            sx={{ color: '#fff', height: 56 }}
            color="primary"
            variant="contained"
            disableElevation
            onClick={onAction}
            autoFocus
          >
            Imprimir
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};
