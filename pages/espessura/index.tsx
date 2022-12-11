import { Pagination, Stack, Typography } from '@mui/material'
import type { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { setupApiClient } from '../../src/api/api'
import Layout from '../../src/components/Layout'
import Table from '../../src/components/Table'
import { ThicknessModel, ThicknessResponse } from '../../src/interfaces/thickness.interface'
import { filterModel, modelState, useModelMutations } from '../../src/state/atom'
import { withSSRAuth } from '../../src/utils/withSSRAuth'


const keyFields = [
  {name: 'thicknessName', isMain: true},
  {name: 'level'} ,
  {name: 'minTimeBaking40'},
  {name: 'minTimeBaking90'},
  { name: 'minTimeBaking125' },
]

const header = [
  {thicknessName: 'Espessura'},
  {level: 'Nível'},
  { minTimeBaking40: 'Tempo mínimo de Baking 40º (Horas)' },
  {minTimeBaking90: 'Tempo mínimo de Baking 90º (Horas)'},
  {minTimeBaking125: 'Tempo mínimo de Baking 125º (Horas)'},
]




export default function Espessura() {  

  const listThickness:ThicknessModel[] = useRecoilValue<ThicknessModel[]>(filterModel);
  const [model, setModel] = useRecoilState(modelState);

  const {listAllModel } = useModelMutations();
  
  
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  const transformThickness = (thicknesses: ThicknessModel[]): any => {
    const transformedThicknesses = thicknesses.map((thickness: ThicknessModel) => {
      return {...thickness, level: thickness.level?.levelName,  levelId: thickness.level?.id}
    })

    return transformedThicknesses
  }
  const handlePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const loadEspessuraData = () => {
    listAllModel<ThicknessResponse>(`espessura?orderByDesc=true&page=${page}&size=10&orderBy=ThicknessName`).then((data) => {
      const newresult = transformThickness(data.result)
      setModel(newresult)
      setTotalPages(data.totalPages)
    })

  }

  useEffect(() => {
    loadEspessuraData()
  }, [page]);
  
  return (
    <Layout title='Home' >
      <Typography variant='h1'></Typography>
      <Table
        endpoint={'espessura'}
        header={header}
        body={listThickness}
        nameKeys={keyFields}
      />
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        top={20}
        marginTop={4}
      >

       <Pagination
            shape="rounded"
            onChange={handlePage}
            count={totalPages}
            siblingCount={0}
            boundaryCount={2}
      />
      </Stack>
      
   </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {

  const apiClient = setupApiClient(ctx)

  // await apiClient.get('account/currentUser')
    return {
      props: {
       
     }
    }
  
})






