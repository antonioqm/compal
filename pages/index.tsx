import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Layout from '../src/Layout'
import { Page } from './components/Page'


const Home: NextPage = () => {
  return (
    <Layout title='Home' >
      <Page/>
   </Layout>
  )
}

export default Home
