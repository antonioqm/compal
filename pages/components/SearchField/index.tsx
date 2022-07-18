import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import {
  Filter,
  Filter1,
  Filter1TwoTone,
  FilterList,
  FilterListOffRounded,
  FilterListRounded,
} from "@mui/icons-material";
import { Button, Hidden } from "@mui/material";
import { useRouter } from "next/router";
import { currentNamePage } from "src/ROUTES";

export default function index() {

  const router = useRouter()

  const currentPage = currentNamePage(router.pathname)
  return (
    <Paper
      elevation={0}
      component="form"
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        p: "0px 0px 0px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        background: '#DFE7ED'
      }}
    >
      <IconButton disabled sx={{ p: "10px" }} aria-label="menu">
        <SearchIcon sx={{ color: "#9CABC2", opacity: 1 }} />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={`Buscar por ${currentPage}`}
        inputProps={{ "aria-label": "Buscar por Part Number" }}
      />
      <Button
        variant="text"
        color="inherit"
        sx={{ color: '#878E9F', px: "16px ", height: 48, borderRadius: 0 }}
      >
        Filtrar <FilterList sx={{ marginLeft: 1, p: 0 }} />
      </Button>
      {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
      <Button
        variant="contained"
        disableElevation
        color="primary"
        sx={{
          color: "#fff",
          height: 48,
          px: 3,
          borderRadius: "0px",
        }}
        aria-label="search"
      >
        Buscar
        {/* <SearchIcon /> */}
      </Button>
    </Paper>
  );
}
