import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Table from "../Table";
import Swipeable from "../Swipeable/Swipeable";
import { Box } from "@mui/material";

export function Main() {
  const theme = useTheme();
  return (
    <>
      <Table />
    </>
  );
}
