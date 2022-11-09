import { Pagination, Stack, Typography } from "@mui/material";
import type { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { setupApiClient } from "../../src/api/api";
import Layout from "../../src/components/Layout";
import Table from "../../src/components/Table";
import { LevelModel, LevelResponse } from "../../src/interfaces/level.interface";
import {
  filterModel, modelState,
  useLevelsMutations
} from "../../src/state/atom";
import { withSSRAuth } from "../../src/utils/withSSRAuth";

const keyFields = [
  { name: "levelName", isMain: true },
  { name: "maxTimeExposition" },
  { name: "backingRequired" },
  { name: "criticalExpositionTime" },
  { name: "createDate" },
  { name: "updateDate" },
  // {'Tempo Crítico de Exposição (Horas)'},
  // {'Desativado'},
];

const header = [
  { levelName: "Nível" },
  { maxTimeExposition: "Tempo Máximo de Exposição (Horas)" },
  { backingRequired: "Baking Obrigatório" },
  { criticalExpositionTime: "Tempo Crítico de Exposição (Horas)" },
  { createDate: "Criado em" },
  { updateDate: "Atualizado em" },
  // {'Tempo Crítico de Exposição (Horas)'},
  // {'Desativado'},
];

export default function Nivel() {
  const lisLevel: LevelModel[] = useRecoilValue<LevelModel[]>(filterModel);
  const [model, setModel] = useRecoilState(modelState);
  const [page, setPage] = useState<number>(1);
  const [levelResponse, setLevelResponse] = useState<LevelResponse>();

  const { listAllModel } = useLevelsMutations();

  const [totalPages, setTotalPages] = useState<number>(1);

  const handlePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
    
    setPage(newPage)
  }

  
  
  useEffect(() => {
    listAllModel<LevelResponse>(`nivel?orderByDesc=true&page=${page}&size=10&orderBy=levelName`
    ).then(
      (levelResponse) => {
        setTotalPages(Math.ceil(levelResponse.totalItems / levelResponse.pageSize))
        setLevelResponse(levelResponse);
        setModel(levelResponse.result);
      }
    );
  }, [page]);

  return (
    <Layout title="Home">
      <Typography variant="h1"></Typography>

      <Table endpoint='nivel' header={header} body={lisLevel} nameKeys={keyFields} />

      {/* <Main/> */}
      
      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} top={20} marginTop={4}>
      {((levelResponse && totalPages > 1)) &&  <Pagination shape="rounded" onChange={handlePage} count={totalPages} siblingCount={0} boundaryCount={2} />}
      </Stack>
      
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
