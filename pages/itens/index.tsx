import { ArrowCircleDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Fade,
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
import Dialog from "../../src/components/Dialog/Dialog";
import Layout from "../../src/components/Layout";
import { ProgressBar } from "../../src/components/Progress/Progress";
import Swipeable from "../../src/components/Swipeable/Swipeable";
import Table from "../../src/components/Table/Table";
import { TableCell } from "../../src/components/Table/TableCell";
import { TableRow } from "../../src/components/Table/TableRow";
import ItemResponse from "../../src/interfaces/item.interface";
import { currentPage } from "../../src/ROUTES";
import {
  filterModel,
  modelState,
  useLevelsMutations
} from "../../src/state/atom";
import { formatDate } from "../../src/utils/format";
import { withSSRAuth } from "../../src/utils/withSSRAuth";

const header = [
  "Código",
  "Criado em",
  "Feeder Car",
  "Responsável pela exposição",
  "Exposição em minutos",
  "Tempo máximo de exposição",
  "Percentual de exposição",
  "Usado",
];

export default function () {
  const listItem: ItemResponse[] = useRecoilValue<ItemResponse[]>(filterModel);
  const [model, setModel] = useRecoilState(modelState);
  const [hoverAction, setHoverAction] = useState<boolean>(false);

  const router = useRouter();
  const { FormComponent, label } = currentPage(router.pathname)!;

  const { listAllModel } = useLevelsMutations();

  const handleDelete = async (value: ItemResponse) => {
    console.log("handleDelete", value);
  };

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

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
            listItem.map((item: ItemResponse, index) => (
              <Accordion
                key={item.id}
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ArrowCircleDown />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    General settings
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    I am an accordion
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableRow>
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
                    <TableCell component="th" scope="row">
                      <Fade in={hoverAction}>
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
                                  data={{ ...item }}
                                />
                              }
                            </Swipeable>
                            <Dialog
                              onAction={() => handleDelete(item)}
                              id={item.id}
                            />
                          </div>
                        }
                      </Fade>
                    </TableCell>
                  </TableRow>
                </AccordionDetails>
              </Accordion>
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
