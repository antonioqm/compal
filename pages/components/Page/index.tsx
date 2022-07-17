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
import TextfieldWrapper from "../FormsUI/TextField/TextFieldWrapper";
import Table from "../Table";
import SearchField from "../SearchField";
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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  height: 80,
  boxShadow: "none",
  zIndex: theme.zIndex.drawer + 1,
  background: "transparent",
  width: `calc(100% - ${64}px)`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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

const Drawer = styled(MuiDrawer, {
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

export function Page() {
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
    <Box
      sx={{
        width: "100%",
        background: "yellow",
        display: "flex",
      }}
    >
      <CssBaseline />

      {/* <AppBar position="fixed" open={open}>
        <Toolbar sx={{ height: "100%" }}>
          <IconButton
            disableRipple
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 10,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
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
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginLeft: 2,
              borderRadius: "50%",
              minWidth: 48,
              minHeight: 48,
              padding: 1,
              boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.14), 0px 11px 15px rgba(0, 0, 0, 0.26)'
            }}
          >
            <Add sx={{ fontSize: 24, color: "#fff", margin: 0 }} />
          </Button>
          <Typography
            sx={{ marginLeft: 2 }}
            variant="h6"
            fontSize={24}
            fontWeight="800"
            color={"primary"}
            noWrap
            component="h1"
          >
            PART NUMBER
          </Typography>
        </Toolbar>
      </AppBar> */}

      {/* <Drawer variant="permanent" open={open}>
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
      </Drawer> */}
      <Box
        component="main"
        sx={{
          // width: `calc(100% - ${drawerWidth}px)`,
          height: "calc(100vh - 200px)",
          background: "#F5F7FB",
          flexGrow: 1,
          px: 5,
        }}
      >
        <SearchField />
        <Table />
      </Box>
    </Box>
  );
}
