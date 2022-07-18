import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Layout from './components/Layout'
import { Main } from './components/Contents'
import type { ReactElement } from 'react'


const Home: NextPage = () => {
  return (
    <Layout title='Home' >
      <Typography variant='h1'></Typography>
      <Main/>
   </Layout>
  )
}

export default Home




