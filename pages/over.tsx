import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import Layout from './components/Layout'
import { Main } from './components/Contents'
import Swipeable from './components/Swipeable'


const Over: NextPage = () => {
  return (
    <>
      <Layout title='Component' >
        
    <Swipeable  />
    </Layout>
    </>
  )
}

export default Over
