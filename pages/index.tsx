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

  useEffect(() => {
    apiClient.listAll('nivel').then(data => {
      setModel(data)
     })

  }, [])
 
  return (
    <Layout title='Home' >
      <Typography variant='h1'></Typography>
      <Table body={lisLevel} ></Table>
      {/* <Main/> */}
      
   </Layout>
  )
}


export default Home




