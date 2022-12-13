import {
  Button,
  Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, IconButton
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { currentPage } from "../../ROUTES";
import { useModelMutations } from "../../state/atom";
import { TrashIcon } from "../icons/icons";

interface DialogProp {
  // open: boolean;
  // onClose: () => void;
  // onOpen: () => void;
  // children: ReactNode;
  onAction: () => void;
  id: number;
}
export default ({id, onAction}:DialogProp) => {
  
  const [openDialogTrash, setOpenDialogTrash] = React.useState(false);
  const { deleteModel } = useModelMutations();
  const router = useRouter();
  const Route = currentPage(router.pathname)!;

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
      <IconButton onClick={onOpen} sx={{ width: 31, color: "#F1506D" }}>
        <TrashIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          p: 10,
          "& .MuiPaper-root": { borderRadius: 4, p: 2, width: 420 },
        }}
      >
        <DialogTitle id="alert-dialog-title">{`Remover `}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Tem certeza de que deseja remover este ${Route.label}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color={"inherit"} onClick={onClose}>
            Não
          </Button>
          <Button
            color="error"
            variant="contained"
            disableElevation
            onClick={onAction}
            autoFocus
          >
            Remover
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
