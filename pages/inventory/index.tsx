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
import InventoryResponse from "../../src/interfaces/inventory.interface";
import { currentPage } from "../../src/ROUTES";
import { useLevelsMutations } from "../../src/state/atom";
import { withSSRAuth } from "../../src/utils/withSSRAuth";

const header = ["Código", "Descrição", "Temperatura", "Tipo"];

export default function () {
  // const listItem: InventoryResponse[] = useRecoilValue<InventoryResponse[]>(filterModel);
  // const [model, setModel] = useRecoilState(modelState);
  const [hoverAction, setHoverAction] = useState<boolean>(false);

  const router = useRouter();
  const { FormComponent, label } = currentPage(router.pathname)!;

  const { listAllModel } = useLevelsMutations();

  const handleDelete = async (value: InventoryResponse) => {
    console.log("handleDelete", value);
  };

  const [listItem, setListItem] = useState<InventoryResponse[]>([]);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    listAllModel<{ result: InventoryResponse[] }>(
      "inventario?orderByDesc=true&page=1&size=10&orderBy=CodeInventory"
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
            listItem.map((inventory: InventoryResponse, index) => (
              <TableRow key={inventory.id}>
                <TableCell component="th" scope="row">
                  {inventory.codeInventory}
                </TableCell>
                <TableCell component="th" scope="row">
                  {inventory.description}
                </TableCell>
                <TableCell component="th" scope="row">
                  {inventory.temperature}
                </TableCell>
                <TableCell component="th" scope="row">
                  {inventory.typeInventory && inventory.typeInventory.name}
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
                          <FormComponent
                            action={"Update"}
                            data={{ ...inventory }}
                          />
                        }
                      </Swipeable>
                      <Dialog
                        onAction={() => handleDelete(inventory)}
                        id={inventory.id}
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
