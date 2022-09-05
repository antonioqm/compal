import { Button, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Layout from '../src/components/Layout'
import { Main } from '../src/components/Contents'
import Table from '../src/components/Table'
import { useEffect, useMemo, useState } from 'react'
import { apiClient } from '../src/api/api'
import { useRecoilValue, useRecoilState } from 'recoil'
import { Level } from '../src/interfaces/level.interface'
import { filterModel, modelState, useLevelsMutations } from '../src/state/atom'
import Dialog from '../src/components/Dialog/Dialog'


const keyFields = [
  {name: 'levelName', isMain: true},
  {name: 'maxTimeExposition'} ,
  {name: 'backingRequired'},
  {name: 'createDate'},
  {name: 'updateDate'},
  // {'Tempo Crítico de Exposição (Horas)'},
  // {'Desativado'},
]

const header = [
  {levelName: 'Nível'},
  {maxTimeExposition: 'Tempo Máximo de Exposição (Horas)'},
  {backingRequired: 'Baking Obrigatório'},
  {createDate: 'Criado em'},
  {updateDate: 'Atualizado em'},
  // {'Tempo Crítico de Exposição (Horas)'},
  // {'Desativado'},
]

const Home: NextPage = () => {  

  const lisLevel:Level[] = useRecoilValue<Level[]>(filterModel);
  const [model, setModel] = useRecoilState(modelState);

  const {listAllModel } = useLevelsMutations();
  
  
  const [open, setOpen] = useState(false)

  useEffect(() => {
    listAllModel<Level[]>('nivel').then(levels => {
      setModel(levels)
     })

  }, [])

  return (
    <Layout title='Home' >
      <Typography variant='h1'></Typography>
      <Table
        header={header}
        body={lisLevel}
        nameKeys={keyFields}
      />
       

      {/* <Main/> */}
      
   </Layout>
  )
}


export default Home




