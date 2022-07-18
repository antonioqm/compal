import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Table from "../Table";
import Swipeable from "../Swipeable";

export function Main() {
  const theme = useTheme();
  return (
    <>
      <Swipeable children={<div>ass</div>} />
      <Table />
    </>
  );
}
