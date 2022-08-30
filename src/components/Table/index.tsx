import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  NoSsr,
} from "@mui/material";
import { ExcelIcon, TrashIcon } from "../icons/icons";
import Swipeable from "../Swipeable/Swipeable";
import { currentPage } from "src/ROUTES";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { levelsState } from "src/state/atom";
import { useState, useEffect } from "react";
import { apiClient } from "src/api/api";
import { Level } from "src/interfaces/level.interface";

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

// export default function CustomizedTables() {
//   const listLevel = useRecoilValue(levelsState);
export default function CustomizedTables() {
  const [listLevel, setListLevel] = useState<Level[]>([]);
  const [openDialogTrash, setOpenDialogTrash] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialogTrash(true);
  };

  const handleCloseDialog = () => {
    setOpenDialogTrash(false);
  };

  useEffect(() => {

    apiClient.listAll('nivel').then(data => {
      setListLevel(data)
     })

  }, [])

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
                  <StyledTableCell>
                    <>modificado em</>{" "}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <>part number</>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <>Nível</>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <>sensibilidade a umidade</>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <>Espessura</>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listLevel &&
                  listLevel.map((level, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell component="th" scope="row">
                        <> {level.backingRequired}</>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <> {level.createDate}</>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <> {level.id}</>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <> {level.levelName}</>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <>{level.updateDate}</>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {/* AQUI ENTRA O SWAPEABLE */}
                        <>
                          <Swipeable
                            type={"Update"}
                            tooltipLabel={`Atualizar ${label}`}
                            title={label}
                          >
                            {
                              <FormComponent
                                action={"Update"}
                                formLevel={{ ...level }}
                              />
                            }
                          </Swipeable>
                          <IconButton
                            onClick={handleClickOpen}
                            sx={{ width: 31, color: "#F1506D" }}
                          >
                            <TrashIcon />
                          </IconButton>
                        </>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog
            open={openDialogTrash}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ p: 10 }}
          >
            <DialogTitle id="alert-dialog-title">
              {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>
                Não
              </Button>
              <Button color='error' variant="contained" onClick={handleCloseDialog} autoFocus>
                Remover
              </Button>
            </DialogActions>
          </Dialog>
    </>
  );
}
