import {
  TableBody,
  TableHead,
  TableRow as TableRowMui
} from '@mui/material';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { setupApiClient } from '../../src/api/api';
import DialogRemove from '../../src/components/DialogRemove/DialogRemove';
import Filter from '../../src/components/Filter/Filter';
import { ItemFilter } from "../../src/components/Filter/interfaces/Item.interface";
import Layout from '../../src/components/Layout';
import Swipeable from '../../src/components/Swipeable/Swipeable';
import Table from '../../src/components/Table/Table';
import { TableCell } from '../../src/components/Table/TableCell';
import { TableRow } from '../../src/components/Table/TableRow';
import { ComponentResponse } from '../../src/interfaces/component.interface';
import { currentPage } from '../../src/ROUTES';
import { useLevelsMutations } from '../../src/state/atom';
import { withSSRAuth } from '../../src/utils/withSSRAuth';


const header = [
  'Part-number',
  // 'Sensibilidade à umidade',
  'Espessura',
  // 'Temperatura',
  // 'Número max de Backing',
  // 'Tempo mínimo',
  // 'Tempo máximo',
  'Nível',
];



const partnumberFilter: ItemFilter[] = [
  {
    name: 'CodePartNumber',
    label: 'Part-Number',
    type: 'text'
  },
  // {
  //   name: 'HumiditySensitivity',
  //   label: 'SENSIBILIDADE À UMIDADE',
  //   type: 'radio'
  // },
  // {
  //   name: 'Temperature',
  //   label: 'Temperatura',
  //   type: 'slider'
  // },
  {
    name: 'NumberMaxBacking',
    label: 'Número Máximo de Baking',
    type: 'text'
  },
  // {
  //   name: 'MinimumTime',
  //   label: 'Tempo minimo de exposicao',
  //   type: 'text'
  // },
  // {
  //   name: 'MaxTimeExposure',
  //   label: 'Tempo maximo de exposicao',
  //   type: 'text'
  // },
  // {
  //   name: 'CreateDate',
  //   label: 'Criado em',
  //   type: 'text'
  // },
  // {
  //   name: 'UpdateDate',
  //   label: 'Atualizado em',
  //   type: 'text'
  // },
  {
    name: 'ThicknessModel',
    label: 'Espessura',
    type: 'text'
  },
  {
    name: 'Level',
    label: 'Nível',
    type: 'text'
  },
  {
    name: 'User',
    label: 'Usuário',
    type: 'text'
  },
]




export default function PartNumber() {
  
  // const listItem: InventoryResponse[] = useRecoilValue<InventoryResponse[]>(filterModel);
  // const [model, setModel] = useRecoilState(modelState);
  const [hoverAction, setHoverAction] = useState<boolean>(false);
  const [urlFilter, setUrlFilter] = useState<string>('');
  

  const router = useRouter();
  const { FormComponent, label } = currentPage(router.pathname)!;

  const { listAllModel } = useLevelsMutations();

  const handleDelete = async (value: ComponentResponse) => {
    console.log('handleDelete', value);
  };

  const [listItem, setListItem] = useState<ComponentResponse[]>([]);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  
    const updateUrlFilters = (url: string) => {
      setUrlFilter(url)
    }

  useEffect(() => {
    listAllModel<{ result: any[] }>(
      `/partNumber?orderBy=CodePartNumber&orderByDesc=true&page=1&size=10${urlFilter}`
    ).then(({ result }) => {
      setListItem(result);
    });
  }, []);


  return (
    <Layout title="Home">
      <Filter onChangeFilter={updateUrlFilters} items={partnumberFilter}  endpoint='itens-expostos' />


      <Table>
        <TableHead>
          <TableRowMui sx={{ boxShadow: 'none', background: 'transparent' }}>
            {header.length > 0 &&
              header.map((field, index) => (
                <TableCell key={index}>
                  <>{field}</>
                </TableCell>
              ))}
          </TableRowMui>
        </TableHead>
        {/* Body */}
        <TableBody>
          {listItem &&
            listItem.length > 0 &&
            listItem.map((partnumber: any, index) => (
              <TableRow key={partnumber.id}>
                <TableCell component="th" scope="row">
                  {partnumber.codePartNumber}
                </TableCell>
                {/* <TableCell component="th" scope="row">
                  <Chip
                    size="small"
                    sx={{
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      p: 0,
                    }}
                    color={partnumber.humiditySensitivity ? 'success' : 'error'}
                    label={partnumber.humiditySensitivity ? 'sim' : 'não'}
                    icon={
                      partnumber.humiditySensitivity ? (
                        <IconCircleCheck size={16} />
                      ) : (
                        <IconCircleX size={16} />
                      )
                    }
                  />
                </TableCell> */}
                <TableCell component="th" scope="row">
                  {partnumber.thickness.thicknessName}
                </TableCell>
                {/* <TableCell component="th" scope="row">
                  {partnumber.temperature}
                </TableCell> */}
                <TableCell component="th" scope="row">
                  {partnumber.numberMaxBacking}
                </TableCell>
                {/* <TableCell component="th" scope="row">
                  {partnumber.minimumTime}
                </TableCell> */}
                {/* <TableCell component="th" scope="row">
                  {partnumber.maxTimeExposure}
                </TableCell> */}
                <TableCell component="th" scope="row">
                  {partnumber.level}
                </TableCell>

                <TableCell component="th" scope="row">
                  {/* <Fade in={hoverAction}> */}

                  {<>
                    <Swipeable
                      type={'Update'}
                      tooltipLabel={`Atualizar ${label}`}
                      title={label}
                    >
                      
                        <FormComponent
                          action={"Update"}
                          data={{ ...partnumber }}
                        />
                      
                     
                    </Swipeable>
                    <DialogRemove
                      onAction={() => handleDelete(partnumber)}
                      id={partnumber.id}
                    />
                  </>
                  }
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupApiClient(ctx);

    await apiClient.get('account/currentUser');
    return {
      props: {},
    };
  }
);

// Só exposto abaixo de 100%;
// Acima de 100% excelente;
