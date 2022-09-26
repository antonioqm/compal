import { Typography } from '@mui/material'
import type { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { setupApiClient } from '../../src/api/api'
import Layout from '../../src/components/Layout'
import Table from '../../src/components/Table'
import { Thickness } from '../../src/interfaces/thickness.interface'
import { filterModel, modelState, useLevelsMutations } from '../../src/state/atom'
import { withSSRAuth } from '../../src/utils/withSSRAuth'


const keyFields = [
  {name: 'thicknessName', isMain: true},
  {name: 'level'} ,
  {name: 'minTimeBaking40'},
  {name: 'minTimeBaking90'},
  { name: 'minTimeBaking125' },
]

const header = [
  {thicknessName: 'Nome da Espessura'},
  {level: 'Nível'},
  { minTimeBaking40: 'Tempo mínimo de Baking 40º (Horas)' },
  {minTimeBaking90: 'Tempo mínimo de Baking 90º (Horas)'},
  {minTimeBaking125: 'Tempo mínimo de Baking 125º (Horas)'},
]




export default function Espessura() {  

  const listThickness:Thickness[] = useRecoilValue<Thickness[]>(filterModel);
  const [model, setModel] = useRecoilState(modelState);

  const {listAllModel } = useLevelsMutations();
  
  
  const [open, setOpen] = useState(false)

  const transformThickness = (thicknesses: Thickness[]): any => {
    const transformedThicknesses = thicknesses.map((thickness: Thickness) => {
      return {...thickness, level: thickness.level?.levelName}
    })

    return transformedThicknesses
  }

  useEffect(() => {
    listAllModel<{ result: Thickness[] }>('espessura?orderByDesc=true&page=1&size=10&orderBy=ThicknessName').then(({ result }) => {
      const newresult = transformThickness(result)
      console.log(newresult)
      setModel(newresult)
     })

  }, [])

  return (
    <Layout title='Home' >
      <Typography variant='h1'></Typography>
      <Table
        header={header}
        body={listThickness}
        nameKeys={keyFields}
      />
      
   </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {

  const apiClient = setupApiClient(ctx)

  await apiClient.get('account/currentUser')
    return {
      props: {
       
     }
    }
  
})






