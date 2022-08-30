import * as React from "react";
// import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import {
  Box,
  Alert,
  AppBar,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Snackbar,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ElevationScroll from "../ElevationScroll";
import { IconArrowLeft, IconPencilPlus } from "@tabler/icons";
import { Add } from "@mui/icons-material";
import { currentPage } from "../../ROUTES";
import { useRouter } from "next/router";
import ACTION from "../../enums/action";
import { EditIcon } from "../icons/icons";
import { useRecoilValue } from "recoil";
import { loadingState } from "../../state/atom";

interface Prop {
  children?: React.ReactElement | string;
  title?: string;
  buttonOpen?: string;
  tooltipLabel?: string;
  type: "Create" | "Update";
}
export default function Swipeable({
  title,
  tooltipLabel,
  buttonOpen,
  children,
  type,
  ...props
}: Prop) {
  const router = useRouter();
  const { FormComponent, label } = currentPage(router.pathname)!;
  const [scrollTarget, setScrollTarget] = useState<any>();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const loading = useRecoilValue(loadingState);


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
      {type === "Create" ? (
        <Tooltip title={tooltipLabel || "Title default"}>
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
      ) : (
        <IconButton
          onClick={toggleDrawer(true)}
          sx={{ width: 31, color: "#3779FA" }}
        >
          <EditIcon />
        </IconButton>
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
          <>
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
                  <Typography
                    fontWeight={200}
                    color={"black"}
                    variant="h6"
                    component="span"
                  >
                    {`${ACTION[type]} `}
                  </Typography>
                  {`${title}` ?? "Component Modal"}
                </Typography>
              </Toolbar>
            </AppBar>
          </ElevationScroll>
          <Divider sx={{ mt: 10 }} variant="fullWidth"></Divider>
          {/* Loading Status */}
          {loading && (
            <Box
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                position: "absolute",
                display: "flex",
                bgcolor: "white",
                height: "calc(100% - 186px)",
                width: "100%",
                zIndex: 99,
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          )}

          

          {/* Loading Status */}

          <Box sx={{ mx: 6, py: 6, mb: 14 }}>{children}</Box>
          </>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

