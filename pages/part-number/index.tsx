import {
  Chip,
  TableBody,
  TableHead,
  TableRow as TableRowMui,
  Typography
} from "@mui/material";
import { IconCircleCheck, IconCircleX } from "@tabler/icons";
import type { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { setupApiClient } from "../../src/api/api";
import Layout from "../../src/components/Layout";
import { ProgressBar } from "../../src/components/Progress/Progress";
import Table from "../../src/components/Table/Table";
import { TableCell } from "../../src/components/Table/TableCell";
import { TableRow } from "../../src/components/Table/TableRow";
import ItemResponse from "../../src/interfaces/item.interface";
import {
  filterModel,
  modelState,
  useLevelsMutations
} from "../../src/state/atom";
import { formatDate } from "../../src/utils/format";
import { withSSRAuth } from "../../src/utils/withSSRAuth";



const keyFields = [
  { name: "codeLabel", isMain: true },
  { name: "percentExposition" },
  { name: "Tempo de exposição" },
  // {name: 'level'} ,
  // {name: 'minTimeBaking40'},
  // {name: 'minTimeBaking90'},
  // { name: 'minTimeBaking125' },
];

// {
//   "id": 2,
//   "codeLabel": "000001",
//   "createdDate": "2022-09-08T19:57:36.2531668",
//   "feederCar": "CAR01",
//   "responsibleForExposition": "admin",
//   "expositionInMinutes": 657,
//   "maxExpositionTime": 10,
//   "percentExposition": 65.64,
//   "used": true,
//   "inventory": {
//       "id": 1,
//       "typeInventoryId": 3,
//       "codeInventory": "CAR01",
//       "description": "Feeder Car 01",
//       "temperature": 0
//   }
// }

const header = [
  "Código",
  "Criado em",
  "Feeder Car",
  "Responsável pela exposição",
  "Exposição em minutos",
  "Tempo máximo de exposição",
  "Percentual de exposição",
  "Usado",
  // "inventory": {
  //     "id": 1,
  //     "typeInventoryId": 3,
  //     "codeInventory": "CAR01",
  //     "description": "Feeder Car 01",
  //     "temperature": 0
];

export default function () {
  const listItem: ItemResponse[] = useRecoilValue<ItemResponse[]>(filterModel);
  const [model, setModel] = useRecoilState(modelState);

  const { listAllModel } = useLevelsMutations();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    listAllModel<{ result: ItemResponse[] }>(
      "itens-expostos?orderByDesc=true&page=1&size=10&orderBy=CodeLabel"
    ).then(({ result }) => {
      setModel(result);
    });
  }, []);

  return (
    <Layout title="Home">
      <Typography variant="h1"></Typography>
      <Table
      >
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
            listItem.map((item: ItemResponse, index) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.codeLabel}
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatDate(item.createdDate)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.feederCar}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.responsibleForExposition}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.expositionInMinutes}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.maxExpositionTime}
                </TableCell>
                <TableCell component="th" scope="row">
                  <span
                    style={{
                      padding: 2,
                      background: "rgb(0 0 0 / 5%)",
                      borderRadius: 16,
                      height: 24,
                      display: "flex",
                      width: "100%",
                    }}
                  >
                    <span style={{ padding: '0 8px' }}>
                      {Math.ceil(
                        item.percentExposition < 100
                          ? item.percentExposition
                          : 100
                      )}
                      %
                    </span>
                    <ProgressBar
                      style={{ flexGrow: 1, minWidth: 80 }}
                      variant="determinate"
                      value={
                        item.percentExposition < 100
                          ? item.percentExposition
                          : 97
                      }
                    />
                  </span>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Chip
                    size="small"
                    sx={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      p: 0,
                    }}
                    color={item.used ? "success" : "error"}
                    label={item.used ? "sim" : "não"}
                    icon={
                      item.used ? (
                        <IconCircleCheck size={16} />
                      ) : (
                        <IconCircleX size={16} />
                      )
                    }
                  />
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

    const response = await apiClient.get("account/currentUser");
    return {
      props: {},
    };
  }
);

