import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Layout from '../src/components/Layout'
import { Main } from '../src/components/Contents'
import type { ReactElement } from 'react'
import api from 'src/api/api'
import { useRecoilValue, useSetRecoilState, selector } from 'recoil'
import { listLevelState } from 'src/state/atom'
import { Level } from './Interfaces/level.interface'



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




