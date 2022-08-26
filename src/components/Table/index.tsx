import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, IconButton } from "@mui/material";
import { ExcelIcon, TrashIcon } from "../icons/icons";
import Swipeable from "../Swipeable";
import { currentPage } from "src/ROUTES";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import {levelsState } from "src/state/atom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  boxShadow: "0px 4px 8px rgba(156, 171, 194, 0.2)",
  background: "#fff",
  minHeight: 80,

  transition: "all .4s ease-in-out",
  // hover
  "&:hover": {
    transition: "all .4s ease-in-out",
    // transition: theme.transitions.create(["width", "margin", "boxShadow"], {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
    boxShadow:
      "0px 0px 0px 8px rgba(63, 127, 250, 0.2), 0px 0px 0px 2px rgba(63, 127, 250, 0.6)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },

  borderRadius: 8,
  // border: '4px solid blue'
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

export default function CustomizedTables() {
  const listLevel = useRecoilValue(levelsState);

  const router = useRouter();
  const { FormComponent, label } = currentPage(router.pathname)!;

  return (
    <>
      <TableContainer
        sx={{
          marginTop: 4,
          borderRadius: 3,
          padding: 3,
          background: "#E7EDF2",
        }}
      >
        <Table
          sx={{
            borderCollapse: "separate",
            borderSpacing: "0 8px",
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>modificado em </StyledTableCell>
              <StyledTableCell align="right">part number</StyledTableCell>
              <StyledTableCell align="right">Nível</StyledTableCell>
              <StyledTableCell align="right">
                sensibilidade a umidade
              </StyledTableCell>
              <StyledTableCell align="right">Espessura</StyledTableCell>
              <StyledTableCell colSpan={2} align="right">
                {/* <Button
                  variant="contained"
                  disableElevation
                  color="primary"
                  size="small"
                  sx={{
                    height: 48,
                    bgcolor: "transparent",
                    color: "#878E9F",
                    border: "1px solid #878E9F ",
                    "&:hover": {
                      color: "#fff",
                    },
                  }}
                  aria-label="Excel"
                >
                  <ExcelIcon style={{ marginRight: 8 }} /> Excel
                </Button> */}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listLevel.length > 0 &&
              listLevel.map((level, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    <span>{level.backingRequired}</span>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <span>{level.createDate}</span>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <span>{level.id}</span>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <span>{level.levelName}</span>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <span>{level.updateDate}</span>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {/* AQUI ENTRA O SWAPEABLE */}
                    <>
                      <Swipeable
                        type={"Update"}
                        tooltipLabel={`Atualizar ${label}`}
                        title={label}
                      >
                        {<FormComponent action={'update'} formLevel={{ ...level }}  />}
                      </Swipeable>
                      <IconButton sx={{ width: 31, color: "#F1506D" }}>
                        <TrashIcon />
                      </IconButton>
                    </>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
