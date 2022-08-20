import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import {
  AppBar,
  Divider,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ElevationScroll from "../ElevationScroll";
import { IconArrowLeft } from "@tabler/icons";
import { Add } from "@mui/icons-material";
import { currentPage } from "src/ROUTES";
import { useRouter } from "next/router";

interface Prop {
  children?: React.ReactElement | string;
  title?: string;
  buttonOpen?: string;
  tooltipLabel?: string;
  action?: string;
}
export default function Swipeable({
  title,
  tooltipLabel,
  buttonOpen,
  children,
  action,
  ...props
}: Prop) {
  const [scrollTarget, setScrollTarget] = useState<any>();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const router = useRouter();
  const { IconComponent } = currentPage(router.pathname)!;

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {

      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpenDrawer(open);
    };

  return (
    <>
      {buttonOpen ? (
        <Button onClick={toggleDrawer(true)}>{buttonOpen}</Button>
      ) : (
          <Tooltip title={ tooltipLabel || "Title default"}>
          <Button
            variant="contained"
            color="primary"
            onClick={toggleDrawer(true)}
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
        </Tooltip>
      )}
      <SwipeableDrawer
        anchor={"right"}
        sx={{
          "& .MuiDrawer-paper": {
            minHeight: "100vh",
            borderRadius: "8px 0 0 8px",
            overflow: "hidden",
          },
          display: "flex",
          zIndex: 1300,
        }}
        open={isOpenDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          ref={(node) => {
            if (node) {
              setScrollTarget(node ? node : undefined);
            }
          }}
          sx={{
            flexGrow: 1,
            width: 512,
            fontSize: 22,
            overflowY: "scroll",
          }}
        >
          <ElevationScroll window={scrollTarget}>
            <AppBar
              elevation={20}
              position="fixed"
              sx={{
                position: "absolute",
                minHeight: 80,
                background: "white",
                right: "auto",
                px: 0,
              }}
            >
              <Toolbar
                sx={{ px: 0, height: 80, "&.MuiToolbar-root": { p: 2 } }}
              >
                <IconButton onClick={toggleDrawer(false)} sx={{ mr: 2 }}>
                  <IconArrowLeft></IconArrowLeft>
                </IconButton>
                <Typography
                  fontWeight={800}
                  color={"#64A70B"}
                  textTransform={"uppercase"}
                  variant="h6"
                  component="h6"
                >
                  { `${action}`}
                 {<IconComponent />}
                  { `  ${title}` ?? "Component Modal"} 
                </Typography>
              </Toolbar>
            </AppBar>
          </ElevationScroll>
          <Divider sx={{ mt: 10 }} variant="fullWidth"></Divider>
          <Box sx={{ p: 6, mb: 14 }}>{children}</Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
