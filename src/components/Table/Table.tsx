import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { useRouter } from "next/router";
import * as React from "react";
import { useRecoilState } from "recoil";
import { Level } from "../../interfaces/level.interface";
import { currentPage } from "../../ROUTES";
import { loadingState, useLevelsMutations } from "../../state/atom";
import { SkeletonTable } from "../Skeleton/SkeletonTable";

interface DataTable {
  children: React.ReactNode;
}

export default function ({ children }: DataTable) {
  const [editing, setEditing] = React.useState<Level>();
  const [loading, setLoading] = useRecoilState(loadingState)
  const { deleteModel } = useLevelsMutations();

  const handleDelete = async (value:Level) => {
    console.log("handleDelete", value);
    if (value.id) {
      await deleteModel<Level>({endpoint:'/nivel', payload: {...value, id: value.id}})
      
    }
  };

  const router = useRouter();
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
         {children}
            
          </Table>
        </TableContainer>}
    </>
  );
}
