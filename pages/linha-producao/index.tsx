import {
  TableBody,
  TableHead,
  TableRow as TableRowMui,
  Typography
} from "@mui/material";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setupApiClient } from "../../src/api/api";
import Dialog from "../../src/components/Dialog/Dialog";
import Layout from "../../src/components/Layout";
import Swipeable from "../../src/components/Swipeable/Swipeable";
import Table from "../../src/components/Table/Table";
import { TableCell } from "../../src/components/Table/TableCell";
import { TableRow } from "../../src/components/Table/TableRow";
import ProducaoResponse from "../../src/interfaces/producao.interface";
import { currentPage } from "../../src/ROUTES";
import {
  useLevelsMutations
} from "../../src/state/atom";
import { formatDate } from "../../src/utils/format";
import { withSSRAuth } from "../../src/utils/withSSRAuth";

const header = [
  "Nome",
  "CRIADO EM",
  "ATUALIZADO EM",
  ];

export default function () {
  // const listItem: ProducaoResponse[] = useRecoilValue<ProducaoResponse[]>(filterModel);
  // const [model, setModel] = useRecoilState(modelState);
  const [hoverAction, setHoverAction] = useState<boolean>(false);

  const router = useRouter();
  const { FormProducao, label } = currentPage(router.pathname)!;

  const { listAllModel } = useLevelsMutations();

  const handleDelete = async (value: ProducaoResponse) => {
    console.log("handleDelete", value);
  };

  const [listItem, setListItem] = useState<ProducaoResponse[]>([])

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    listAllModel<ProducaoResponse[]>(
      "linhaProducao"
    ).then((result) => {
      setListItem(result);
    });
  }, []);

  return (
    <Layout title="Home">
      <Typography variant="h1"></Typography>
      <Table>
        <TableHead>
          <TableRowMui sx={{ boxShadow: "none", background: "transparent" }}>
            {header.length > 0 &&
              header.map((field, index) => (
                <TableCell key={index}>
                  <>{field}</>
                </TableCell>
              ))}
          </TableRowMui>
        </TableHead>
        {/* Body */}
        <TableBody>
          {listItem &&
            listItem.length > 0 &&
            listItem.map((linhaproducao: ProducaoResponse, index) => (
             
                  <TableRow key={linhaproducao.id}>
                    <TableCell component="th" scope="row">
                      {linhaproducao.lineName}
                    </TableCell>
                    <TableCell component="th" scope="row">
                    {formatDate(linhaproducao.createDate)}
                    </TableCell>
                    <TableCell component="th" scope="row">
                    {formatDate(linhaproducao.updateDate)}
                    </TableCell>
              
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupApiClient(ctx);

    await apiClient.get("account/currentUser");
    return {
      props: {},
    };
  }
);

// Só exposto abaixo de 100%;
// Acima de 100% excelente;