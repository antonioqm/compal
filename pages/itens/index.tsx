import {
  Pagination,
  Stack,
  TableBody,
  TableHead,
  TableRow as TableRowMui,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { apiClient } from "../../src/api/api";
import DialogHistory from "../../src/components/DialogHistory/DialogHistory";
import Filter from "../../src/components/Filter/Filter";
import { ItemFilter } from "../../src/components/Filter/interfaces/Item.interface";
import Layout from "../../src/components/Layout";
import { ProgressBar } from "../../src/components/Progress/Progress";
import Table from "../../src/components/Table/Table";
import { TableCell } from "../../src/components/Table/TableCell";
import { TableRow } from "../../src/components/Table/TableRow";
import { ItemModel, ItemResponse } from "../../src/interfaces/item.interface";
import { currentPage } from "../../src/ROUTES";
import {
  filterModel,
  modelState,
  useLevelsMutations
} from "../../src/state/atom";
import { formatDate } from "../../src/utils/format";
import { InventoryType } from "../../src/utils/statusItems";

const header = [
  "Part Number",
  "MSD Code",
  "Status",
  "Nível",
  "Última ocorrência",
  "Vencimento",
  // "Operador de fechamento",
  "Tempo de exposição (horas)",
  "Histórico",
];

const historyHeader = [
  { name: "Data de ocorrência", field: "occurrencyDate", type: "datetime" },
  { name: "Descrição", field: "description", type: "string" },
  { name: "Operador", field: "user", type: "string" },
];

const itemsFilter: ItemFilter[] = [
  { name: "feederCar", label: "Feeder Car", type: "text" },
  { name: "codeLabel", label: "Código", type: "text" },
  { name: "used", label: "Usado", type: "radio" },
  { name: "temperature", label: "Temperatura", type: "slider" },
];

export default function Itens() {
  const listItem: ItemModel[] = useRecoilValue<ItemModel[]>(filterModel);
  const [model, setModel] = useRecoilState(modelState);
  const [itemResponse, setItemResponse] = useState<ItemResponse>();
  const [hoverAction, setHoverAction] = useState<boolean>(false);
  const [urlFilter, setUrlFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [currentHitories, setCurrentHistories] = useState<any[]>([]);

  const router = useRouter();
  const Route = currentPage(router.pathname)!;

  const { listAllModel } = useLevelsMutations();

  const handleDelete = async (value: ItemModel) => {
    console.log("handleDelete", value);
  };

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const updateUrlFilters = (url: string) => {
    setUrlFilter(url);
  };

  const handlePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    listAllModel<ItemResponse>(
      `itens-in-baking-or-feederCar?orderBy=CodeLabel&orderByDesc=true&page=${page}&size=10&${urlFilter}`
    ).then((itemResponse:ItemResponse) => {

      let result = itemResponse.result
      itemResponse.result.map((item: ItemModel, index:number) => {

        apiClient.get<InventoryType>(`inventario/${item.inventory.typeInventoryId}/byId`)
          .then(data => {
            const current = result[index]
            result = [...result, { ...current, inventoryTypeName: 'ppppp' }]
            console.log('result', result)
          })
        
      });

      setItemResponse(itemResponse);
      setModel(result);

    });
  }, [urlFilter, page]);

  async function handleHistory(data: {
    partNumber: string;
    codeLabel: string;
  }): Promise<void> {
    const response = await apiClient.get(
      `/historico-item/${data?.partNumber}/${data?.codeLabel}`
    );
    setCurrentHistories(response);
  }

  const setBgColor = (qtyBakingRealized:number):string => {
    if (qtyBakingRealized === 0) {
      return '#fff'
    }
    if (qtyBakingRealized === 1) {
      return '#dcedf5'
    }
    if (qtyBakingRealized === 2) {
      return '#f3f5dc'
    }
    if (qtyBakingRealized === 3) {
      return '#fae3d7'
    }
    if (qtyBakingRealized >= 4) {
      return '#ff6b7f'
    }
    return 'red'
  }

  return (
    <Layout title="Home">
      <Filter
        onChangeFilter={updateUrlFilters}
        items={itemsFilter}
        endpoint="itens-expostos"
      />

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
            listItem.map((item: ItemModel, index) => (
              <TableRow sx={{ bgcolor: setBgColor(item.qtyBakingRealized) }} key={item.id}>
                <TableCell component="th" scope="row">
                  {item.partNumber}
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatDate(item.codeLabel)}
                </TableCell>

                <TableCell align="center" component="th" scope="row">
                  <Typography variant="body2">
                    {item.status}
                  </Typography>
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
                    <span style={{ padding: "0 8px" }}>
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
                        item.percentExposition
                      }
                    />
                  </span>
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.level?.levelName}
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatDate(item.occurrencyDate)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatDate(item.vencimentoDate)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {`${Math.floor(item.expositionInMinutes / 60)}:${
                    item.expositionInMinutes % 60
                  }`}
                </TableCell>
                {/* <TableCell component="th" scope="row">
                  {item.used}
                </TableCell> */}
                <TableCell component="th" scope="row">
                  <DialogHistory
                    header={historyHeader}
                    data={currentHitories}
                    onAction={() => handleHistory(item)}
                  />
                </TableCell>
                {/* <TableCell component="th" scope="row">
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
                      background: 'rgb(0 0 0 / 5%)',
                      borderRadius: 16,
                      height: 24,
                      display: 'flex',
                      width: '100%',
                    }}
                  >
                    <Typography variant="overline">{ getStatusItem( 2, 80)}</Typography>
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
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      p: 0,
                    }}
                    color={item.used ? 'success' : 'error'}
                    label={item.used ? 'sim' : 'não'}
                    icon={
                      item.used ? (
                        <IconCircleCheck size={16} />
                      ) : (
                        <IconCircleX size={16} />
                      )
                    }
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <DialogHistory
                    header={historyHeader}
                    data={currentHitories}
                    onAction={() => handleHistory(item)}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <Fade in={hoverAction}>
                    {
                      <div>
                        <Swipeable
                          type={'Update'}
                          tooltipLabel={`Atualizar ${Route?.label}`}
                          title={Route?.label}
                        >
                          {Route && (
                            <Route.FormComponent
                              action={'Update'}
                              data={{ ...item }}
                            />
                          )}
                        </Swipeable>
                        <DialogRemove
                          onAction={() => handleDelete(item)}
                          id={item.id}
                        />
                      </div>
                    }
                  </Fade>
                </TableCell> */}
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
        {itemResponse && itemResponse?.totalPages > 1 && (
          <Pagination
            shape="rounded"
            onChange={handlePage}
            count={itemResponse?.totalPages}
            siblingCount={0}
            boundaryCount={2}
          />
        )}
      </Stack>
    </Layout>
  );
}


// Só exposto abaixo de 100%;
// Acima de 100% excelente;
