import { Add } from "@mui/icons-material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Toolbar, Button, Typography, styled, Box, Alert, Snackbar } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { useRouter } from "next/router";
import { cloneElement, useContext, useEffect, useState } from "react";
import GlobalContext from "../Drawer/GlobalContext";
import { currentPage } from "../../ROUTES";
import ElevationScroll from "../ElevationScroll";
import Avatar from "./Avatar";
import Swipeable from "../Swipeable/Swipeable";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { ResponseState } from "src/state/atom";

const drawerWidth = 256;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  height: 80,
  boxShadow: "none",
  zIndex: theme.zIndex.drawer + 1,
  background: "#f5f7fb7c",
  backdropFilter: "blur(5px)",
  width: `calc(100% - ${64}px)`,
  transition: theme.transitions.create(["width", "margin", "background"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin", "background"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default () => {
  const { open } = useContext(GlobalContext);
  const router = useRouter();
  const { FormComponent, label } = currentPage(router.pathname)!;
  const { hasError } = useRecoilValue(ResponseState)
  const [openSnackbar, setSnackbar] = useState<boolean>(hasError) 

  const handleClick = () => {
    setSnackbar(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar(false);
  };

  return (
    <ElevationScroll>
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ height: "100%" }}>
          <Swipeable
            type={"Create"}
            tooltipLabel={`Adicionar ${label}`}
            title={label}
          >
            {<FormComponent  action={"Create"} />}
          </Swipeable>
          <Typography
            sx={{ marginLeft: 2, flexGrow: "1" }}
            variant="h6"
            fontSize={24}
            fontWeight="800"
            color={"primary"}
            noWrap
            component="h1"
          >
            {label}
          </Typography>
          <Avatar />
        </Toolbar>
      <Snackbar   open={openSnackbar} autoHideDuration={6000} onClose={handleClose} >
            <Alert
            variant="filled"
            onClose={handleClose}
              severity={hasError ? "error" : "success" }
              sx={{ width: "100%" }}
            >
              This is a success message!
            </Alert>
      </Snackbar>
      </AppBar> 
    </ElevationScroll>
  );
};
