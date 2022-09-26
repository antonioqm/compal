import {
  Chip,
  TableBody,
  TableHead,
  TableRow as TableRowMui,
  Typography
} from "@mui/material";
import { IconCircleCheck, IconCircleX } from "@tabler/icons";
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
import EtiquetaResponse from "../../src/interfaces/etiqueta.interface";
import { currentPage } from "../../src/ROUTES";
import {
  useLevelsMutations
} from "../../src/state/atom";
import { formatDate } from "../../src/utils/format";
import { withSSRAuth } from "../../src/utils/withSSRAuth";

const header = [
  "Data",
  "Responsável",
  "Quantidade",
  "Código Inicial",
  "Código Final",
  "Impresso",
];

export default function () {
  // const listItem: InventoryResponse[] = useRecoilValue<InventoryResponse[]>(filterModel);
  // const [model, setModel] = useRecoilState(modelState);
  const [hoverAction, setHoverAction] = useState<boolean>(false);

  const router = useRouter();
  const { FormLabel, label } = currentPage(router.pathname)!;

  const { listAllModel } = useLevelsMutations();

  const handleDelete = async (value: EtiquetaResponse) => {
    console.log("handleDelete", value);
  };

  const [listItem, setListItem] = useState<EtiquetaResponse[]>([])

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    listAllModel<{ result: EtiquetaResponse[] }>(
      "/etiquetas?orderByDesc=true&page=1&size=10&orderBy=StartCode"
    ).then(({ result }) => {
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
            listItem.map((etiqueta: EtiquetaResponse, index) => (
             
                  <TableRow key={etiqueta.id}>
                    <TableCell component="th" scope="row">
                      {formatDate(etiqueta.createDate)}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {etiqueta.user}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {etiqueta.quantity}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {etiqueta.startCode}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {etiqueta.endCode}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Chip
                        size="small"
                        sx={{
                          fontSize: "10px",
                          textTransform: "uppercase",
                          p: 0,
                        }}
                        color={etiqueta.printed ? "success" : "error"}
                        label={etiqueta.printed ? "sim" : "não"}
                        icon={
                          etiqueta.printed ? (
                            <IconCircleCheck size={16} />
                          ) : (
                            <IconCircleX size={16} />
                          )
                        }
                      />
                    </TableCell>
                    
                    <TableCell component="th" scope="row">
                      {/* <Fade in={hoverAction}> */}
                        {
                          <div>
                            <Swipeable
                              type={"Update"}
                              tooltipLabel={`Atualizar ${label}`}
                              title={label}
                            >
                              {
                                <FormLabel
                                  action={"Update"}
                                  data={{ ...etiqueta }}
                                />
                              }
                            </Swipeable>
                            <Dialog
                              onAction={() => handleDelete(etiqueta)}
                              id={etiqueta.id}
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
