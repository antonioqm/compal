import { Typography } from "@mui/material";
import type { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { setupApiClient } from "../../src/api/api";
import Layout from "../../src/components/Layout";
import Table from "../../src/components/Table";
import { Level } from "../../src/interfaces/level.interface";
import {
  filterModel, modelState,
  useLevelsMutations
} from "../../src/state/atom";
import { withSSRAuth } from "../../src/utils/withSSRAuth";

const keyFields = [
  { name: "levelName", isMain: true },
  { name: "maxTimeExposition" },
  { name: "backingRequired" },
  { name: "criticalExposureTime" },
  { name: "createDate" },
  { name: "updateDate" },
  // {'Tempo Crítico de Exposição (Horas)'},
  // {'Desativado'},
];

const header = [
  { levelName: "Nível" },
  { maxTimeExposition: "Tempo Máximo de Exposição (Horas)" },
  { backingRequired: "Baking Obrigatório" },
  { criticalExposureTime: "Tempo Crítico de Exposição (Horas)" },
  { createDate: "Criado em" },
  { updateDate: "Atualizado em" },
  // {'Tempo Crítico de Exposição (Horas)'},
  // {'Desativado'},
];

export default function () {
  const lisLevel: Level[] = useRecoilValue<Level[]>(filterModel);
  const [model, setModel] = useRecoilState(modelState);

  const { listAllModel } = useLevelsMutations();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    listAllModel<{ result: Level[] }>("nivel?orderBy=levelName").then(
      ({ result }) => {
        setModel(result);
      }
    );
  }, []);

  return (
    <Layout title="Home">
      <Typography variant="h1"></Typography>

      <Table header={header} body={lisLevel} nameKeys={keyFields} />

      {/* <Main/> */}
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
