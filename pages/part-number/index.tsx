import { Typography } from "@mui/material";
import type { InferGetServerSidePropsType, NextPage } from "next";
import Layout from "../../src/components/Layout";
import { Main } from "../../src/components/Contents";
import Swipeable from "../../src/components/Swipeable/Swipeable";
import { FormPartNumber } from "../../src/components/FormsUI/Forms/PartNumber";
import AppBar from "../../src/components/AppBar";
import { Level } from "../../src/interfaces/level.interface";
import { useState, useEffect, useMemo} from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { apiClient } from "../../src/api/api";
import { filterModel, modelState, useLevelsMutations } from "../../src/state/atom";
import Table from "../../src/components/Table";



const keyFields = [
  {name: 'codePartNumber', isMain: true},
  {name: 'level'},
  {name: 'humiditySensitivity'} ,
  {name: 'thickness'},
  {name: 'temperature'},
  {name: 'numberMaxBacking'},
  {name: 'maxTimeExposure'},
  {name: 'createDate'},
  {name: 'updateDate'},

]

// "id": 1,
// "codePartNumber": "PN123456",
// "humiditySensitivity": true,
// "thickness": 0,
// "temperature": 0,
// "numberMaxBacking": 0,
// "minimumTime": 0,
// "maxTimeExposure": 0,
// "createDate": "2022-08-24T23:44:34.3190623",
// "updateDate": "2022-08-24T23:44:34.3190623",
// "level": null,
// "user": null


const header = [
  {codePartNumber: 'Part-Number'},
  {level: 'Nível'},
  {humiditySensitivity: 'Sensível a umidade'},
  {thickness: 'Espessura'},
  {temperature: 'Temperatura'},
  {numberMaxBacking: 'Número Máximo de Backing'},
  {maxTimeExposure: 'Tempo Máximo de Exposição'},
  {createDate: 'Criado'},
  { updateDate: 'Atualizado' },
  
  // {'Tempo Crítico de Exposição (Horas)'},
  // {'Desativado'},
]

interface Props {
  props: {
    lisLevel: any[]
  }
}



const PartNumber = ( ) => {
  
  const lisLevel:any[] = useRecoilValue<any[]>(filterModel);
  const [model, setModel] = useRecoilState(modelState);
  
  const [open, setOpen] = useState(false)

  const {listAllModel } = useLevelsMutations();


    
  useEffect(() => {
    listAllModel<any[]>('partNumber').then(levels => {
      console.log('asas')
      setModel(levels)
     })

  }, [])


  return (
    <Layout title='Home' >
      <Typography variant='h1'></Typography>
      <Table
        header={header}
        body={lisLevel}
        nameKeys={keyFields}
      />
       

      {/* <Main/> */}
      
   </Layout>
  )
};



export default PartNumber;
