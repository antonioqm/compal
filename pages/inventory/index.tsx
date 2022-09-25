import { Typography } from '@mui/material'
import type { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { setupApiClient } from '../../src/api/api'
import Layout from '../../src/components/Layout'
import Table from '../../src/components/Table'
import { InventoryResponse } from '../../src/interfaces/inventory.interface'
import { filterModel, modelState, useLevelsMutations } from '../../src/state/atom'
import { withSSRAuth } from '../../src/utils/withSSRAuth'


const keyFields = [
  {name: 'codeInventory'},
  {name: 'description'} ,
  {name: 'tipo'},

]

const header = [
  {codeInventory: 'Código'},
  {description: 'Descrição'},
  {tipo: 'Tipo' },
 
]

export default function () {  

  const listInventory:InventoryResponse[] = useRecoilValue<InventoryResponse[]>(filterModel);
  const [model, setModel] = useRecoilState(modelState);

  const {listAllModel } = useLevelsMutations();
  
  
  const [open, setOpen] = useState(false)

  const transformInventory = (Inventorys: InventoryResponse[]): any => {
    const transformedInventory = Inventorys.map((inventorys: InventoryResponse) => {
      console.log(inventorys.typeInventory.name)
      return {...inventorys,tipo: inventorys.typeInventory?.name}
    })

    return transformedInventory
  }

  useEffect(() => {
    listAllModel<{ result: InventoryResponse[] }>('inventario?orderByDesc=true&page=1&size=10&orderBy=CodeInventory').then(({ result }) => {
     
      const newresult = transformInventory(result)
      
      setModel(newresult)
     })

  }, [])

  return (
    <Layout title='Home' >
      <Typography variant='h1'></Typography>
      <Table
        header={header}
        body={listInventory}
        nameKeys={keyFields}
      />
      
   </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {

  const apiClient = setupApiClient(ctx)

  await apiClient.get('account/currentUser')
    return {
      props: {
       
     }
    }
  
})






