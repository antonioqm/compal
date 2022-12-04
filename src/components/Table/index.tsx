import {
  Chip
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  IconCircleCheck,
  IconCircleX
} from "@tabler/icons";
import { useRouter } from "next/router";
import * as React from "react";
import { useRecoilState } from "recoil";
import { LevelModel } from "../../interfaces/level.interface";
import { ThicknessModel } from "../../interfaces/thickness.interface";
import { currentPage } from "../../ROUTES";
import { loadingState, useLevelsMutations } from "../../state/atom";
import { formatDate } from "../../utils/format";
import DialogRemove from "../DialogRemove/DialogRemove";
import { SkeletonTable } from "../Skeleton/SkeletonTable";
import Swipeable from "../Swipeable/Swipeable";
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


interface DataTable {
  header: any[];
  body: Array<LevelModel | ThicknessModel>;
  nameKeys: Array<any>;
  endpoint: string
}

export default function TableCompal({ endpoint, header, body, nameKeys }: DataTable) {
  const [editing, setEditing] = React.useState<LevelModel | ThicknessModel>();
  const [loading, setLoading] = useRecoilState(loadingState)
  const { deleteModel } = useLevelsMutations();

  // const [open, setOpen] = useState(false);

  const handleDelete = async (value:LevelModel | ThicknessModel) => {
    
    if (value.id) {
      await deleteModel<LevelModel | ThicknessModel>({endpoint:'/'+endpoint, payload: {...value, id: value.id}})
      
    }
  };

  const router = useRouter();
  const Route = currentPage(router.pathname)!;

  return (
    <>
      {loading ? <SkeletonTable /> :
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
                {header.length > 0 &&
                  header.map((field, index) => (
                    <StyledTableCell key={index}>
                      <>{field[nameKeys[index].name]}</>
                    </StyledTableCell>
                  ))}
              </TableRow>
            </TableHead>
         
            <TableBody>
              {body && body.length > 0 &&
                body.map((bodyField: any, index) => (
                  <StyledTableRow key={bodyField.id}>
                    {nameKeys.length > 0 &&
                      nameKeys.map((key, index) => {
                        if (key.name !== "id") {
                          return (
                            <StyledTableCell
                              key={`${bodyField.name}${index}`}
                              component="th"
                              scope="row"
                              style={{ whiteSpace: key.name === 'thicknessName' ? 'nowrap' : 'initial'}}
                              align={typeof bodyField[key.name] === "number" ? 'center' : 'left'}
                            >
                              <>
                                {" "}
                                {typeof bodyField[key.name] === "boolean" ? (
                                  <Chip
                                    size="small"
                                    sx={{
                                      fontSize: "10px",
                                      textTransform: "uppercase",
                                      p: 0,
                                    }}
                                    color={
                                      bodyField[key.name] ? "success" : "error"
                                    }
                                    label={bodyField[key.name] ? "sim" : "não"}
                                    icon={
                                      bodyField[key.name] ? (
                                        <IconCircleCheck size={16} />
                                      ) : (
                                        <IconCircleX size={16} />
                                      )
                                    }
                                  />
                                ) : (
                                    <>
                                    {`${ key.name === 'thicknessName' ?
                                    bodyField[key.name] + ' mm'
                                    : formatDate(bodyField[key.name])
                                    }`}
                                    </>
                                    
                                )}
                              </>
                            </StyledTableCell>
                          );
                        }
                      })}
                    {/* {JSON.stringify(bodyField)} */}
                    {/* <StyledTableCell component="th" scope="row">
                        <> {bodyField.maxTimeExposition}</>
                      </StyledTableCell> */}
                    <StyledTableCell component="th" scope="row" align="center">
                      {/* AQUI ENTRA O SWAPEABLE */}
                      <>
                        <Swipeable
                          type={"Update"}
                          tooltipLabel={`Atualizar ${Route?.label}`}
                          title={Route?.label}
                        >
                          {
                            Route &&
                            <Route.FormComponent
                              action={"Update"}
                              data={{ ...bodyField }}
                            />
                          }
                        </Swipeable>
                        <DialogRemove onAction={() => handleDelete(bodyField)} id={bodyField.id} />
                      </>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>}
    </>
  );
}
