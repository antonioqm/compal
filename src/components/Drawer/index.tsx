import * as React from "react";
import {
  styled,
  useTheme,
  Theme,
  CSSObject,
  withStyles,
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiListItem from "@mui/material/ListItem";
import MuiListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import { useState } from "react";
import MENU_ITEMS from "./MENU_ITEMS";
import { Button, TextField } from "@mui/material";
import { Add, AddCircle } from "@mui/icons-material";

const drawerWidth = 256;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  border: 0,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  border: 0,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const DrawerHeader = styled("div")(({ theme }) => {
  // console.log(theme)
  return {
    display: "flex",
    height: 80,
    alignItems: "flex-end",
    background: theme.palette.primary.main,
    justifyContent: "flex-start",
    padding: theme.spacing(0, 0, 2, 2.5),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  };
});

const DrawerWrapper = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  return {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),

      "& .MuiDrawer-paper": {
        borderRadius: "0 8px 8px 0",
        boxShadow: "3px -9px 73px rgba(135, 142, 159, 0.17)",
        ...openedMixin(theme),
      },
    }),
    ...(!open && {
      ...closedMixin(theme),
      borderRadius: "0 8px 8px 0",
      "& .MuiDrawer-paper": {
        boxShadow: "3px -9px 73px rgba(135, 142, 159, 0.50)",
        borderRadius: "0 8px 8px 0",
        ...closedMixin(theme),
      },
    }),
  };
});

const ListItem = styled(MuiListItem, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  paddingLeft: 0,
  marginLeft: 8,
  transition: "all 0.2s ease-in",
  "& :hover": {
    borderRadius: "8px 0 0 8px",
  },
  "&.Mui-selected": {
    backgroundColor: "#F5F7FB",
    color: theme.palette.primary.main,
    borderRadius: "8px 0 0 8px",
  },
  "&.Mui-selected:hover": {
    borderRadius: "8px 0 0 8px",
    backgroundColor: "#F5F7FB",
  },
  "& .MuiListItemIcon-root": {
    color: "currentColor",
  },
}));
const ListItemButton = styled(MuiListItemButton, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  minHeight: 48,
  px: 2.5,
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
}));


export const Drawer = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleListItemClick = (event: any, index: number = 0) => {
    setSelectedIndex(index);
  };



  return (
    <DrawerWrapper variant="permanent" open={open}>
      <DrawerHeader>
        
        <IconButton
          size="large"
          sx={{
            padding: 0,
            minWidth: 22,
            minHeight: 22,
            marginRight: 1,
          }}
          onClick={handleDrawerOpen}
        >
          <Image
            src="/logo/compal-symbol.svg"
            height={22}
            layout="fixed"
            width={22}
          />
        </IconButton>

        {open && (
          <Image
            src="/logo/compal-type.svg"
            height={22}
            layout="intrinsic"
            width={100}
          />
        )}
      </DrawerHeader>

      <Divider />
      <List>
        {MENU_ITEMS.map(({ label, Component }, index) => (
          <ListItem
            sx={{ color: "#878E9F" }}
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
            key={label}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "#878E9F",
                  '&.Mui-selected:hover > MuiListItemIcon-root"': {
                    color: "green",
                  },
                }}
              >
                {<Component />}
              </ListItemIcon>
              <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <IconButton
            color="default"
            sx={{
              maxWidth: 24,
              maxHeight: 24,
              background: "#fff",
              position: "absolute",
              left: "-12px",
              top: 86,
              "&:hover": {
                boxShadow: "3px -9px 73px .5",
                background: "#F5F7FB",
              },
            }}
            onClick={handleDrawer}
          >
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
    </DrawerWrapper>
  );
};
