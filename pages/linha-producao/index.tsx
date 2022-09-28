import {
  TableBody,
  TableHead,
  TableRow as TableRowMui,
  Typography
} from "@mui/material";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { setupApiClient } from "../../src/api/api";
import DialogRemove from "../../src/components/DialogRemove/DialogRemove";
import { FormProducao } from "../../src/components/FormsUI/Forms/FormProducao";
import Layout from "../../src/components/Layout";
import Swipeable from "../../src/components/Swipeable/Swipeable";
import Table from "../../src/components/Table/Table";
import { TableCell } from "../../src/components/Table/TableCell";
import { TableRow } from "../../src/components/Table/TableRow";
import ProducaoResponse from "../../src/interfaces/producao.interface";
import { currentPage } from "../../src/ROUTES";
import {
  ResponseState,
  useLevelsMutations
} from "../../src/state/atom";
import { formatDate } from "../../src/utils/format";
import { withSSRAuth } from "../../src/utils/withSSRAuth";

const header = [
  "Nome",
  "CRIADO EM",
  "ATUALIZADO EM",
  ];

export default function LinhaProducao() {
  const { listAllModel } = useLevelsMutations();
  const [changes,] = useRecoilState(ResponseState)
  const [hoverAction, setHoverAction] = useState<boolean>(false);

  const router = useRouter();
  const Route = currentPage(router.pathname)!;
  


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

  useEffect(() => {
    if (changes?.type === "success") {
      listAllModel<ProducaoResponse[]>(
        "linhaProducao"
      ).then((result) => {
        setListItem(result);
      });
    }
  }, [changes]);

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
                    <TableCell component="th" scope="row">
                  {/* <Fade in={hoverAction}> */}
                  {
                    <div>
                      <Swipeable
                        type={"Update"}
                        tooltipLabel={`Atualizar ${Route?.label}`}
                        title={Route?.label}
                      >
                        {
                          <FormProducao
                            action={"Update"}
                            data={{ ...linhaproducao }}
                          />
                        }
                      </Swipeable>
                      <DialogRemove
                        onAction={() => handleDelete(linhaproducao)}
                        id={linhaproducao.id}
                      />
                    </div>
                  }
                  {/* </Fade> */}
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
