import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import Layout from '../src/components/Layout'
import { Main } from '../src/components/Contents'
import { useLevelsMutations } from "src/state/atom";




const Home: NextPage = () => {  
 
  return (
    <Layout title='Home' >
      <Typography variant='h1'></Typography>
      <Main/>
      
   </Layout>
  )
}

// export async function getServerSideProps(context) {
//   const { listLevels } = useLevelsMutations();
//   await listLevels();
//   return {
//     props: {},
//   }
// }

export default Home




