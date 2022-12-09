import {
  Pagination,
  Stack,
  TableBody,
  TableHead,
  TableRow as TableRowMui,
  Typography
} from "@mui/material";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setupApiClient } from "../../src/api/api";
import DialogRemove from "../../src/components/DialogRemove/DialogRemove";
import Layout from "../../src/components/Layout";
import Swipeable from "../../src/components/Swipeable/Swipeable";
import Table from "../../src/components/Table/Table";
import { TableCell } from "../../src/components/Table/TableCell";
import { TableRow } from "../../src/components/Table/TableRow";
import { InventoryModel, InventoryResponse } from "../../src/interfaces/inventory.interface";
import { currentPage } from "../../src/ROUTES";
import { useModelMutations } from "../../src/state/atom";
import { withSSRAuth } from "../../src/utils/withSSRAuth";
const header = ["Código", "Descrição", "Temperatura", "Tipo"];

export default function Inventory() {
  const router = useRouter();
  const Route = currentPage(router.pathname)!;
  const { listAllModel, deleteModel } = useModelMutations();
  const [page, setPage] = useState<number>(1);



  const handleDelete = async (value: InventoryModel) => {
    if (value.id) {
      await deleteModel<InventoryModel>({endpoint:'/inventario', payload: {...value, id: value.id}})
      
    }
    console.log('handleDelete', value);
  };

  const [listInventory, setListInventory] = useState<InventoryModel[]>([]);
  const [inventoryResponse, setInventoryResponse] = useState<InventoryResponse>();

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handlePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage)
}
  useEffect(() => {
    listAllModel<InventoryResponse>(
      `inventario?orderByDesc=true&page=${page}&size=10&orderBy=CodeInventory`
    ).then((inventoeyResponse) => {
      setInventoryResponse(inventoeyResponse);
      setListInventory(inventoeyResponse.result);
    });
  }, [page]);

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
          {listInventory &&
            listInventory.length > 0 &&
            listInventory.map((inventory: InventoryModel, index) => (
              <TableRow key={inventory.id}>
                <TableCell component="th" scope="row">
                  {inventory.codeInventory}
                </TableCell>
                <TableCell component="th" scope="row">
                  {inventory.description}
                </TableCell>
                <TableCell component="th" align="left" scope="row">
                  {inventory.temperature + 'ºC'}
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
                        tooltipLabel={`Atualizar ${Route?.label}`}
                        title={Route?.label}
                      >
                        {Route && (
                          <Route.FormComponent
                            action={"Update"}
                            data={{ ...inventory }}
                          />
                        )}
                      </Swipeable>
                      <DialogRemove
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
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        top={20}
        marginTop={4}
      >
        {inventoryResponse && inventoryResponse?.totalPages > 0 && (
          <Pagination
            shape="rounded"
            onChange={handlePage}
            count={inventoryResponse?.totalPages}
            siblingCount={0}
            boundaryCount={2}
          />
        )}
      </Stack>
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
