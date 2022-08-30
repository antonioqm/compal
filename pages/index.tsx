import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import Layout from '../src/components/Layout'
import { Main } from '../src/components/Contents'




const Home: NextPage = () => {  
 
  return (
    <Layout title='Home' >
      <Typography variant='h1'></Typography>
      <Main/>
      
   </Layout>
  )
}


export default Home




