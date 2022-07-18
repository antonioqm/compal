import { Add } from "@mui/icons-material";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Toolbar, Button, Typography, styled } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { useRouter } from "next/router";
import { cloneElement, useContext } from "react";
import DrawerContext from "../Drawer/DrawerContext";
import { currentNamePage } from "../../../src/ROUTES";


const drawerWidth = 256;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}


function ElevationScroll(props: Props) {
  const { children, window } = props;
  console.log('children', children)
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: trigger ? {boxShadow: '10px 2px 20px rgba(0,0,0,.1)'} : {boxShadow: '10px 2px 0px rgba(0,0,0,0)'}
    
  });
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  height: 80,
  boxShadow: 'none',
  zIndex: theme.zIndex.drawer + 1,
  background: "#f5f7fb7c",
  backdropFilter: 'blur(5px)',
  width: `calc(100% - ${64}px)`,
  transition: theme.transitions.create(["width", "margin", "background"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin",  "background"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default (props: Props) => {
  const { open } = useContext(DrawerContext) 
  const router = useRouter()
  const currentPage = currentNamePage(router.pathname)
  return (
    <ElevationScroll {...props}>

    <AppBar position="fixed" open={open}>
      <Toolbar sx={{ height: "100%" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginLeft: 2,
            borderRadius: "50%",
            minWidth: 48,
            minHeight: 48,
            padding: 1,
            boxShadow:
              "0px 3px 4px rgba(0, 0, 0, 0.14), 0px 11px 15px rgba(0, 0, 0, 0.26)",
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
          {currentPage}
        </Typography>
      </Toolbar>
    </AppBar>
    </ElevationScroll>
  );
};

