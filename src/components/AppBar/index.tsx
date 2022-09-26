import { Add } from "@mui/icons-material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Toolbar, Button, Typography, styled, Box, Alert, Snackbar } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { useRouter } from "next/router";
import { cloneElement, useContext, useState } from "react";
import GlobalContext from "../Drawer/GlobalContext";
import { currentPage } from "../../ROUTES";
import ElevationScroll from "../ElevationScroll";
import Avatar from "./Avatar";
import Swipeable from "../Swipeable/Swipeable";
import axios from "axios";
import { useRecoilValue } from "recoil";

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

export default function Appbar() {
  const { open } = useContext(GlobalContext);
  const router = useRouter();
  const Route = currentPage(router.pathname)!;

  return (
    <ElevationScroll>
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ height: "100%" }}>
          <Swipeable
            type={"Create"}
            tooltipLabel={`Adicionar ${Route?.label}`}
            title={Route?.label}
          >
            {Route && <Route.FormComponent  action={"Create"} />}
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
            {Route?.label}
          </Typography>
          <Avatar />
        </Toolbar>
      </AppBar> 
    </ElevationScroll>
  );
};
