import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import Layout from '../src/components/Layout'
import { Main } from '../src/components/Contents'
import Table from '../src/components/Table'
import { useEffect } from 'react'
import { apiClient } from '../src/api/api'
import { useRecoilValue, useRecoilState } from 'recoil'
import { Level } from '../src/interfaces/level.interface'
import { filterModel, modelState } from '../src/state/atom'




const Home: NextPage = () => {  

  const lisLevel:Level[] = useRecoilValue<Level[]>(filterModel);
  const [model, setModel] = useRecoilState(modelState);

  const header = [
    'Nível',
    'Tempo Máximo de Exposição (Horas)',
    'Tempo Crítico de Exposição (Horas)',
    'Baking Obrigatório',
    'Desativado',
  ]

  useEffect(() => {
    apiClient.listAll('nivel').then(data => {
      setModel(data)
     })

  }, [])

  const keyFieldsBody = lisLevel.length ? Object.keys(lisLevel[0]) : []
  
  console.log(keyFieldsBody)

 
  return (
    <Layout title='Home' >
      <Typography variant='h1'></Typography>
      <Table
        header={header}
        body={lisLevel}
        nameKeys={keyFieldsBody}
      />
      {/* <Main/> */}
      
   </Layout>
  )
}


export default Home




