import {
  Chip,
  Pagination,
  Stack,
  TableBody,
  TableHead,
  TableRow as TableRowMui,
  Typography
} from "@mui/material";
import { IconCircleCheck, IconCircleX } from "@tabler/icons";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { setupApiClient } from "../../src/api/api";
import DialogPrinter from "../../src/components/DialogPrinter/DialogPrinter";
import Layout from "../../src/components/Layout";
import Table from "../../src/components/Table/Table";
import { TableCell } from "../../src/components/Table/TableCell";
import { TableRow } from "../../src/components/Table/TableRow";
import {
  LabelModel,
  LabelResponse
} from "../../src/interfaces/label.interface";
import { currentPage } from "../../src/ROUTES";
import { filterModel, modelState, useModelMutations } from '../../src/state/atom';
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

export default function Etiqueta() {
  const listLabel: LabelModel[] = useRecoilValue<LabelModel[]>(filterModel);
  const [model, setModel] = useRecoilState(modelState);
  const [hoverAction, setHoverAction] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  

  const router = useRouter();
  const { FormComponent, label } = currentPage(router.pathname)!;

  const { listAllModel,  } = useModelMutations();

  const onOpenPrinter = async (value: LabelModel) => {
  };

  // const [listLabel, setListLabel] = useState<LabelModel[]>([]);
  const [labelResponse, setLabelResponse] = useState<LabelResponse>();

  const [expanded, setExpanded] = useState<string | false>(false);
  const [page, setPage] = useState<number>(1);


  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handlePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  // `http://200.129.173.244:5001/v1/etiquetas?orderByDesc=true&1=1&size=10&orderBy=StartCode`
  const loadLabelsData = () => {
    listAllModel<LabelResponse>(
      `/etiquetas?orderByDesc=true&page=${page}&size=10&orderBy=StartCode`
    ).then((response) => {
      setTotalPages(Math.ceil(response.totalItems / response.pageSize));
      setLabelResponse(response);
      setModel(response.result);
    });
  }
  useEffect(() => {
    loadLabelsData()
  }, [page]);

  return (
    <Layout title="Etiquetas">
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
          {listLabel &&
            listLabel.length > 0 &&
            listLabel.map((etiqueta: LabelModel, index) => (
              <TableRow key={etiqueta.id}>
                <TableCell component="th" scope="row">
                  {formatDate(etiqueta.createDate)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {etiqueta.user?.name}
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
                      <DialogPrinter
                        reloadDataLabel={loadLabelsData}
                        etiqueta={etiqueta}
                        // onAction={() => onOpenPrinter(etiqueta)}
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

      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        top={20}
        marginTop={4}
      >
        {labelResponse && totalPages > 1 && (
          <Pagination
            shape="rounded"
            onChange={handlePage}
            count={totalPages}
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

    // await apiClient.get("account/currentUser");
    return {
      props: {},
    };
  }
);

// Só exposto abaixo de 100%;
// Acima de 100% excelente;
