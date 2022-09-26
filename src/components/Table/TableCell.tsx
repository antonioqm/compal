
import { styled, TableCell as TableCellMui, tableCellClasses } from "@mui/material";

export const TableCell = styled(TableCellMui)(({ theme }) => ({
  position: 'relative',
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(231, 237, 242, 0.44)",
    color: theme.palette.common.black,
    border: 0,
    fontSize: 11,
    lineHeight: 1.2,
    textTransform: "uppercase",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    height: "72px",
    "&:last-child": {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      // display: 'inline-flex',
    },
    "&:first-of-type": {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
  },
}));