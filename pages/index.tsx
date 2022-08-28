import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Layout from '../src/components/Layout'
import { Main } from '../src/components/Contents'
import { useRecoilState } from 'recoil'
import { loadingState } from 'src/state/atom'
import { Axios } from 'src/api/api'




const Home: NextPage = () => {  
  console.log('Home - Level')
  
  return (
    <Layout title='Home' >
      <Typography variant='h1'></Typography>
      <Main/>
      
   </Layout>
  )
}

export default Home




