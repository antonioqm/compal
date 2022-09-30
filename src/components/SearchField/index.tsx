/* eslint-disable react-hooks/rules-of-hooks */
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import { currentPage } from "../../ROUTES";
import Filter from "./Filter";

export default function index() {
  const router = useRouter();

  const Route = currentPage(router.pathname)!;
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Paper
        elevation={0}
        component="form"
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          p: "0px 0px 0px 4px",
          display: "flex",
          alignItems: "center",
          flexFlow: 1,
          width: '100%',
          background: "#DFE7ED",
        }}
      >
        <IconButton disabled sx={{ p: "10px" }} aria-label="menu">
          <SearchIcon sx={{ color: "#9CABC2", opacity: 1 }} />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={`Buscar por ${Route?.label}`}
          inputProps={{ "aria-label": "Buscar por Part Number" }}
        />
        <Filter title={`Filtrar ${Route?.label}`} />

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
        </Button>
      </Paper>
    </Box>
  );
}
